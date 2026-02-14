import apiClient from "@/lib/api-client";

export const deleteVideo = async (videoId: string) => {
    const { data } = await apiClient.delete(
        `/v1/video/${videoId}`,
    );
    return data;
};