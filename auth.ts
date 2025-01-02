import NextAuth, {DefaultSession} from "next-auth";
import authConfig from "@/auth.config";
import prismadb from '@/lib/prisma';
import {PrismaAdapter} from "@auth/prisma-adapter";
import {User} from "@prisma/client";


export const {handlers, auth, signIn, signOut} = NextAuth({
    ...authConfig,
    pages: {
        signIn: "/login"
    },
    callbacks: {
        jwt({token, user, trigger, session}) {
            console.log("这是token", token, user, trigger);
            if (trigger === 'update' && session) {
                token = {...token, ...session.user};
            }
            if (trigger === 'signIn') {
                token = {...token, ...user};
            }
            return token;
        },
        async session({token, session, user}) {
            /**
             * 在代码中要想获得用户的数据，来决定显示什么欢迎界面，验证是否登陆，验证用户权限等，都是用过useSession(客户端)或getServerSession(服务端)
             * 来得到session,再从session中获取想到的内容，默认的session只有如下信息：
             * interface DefaultSession {
             *   user?: {
             *     name?: string | null
             *     email?: string | null
             *     image?: string | null
             *   }
             *   expires: ISODateString
             * }
             * 如果我们需要角色信息，就手动从token里面取出来填入
             */
            console.log("获取信息", token)
            session.user = token as any;
            return session;
        },
    },
    adapter: PrismaAdapter(prismadb),
    session: {strategy: 'jwt'},
})