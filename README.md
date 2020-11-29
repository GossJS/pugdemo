# PugDemo

Неделя 8, урок 7

Эта ветка https отличается от главной только тем, что в файле index.js самостоятельно прослушиваются порты 80 и 443, т.е. этот вариант не зависит от NGINX.

```JavaScript

    http.Server(app).listen(80);
    const options = {
        key: fs.readFileSync( '/etc/letsencrypt/live/.../privkey.pem'),
        cert: fs.readFileSync( '/etc/letsencrypt/live/.../fullchain.pem')
    };
    https.Server(options, app).listen(443);
    
```
