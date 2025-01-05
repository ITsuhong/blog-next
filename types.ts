import {Blog, Tag} from "@prisma/client";

export interface IBlog extends Blog {
    tag: Tag
}