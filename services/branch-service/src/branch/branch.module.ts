import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { BranchController } from './branch.controller';
import { BranchService } from './branch.service';
import { Branch, BranchSchema } from './schemas/branch.schema';
import { User, UserSchema } from './schemas/user.schema';
import { AuthModule } from '@shared/common/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Branch.name, schema: BranchSchema },
      { name: User.name, schema: UserSchema },
    ]),
    HttpModule,
    AuthModule,
  ],
  controllers: [BranchController],
  providers: [BranchService],
  exports: [BranchService],
})
export class BranchModule {}

