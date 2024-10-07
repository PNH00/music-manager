const SONGS_URL = "http://localhost:5000/songs";
const PLAYLISTS_URL = "http://localhost:5000/playlists";

export const getSongsApi = async () => {
  try {
    const response = await fetch(SONGS_URL);
    if (!response.ok) throw new Error("Network connection error");

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching songs:", error);
    return [];
  }
};

export const deleteSongApi = async (id) => {
  try {
    const response = await fetch(`${SONGS_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete song");
    return id;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateSongApi = async (id, updatedSong) => {
  try {
    const response = await fetch(`${SONGS_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedSong),
    });
    if (!response.ok) throw new Error("Failed to update song");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const addSongApi = async (newSong) => {
  try {
    const response = await fetch(SONGS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSong),
    });
    if (!response.ok) throw new Error("Failed to add song");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const addSongToPlaylistApi = async (song, playlistId) => {
  try {
    const response = await fetch(`${PLAYLISTS_URL}/${playlistId}`);
    if (!response.ok) throw new Error("Failed to fetch playlist");

    const playlist = await response.json();
    playlist.songs.push(song);
    const updateResponse = await fetch(`${PLAYLISTS_URL}/${playlistId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(playlist),
    });

    if (!updateResponse.ok) throw new Error("Failed to update playlist");

    return await updateResponse.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};