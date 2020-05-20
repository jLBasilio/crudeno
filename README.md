# CruDeno
Boilerplate for the newest kid in town — `[...'node'].sort().join('')`

### Prerequisites
- [deno](https://deno.land)
- PostgreSQL (10.12)


### Installing
1. Install [deno](https://deno.land/#installation)
2. Install PostgreSQL
3. Create db user `crudeno` with password `1`
4. Create database with `crudeno` as name
5. Execute `./scripts/initdb.sh`. Do `chmod +x` if necessary

All should be fine if the newly-created table `users` can be queried.
