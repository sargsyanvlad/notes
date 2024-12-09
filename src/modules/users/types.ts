export const UserRolesMap = {
  ADMIN: 'admin',
  RESTRICTED: 'restricted',
  USER: 'user',
};
export const userRoles = [...Object.values(UserRolesMap)] as const;
export type UserRolesList = (typeof userRoles)[number];
