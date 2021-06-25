#!/bin/sh

echo "Changing Nginx default port to ${PORT}"
/usr/bin/envsubst '$PORT' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

echo "Starting Supervisor..."
/usr/bin/supervisord -c /etc/supervisord.conf
