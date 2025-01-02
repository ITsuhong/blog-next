import NextAuth from 'next-auth';
import authConfig from './auth.config';

import {NextResponse} from "next/server";
import {authRoutes} from "@/routes";

const {auth} = NextAuth(authConfig)
export default auth((req) => {
    const {nextUrl} = req;
    const isLoggedIn = !!req.auth?.user;
    const isAuthRoute = nextUrl.pathname.startsWith(authRoutes);
    console.log(req.auth,'登录')
    if (isAuthRoute) {
        if (isLoggedIn) {
            return NextResponse.next();
        }
        return NextResponse.next();
        // return Response.redirect(new URL(`/login`, nextUrl));

    } else {
        return NextResponse.next();
    }
})

export const config = {
    // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};