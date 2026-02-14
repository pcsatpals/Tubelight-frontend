import apiClient from "@/lib/api-client";

export const toggleVideoLike = async (videoId: string) => {
    const { data } = await apiClient.post(
        `/v1/like/toggle/video/${videoId}`,
        {}, // Empty body for toggle
    );
    return data;
};