import { Module } from '@nestjs/common';
import { AuthsController } from './auths.controller';
import { AuthsService } from './auths.service';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './local.strategy';

@Module({
  controllers: [AuthsController],
  providers: [AuthsService, LocalStrategy],
  imports: [UsersModule],
})
export class AuthsModule {}
