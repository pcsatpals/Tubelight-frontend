// The user who authored the comment
export interface Commentor {
    _id: string;
    username: string;
    fullName: string;
    avatar: string;
}

// The individual comment object
export interface Comment {
    _id: string;
    content: string;
    likes: number;
    video: string;
    isLiked: boolean;
    commentor: Commentor;
    createdAt?: string; // Often included in MongoDB responses
    updatedAt?: string;
}

// The full paginated response from your API
export interface CommentsResponse {
    docs: Comment[];
    totalDocs: number;
    limit: number;
    page: number;
    totalPages: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
}