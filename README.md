# Take-Home Coding Assignment: Simple Task List API

A basic GraphQL API server using NodeJS, TypeScript, Yoga GQL, Prisma, and Pothos GraphQL to manage a simple list of tasks.

## Tech Stack

- Node.js
- TypeScript
- Yoga GQL
- Pothos GQL
- Prisma
- Zod

## Getting Started

### Prerequisites

- Node.js
- pnpm or npm
- A Prisma Postgres database

### Clone repository

```bash
git clone https://github.com/<github user>/simple-task-list-api.git

cd simple-task-list-api
```

### Installation

```bash
# pnpm (recommended)
pnpm install

# npm
npm install
```

### Provisioning a Database

This project uses a Prisma Postgres database. Run the following command to create a Prisma database:

```bash
# pnpm
pnpm dlx create-db

# npm
npx create-db
```

Once provisioned, copy the database URL provided by the command.

### Environment Variables

Use the following command to create a local .env file. Then open the new file (.env) to make sure the `DATABASE_URL` value is replaced with the URL of your Prisma Postgres database.

```bash
cp .env.example .env
```

```env
DATABASE_URL="postgres://..."
```

### Database Setup

Run Prisma migrations to set up the database schema:

```bash
# pnpm
pnpm prisma migrate dev

# npm
npx prisma migrate dev
```

### Running the Server

```bash
pnpm dev       # pnpm

npm run dev    # npm
```

The GraphQL endpoint will be available at `http://localhost:4000/graphql`.

## Data Model

### Task

| Field       |
|-------------|
| `id`        |
| `title`     |
| `completed` |
| `createdAt` |
| `updatedAt` | 

## API

### Queries

#### Get all tasks

```graphql
query {
  tasks {
    id
    title
    completed
  }
}
```

#### Get a task by ID

```graphql
query {
  task(id: "TASK_ID") {
    id
    title
    completed
  }
}
```

### Mutations

#### Create a task

```graphql
mutation {
  createTask(title: "Buy groceries") {
    id
    title
    completed
  }
}
```

#### Update a task

```graphql
mutation {
  updateTask(id: "TASK_ID", title: "Buy groceries", completed: true) {
    id
    title
    completed
  }
}
```

#### Delete a task

```graphql
mutation {
  deleteTask(id: "TASK_ID") {
    id
    title
    completed
  }
}
```
