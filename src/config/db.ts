import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersEntity} from "../entity/users.entity";
import {dbConfig} from "../utils/constants";

export default TypeOrmModule.forRoot({
    type: 'postgres',
    host: dbConfig.host,
    port: parseInt(dbConfig.port),
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    entities: [UsersEntity],
    synchronize: true,
    autoLoadEntities: true
})