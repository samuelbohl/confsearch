## Deploy new Version
inside the deployed VM in the confsearch directory:

```
git pull
```

Then build and run the new version:

```
docker-compose up -d --no-deps --build app
```