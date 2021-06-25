FROM php:8.0.6-fpm

RUN apt-get update && apt install -y \
    libzip-dev libxml2-dev libpng-dev \
    nginx nano cron git unzip supervisor \
    gettext \
    libpq-dev \
    && curl -sL https://deb.nodesource.com/setup_14.x -o nodesource_setup.sh \
    && bash nodesource_setup.sh \
    && apt install nodejs \
    && rm -r /var/lib/apt/lists/*

RUN docker-php-ext-install \
    zip calendar dom gd \
    intl pcntl bcmath \
    pdo_pgsql

ENV APP_HOME /var/www/html/app
ENV LARAVEL /var/www/html/app/laravel
ENV REACTJS /var/www/html/app/reactjs

WORKDIR $APP_HOME

#install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin/ --filename=composer

COPY ./docker/supervisord.conf /etc/supervisord.conf
COPY ./docker/nginx.conf /etc/nginx/nginx.conf.template
COPY ./docker/www.conf /usr/local/etc/php-fpm.d/www.conf
COPY ./docker/php.ini /usr/local/etc/php/php.ini

WORKDIR $LARAVEL

COPY ./laravel/composer.json composer.json

RUN composer install --no-interaction --ignore-platform-reqs --no-autoloader && rm -rf /root/.composer

WORKDIR $APP_HOME

COPY . $APP_HOME

WORKDIR $LARAVEL

RUN composer dump-autoload --no-scripts --optimize

# clear laravel cache
RUN php artisan config:cache && php artisan config:clear && php artisan cache:clear && php artisan event:cache

WORKDIR $REACTJS

RUN npm install && npm run build && npm cache clean --force

#change ownership of our applications
RUN chown -R www-data:www-data $LARAVEL
RUN chown -R www-data:www-data $REACTJS/build

WORKDIR $APP_HOME

COPY ./docker/docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh

CMD ["/docker-entrypoint.sh"]
