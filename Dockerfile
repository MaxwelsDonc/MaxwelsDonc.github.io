# 使用 github-pages 官方推荐的 Ruby 版本
FROM ruby:2.7

# 安装系统依赖
RUN apt-get update && apt-get install -y \
    build-essential \
    nodejs \
    && rm -rf /var/lib/apt/lists/*

# 设置工作目录
WORKDIR /usr/src/app

# 1. 先只复制 Gemfile 和 Gemfile.lock
COPY Gemfile ./
COPY Gemfile.lock ./

# 2. 安装 bundler 和依赖
RUN gem install bundler -v 2.3.26 && \
    bundle _2.3.26_ install

# 3. 最后复制项目代码
COPY . .

EXPOSE 4000

# 使用 bundle exec 确保使用项目中的 Jekyll 版本
CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0"]