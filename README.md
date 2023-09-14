# Plan Together

This is a [Next.js](https://nextjs.org/) project bootstrapped
with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Run the project

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## Run the local db

The local database is set up with docker for interoperability's sake.

To run it locally, do these commands:

```bash
$ docker-compose up -d 
#runs docker, might pull an image before

$ npx prisma migrate dev 
#to push the schema into the database

$ npx prisma db seed 
#to populate database with fake data
```