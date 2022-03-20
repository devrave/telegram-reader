# Docker.

```sh
docker build . -t devrave/telegram-reader

docker run -p 8080:8080 --name telegram-reader devrave/telegram-reader

docker start -a telegram-reader
```
