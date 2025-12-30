import { formatDistanceToNow } from "date-fns";

export const formatViews = (views: number = 0) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
};

export const formatTimeAgo = (date: string | Date) => {
    if (!date) return "";
    return formatDistanceToNow(new Date(date), { addSuffix: true }).replace("about ", "");
};