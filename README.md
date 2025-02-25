# Sleekflow Todo Api

1. Clone repository 

   ```bash
   git clone --depth 1 https://github.com/kuthreecar/sleekflow-todo-api.git
   ```

1. Go to folder, and copy `env-example` as `.env`.

   ```bash
   cd sleekflow-todo-api/
   cp env-example .env
   ```

1. Install dependency

   ```bash
   npm install
   ```

1. Run container:

   ```bash
   docker compose up -d postgres redis
   ```

1. Run migrations

   ```bash
   npm run migration:run
   ```

1. Run seeds

   ```bash
   npm run seed:run:relational
   ```

1. Run app in dev mode

   ```bash
   npm run start:dev
   ```

---

1. Generate migration
   

   ```bash
   npm run migration:generate -- src/database/migrations/<name>
   ```

---

1. E2E Test
   ```bash
   npm run test:e2e
   ```
---

1. Swagger
   - http://localhost:3000/docs
   - http://localhost:3000/docs-json

---