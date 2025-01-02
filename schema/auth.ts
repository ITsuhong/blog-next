import {z} from 'zod';

export const signInSchema = z.object({
    username: z.string().min(1, {
        message: '用户名不能为空',
    }).default(''),
    password: z.string().min(1, {message: '密码不能少于6位'}).default(''),
});
export const nicknameSchema = z.object({
    nickname: z.string().min(1, {
        message: '用户昵称不能为空',
    }).default(''),
});
export const passwordSchema = z
    .object({
        password: z.string().min(6, {message: '密码不能少于6位'}).default(''),
    })
export type signInSchemaType = z.infer<typeof signInSchema>;
export type nicknameSchemaType = z.infer<typeof nicknameSchema>;
export type passwordSchemaType = z.infer<typeof passwordSchema>;