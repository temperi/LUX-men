
export interface AdminUser {
  id: string;
  email: string;
}

export type AdminData = {
  id: string;
}

export type UserData = {
  users: {
    id: string;
    email: string | null;
  }[];
}
