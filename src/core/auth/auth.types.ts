export interface JwtTokens { accessToken: string; refreshToken: string; }
export interface Session {
    user: User | null;
    accessToken: string | null;
    accessExp: number | null;
}
export interface User{
    id: string,
    username: string,
    roles: string[]
}