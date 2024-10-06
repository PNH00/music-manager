import { useState, useEffect } from 'react';
import { getPlaylistsApi } from '../util/playlistsRestApi';
import { addPlaylistsApi } from '../util/playlistsRestApi';
import PlayListTable from "./PlaylistTable";
import NavPlaylist from './NavPlaylist';
import PlaylistsPagination from './PlaylistsPagination';
import CreatePlaylistModal from './modal/CreatePlaylistModal';
import Direction from './Direction';

export default function Home({ setPath }) {

    useEffect(() => setPath(""), [])

    return (
        <h1>
            HOME PAGE
        </h1>
    )
}
