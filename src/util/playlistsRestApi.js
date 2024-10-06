const PLAYLISTS_URL = 'http://localhost:5000/playlists'

export const addPlaylistsApi = async (newNewPlayList) => {
    try {
        const response = await fetch(PLAYLISTS_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newNewPlayList),
        });
        if (!response.ok) throw new Error("Failed to add playlist");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getPlaylistsApi = async () => {
    try {
        const response = await fetch(PLAYLISTS_URL);
        if (!response.ok) throw new Error("Network connection error");
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};