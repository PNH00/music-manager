import React from "react";
import del from "../img/delete-icon.png";
import edit from "../img/edit-icon.png";
import play from "../img/play-icon.png";

export default function PlaylistTable({
    playlists,
    checkState,
    handleCheckboxChange,
    handleToggleAll,
    deleteOnePlaylist,
    setEditModalShow,
    setSelectedPlaylist,
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
                                checked={isAllChecked}
                                onChange={handleToggleAll}
                            />
                        </th>
                        <th className="name-column">Name</th>
                        <th className="action-column">Songs</th>
                        <th className="action-column">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {playlists.length === 0 ? (
                        <tr>
                            <td colSpan="4">No playlists found.</td>
                        </tr>
                    ) : (
                        playlists.map((playlist, index) => (
                            <tr key={playlist.id}>
                                <th>
                                    <input
                                        type="checkbox"
                                        checked={checkState[index] || false}
                                        onChange={() => handleCheckboxChange(index)}
                                    />
                                </th>
                                <td className="name-column">{playlist.name}</td>
                                <td className="songs-column">{playlist.songs.length}</td>
                                <td className="action-column">
                                    <button>
                                        <img src={play} alt="play-song-icon" />
                                        Play
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSelectedPlaylist(playlist);
                                            setEditModalShow(true);
                                        }}
                                    >
                                        <img src={edit} alt="edit-playlist-icon" />
                                        Edit
                                    </button>
                                    <button onClick={() => deleteOnePlaylist(playlist.id)}>
                                        <img src={del} alt="delete-playlist-icon" />
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}