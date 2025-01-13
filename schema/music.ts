import {z} from 'zod';

export const MusicFormSchema = z.object({
    singer: z.string().min(1, {
        message: "请输入歌手名称",
    }),
    name: z.string().min(1, {
        message: '请输入歌曲名称'
    }),
    image: z.string().min(1, {
        message: '请选择图片'
    }),
    url: z.string().min(1, {
        message: '请上传文件'
    })
})

export type MusicFormSchemaType = z.infer<typeof MusicFormSchema>;