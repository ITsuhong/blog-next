import type {NextAuthConfig} from 'next-auth';
import Credentials from "@auth/core/providers/credentials";
import {signInSchema} from "@/schema/auth";
import prismadb from '@/lib/prisma';

export default {
    providers: [
        Credentials({
            async authorize(credentials) {
                // console.log('')
                const validatedFields = signInSchema.safeParse(credentials);
                if (validatedFields.success) {
                    const {username, password} = validatedFields.data;
                    const user = await prismadb.user.findUnique({
                        where: {
                            username: username,
                        }
                    });
                    if (user) {
                        if(user.password!==password) {
                            throw new Error('密码不正确');
                        }else{
                            return user;
                        }

                    } else {
                        throw new Error('用户不存在');
                    }
                }
                throw new Error('密码错误');
            }
        })
    ],
} satisfies NextAuthConfig;