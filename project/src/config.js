const getBaseUrl = () => {
    if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;
    if (typeof window !== "undefined") {
        // If on Vercel or similar, and no API URL set, guess it's on the same domain
        if (window.location.hostname !== "localhost") {
            return `${window.location.origin}/api`;
        }
    }
    return "http://localhost:3001/api";
};

export const API_URL = getBaseUrl();


// Helper to handle image URLs, fixing legacy "localhost" paths from development
export const resolveImageUrl = (url) => {
    if (!url) return null;
    if (url.includes("localhost:3001")) {
        const backendBase = API_URL.replace("/api", "");
        return url.replace("http://localhost:3001", backendBase);
    }
    return url;
};
