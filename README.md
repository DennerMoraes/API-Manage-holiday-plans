# API-Manage-holiday-plans

## Introduction

This is the API for the Manage Holiday plans app to work

## Setup

Use the command ```npm install``` to download node_modules

and to run the api use ```node server.js```

## Documentation

The Holiday Planner API provides endpoints for managing holiday-related information, allowing users to create, update, retrieve, and delete data. The data includes details about various holiday events such as titles, dates, locations, participants, and descriptions.

## End Points

### GET /api/data

Fetches all holiday event data.
Response: JSON object containing a message and an array of holiday event data.

### POST /api/data

Inserts new holiday event data.
Request Body: JSON object with details for the new event.
Response: JSON object containing a success message and the inserted data.

### PUT /api/data/:index

Updates holiday event data at a specific index.
Request Params: Index of the event to update.
Request Body: JSON object with updated details.
Response: JSON object with a success message and the updated data.

### DELETE /api/data/:id

Deletes holiday event data by ID.
Request Params: ID of the event to delete.
Response: JSON object with a success message.

### Data Format:
Each holiday event is represented as a JSON object with the following properties:

id: Unique identifier generated using uuidv4.

title: Title of the holiday event.

date: Date of the event.

local: Location of the event.

people: Participants in the event.

description: Description of the event.
