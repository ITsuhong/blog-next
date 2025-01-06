"use server"

import {
    blogFormSchema,
    BlogFormSchemaType,
    CreateBlogFormSchemaType,
    CreateBlogFormSchema,
    UpdateBlogFormSchemaType, UpdateBlogFormSchema, UpdateBlogNameType, updateBlogName
} from "@/schema/blog";
import prismadb from "@/lib/prisma";

export async function createBlog(values: CreateBlogFormSchemaType) {
    try {
        const validatedFields = CreateBlogFormSchema.safeParse(values);
        if (validatedFields.success) {
            const {name, tagId} = validatedFields.data;
            const result = await prismadb.blog.create({
                data: {
                    tag: {
                        connect: {
                            id: tagId
                        }
                    },
                    title: name,
                }
            });
            return {
                success: true,
                data: result,
                message: '创建成功'
            }
        } else {
            return {
                success: false,
                error: '创建失败'
            }
        }
    } catch {
        return {
            success: false,
            error: '创建失败'
        }
    }

}

//根据tagId获取
export async function getBlogsByTagId(tagId: string) {
    //  带上tag的名字
    try {
        //按照创建时间排序
        return await prismadb.blog.findMany({
            where: {
                tagId: tagId
            },
            include: {
                tag: true
            },
        });
    } catch (error) {
        console.log("报错", error);
        throw error;
    }
}

//根据id获取blog
export async function getBlogById(id: string) {
    try {
        return await prismadb.blog.findUnique({
            where: {
                id: id
            },
            include: {
                tag: true
            }
        });
    } catch (error) {
        console.log("报错", error);
        throw error;
    }
}

//根据id保存blog
export async function saveBlog(values: UpdateBlogFormSchemaType) {
    try {
        const validatedFields = UpdateBlogFormSchema.safeParse(values);
        if (validatedFields.success) {
            const {id, content, html} = validatedFields.data;
            // console.log('保存', id, content, html)
            const result = await prismadb.blog.update({
                where: {
                    id: id
                },
                data: {
                    content,
                    html
                }
            })
            return {
                success: true,
                message: '保存成功'
            }
        } else {

            return {
                success: false,
                error: validatedFields.error,
            };
        }
    } catch(e) {
        // console.error(e, '一百'); // 使用 console.error 代替 console.log
        return {
            success: false,
            error: e  ,
        };
    }
}

//修改名字
export async function updateBlog(values: UpdateBlogNameType) {
    try {
        const validatedFields = updateBlogName.safeParse(values);
        if (validatedFields.success) {
            const {id, name} = validatedFields.data;
            const result = await prismadb.blog.update({
                where: {
                    id: id
                },
                data: {
                    title: name
                }
            })
            return {
                success: true,
                message: '修改成功'
            }
        }else {
            return {
                success: false,
                error: validatedFields.error,
            };
        }
    }catch {
        return {
            success: false,
            error: '修改失败'
        }
    }
}

//删除
export async function deleteBlog(id: string) {
    try {
        const result = await prismadb.blog.delete({
            where: {
                id: id
            }
        })
        return {
            success: true,
            message: '删除成功'
        }
    }catch {
        return {
            success: false,
            error: '删除失败'
        }
    }
}
