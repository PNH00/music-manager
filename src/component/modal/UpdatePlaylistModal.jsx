import { useState, useEffect } from 'react';
import { getSongsApi } from '../../util/songsRestApi';
import { updatePlaylistApi } from '../../util/playlistsRestApi'; // Import hàm updatePlaylistApi

export default function UpdatePlaylistModal({ show, onHide, onUpdatePlaylist, selectedPlaylist }) {
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
            if (selectedPlaylist) {
                setPlaylistName(selectedPlaylist.name);
                setSelectedSongs(selectedPlaylist.songs.map(song => song.id)); // Lấy ID bài hát
            }
        }
    }, [show, selectedPlaylist]);

    const handleSubmit = async () => {
        const updatedPlaylist = {
            id: selectedPlaylist.id,
            name: playlistName.trim(),
            songs: selectedSongs.map(songId => {
                const song = songs.find(s => s.id === songId);
                return song ? { ...song } : null; // Trả về đối tượng bài hát nếu tìm thấy
            }).filter(Boolean) // Lọc các null
        };
        const updatedResponse = await updatePlaylistApi(selectedPlaylist.id, updatedPlaylist); // Cập nhật playlist
        onUpdatePlaylist(updatedResponse);
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
                    <h2>Update Playlist</h2>
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
                    <button className="submit-button" onClick={handleSubmit}>Update Playlist</button>
                    <button className="close-button" onClick={onHide}>Close</button>
                </div>
            </div>
        </div>
    );
}