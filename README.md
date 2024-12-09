# Notes Management System

## Overview

This project is a Notes Management System built using TypeScript and the NestJS framework. It allows users to create, read, update, and delete notes. The system includes role-based access control to manage visibility and permissions for different user roles.

## Prerequisites
- Node.js v20.x
- Docker
- npm
- MongoDB

## Features

- Create, read, update, and delete notes
- Role-based access control
- Spell check service integration
- MongoDB for data storage

## Technologies Used

- TypeScript
- NestJS
- MongoDB
- Mongoose
- npm
- Docker


## Project Structure

```
src/
├── modules/
│   ├── notes/
│   │   ├── notes.controller.ts
│   │   ├── notes.module.ts
│   │   ├── notes.schema.ts
│   │   ├── notes.service.ts
│   │   ├── notes.config.ts
│   │   ├── types.ts
│   ├── spellcheck/
│   │   ├── spellcheck.module.ts
│   │   ├── spellcheck.service.ts
│   ├── auth/
│   │   ├── auth.guard.ts
│   │   ├── auth.module.ts
│   │   ├── jwt.service.ts
│   │   ├── jwt.strategy.ts
│   │   ├── types.ts
│   ├── users/
│   │   ├── users.controller.ts
│   │   ├── users.module.ts
│   │   ├── users.service.ts
│   │   ├── types.ts
│   ├── file-storage/
│   │   ├── file-storage.module.ts
│   │   ├── providers/
│   │   │   ├── aws-s3.provider.ts
│   │   │   ├── local-storage.provider.ts
│   ├── upload/
│   │   ├── upload.controller.ts
│   │   ├── upload.module.ts
│   │   ├── upload.service.ts
├── main.ts
├── app.module.ts
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sargsyanvlad/notes-management-system.git
   cd notes-management-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the necessary environment variables or
   Copy the .env.example to .env and update the values as per your requirements. 
   **To use a local machine as a file storage, set the `STORAGE_TYPE` variable to `local`.**


4. Run the application:
   ```bash
   npm run build
   npm run start
   ```
5. Run the application in development mode:
   ```bash
   npm run start:dev
   ```


## Running the Service in Docker
### Using Docker

1. Build and run the Docker container:
   ```sh
   docker-compose up --build
   ```
2. The service will be available at `http://localhost:3000`.

## Swagger Documentation

The service uses Swagger for API documentation. Swagger provides a user-friendly interface to explore and test the API endpoints.

### Accessing Swagger UI

Once the service is running, you can access the Swagger UI at the following URL:
```
http://localhost:3000/docs
```

## Role-Based Access Control

The system supports different user roles with varying levels of access. The visibility and permissions are managed based on the user's role.


## Contact

For any questions or inquiries, please contact the project maintainer at [sargsyanvlad](https://github.com/sargsyanvlad).
