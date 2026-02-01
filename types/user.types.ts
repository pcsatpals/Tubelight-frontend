export interface User {
    id: string;
    token: string;
    refreshToken: string;
    expiresIn: number;
    avatar: string;
    coverImage?: string
} 