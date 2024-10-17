# Earthquakes Test

`Note: There is no monorepo with MX or pmpm`

## How to run

### 1. Start docker containers

```sh
make run
```

### 2. Deploy database

```sh
make migrate-deploy
```

### 3. Seed database from CSV

```sh
make seed
```

Note: CSV file stored locally in `./backend/data` folder

### 4. Open frontend in browser

[http://localhost:3000/earthquakes](http://localhost:3000/earthquakes)

### Note:

`Backend use port 4000 and frontent use port 3000. Make sure you have this ports on host machine unused!`

## How to stop

### Temporally

```sh
make stop
```

### Permanently with cleanup containers/volumes

```sh
make down
```
