import {z} from "zod";

export const blogFormSchema = z.object({
    name: z.string().min(1, {
        message: "请输入名称",
    }),
})
export const updateBlogName= z.object({
    id: z.string().min(1, {
        message: "id必须",
    }),
    name: z.string().min(1, {
        message: "请输入名称",
    }),
})
export const CreateBlogFormSchema = z.object({
    name: z.string().min(1, {
        message: "请输入名称",
    }),
    tagId: z.string().min(1, {
        message: "tagId必须",
    }),
})
export const UpdateBlogFormSchema = z.object({
    id: z.string().min(1, {
        message: "id必须",
    }),
    content: z.string().min(1, {
        message: "请输入内容",
    }),
    html: z.string().min(1, {
        message: "请输入html",
    }),
})
export type BlogFormSchemaType = z.infer<typeof blogFormSchema>
export type CreateBlogFormSchemaType = z.infer<typeof CreateBlogFormSchema>
export type UpdateBlogFormSchemaType = z.infer<typeof UpdateBlogFormSchema>
export type UpdateBlogNameType = z.infer<typeof updateBlogName>