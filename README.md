## Technologies

- NestJS
- Typescript

## How to run

1. Clone this repository
```bash
git clone https://github.com/rodnei0/HubLocal-API
```

2. Install dependencies
```bash
npm i
```

3. Create a .env file
```bash
DATABASE_URL='postgresql://{USER}:{PASSWORD}@localhost:{PORT}/{DATABASE}?schema=public'
JWT_SECRET='senhasupersecreta'
PORT='5000'
```

3. Run the app with
```bash
npm start
```

4. You can optionally seed and truncate de database:
```bash
npm run db:seed
npm run db:truncate
```
