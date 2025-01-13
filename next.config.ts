import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'img-saas-su.oss-cn-beijing.aliyuncs.com',
            },
            {
                protocol: 'https',
                hostname: 'rick-chou.github.io',
            },
        ]
    }
    /* config options here */
};

export default nextConfig;
