import { Playlist } from "@/features/dashboard/hooks/use-infinite-videos";
import { InfiniteData, QueryFunctionContext, useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { getSession } from "next-auth/react";

interface PlaylistFilters {
    query?: string;
    sortBy?: string;
    sortType?: "asc" | "desc";
    userId?: string;
}


export interface PlaylistResponse {
    docs: Playlist[];
    totalDocs: number;
    limit: number;
    page: number;
    totalPages: number;
    hasNextPage: boolean;
    nextPage?: number | null;
}

// 1. Define the fetcher function
const fetchPlaylists = async ({
    pageParam,
    queryKey
}: QueryFunctionContext<readonly [string, PlaylistFilters], number>): Promise<PlaylistResponse> => {
    const session = await getSession();
    const [, filters] = queryKey;
    const { query, sortBy, sortType, userId } = filters;

    const { data } = await axios.get<{ data: PlaylistResponse }>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/playlist`, {
        params: {
            page: pageParam,
            limit: 10,
            q: query,
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

export const useInfinitePlaylists = (filters: PlaylistFilters = {}) => {
    return useInfiniteQuery<
        PlaylistResponse,
        Error,
        InfiniteData<PlaylistResponse>,
        readonly [string, PlaylistFilters],
        number
    >({
        // 'as const' is critical here to match the tuple type
        queryKey: ["playlists", filters] as const,
        queryFn: fetchPlaylists,
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            return lastPage.hasNextPage ? lastPage.page + 1 : undefined;
        },
    });
};