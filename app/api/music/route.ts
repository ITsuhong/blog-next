import {NextResponse} from "next/server";
import qqMusic from "qq-music-api"

export async function GET(req: Request) {
    qqMusic.api('search/hot')
        .then((res) => console.log('热搜词：', res))
        .catch(err => console.log('接口调用出错'))//
    return NextResponse.json({
        id: 1
    });
}