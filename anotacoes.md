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

* https://www.radix-ui.com/docs/primitives/components/dialog

- [X] npm install @radix-ui/react-dialog 

- [X] npm install @radix-ui/react-popover

- [x] npm install @radix-ui/react-progress

- [X] npm i clsx

# MOBILE

- [X] npx create-expo-app nlwsetup --template 

* Blank(Typescript)

- [X] npx expo install expo-font @expo-google-fonts/inter

* NativeWind

- > https://www.nativewind.dev/quick-starts/expo

- [X] npm i nativewind

- [X] npm i --dev tailwindcss

* Criar o Setup do Tailwind CSS

- [X] npx tailwindcss init

```bash

// tailwind.config.js

module.exports = {
- content: [],
+ content: ["./App.{js,jsx,ts,tsx}", "./<custom directory>/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}

```

- [X] npm i --dev react-native-svg-transformer

- [X] npm i dayjs
 
- > https://oblador.github.io/react-native-vector-icons/

- [X] npm install -g eas-cli  -> subir para expo

* npx expo install expo-system-ui

- [X] npm install @react-navigation/native

- [X] npx expo install react-native-screens react-native-safe-area-context

- [X] npm install @react-navigation/native-stack

