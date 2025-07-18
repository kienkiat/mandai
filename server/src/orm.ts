// src/utils/orm.ts

import { MikroORM } from '@mikro-orm/core';
import ormConfig from './ormconfig';

let orm: MikroORM | null = null;

// Reusable instance of MikroORM
export const getOrm = async (): Promise<MikroORM> => {
  if (!orm) {
    orm = await MikroORM.init(ormConfig); // initialize ORM with config if not already initialized
  }
  return orm;
};
