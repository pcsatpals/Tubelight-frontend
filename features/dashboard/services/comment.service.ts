"use server"

import apiClient from "@/lib/api-client";
import axios from "axios";
import { CommentsResponse } from "../types/comment.types";
// Your server-side logic to get session token

const API_URL = process.env.API_BASE_URL;

export async function getCommentsAction({ videoId, pageParam = 1 }: { videoId: string, pageParam?: number }): Promise<CommentsResponse> {
    try {
        const { data } = await apiClient.get(`${API_URL}/v1/comments/${videoId}?page=${pageParam}&limit=10`);
        // Return a success object
        return data.data; // This returns the whole object with docs, nextPage, etc.
    } catch (error) {
        console.log(error)
        let errorMessage = "An unexpected error occurred";

        if (axios.isAxiosError(error)) {
            errorMessage = error.response?.data?.message || error.message;
        } else if (error instanceof Error) {
            errorMessage = error.message;
        }
        console.error(errorMessage);
        throw new Error(errorMessage);
    }
}

export async function postCommentAction(videoId: string, content: string) {
    // Logic to post comment to backend
    try {
        const { data } = await axios.post(`${API_URL}/v1/comments/${videoId}`, { content });
        return data.data;
    } catch (error) {
        let errorMessage = "An unexpected error occurred";

        if (axios.isAxiosError(error)) {
            errorMessage = error.response?.data?.message || error.message;
        } else if (error instanceof Error) {
            errorMessage = error.message;
        }
        console.error(errorMessage);
        throw new Error(errorMessage);
    }
}