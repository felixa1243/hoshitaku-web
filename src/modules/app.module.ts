import {Module} from '@nestjs/common';
import {AuthModule} from "./auth.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersEntity} from "../entity/users.entity";
import {ConfigModule} from '@nestjs/config'

@Module({
    imports: [TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5000,
        username: 'postgres',
        password: 'postgres',
        database: 'hoshitaku',
        entities: [UsersEntity],
        synchronize: true,
        autoLoadEntities: true
    }), AuthModule,ConfigModule.forRoot()],
    controllers: [],
    providers: [],
})
export class AppModule {
}
