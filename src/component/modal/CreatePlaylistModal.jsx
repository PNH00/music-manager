import { useState, useEffect } from 'react';
import { getSongsApi } from '../../util/songsRestApi';

export default function CreatePlaylistModal({ show, onHide, onCreatePlaylist, playlistLength }) {
    const [playlistName, setPlaylistName] = useState('');
    const [selectedSongs, setSelectedSongs] = useState([]);
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const fetchedSongs = await getSongsApi();
                if (Array.isArray(fetchedSongs) && fetchedSongs.length > 0) {
                    setSongs(fetchedSongs);
                } else {
                    console.error("Fetched songs are not an array or are empty");
                }
            } catch (error) {
                console.error("Error fetching songs:", error);
            }
        };

        if (show) {
            fetchSongs();
        }
    }, [show]);

    const handleSubmit = async () => {
        const nameToUse = playlistName.trim() || `Playlist ${playlistLength + 1}`;
        const newPlaylist = {
            name: nameToUse,
            songs: selectedSongs.map(songId => {
                const song = songs.find(s => s.id === songId);
                return song ? { ...song } : null;
            }).filter(Boolean)
        };
        onCreatePlaylist(newPlaylist);
        resetFields();
        onHide();
    };

    const resetFields = () => {
        setPlaylistName('');
        setSelectedSongs([]);
    };

    const handleSongSelection = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value);
        setSelectedSongs(selectedOptions);
    };

    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2>Create Playlist</h2>
                    <button className="close-button" onClick={onHide}>X</button>
                </div>
                <div className="modal-body">
                    <h4>Playlist Name</h4>
                    <input
                        type="text"
                        placeholder="Enter playlist name"
                        value={playlistName}
                        onChange={(e) => setPlaylistName(e.target.value)}
                    />
                    <h4>Select Songs</h4>
                    <select
                        multiple
                        value={selectedSongs}
                        onChange={handleSongSelection}
                        style={{ width: '100%', height: '100px' }}
                    >
                        {songs.length > 0 ? (
                            songs.map((song) => (
                                <option key={song.id} value={song.id}>
                                    {song.songName} | {song.artist}
                                </option>
                            ))
                        ) : (
                            <option disabled>No songs available</option>
                        )}
                    </select>
                </div>
                <div className="modal-footer">
                    <button className="submit-button" onClick={handleSubmit}>Add Playlist</button>
                    <button className="close-button" onClick={onHide}>Close</button>
                </div>
            </div>
        </div>
    );
}