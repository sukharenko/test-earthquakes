start:
	docker-compose -f "docker-compose.yaml" up -d

stop:
	docker-compose -f "docker-compose.yaml" down

down:
	docker-compose -f "docker-compose.yaml" down --remove-orphans --volumes

restart:
	docker-compose -f "docker-compose.yaml" down
	docker-compose -f "docker-compose.yaml" up -d

rebuild:
	docker-compose -f "docker-compose.yaml" down
	docker-compose -f "docker-compose.yaml" up -d --build

logs:
	docker-compose -f "docker-compose.yaml" logs -f

shell:
	docker exec -it eq-backend sh

migrate-deploy:
	docker exec -it eq-backend npx --yes prisma migrate deploy

seed:
	docker exec -it eq-backend ts-node prisma/seed.ts
