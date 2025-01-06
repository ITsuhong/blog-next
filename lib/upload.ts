import OSS from 'ali-oss';
import {getBaseUrl} from './utils';

export async function aliyunOssUpload(file: any, dir: string) {
    const fileName = file.name;

    const res = await fetch(`${getBaseUrl()}/api/oss`, {
        cache: 'no-store',
    });
    const stsResult = await res.json();

    const client = new OSS({
        // yourRegion填写Bucket所在地域。Region填写为oss-cn-hangzhou。
        region: 'oss-cn-beijing',
        accessKeyId: stsResult.AccessKeyId,
        accessKeySecret: stsResult.AccessKeySecret,
        stsToken: stsResult.SecurityToken,
        // 填写Bucket名称。
        bucket: 'img-saas-su',
        refreshSTSToken: async () => {
            const res = await fetch(`${getBaseUrl()}/api/oss`, {
                cache: 'no-store',
            });
            const stsResult = await res.json();
            return {
                accessKeyId: stsResult.AccessKeyId,
                accessKeySecret: stsResult.AccessKeySecret,
                stsToken: stsResult.SecurityToken,
            };
        },
    });

    const timestamp = new Date();

    // 为保证唯一性，通过uuid将文件名替换
    const uuid = timestamp.getTime() + fileName.substring(fileName.lastIndexOf('.'));
    const result = await client.put(`${dir}/${uuid}`, file);

    return `${process.env.NEXT_PUBLIC_OSS_URL}/${result.name}`;
}
