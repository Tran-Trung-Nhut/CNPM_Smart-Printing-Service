docker compose up -d
docker exec -i backend-sps-mysql-1 mysql -uroot -p123456 SPS_database < src/config/data.sql