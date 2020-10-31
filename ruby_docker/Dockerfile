# FROM ruby:2.5
# WORKDIR /usr/src/app
# RUN apt-get update -yqq
# RUN apt-get install -yqq
# - no-install-recommends nodejs
# RUN git config - global user.name "My name" && \
#    git config - global user.email user@example.com
# throw errors if Gemfile has been modified since Gemfile.lock
# RUN bundle config - global frozen 1
# COPY Gemfile Gemfile.lock ./
# RUN bundle install

# COPY . .
# CMD ["/your-daemon-or-script.rb"]

FROM ruby:2.5

# throw errors if Gemfile has been modified since Gemfile.lock
RUN bundle config --global frozen 1

WORKDIR /usr/src/app

COPY Gemfile Gemfile.lock ./
RUN bundle install

COPY . .

CMD ["./your-daemon-or-script.rb"]