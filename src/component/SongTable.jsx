import React, { useState, useEffect } from "react";
import { useSong } from './SongContext';
import del from "../img/delete-icon.png";
import edit from "../img/edit-icon.png";
import play from "../img/play-icon.png";
import addToPlaylists from "../img/add-playlist-icon.png";
import AddToPlaylistModal from "./modal/AddToPlaylistModal";

export default function SongTable({
    currentSongs,
    checkState,
    startIndex,
    handleCheckboxChange,
    handleToggleAll,
    deleteOneSong,
    setEditModalShow,
    setSelectedSong,
    isAllChecked,
    addToPlaylist
}) {
    const [addToPlaylistModalShow, setAddToPlaylistModalShow] = useState(false);
    const [selectedSongForPlaylist, setSelectedSongForPlaylist] = useState(null);
    const { setCurrentSong } = useSong();
    const { setSongList, setCurrentSongs } = useSong();

    useEffect(() => {
        setSongList(currentSongs);
        setCurrentSongs(currentSongs);
    }, [currentSongs, setSongList, setCurrentSongs]);

    const handleAddToPlaylist = (song) => {
        setSelectedSongForPlaylist(song);
        setAddToPlaylistModalShow(true);
    };

    const handlePlaySong = (song) => {
        setCurrentSong(song);
    };

    return (
        <div id="table-container">
            <table id="table">
                <thead>
                    <tr id="fixed-title">
                        <th className="checkBox-column">
                            <input
                                id="checkBoxAll"
                                type="checkbox"
                                onChange={handleToggleAll}
                                checked={currentSongs.length > 0 && isAllChecked}
                                disabled={currentSongs.length === 0}
                            />
                        </th>
                        <th className="name-column">Name</th>
                        <th className="artist-column">Artist</th>
                        <th className="action-column">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentSongs.map((song, index) => (
                        <tr key={song.id}>
                            <th>
                                <input
                                    type="checkbox"
                                    checked={checkState[startIndex + index] || false}
                                    onChange={() => handleCheckboxChange(index)}
                                />
                            </th>
                            <td>{song.songName}</td>
                            <td>{song.artist}</td>
                            <td>
                                <button onClick={() => handlePlaySong(song)}>
                                    <img src={play} alt="play-song-icon" />
                                    Play
                                </button>
                                <button onClick={() => handleAddToPlaylist(song)}>
                                    <img src={addToPlaylists} alt="add-to-playlist-icon" />
                                    Add to playlists
                                </button>
                                <button
                                    onClick={() => {
                                        setSelectedSong(song);
                                        setEditModalShow(true);
                                    }}
                                >
                                    <img src={edit} alt="edit-song-icon" />
                                    Edit
                                </button>
                                <button onClick={() => deleteOneSong(song.id)}>
                                    <img src={del} alt="delete-song-icon" />
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedSongForPlaylist && (
                <AddToPlaylistModal
                    show={addToPlaylistModalShow}
                    onHide={() => setAddToPlaylistModalShow(false)}
                    song={selectedSongForPlaylist}
                    onAddToPlaylist={addToPlaylist}
                />
            )}
        </div>
    );
}