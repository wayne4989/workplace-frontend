import {DEVELOPMENT} from './development';
import {STAGING} from './staging';
import {PRODUCTION} from './production';

export const CONFIG = {
  development: DEVELOPMENT,
  staging: STAGING,
  production: PRODUCTION,
  environment: process.env.NODE_ENV || 'development'
};
