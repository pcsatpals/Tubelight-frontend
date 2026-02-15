import { jwtDecode } from "jwt-decode";
import { User } from "next-auth"; // Use your augmented type

// Define the shape of your Backend Response
interface BackendUser {
    _id?: string;
    id?: string;
    fullName?: string;
    name?: string;
    email: string;
    avatar?: string;
    image?: string;
    coverImage?: string;
    username?: string;
}

interface BackendTokens {
    accessToken: string;
    refreshToken: string;
}

export const formatUserSession = (userData: BackendUser, tokens: BackendTokens): User => {
    const decoded = jwtDecode<{ exp: number }>(tokens.accessToken);
    return {
        id: (userData._id || userData.id) as string,
        fullName: (userData.fullName || userData.name) as string,
        email: userData.email,
        avatar: (userData.avatar || userData.image) as string,
        username: userData.username,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        accessTokenExpires: decoded.exp * 1000,
        coverImage: userData.coverImage
    };
};