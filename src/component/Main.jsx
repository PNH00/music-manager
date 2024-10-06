import { Route, Routes } from 'react-router-dom';
import Aside from "./Aside";
import Direction from "./Direction";
import ManageSongs from './ManageSongs';
import ManagePlayLists from './ManagePlaylists';
import { useState } from 'react';
import Home from './Home';

export default function Main() {
    const [path, setPath] = useState('');

    return (
        <main>
            <Aside />
            <section id="main-section">
                <Direction path={path} />
                <Routes>
                    <Route path='/' element={<Home setPath={setPath} />} />
                    <Route path='/songs' element={<ManageSongs setPath={setPath} />} />
                    <Route path='/playlists' element={<ManagePlayLists setPath={setPath} />} />
                </Routes>
            </section>
        </main>
    );
}
