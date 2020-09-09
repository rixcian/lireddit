## Setup New Nodejs Typescript Project
---

Initialize new project
- `npm init -y`

Add support for typescript
- `yarn add -D @types/node typescript`

Add "watch" script into package.json file,
which will watching all the ts files and automatically recompiles it.
- `"watch": "tsc -w"`

Add "dev" script into package.json file
- `"dev": "nodemon dist/index.js"`

Install and setup postgresql
- https://linuxize.com/post/how-to-install-postgresql-on-ubuntu-20-04/

Change password for default postgres user
- https://stackoverflow.com/questions/12720967/postgresql-how-to-change-postgresql-user-password

Install pgAdmin & create lireddit database
- https://computingforgeeks.com/how-to-install-pgadmin-4-on-ubuntu/

Set credentials to pgAdmin
- **Email:** postgres@localhost
- **Password:** postgres

Install Redis
- https://linuxize.com/post/how-to-install-and-configure-redis-on-ubuntu-20-04/