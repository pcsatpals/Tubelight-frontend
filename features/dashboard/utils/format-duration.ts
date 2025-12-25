export const formatDuration = (duration: string | number | undefined): string => {
    if (!duration) return "0:00";

    // Convert to string in case it's a number (like 18.12)
    const durationStr = String(duration);

    // If it's a simple number with decimals (e.g., 18.12), we treat it as seconds
    if (!durationStr.includes(':')) {
        const totalSeconds = Math.floor(parseFloat(durationStr));
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    // If it contains colons (e.g., 01.12.34 or 01.10.40.30)
    // We split by dots or colons depending on your DB separator
    const parts = durationStr.split(/[.:]/);

    // Remove the milliseconds (the last part if it's high precision)
    // or keep it simple based on the length
    if (parts.length > 2) {
        // If it's HH:MM:SS:ms, we usually just want HH:MM:SS
        // This handles your 01.10.40.30 -> 1:10:40
        return parts.slice(0, -1).join(':').replace(/^0+/, '') || "0";
    }

    return durationStr;
};