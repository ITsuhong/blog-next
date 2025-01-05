import {z} from 'zod';

export const TagFormSchema = z.object({
    name: z.string().min(1, {
        message: "请输入名称",
    }),
    desc: z.string().min(1, {
        message: '请输入描述'
    }),
    image: z.string().min(1, {
        message: '请选择背景'
    })
})

export type TagFormSchemaType = z.infer<typeof TagFormSchema>;