import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppConfigModule } from './config/module';
import { AuthModule } from './modules/auth/auth.module';
import { exceptionsProvider } from './modules/exceptions';
import { NotesModule } from './modules/notes/notes.module';
import { FileUploadModule } from './modules/upload/upload.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    AppConfigModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URL'),
        dbName: 'notes_db',
      }),
      inject: [ConfigService],
    }),
    NotesModule,
    UsersModule,
    FileUploadModule,
    AuthModule,
  ],
  providers: [...exceptionsProvider],
})
export class AppModule {}
