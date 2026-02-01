# Abelohost App

## Описание

Веб‑приложение на Next.js (React).

## Требования

- Node.js 20+
- npm

## Локальная разработка

```bash
npm install
npm run dev
```

Откройте http://localhost:3000

## Продакшен-сборка

```bash
npm run build
npm start
```

## Запуск через Dockerfile

Сборка образа:

```bash
docker build -t abelohost-app .
```

Запуск контейнера:

```bash
docker run --rm -p 3000:3000 -e NODE_ENV=production abelohost-app
```

Откройте http://localhost:3000

