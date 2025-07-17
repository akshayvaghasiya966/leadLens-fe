export interface User {
    name: string;
    email: string;
    role: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
    password: string;
    user_id: string;
    avatar?:string;
}

export type credit={
  credit?: number;
  debit?: number;
}
export interface PaginatedResponse<T> {
  page: number;
  limit: number;
  totalPages: number;
  totalItems: number;
  nextPage: number | null;
  prevPage: number | null;
  data: T[];
}

export interface CreateUserResponse {
  message: string;
  data: User;
}

export interface LoginResponse {
  status: string;
  message: string;
  token: string;
  user: User
}

export interface LoginFormData {
  email: string;
  password: string;
}
export interface ForgotPasswordFormData {
  email: string;
}
export interface ResetPasswordFormData {
  email: string;
  otp:number;
  newPassword: string;
  confirmPassword:string;
}

// Usage for the user list response
export type UserListResponse = PaginatedResponse<User>;
