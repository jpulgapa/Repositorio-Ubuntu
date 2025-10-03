up:
	docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d

down:
	docker compose -f docker-compose.yml -f docker-compose.prod.yml down

stop:
	docker compose -f docker-compose.yml -f docker-compose.prod.yml stop

start:
	docker compose -f docker-compose.yml -f docker-compose.prod.yml start

logs:
	docker compose -f docker-compose.yml -f docker-compose.prod.yml logs -f

ps:
	docker compose -f docker-compose.yml -f docker-compose.prod.yml ps