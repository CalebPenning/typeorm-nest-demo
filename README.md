# NestJS + TypeORM Demo: Type-Safe Web Server

This project is a demonstration of how to build a type-safe, scalable REST API using [NestJS](https://nestjs.com/) and [TypeORM](https://typeorm.io/) with PostgreSQL. It showcases how strong typing, modular architecture, and modern tooling can help you quickly build robust web servers with typed database entities.

---

## 🚀 Why NestJS + TypeORM?

- **Type Safety**: End-to-end TypeScript ensures your API, services, and database models are all type-checked.
- **Productivity**: Decorators, dependency injection, and code generation speed up development.
- **Scalability**: Modular structure and strong typing make it easy to extend and maintain.
- **Database Integration**: TypeORM provides seamless mapping between TypeScript classes and SQL tables, with migrations, relations, and more.

---

## 🏗️ What This Demo Does

- Models a simple magazine with **Writers** and **Articles** (one-to-many relationship)
- Exposes RESTful endpoints for CRUD operations on both entities
- Demonstrates how to:
  - Define entities and relationships with TypeORM
  - Use DTOs for type-safe request/response validation
  - Handle errors and edge cases with NestJS patterns

---

## 🗂️ Project Structure

```
src/
  entities/         # TypeORM entity definitions (Writer, Article)
  writers/          # Writers module: controller, service, tests
  articles/         # Articles module: controller, service, tests
  app.module.ts     # Main NestJS module, TypeORM config
  main.ts           # App bootstrap
seed.sql            # SQL to initialize and seed the database
```

---

## 🧑‍💻 Getting Started

1. **Install dependencies**
   ```bash
   yarn install
   # or npm install
   ```
2. **Set up PostgreSQL**
   - Ensure PostgreSQL is running locally
   - (Optional) Use `seed.sql` to create and seed the database:
     ```bash
     psql -U postgres -f seed.sql
     ```
   - Set environment variables as needed (see `src/app.module.ts` for details)
3. **Run the app**
   ```bash
   yarn start:dev
   # or npm run start:dev
   ```
4. **Test the API**
   - Use Postman, curl, or your browser to hit endpoints (see below)
   - Run tests:
     ```bash
     yarn test
     yarn test:e2e
     ```

---

## 📚 API Overview

### Writers

- `GET    /writers` — List all writers (with articles)
- `GET    /writers/:id` — Get a writer by ID
- `POST   /writers` — Create a writer (`{ name, email }`)
- `PATCH  /writers/:id` — Update a writer
- `DELETE /writers/:id` — Delete a writer (cascades to their articles)

### Articles

- `GET    /articles` — List all articles (with writer info)
- `GET    /articles/:id` — Get an article by ID
- `POST   /articles` — Create an article (`{ title, content?, writerId }`)
- `PATCH  /articles/:id` — Update an article
- `DELETE /articles/:id` — Delete an article

#### Example: Create a Writer

```json
POST /writers
{
  "name": "Alice Smith",
  "email": "alice@example.com"
}
```

#### Example: Create an Article

```json
POST /articles
{
  "title": "My First Article",
  "content": "Hello world!",
  "writerId": 1
}
```

---

## 🏆 Benefits of This Approach

- **Type Safety**: Compile-time checks for API, service, and DB layers
- **Clear Relationships**: TypeORM decorators make entity relationships explicit
- **Rapid Prototyping**: Auto schema sync (in dev), easy seeding, and modular code
- **Easy Testing**: Built-in support for unit and e2e tests
- **Extensible**: Add new entities, endpoints, or business logic with minimal boilerplate

---

## 🛠️ Extending the App

- Add new entities: Create a new file in `src/entities/`, update modules as needed
- Add endpoints: Update controllers/services in the relevant module
- Add validation: Use DTOs and class-validator decorators
- Add tests: Place `.spec.ts` files alongside your code

---

## 📖 Further Reading

- [NestJS Documentation](https://docs.nestjs.com/)
- [TypeORM Documentation](https://typeorm.io/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

## License

MIT
