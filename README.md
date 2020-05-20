# CruDeno
Boilerplate for the newest kid in town — `[...'node'].sort().join('')`

### Prerequisites
- [deno](https://deno.land) and [denon](https://deno.land/x/denon)
- PostgreSQL (10.12)


### Installing
1. Install [deno](https://deno.land/#installation) and [denon](https://deno.land/x/denon#install)
2. Install PostgreSQL
3. Create db user `crudeno` with password `1`
4. Create database with `crudeno` as name
5. Execute `./scripts/initdb.sh`. Do `chmod +x` if necessary

All should be fine if the newly-created table `users` can be queried.

### Run
`denon index.ts`

Permissions can be changed under `deno_args` in `.denon.json`
