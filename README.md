# safetynet

Igraj. Uči. Pobjedi. Pokaži svoje znanje i zavladaj SafetyNet kvizom o sigurnosti na Internetu.

## Development

#### Dependencies

- Node.js >=18 and yarn
- PostgreSQL >= 15

#### Run backend

```
cd backend
yarn
yarn start:dev
```

Also make sure to add `DATABASE_URL` in `backend/.env` file and run db migrations:

```
yarn prisma migrate dev
```

#### Run frontend

```
cd frontend
yarn
yarn dev
```

Frontend is now running on <http://localhost:5173/> and backend is running on <http://localhost:3000/>.

## Cookbook

### Generate new icons

change icon in `frontend/assets/logo.png`

```
cd frontend
npx @capacitor/assets generate --iconBackgroundColor '#066490' --splashBackgroundColor '#066490' --android
npx @capacitor/assets generate --iconBackgroundColor '#066490' --splashBackgroundColor '#066490' --ios
```