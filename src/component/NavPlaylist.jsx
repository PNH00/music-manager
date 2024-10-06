import { useState } from 'react';
import search from "../img/search-icon.png";
import add from "../img/add-icon.png";
import del from "../img/delete-icon.png";

export default function NavPlaylist({ onSearchChange, deleteSongs, showModal }) {
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
                                <img src={add} alt="add-song-icon" />
                                Add
                            </button>
                            <button onClick={deleteSongs}>
                                <img src={del} alt="delete-song-icon" />
                                Delete
                            </button>
                        </>
                    ) : (
                        <button onClick={deleteSongs}>
                            <img src={del} alt="delete-song-icon" />
                            Delete
                        </button>
                    )}
                    <button onClick={toggleSearch}>
                        <img src={search} alt="search-song-icon" />
                        {showSearch ? "Close" : "Search"}
                    </button>
                    {showSearch && (
                        <div className="search-container">
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Search for a song..."
                                onChange={onSearchChange}
                            />
                        </div>
                    )}
                </ul>
            </nav>
        </section>
    );
}