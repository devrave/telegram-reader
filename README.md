# Docker.

```sh
docker build . -t devrave/telegram-reader
```

```sh
docker run -p 8080:8080 --name telegram-reader devrave/telegram-reader
```

```sh
docker start -a telegram-reader
```
