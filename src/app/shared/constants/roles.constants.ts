export const ROLES = {
  NUTRITIONIST: 'nutritionist',
  MANAGER: 'manager',
  COOK: 'cook',
  DELIVERY: 'delivery',
  CLIENT: 'client',
} as const;

export type RoleType = keyof typeof ROLES;