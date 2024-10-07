import { useState } from 'react';
import search from "../img/search-icon.png";
import add from "../img/add-icon.png";
import del from "../img/delete-icon.png";

export default function NavPlaylist({ onSearchChange, deletePlaylists, showModal }) {
    const [showSearch, setShowSearch] = useState(false);

    const toggleSearch = () => {
        setShowSearch(!showSearch);
        if (showSearch) {
            onSearchChange({ target: { value: '' } });
        }
    };

    return (
        <section id="functionally">
            <nav>
                <ul id="left">
                    <h2>Manage playlists</h2>
                </ul>
                <ul id="right">
                    {!showSearch ? (
                        <>
                            <button onClick={showModal}>
                                <img src={add} alt="add-playlist-icon" />
                                Add
                            </button>
                            <button onClick={deletePlaylists}>
                                <img src={del} alt="delete-playlist-icon" />
                                Delete
                            </button>
                        </>
                    ) : (
                        <button onClick={deletePlaylists}>
                            <img src={del} alt="delete-playlist-icon" />
                            Delete
                        </button>
                    )}
                    <button onClick={toggleSearch}>
                        <img src={search} alt="search-playlist-icon" />
                        {showSearch ? "Close" : "Search"}
                    </button>
                    {showSearch && (
                        <div className="search-container">
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Search for a playlist..."
                                onChange={onSearchChange}
                            />
                        </div>
                    )}
                </ul>
            </nav>
        </section>
    );
}