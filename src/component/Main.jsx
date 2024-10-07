import { Route, Routes } from 'react-router-dom';
import Aside from "./Aside";
import Direction from "./Direction";
import ManageSongs from './ManageSongs';
import ManagePlayLists from './ManagePlaylists'
import { useState } from 'react';
import Home from './Home';
import { SongProvider } from './SongContext';

export default function Main() {
    const [path, setPath] = useState('');
    const [songs, setSongsToPlay] = useState([]);



    return (
        <SongProvider>
            <main>
                <Aside />
                <section id="main-section">
                    <Direction path={path} />
                    <Routes>
                        <Route path='/' element={<Home setPath={setPath} songs={songs.length > 0 ? songs : []} />} />
                        <Route path='/songs' element={<ManageSongs setPath={setPath} setSongsToPlay={setSongsToPlay} />} />
                        <Route path='/playlists' element={<ManagePlayLists setPath={setPath} />} />
                    </Routes>
                </section>
            </main>
        </SongProvider>
    );
}
