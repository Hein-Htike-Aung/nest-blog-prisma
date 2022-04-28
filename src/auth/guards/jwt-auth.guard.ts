import { AuthGuard } from '@nestjs/passport';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

/* 
  Go to jwt.strategy.ts
*/
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
