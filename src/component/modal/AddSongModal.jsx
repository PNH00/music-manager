import { useState } from 'react';
import '../../scss/modifySongModal.scss'

export default function AddSongModal({ show, onHide, onAddSong }) {
    const [songName, setSongName] = useState('');
    const [artist, setArtist] = useState('');
    const [album, setAlbum] = useState('');
    const [year, setYear] = useState('');
    const [errors, setErrors] = useState({});
    const validate = () => {
        const newErrors = {};
        if (!songName) newErrors.songName = "Song name is required.";
        if (!artist) newErrors.artist = "Artist is required.";
        if (!album) newErrors.album = "Album is required.";
        if (!year) newErrors.year = "Year is required.";
        else if (isNaN(year) || year < 1900 || year > new Date().getFullYear()) {
            newErrors.year = "Please enter a valid year.";
        }
        return newErrors;
    };

    const handleSubmit = () => {
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const newSong = { songName, artist, album, year };
        onAddSong(newSong);
        setSongName('');
        setArtist('');
        setAlbum('');
        setYear('');
        setErrors({});
    };

    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2>Add New Song</h2>
                    <button className="close-button" onClick={onHide}>X</button>
                </div>
                <div className="modal-body">
                    <h4>Song Information</h4>
                    <input
                        type="text"
                        placeholder="Song Name"
                        value={songName}
                        onChange={(e) => setSongName(e.target.value)}
                    />
                    {errors.songName && <p className="error">{errors.songName}</p>}

                    <input
                        type="text"
                        placeholder="Artist"
                        value={artist}
                        onChange={(e) => setArtist(e.target.value)}
                    />
                    {errors.artist && <p className="error">{errors.artist}</p>}

                    <input
                        type="text"
                        placeholder="Album"
                        value={album}
                        onChange={(e) => setAlbum(e.target.value)}
                    />
                    {errors.album && <p className="error">{errors.album}</p>}

                    <input
                        type="number"
                        placeholder="Year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                    />
                    {errors.year && <p className="error">{errors.year}</p>}
                </div>
                <div className="modal-footer">
                    <button className="submit-button" onClick={handleSubmit}>Add Song</button>
                    <button className="close-button" onClick={onHide}>Close</button>
                </div>
            </div>
        </div>
    );
}