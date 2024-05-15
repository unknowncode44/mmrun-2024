server {
    	listen 80;
    	listen [::]:80;
    	listen 443 ssl;
    	ssl_certificate     /etc/letsencrypt/live/mmrun.hvdevs.com/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/mmrun.hvdevs.com/privkey.pem;

        

        server_name mmrun.hvdevs.com www.mmrun.hvdevs.com;

        location / {
                root /var/www/html/mmrun-2024;
                index index.html index.htm index.nginx-debian.html;
                try_files $uri $uri/ /index.html =404;
        }
}