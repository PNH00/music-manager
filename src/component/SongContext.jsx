import React, { createContext, useContext, useState } from 'react';

const SongContext = createContext();

export const useSong = () => useContext(SongContext);

export const SongProvider = ({ children }) => {
    const [currentSong, setCurrentSong] = useState(null);
    const [songList, setSongList] = useState([]);
    const [currentSongs, setCurrentSongs] = useState([]);

    return (
        <SongContext.Provider value={{ currentSong, setCurrentSong, songList, setSongList, currentSongs, setCurrentSongs }}>
            {children}
        </SongContext.Provider>
    );
};