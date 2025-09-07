#!/bin/bash

# Database reset script for advisor-backend
# This script resets the EdgeDB database

echo "Resetting EdgeDB database..."

# Stop any running EdgeDB server
gel server stop --force

# Remove the database
gel instance destroy --force

# Recreate the instance
gel instance create

# Apply migrations
gel migrate

echo "Database reset complete!"
