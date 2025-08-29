
export interface JwtTokens { accessToken: string; refreshToken: string; }
export interface Session {
    user: User | null;
    accessToken: string | null;
}
export interface User{
    id: string,
    username: string,
    role: Role
}

export enum Role{
    User = 1,
    Admin = 2
}