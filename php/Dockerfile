# PHP Docker image for running Front-End as Apache Vhost
# ======================================================

FROM php:7.4-apache

# Install system packages for PHP extensions recommended for Yii 2.0 Framework
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && \
    apt-get -y install \
        gnupg2 && \
    apt-get update && \
    apt-get -y install \
            g++ \
            git \
            curl \
            imagemagick \
            libcurl3-dev \
            libicu-dev \
            libfreetype6-dev \
            libjpeg-dev \
            libjpeg62-turbo-dev \
            libonig-dev \
            libmagickwand-dev \
            libpq-dev \
            libpng-dev \
            libxml2-dev \
            libzip-dev \
            libldap2-dev \
            zlib1g-dev \
            default-mysql-client \
            openssh-client \
            vim \
            mc \
            unzip \
            libcurl4-openssl-dev \
            libssl-dev \
        --no-install-recommends && \
        apt-get clean && \
        rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN docker-php-ext-install \
        soap \
        zip \
        curl \
        bcmath \
        exif \
        gd \
        iconv \
        intl \
        mbstring \
        ldap \
        opcache \
        pdo_mysql

# Environment settings
ENV COMPOSER_ALLOW_SUPERUSER=1 \
    PHP_USER_ID=33 \
    PHP_ENABLE_XDEBUG=0 \
    PATH=/app:/app/vendor/bin:/root/.composer/vendor/bin:$PATH \
    TERM=linux \
    VERSION_PRESTISSIMO_PLUGIN=^0.3.7 \
    VERSION_XDEBUG=2.9.6


# Add configuration files
COPY image-files/etc/apache2/sites-available/000-default.conf /etc/apache2/sites-available/
COPY image-files/root/.bashrc /root/
COPY image-files/usr/local /usr/local
COPY image-files/var/www /app/web
COPY build /app/web

# Add GITHUB_API_TOKEN support for composer
RUN chmod 700 /usr/local/bin/docker-php-entrypoint \
              /usr/local/bin/composer

# Enable mod_rewrite for images with apache
RUN if command -v a2enmod >/dev/null 2>&1; then \
        a2enmod rewrite headers \
    ;fi

# Application environment
WORKDIR /app
