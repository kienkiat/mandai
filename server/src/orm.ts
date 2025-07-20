
import { MikroORM } from '@mikro-orm/core';
import ormConfig from './mikro-orm.config';

let orm: MikroORM | null = null;

export const getOrm = async (): Promise<MikroORM> => {
  if (!orm) {
    orm = await MikroORM.init(ormConfig); 
  }
  return orm;
};
