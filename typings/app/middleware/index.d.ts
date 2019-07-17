// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg'; // Make sure ts to import egg declaration at first
import AuthUser from '../../../app/middleware/auth_user';
import BlockUesr from '../../../app/middleware/block_uesr';
import Gzip from '../../../app/middleware/gzip';
import Response from '../../../app/middleware/response';

declare module 'egg' {
  interface IMiddleware {
    authUser: typeof AuthUser;
    blockUesr: typeof BlockUesr;
    gzip: typeof Gzip;
    response: typeof Response;
  }
}
