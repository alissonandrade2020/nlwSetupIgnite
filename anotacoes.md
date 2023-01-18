PROJETO

# SERVER

- [X] npm i

- [X] npm i fastify

- [X] npm i typescript -D

* npx tsc --init

- target 2020

- [X] npm i tsx -D

- [X] npm i -D prisma
- [X] npm i @prisma/client

* npx prisma init --datasource-provider SQLITE

* npx prisma migrate dev

* npx prisma studio

- [X] npm i @fastify@cors

- [X] https://www.npmjs.com/package/prisma-erd-generator

- [X] npm i -D prisma-erd-generator @mermaid-js/mermaid-cli

* Add to your schema.prisma

generator erd {
  provider = "prisma-erd-generator"
}

-> npx prisma generate

* npx prisma db seed

ou

* npx prisma migrate reset 


- [X] npm i zod

- [X] npm i dayjs

# WEB

- [X] yarn create @vitejs/app my-project

- rfc

- [X] npm i -D tailwindcss postcss autoprefixer

# MOBILE

- [X] npx create-expo-app nlwsetup --template 

* Blank(Typescript)

- [X] npx expo install expo-font @expo-google-fonts/inter

