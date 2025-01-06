// "use server"
import {STS} from 'ali-oss';

const config = {
    // 阿里云账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户。
    accessKeyId: 'LTAI5tEsZqoTUHLTRGunky1a',
    accessKeySecret: 'xTh0y9hWUhfo5nKD0g6I8Udecm7gG0',

};

async function getToken() {
    const stsClient = new STS({
        // 从环境变量中获取访问凭证。运行本代码示例之前，请确保已设置环境变量OSS_ACCESS_KEY_ID和OSS_ACCESS_KEY_SECRET。
        accessKeyId: config.accessKeyId,
        accessKeySecret: config.accessKeySecret,
        // bucket: config.bucket,
        // 填写Bucket名称。
    });
    // 指定角色的ARN，格式为acs:ram::$accountID:role/$roleName。
    const STS_ROLE = "acs:ram::1476556516593056:role/ossram";
    const STSpolicy = {
        Statement: [
            {
                Action: ["oss:*"],
                Effect: "Allow",
                Resource: ["acs:oss:*:*:*"],
            },
        ],
        Version: "1",
    };
    const result = await stsClient.assumeRole(
        STS_ROLE,
        STSpolicy,
        3600 // STS过期时间，单位为秒。
    );
    const {credentials} = result;

    return credentials;
}

export async function GET(req: Request) {
    const credentials = await getToken();
    console.log(credentials)
    return new Response(JSON.stringify(credentials));
}
