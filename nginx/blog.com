server {
        listen 80;	      
	    root /var/www/Blog;
        server_name localhost:8081;
        #La ruta inicial cargará index.html 
	    location / {
            try_files $uri $uri/ /index.html;
            error_page 404 /index.html;
        }
        error_log /var/log/nginx/blog_error.log;
        access_log /var/log/nginx/blog_access.log;
}