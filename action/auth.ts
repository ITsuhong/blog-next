"use server"

import {signIn, signOut} from "@/auth";
import {AuthError} from "next-auth";
import {signInSchemaType} from "@/schema/auth";

export async function login(values: signInSchemaType) {

    try {
        await signIn('credentials', {
            ...values,
            redirect: false,
            // callbackUrl: '/'
        })

    } catch (error) {
        if (error instanceof AuthError) {
            return error.cause?.err?.message;
        }
    }

}

export async function logout() {
    try {
        await signOut({
            redirect: false,
        });
    } catch (error) {
        console.log("报错", error);
        throw error;
    }

}