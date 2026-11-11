# Running the backend locally

PostgreSQL runs in Docker. The Spring Boot backend runs on your machine with Maven Wrapper. You can use the API without starting the frontend.

The commands below target Windows PowerShell. The **repository root** is the directory containing `compose.yaml`, `backend/`, and `frontend/`.

## 1. Prerequisites

- **JDK 25**, matching `java.version` in [pom.xml](pom.xml). Set `JAVA_HOME` to your JDK directory.
- **Docker Desktop** running Linux containers, with Docker Compose v2.
- Available ports **5432** for PostgreSQL and **8080** for the backend. Stop a local PostgreSQL service if it occupies port 5432.
- Internet access on the first run to download the Docker image, Maven, and dependencies. A separate Maven installation is not required.

Check your tools:

```powershell
java -version
javac -version
docker --version
docker compose version
```

## 2. Configure the database

From the **repository root**, run this only if `.env` does not exist:

```powershell
Copy-Item .env.example .env
```

Keep an existing `.env` to preserve your current settings. Edit the file with your local configuration:

```dotenv
DB_HOST=localhost
DB_PORT=5432
DB_NAME=worldcup
DB_USER=worldcup
DB_PASSWORD=replace-with-your-local-password
```

Replace the password placeholder before starting PostgreSQL. `.env` is ignored by Git; share only the example file without real credentials.

Docker Compose reads the root `.env` to initialize PostgreSQL. Spring Boot also imports it when launched from `backend/` or the repository root. You do not need to load these values into PowerShell manually. Corresponding environment variables set in your terminal or IDE can override the file values.

## 3. Start PostgreSQL

From the **repository root**:

```powershell
docker compose up -d --wait postgres
docker compose ps
```

Wait for the `postgres` service to become `healthy`. Default connection settings:

| Setting | Value |
| --- | --- |
| Host | `localhost` |
| Port | `5432` |
| Database | `worldcup` |
| Username | `worldcup` |
| Password | `DB_PASSWORD` from `.env` |

If the container fails to start or become healthy, inspect its logs from the repository root:

```powershell
docker compose logs --tail 100 postgres
```

## 4. Start the backend

From the **repository root**:

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

Keep this terminal open. Successful startup includes `Started WorldCupAnalyticsApplication` and web server information for port 8080. The default base URL is `http://localhost:8080`.

During startup:

1. Spring Boot connects to PostgreSQL.
2. Flyway applies pending migrations from `src/main/resources/db/migration/`.
3. Hibernate checks the entity mappings against the schema using `ddl-auto=validate`.
4. The web server starts accepting requests.

On a fresh database, Flyway applies V1, V2, and V3. Later starts apply only pending migrations. The files in `src/main/resources/db/migration/` are the source of truth for the schema. Do not create the schema manually, edit an applied migration, or switch to `ddl-auto=update`.

Running tests is a separate step and is not required before each server start.

## 5. Try the tournament endpoint

With the backend running, open this URL in a browser or Postman:

```text
http://localhost:8080/api/tournaments/year/2026
```

Alternatively, open a **second terminal**:

```powershell
curl.exe -i http://localhost:8080/api/tournaments/year/2026
```

Expected behavior:

- **200** with a `TournamentResponse` JSON body when the tournament exists.
- **404** with a `ProblemDetail` body when it does not exist, including `Tournament not found for year: 2026`.

Migrations create the schema; they do not download or import the dataset. A fresh database returns 404 until you add records. The year in this example is a path variable; the API supports querying different editions.

Sample seed scripts and an automatic CSV importer are not included in this repository. To receive a successful lookup response, the configured database must contain a tournament record for the requested year.

There is no controller for `/`, so opening the base URL alone can also return 404. Use the full endpoint above.

## 6. Inspect the database

From the **repository root**, using the default database and username:

```powershell
docker compose exec postgres psql -U worldcup -d worldcup
```

If you changed `DB_USER` or `DB_NAME`, replace those arguments accordingly. Inside `psql`:

```sql
-- List public tables.
\dt public.*

-- Inspect migrations after the backend has started successfully.
SELECT version, description, success
FROM public.flyway_schema_history
ORDER BY installed_rank;

-- Inspect tournament records.
SELECT * FROM public.tournaments;
```

Enter `\q` to exit. DBeaver or pgAdmin can also connect using the values in `.env`.

## 7. Stop and restart

Press **Ctrl + C** in the Spring Boot terminal to stop the backend.

From the **repository root**, stop PostgreSQL:

```powershell
docker compose stop postgres
```

For your next session, from the repository root:

```powershell
docker compose up -d --wait postgres
cd backend
.\mvnw.cmd spring-boot:run
```

The named volume `postgres_data` preserves data across container restarts, `stop`, and normal `docker compose down`. **Do not add `-v` when you want to keep your data**: that option deletes the database volume.

Volumes are local to each machine and do not sync through Git. Another machine needs its own `.env` and database; sharing records requires a separate import or restore step.

## 8. Troubleshooting

| Symptom | What to check |
| --- | --- |
| Docker cannot connect to its daemon | Open Docker Desktop and wait for the engine to become ready. |
| Port 5432 is already in use | Stop the local PostgreSQL service or other container occupying the port. |
| Database connection refused | Check `docker compose ps`, container health, `DB_HOST`, and `DB_PORT`. |
| Password authentication failed | Check `.env` and terminal/IDE environment variables. An existing volume retains its original database credentials. |
| Changing `.env` does not change database accounts | Database name, username, and password initialize a fresh volume only. Editing `.env` does not update an existing database. Do not delete a volume containing data you need. |
| Java release is unsupported or Java cannot be found | Check JDK 25, `JAVA_HOME`, and `PATH`; reopen your terminal after changing them. |
| Port 8080 is already in use | Stop the process or previous backend instance using it. |
| Flyway reports a checksum or schema mismatch | Inspect the exact error and migration history. Do not edit applied migrations or run `clean` to bypass the issue. |
| Tournament endpoint returns not found | Check whether a record exists for that year. A fresh database is not seeded. |

When using an IDE Run button, set the working directory to the repository root or `backend/` so Spring can find `.env`. Other working directories require explicit database environment variables.
