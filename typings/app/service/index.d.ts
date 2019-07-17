// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg'; // Make sure ts to import egg declaration at first
import Article from '../../../app/service/article';
import User from '../../../app/service/user';

declare module 'egg' {
  interface IService {
    article: Article;
    user: User;
  }
}
