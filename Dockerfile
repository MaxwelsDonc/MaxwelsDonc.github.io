# 1. 基础镜像
FROM ruby:2.7

# =========================================================
# 【关键优化 1】系统源加速 (针对 apt-get)
# 把默认的 deb.debian.org 替换为清华大学镜像源
# =========================================================
RUN sed -i 's/deb.debian.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apt/sources.list && \
    sed -i 's/security.debian.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apt/sources.list

# 2. 安装系统依赖 (这时候速度应该会飞快)
RUN apt-get update && apt-get install -y \
    build-essential \
    nodejs \
    && rm -rf /var/lib/apt/lists/*

# 3. 设置工作目录
WORKDIR /usr/src/app

# 4. 复制 Gemfile (注意：不要复制 Gemfile.lock，之前说过了)
COPY Gemfile ./
# COPY Gemfile.lock ./ 

# =========================================================
# 【关键优化 2】Ruby 依赖加速 (针对 bundle install)
# 移除默认源，添加 Ruby-China 源
# =========================================================
RUN gem sources --add https://gems.ruby-china.com/ --remove https://rubygems.org/ && \
    bundle config mirror.https://rubygems.org https://gems.ruby-china.com/

# 5. 安装依赖
RUN gem install bundler -v 2.3.26 && \
    bundle _2.3.26_ install

# 6. 复制其余代码
COPY . .

# 7. 暴露端口 (包括 Jekyll 默认端口和自动刷新端口)
EXPOSE 4000
EXPOSE 35729

# 8. 启动命令
CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0"]