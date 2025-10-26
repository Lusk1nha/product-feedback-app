import { users } from './users.schema';
import { feedbacks } from './feedbacks.schema';
import { roles, roleType } from './roles.schema';
import { permissions, permissionType } from './permissions.schema';

export const schema = {
  users,
  feedbacks,
  roles,
  permissions,
};

export const types = {
  roleType,
  permissionType,
};

export type DatabaseSchema = typeof schema;
export type DatabaseTypes = typeof types;