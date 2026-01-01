import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const toggleVideoLike = async (videoId: string, token?: string) => {
    const { data } = await axios.post(
        `${API_BASE_URL}/v1/like/toggle/video/${videoId}`,
        {}, // Empty body for toggle
        {
            headers: { Authorization: `Bearer ${token}` }
        }
    );
    return data;
};