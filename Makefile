build-server:
	cd server && make build 

build-client:
	cd client && make build

build: build-server build-client

run:
	docker-compose up

stop:
	docker-compose down
	docker rmi api-server:latest
	docker rmi react-app:latest