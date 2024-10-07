import React, { useEffect, useState } from 'react';
import { getPlaylistsApi, getPlaylistApi, addPlaylistsApi } from '../../util/playlistsRestApi';
import '../../scss/AddToPlaylistModal.scss';

export default function AddToPlaylistModal({ show, onHide, song, onAddToPlaylist }) {
    const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState('');

    const fetchPlaylists = async () => {
        const data = await getPlaylistsApi();
        setPlaylists(data);
    };

    useEffect(() => {
        fetchPlaylists();
    }, []);

    const handleAdd = async () => {
        try {
            if (song && selectedPlaylist) {
                const playlist = await getPlaylistApi(selectedPlaylist);
                if (playlist.songs.filter(songInPlaylist => songInPlaylist.id === song.id).length > 0) {
                    alert('Song already added to playlist successfully!');
                    return;
                }
                await onAddToPlaylist(song, selectedPlaylist);
                onHide();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleCreateNewPlaylist = async () => {
        const nameToUse = `Playlist ${playlists.length + 1}`;
        const newPlaylist = {
            name: nameToUse,
            songs: [song]
        };
        await addPlaylistsApi(newPlaylist);
        onHide();
        alert('Playlist created successfully!');
    };

    return (
        <div className={`add-to-playlist-modal ${show ? 'show' : ''}`} onClick={onHide}>
            <div className="add-to-playlist-modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Add to Playlist</h2>
                {playlists.length > 0 ? (
                    <>
                        <select
                            className='add-to-playlist-select'
                            value={selectedPlaylist}
                            onChange={(e) => setSelectedPlaylist(e.target.value)}
                        >
                            <option value="" disabled>Select a playlist</option>
                            {playlists.map((playlist) => (
                                <option key={playlist.id} value={playlist.id}>
                                    {playlist.name}
                                </option>
                            ))}
                        </select>
                        <div className="add-button-container">
                            <button className="add-button" onClick={handleAdd} disabled={!selectedPlaylist}>
                                Add to Playlist
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <p style={{ textAlign: "center" }}>No playlists available. Do you want to create new playlist with this song?</p>
                        <div className="create-playlist-button-container">
                            <button className="create-playlist-button" onClick={handleCreateNewPlaylist}>
                                Create new playlist
                            </button>
                        </div>
                    </>
                )}
                <div className="button-container">
                    <button className="close-button" onClick={onHide}>Close</button>
                </div>
            </div>
        </div>
    );
}