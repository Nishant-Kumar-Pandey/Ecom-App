export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

// Helper to handle image URLs, fixing legacy "localhost" paths from development
export const resolveImageUrl = (url) => {
    if (!url) return null;
    if (url.includes("localhost:3001")) {
        const backendBase = API_URL.replace("/api", "");
        return url.replace("http://localhost:3001", backendBase);
    }
    return url;
};
