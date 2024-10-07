import { useState, useEffect } from 'react';
import {
    getPlaylistsApi,
    addPlaylistsApi,
    updatePlaylistApi,
    deletePlaylistApi
} from '../util/playlistsRestApi';
import PlaylistTable from "./PlaylistTable";
import NavPlaylist from './NavPlaylist';
import PlaylistsPagination from './PlaylistsPagination';
import CreatePlaylistModal from './modal/CreatePlaylistModal';
import UpdatePlaylistModal from './modal/UpdatePlaylistModal';

export default function ManagePlaylists({ setPath }) {
    const [playlists, setPlaylists] = useState([]);
    const [checkState, setCheckState] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAllChecked, setIsAllChecked] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(14);
    const [modalShow, setModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);

    const fetchPlaylists = async () => {
        const data = await getPlaylistsApi();
        setPlaylists(data);
        setCheckState(Array(data.length).fill(false));
    };

    useEffect(() => {
        fetchPlaylists();
    }, []);

    useEffect(() => {
        setPath(">> Playlist");
    }, [setPath]);

    const filteredPlaylists = playlists.filter(playlist => {
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        return (
            playlist.name.toLowerCase().includes(lowercasedSearchTerm) ||
            playlist.songs.length === parseInt(searchTerm)
        );
    });

    const totalPlaylists = filteredPlaylists.length;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentPlaylists = filteredPlaylists.slice(startIndex, startIndex + itemsPerPage);

    useEffect(() => {
        if (currentPlaylists.length === 0) {
            setIsAllChecked(false);
        } else {
            const allChecked = currentPlaylists.every((_, index) => checkState[startIndex + index]);
            setIsAllChecked(allChecked);
        }
    }, [checkState, currentPlaylists, startIndex]);

    const handleCheckboxChange = (index) => {
        const updatedCheckState = [...checkState];
        updatedCheckState[startIndex + index] = !updatedCheckState[startIndex + index];
        setCheckState(updatedCheckState);
    };


    const handleToggleAll = (e) => {
        const isChecked = e.target.checked;
        const updatedCheckState = checkState.map((checked, index) => {
            const isInCurrentPage = index >= startIndex && index < startIndex + itemsPerPage;
            return isInCurrentPage ? isChecked : checked;
        });
        setCheckState(updatedCheckState);
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

    const deletePlaylists = async () => {
        try {
            const idsToDelete = filteredPlaylists
                .filter((_, index) => checkState[startIndex + index])
                .map(playlist => playlist.id);

            if (idsToDelete.length === 0) {
                window.alert("No playlists selected for deletion.");
                return;
            }

            const confirmDelete = window.confirm('Are you sure you want to delete the selected playlists?');
            if (confirmDelete) {
                for (const id of idsToDelete) {
                    await deletePlaylistApi(id);
                }
                const updatedPlaylists = playlists.filter(playlist => !idsToDelete.includes(playlist.id));
                setPlaylists(updatedPlaylists);
                setCheckState(Array(updatedPlaylists.length).fill(false));
                setIsAllChecked(false);
            }
        } catch (error) {
            console.error("Failed to delete playlists", error);
        }
    };

    const deleteOnePlaylist = async (id) => {
        try {
            const confirmDelete = window.confirm('Are you sure you want to delete this playlist?');
            if (confirmDelete) {
                await deletePlaylistApi(id);
                const updatedPlaylists = playlists.filter(playlist => playlist.id !== id);
                setPlaylists(updatedPlaylists);
                setCheckState(checkState.filter((_, index) => playlists[index].id !== id));
                setIsAllChecked(false);
            }
        } catch (error) {
            console.error("Failed to delete playlist", error);
        }
    };

    const handleCreatePlaylist = async (newPlaylist) => {
        const addedPlaylist = await addPlaylistsApi(newPlaylist);
        if (addedPlaylist) {
            fetchPlaylists();
        }
    };

    const selectedItemsCount = checkState.filter(Boolean).length;

    const handleUpdatePlaylist = async (updatedPlaylist) => {
        await updatePlaylistApi(updatedPlaylist.id, updatedPlaylist);
        setPlaylists(prevPlaylists => prevPlaylists.map(playlist => (playlist.id === updatedPlaylist.id ? updatedPlaylist : playlist)));
        setEditModalShow(false);
    };

    const editPlaylist = (playlist) => {
        setSelectedPlaylist(playlist);
        setEditModalShow(true);
    };


    return (
        <>
            <NavPlaylist
                onSearchChange={handleSearchChange}
                deletePlaylists={deletePlaylists}
                showModal={() => setModalShow(true)}
            />
            <PlaylistTable
                playlists={currentPlaylists}
                checkState={checkState}
                handleCheckboxChange={handleCheckboxChange}
                handleToggleAll={handleToggleAll}
                deleteOnePlaylist={deleteOnePlaylist}
                setEditModalShow={setEditModalShow}
                setSelectedPlaylist={editPlaylist}
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
                playlistLength={playlists.length}
            />
            <UpdatePlaylistModal
                show={editModalShow}
                onHide={() => setEditModalShow(false)}
                onUpdatePlaylist={handleUpdatePlaylist}
                selectedPlaylist={selectedPlaylist}
            />
        </>
    );
}