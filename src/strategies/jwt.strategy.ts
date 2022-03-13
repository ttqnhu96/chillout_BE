import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ENV_CONFIG } from '../shared/services/config.service';
import { AuthPayload } from '../interfaces/auth-payload.interface';

@Injectable()
export class JsonWebTokenStrategy extends PassportStrategy(Strategy, 'jwt-auth') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: ENV_CONFIG.JWT_SECRET_KEY,
    });
  }

  async validate(payload: AuthPayload) {
    return { username: payload.username, id: payload.id };
  }
}
