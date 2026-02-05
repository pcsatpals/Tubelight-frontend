import apiClient from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export interface Playlist {
    _id: string;
    name: string;
    description?: string,
    videos: []
}
export const useGetPlaylists = (userId: string) => {
    return useQuery({
        queryKey: ["playlists", userId],
        queryFn: async () => {
            const { data } = await apiClient.get(`/v1/playlist/user/${userId}`);
            return data.data as Playlist[];
        },
        // Only run if the dialog is open AND we have a valid token
        enabled: !!userId
    });
};