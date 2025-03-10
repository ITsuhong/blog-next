import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    basePath: '/blog',
    output: 'standalone',
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'img-saas-su.oss-cn-beijing.aliyuncs.com'
            }
            // {
            //     protocol: 'https',
            //     hostname: 'rick-chou.github.io',
            // },
        ]
    },
    eslint: {
        ignoreDuringBuilds: true // 忽略 eslint 检查
    },
    typescript: {
        ignoreBuildErrors: true // 忽略 TypeScript 检查
    }
    // webpack: config => {
    //     config.module.rules.push({
    //         test: /\.(tsx|css|json)$/,
    //         use: 'raw-loader'
    //     })
    //     return config
    // }

    /* config options here */
}

export default nextConfig
