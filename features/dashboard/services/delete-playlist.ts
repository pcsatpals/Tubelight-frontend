import apiClient from "@/lib/api-client";

export const deletePlaylist = async (playlistId: string) => {
    const { data } = await apiClient.delete(
        `/v1/playlist/${playlistId}`,
    );
    return data;
};

