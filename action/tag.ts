"use server"

import {TagFormSchema, TagFormSchemaType} from "@/schema/tag";
import prismadb from '@/lib/prisma';

export async function createTag(values: TagFormSchemaType) {
    try {
        const validatedFields = TagFormSchema.safeParse(values);
        if (validatedFields.success) {
            const {name, desc, image} = validatedFields.data;
            const result = await prismadb.tag.create({
                data: {
                    name,
                    desc,
                    bg_img: image
                }
            });
            return {
                success: true,
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
            error: '创建失败'
        }
    }

}

export async function getTags() {
    try {
        //按照创建时间排序
        return await prismadb.tag.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
    } catch (error) {
        console.log("报错", error);
        throw error;
    }
}

//根据id获取
export async function getTagById(id: string) {
    try {
        return await prismadb.tag.findUnique({
            where: {
                id: id
            }
        });
    } catch (error) {
        console.log("报错", error);
        throw error;
    }
}