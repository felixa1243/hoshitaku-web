export const dbConfig = {
    type:process.env.DB_TYPE,
    port:process.env.DB_PORT,
    host:process.env.DB_HOST,
    username:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
}