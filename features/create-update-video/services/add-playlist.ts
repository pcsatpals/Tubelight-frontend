import apiClient from "@/lib/api-client";
import { Playlist } from "../hooks/use-get-playlists";

export const addPlaylist = async (body: { name: string, description: string }): Promise<{ data: Playlist }> => {
    const { data } = await apiClient.post(
        `/v1/playlist`,
        body,
    );
    return data;
};