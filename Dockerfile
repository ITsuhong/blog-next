# 1. 构建基础镜像
FROM node AS base

ENV NODE_ENV=production \
  APP_PATH=/app

WORKDIR $APP_PATH

# 使用国内镜像，加速下载安装（可选）
RUN npm config set registry https://registry.npm.taobao.org

# 复制 package.json 和 yarn.lock
COPY package.json yarn.lock ./

# 安装项目依赖
RUN yarn install

# 复制应用代码
COPY . .

# 复制 .env 文件
COPY .env ./

# 生成 Prisma Client
RUN npx prisma generate

# 构建项目
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]