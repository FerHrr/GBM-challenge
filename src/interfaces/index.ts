export interface User {
  logged?: boolean;
  displayName?: string | null;
  email?: string | null;
  uid?: string | null;
  isBlocked?: boolean;
  rol?: "Owner" | "Administrator" | "User" | null;
  notificationsRead?: boolean;
  blockedUsers?: BlockedUser[];
  usersList?: User[];
}

interface BlockedUser {
  uid: string;
  name: string;
  email: string;
  isBlocked: boolean;
}
