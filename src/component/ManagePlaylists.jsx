import { useState, useEffect } from 'react';
import { getPlaylistsApi } from '../util/playlistsRestApi';
import { addPlaylistsApi } from '../util/playlistsRestApi';
import PlayListTable from "./PlaylistTable";
import NavPlaylist from './NavPlaylist';
import PlaylistsPagination from './PlaylistsPagination';
import CreatePlaylistModal from './modal/CreatePlaylistModal';
import Direction from './Direction';

export default function ManagePlayLists({ setPath }) {
    const [playlists, setPlaylists] = useState([]);
    const [checkState, setCheckState] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAllChecked, setIsAllChecked] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(14);
    const [modalShow, setModalShow] = useState(false);

    const fetchPlaylists = async () => {
        const data = await getPlaylistsApi();
        console.log(data)
        setPlaylists(data);
        setCheckState(Array(data.length).fill(false));
    };

    useEffect(() => {
        fetchPlaylists();

    }, []);

    useEffect(() => {
        setPath(">> Playlists");
    }, [setPath]);

    const filteredPlaylists = playlists.filter(playlist =>
        playlist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        playlist.songs.length === parseInt(searchTerm));

    const totalPlaylists = filteredPlaylists.length;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentPlaylists = filteredPlaylists.slice(startIndex, startIndex + itemsPerPage);

    const handleCheckboxChange = (index) => {
        const updatedCheckState = [...checkState];
        updatedCheckState[startIndex + index] = !updatedCheckState[startIndex + index];
        setCheckState(updatedCheckState);
    };

    const handleToggleAll = (e) => {
        const isChecked = e.target.checked;
        const updatedCheckState = checkState.map((checked, index) =>
            index >= startIndex && index < startIndex + itemsPerPage ? isChecked : checked
        );
        setCheckState(updatedCheckState);
        setIsAllChecked(isChecked);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.trim());
        setCurrentPage(1);
        setIsAllChecked(false);
    };

    const handlePageChange = (page, newItemsPerPage) => {
        setItemsPerPage(newItemsPerPage || itemsPerPage);
        setCurrentPage(page);
    };

    const selectedItemsCount = checkState.filter(Boolean).length;

    const handleCreatePlaylist = async (newPlaylist) => {
        const addedPlaylist = await addPlaylistsApi(newPlaylist);
        if (addedPlaylist) {
            fetchPlaylists();
        }
    };

    // Calculate the existing playlists count
    const existingPlaylistsCount = playlists.length;

    return (
        <>
            {/* <Direction path={">> Playlists"} /> */}
            <NavPlaylist onSearchChange={handleSearchChange} showModal={() => setModalShow(true)} />
            <PlayListTable
                playlists={currentPlaylists}
                checkState={checkState}
                handleCheckboxChange={handleCheckboxChange}
                handleToggleAll={handleToggleAll}
                isAllChecked={isAllChecked}
            />
            <PlaylistsPagination
                totalItems={totalPlaylists}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                selectedItemsCount={selectedItemsCount}
            />
            <CreatePlaylistModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                onCreatePlaylist={handleCreatePlaylist}
                existingPlaylistsCount={existingPlaylistsCount}
            />
        </>
    );
}
