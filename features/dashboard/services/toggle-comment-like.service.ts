import apiClient from "@/lib/api-client";

export async function toggleCommentLike(commentId: string) {
    const { data } = await apiClient.post(`/v1/like/toggle/comment/${commentId}`);
    return data;
}