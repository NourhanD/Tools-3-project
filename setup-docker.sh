#!/bin/bash

# Run the docker build command
echo "Building Docker images..."
docker-compose up --build 

# Wait for a few seconds to ensure the containers are up
sleep 10

# Copy the db.sql file to the database container (adjust the path accordingly)
echo "Copying db.sql to PostgreSQL container..."
docker cp db.sql tools-3-project-main-db-1:/db.sql

# Execute the db.sql file inside the database container
echo "Executing schema.sql inside PostgreSQL container..."
docker docker exec -it tools-3-project-main-db-1 bash -c "psql -U postgres -d Project_Tools3"

# Other commands you might need...
echo "Setup completed!"
