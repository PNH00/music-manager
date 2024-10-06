import React from "react";
import del from "../img/delete-icon.png";
import edit from "../img/edit-icon.png";

export default function SongTable({
    currentSongs,
    checkState,
    startIndex,
    handleCheckboxChange,
    handleToggleAll,
    deleteOneSong,
    setEditModalShow,
    setSelectedSong,
    isAllChecked
}) {
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
        </div>
    );
}
