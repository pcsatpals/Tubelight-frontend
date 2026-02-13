import apiClient from "@/lib/api-client";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const toggleSubscribeChannel = async (channelId: string) => {
    const { data } = await apiClient.post(
        `${API_BASE_URL}/v1/users/subscribe`,
        { channelId }, // Empty body for toggle
    );
    return data;
};