import { InfiniteData, QueryFunctionContext, useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { getSession } from "next-auth/react";

interface VideoFilters {
    query?: string;
    sortBy?: string;
    sortType?: "asc" | "desc";
    userId?: string;
}

export interface Video {
    _id: string;
    title: string;
    thumbnail: string;
    comments: number;
    channel: {
        avatar: string;
        username: string
    },
    duration: number;
    isLiked: boolean;
    views: number;
    likesCount: number;
    createdAt: string
}

export interface VideoResponse {
    docs: Video[];
    totalDocs: number;
    limit: number;
    page: number;
    totalPages: number;
    hasNextPage: boolean;
    nextPage?: number | null;
}

// 1. Define the fetcher function
const fetchVideos = async ({
    pageParam,
    queryKey
}: QueryFunctionContext<readonly [string, VideoFilters], number>): Promise<VideoResponse> => {
    const session = await getSession();
    const [, filters] = queryKey;
    const { query, sortBy, sortType, userId } = filters;

    const { data } = await axios.get<{ data: VideoResponse }>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/video`, {
        params: {
            page: pageParam,
            limit: 10,
            query,
            sortBy,
            sortType,
            userId,
        },
        headers: {
            Authorization: `Bearer ${session?.accessToken}`
        }
    });

    return data.data;
};

export const useInfiniteVideos = (filters: VideoFilters = {}) => {
    return useInfiniteQuery<
        VideoResponse,
        Error,
        InfiniteData<VideoResponse>,
        readonly [string, VideoFilters],
        number
    >({
        // 'as const' is critical here to match the tuple type
        queryKey: ["videos", filters] as const,
        queryFn: fetchVideos,
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            return lastPage.hasNextPage ? lastPage.page + 1 : undefined;
        },
    });
};