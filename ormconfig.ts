// import * as dotenv from 'dotenv';
// import { CoreModule } from 'src/core/core.modules';
// import { ConnectionOptions } from "typeorm"

// dotenv.config({
//     path: `.env`,
// });

// const config = {
//     host: process.env.DB_HOST,
//     port: Number(process.env.DB_PORT),
//     username: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE
// }

// const connectionOptions: ConnectionOptions = {
//     type: 'mysql',
//     host: config.host,
//     port: config.port,
//     username: config.username,
//     password: config.password,
//     database: config.database,
//     entities: ["dist/src/core/entities/**/*.entity{.ts,.js}"],
//     migrations: ["dist/src/migrations/*{.ts,.js}"],
//     synchronize: false,
//     migrationsRun: true,
//     logging: true,
//     cli: {
//         migrationsDir: 'src/migrations'
//     }
// }

// export = connectionOptions


import * as dotenv from 'dotenv';

if (!(<any>module).hot /* for webpack HMR */) {
    process.env.NODE_ENV = process.env.NODE_ENV || 'development';
}

dotenv.config({
    path: `.${process.env.NODE_ENV}.env`,
});


module.exports = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: ['src/core/entities/**/*.entity{.ts,.js}'],
    migrations: ['src/migrations/*{.ts,.js}'],
};