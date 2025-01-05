import encBase64 from 'crypto-js/enc-base64';
import HmacSHA1 from 'crypto-js/hmac-sha1';
import encUtf8 from 'crypto-js/enc-utf8';
export const ossHost="https://img-saas-su.oss-cn-beijing.aliyuncs.com"

// 获取上传文件后缀

export async function getOSSData() {
    const response = await fetch('/api/oss', {
        method: "POST",
    })
    const data = await response.json()
    const policyText = {
        expiration: data.expiration, // 设置policy过期时间。
        conditions: [
            // 限制上传大小。
            ["content-length-range", 0, 10 * 1024 * 1024],
        ],
    };
    const policy = encBase64.stringify(encUtf8.parse(JSON.stringify(policyText))) // policy必须为base64的string。
    // 计算签名。
    function computeSignature(accessKeySecret: string, canonicalString: string) {
        return encBase64.stringify(HmacSHA1(canonicalString, accessKeySecret));
    }

    const signature = computeSignature(data.AccessKeySecret, policy)
    const formData = {
        OSSAccessKeyId: data.AccessKeyId,
        signature,
        policy,
        'x-oss-security-token': data.SecurityToken
    }
    // console.log(formData)
    return formData
}

export const getSuffix = (filename: string) => {
    const pos = filename.lastIndexOf('.')
    let suffix = ''
    if (pos != -1) {
        suffix = filename.substring(pos)
    }
    return suffix;
}

// 上传文件重命名
export const randomString = (len: number) => {
    len = len || 32;
    const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    const maxPos = chars.length;
    let pwd = '';
    for (let i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}