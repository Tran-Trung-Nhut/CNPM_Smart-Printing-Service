
docker compose up -d
docker compose down
docker exec -i backend-sps-mysql-1 mysql -uroot -p123456 SPS_database < src/config/data.sql
docker exec -it backend-sps-mysql-1  mysql -u root -p




