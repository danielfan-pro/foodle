FROM ruby:2.7.3

ENV LANG=C.UTF-8 \
    BUNDLER_VERSION=2.3.22 \
    RAILS_ENV=production \
    NODE_ENV=production

RUN apt-get update -qq && \
    apt-get install -y --no-install-recommends \
      build-essential \
      curl \
      git \
      gnupg2 \
      libpq-dev \
      postgresql-client && \
    curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
    apt-get install -y --no-install-recommends nodejs && \
    npm install -g yarn@1.22.22 && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY Gemfile Gemfile.lock ./
RUN gem install bundler -v ${BUNDLER_VERSION} && \
    bundle _${BUNDLER_VERSION}_ config set without "development test" && \
    bundle _${BUNDLER_VERSION}_ install

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 10000

CMD ["bash", "-lc", "bundle exec rake db:migrate && bundle exec rake assets:precompile && bundle exec rails server -b 0.0.0.0 -p ${PORT:-10000}"]
