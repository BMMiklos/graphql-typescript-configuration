# GraphQL - TypeScript - Configuration

## Setting Up Typescript With GraphQL And Express

### Overview

Installing TypeScript, Express and GraphQL, then configuring them with using nodemon.

### Installing Dependecies:

```
npm install typescript express graphql graphql-express --save-dev @tsconfig/node14 @types/express
```

- `@types/express` is for Express to can be use with strict TypeScript
- `@tsconfig/node14` is a recommended TypeScript configuration for Node. See more: [TSConfig Bases](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html#tsconfig-bases)

### Make the development comfortable with Nodemon:

Nodemon is a utility tool that restarts node every time when the file changes.

```
npm install --save-dev nodemon
```

### Configuring .json files

In the `package.json` file we have to set up the starting scripts.

```json
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "serve": "npx nodemon dist/.",
    "build": "npx tsc",
    "tsc:watch": "npx tsc --watch"
  }
```

- `"serve": "npx nodemon dist/."` will make sure that node app is being server from the `dist` directory
- `"build": "npx tsc"` build all of the TypeScript files once, because TypeScript's file file watcher only looks for changes
- `"tsc:watch": "npx tsc --watch"` TypeScript's built in file watcher solution, but only watches for changes, so you have to run `build` command once

In the `tsconfig.json` file, we have to change the following

[TypeScript website about tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)

```json
{
  "extends": "@tsconfig/node14/tsconfig.json",
  "compilerOptions": {
    "strict": false,
    "allowJs": false,
    "outDir": "./dist"
  }
}
```
- `"extends": "@tsconfig/node14/tsconfig.json"` Extends a tsconfig file from `node_modules` directory what we previously installed
- `"strict": true | false` is a TypeScript compiler option, checks if every object has their own type
- `"allowJs": true | false` is a TypeScript compiler option, enables vanilla JS importing
- `"outDir": "./dist"` outDir is the folder where the compiled ts files will be palced, in this case `dist` folder

## Folder Structure

The folder structure for this project is the following, this is just an easy demo project

```
dist                                    # all the compiled ts file are here
index.ts                                # entry file of the application
src                                     # source directory contains every busness logic
 ├───graphql-resolver.ts                # all the resolvers will take place in here
 ├───graphql-schema.ts                  # all the schemas is going to be placed here into one object
 ├───services                           # services directory container
 │   └───user-service                   # handles user related CRUD operations
 │       └───user-service-resolver.ts   # contains UserService class (resolver)
 │       └───user-service-schema.ts     # contains UserService GraphQL schema
 ├───types                              # type definition folder
 │    └───user-type.ts                  # user type definition for ts types
 └───utils                              # folder to contain helper functions
     └───schema-utils.ts                # file loader, builder functions for GraphQL
```
