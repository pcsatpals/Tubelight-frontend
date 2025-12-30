import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const useVideoById = (videoId: string, token: string | undefined, enabled: boolean) => {
    return useQuery({
        queryKey: ["video", videoId],
        queryFn: async () => {
            const { data } = await axios.get(`${API_BASE_URL}/v1/video/${videoId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return data.data;
        },
        // Only run if the dialog is open AND we have a valid token
        enabled: !!videoId && !!token && enabled,
    });
};