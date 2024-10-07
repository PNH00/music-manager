const PLAYLISTS_URL = "http://localhost:5000/playlists";

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

export const getPlaylistApi = async (id) => {
    try {
        const response = await fetch(`${PLAYLISTS_URL}/${id}`);
        if (!response.ok) throw new Error("Network connection error");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const deletePlaylistApi = async (id) => {
    try {
        const response = await fetch(`${PLAYLISTS_URL}/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) throw new Error("Failed to delete song");
        return id;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const addPlaylistsApi = async (newPlaylist) => {
    try {
        const response = await fetch(PLAYLISTS_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPlaylist),
        });
        if (!response.ok) throw new Error("Failed to add playlist");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const updatePlaylistApi = async (id, updatedPlaylist) => {
    try {
        const response = await fetch(`${PLAYLISTS_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedPlaylist),
        });
        if (!response.ok) throw new Error("Failed to update playlist");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};