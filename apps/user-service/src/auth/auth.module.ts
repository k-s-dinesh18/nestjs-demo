import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthUserSchema } from './schemas/authuser.schema';

@Module({
  imports:[
    
    PassportModule.register({defaultStrategy: 'jwt'}),
    MongooseModule.forFeature([{ name: 'AuthUser', schema: AuthUserSchema }])
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
