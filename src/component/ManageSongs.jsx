import { useState, useEffect } from 'react';
import { getSongsApi, deleteSongApi, addSongApi, updateSongApi } from "../util/songsRestApi";
import SongsPagination from './SongsPagination';
import AddSongModal from './modal/AddSongModal';
import EditSongModal from './modal/EditSongModal';
import NavSong from "./NavSong";
import TableSong from "./SongTable";

export default function ManageSongs({ setPath }) {
    const [songs, setSongs] = useState([]);
    const [checkState, setCheckState] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAllChecked, setIsAllChecked] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(14);
    const [modalShow, setModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [selectedSong, setSelectedSong] = useState(null);

    const fetchSongs = async () => {
        const data = await getSongsApi();
        setSongs(data);
        setCheckState(Array(data.length).fill(false));
    };

    useEffect(() => {
        fetchSongs();
    }, []);


    useEffect(() => {
        setPath(">> Songs");
    }, [setPath]);

    const filteredSongs = songs.filter(song =>
        song.songName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalSongs = filteredSongs.length;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentSongs = filteredSongs.slice(startIndex, startIndex + itemsPerPage);

    useEffect(() => {
        const allChecked = currentSongs.every((_, index) => checkState[startIndex + index]);
        setIsAllChecked(allChecked);
    }, [checkState, currentSongs, startIndex]);


    const handleSearchChange = (e) => {
        const trimmedValue = e.target.value.trim();
        setSearchTerm(trimmedValue);
        setCurrentPage(1);
        setIsAllChecked(false);
    };

    const deleteSongs = async () => {
        try {
            const idSongs = filteredSongs
                .filter((_, index) => checkState[startIndex + index])
                .map(song => song.id);

            if (idSongs.length === 0) {
                window.alert("No songs selected for deletion.");
                return;
            }

            const confirmDelete = window.confirm('Are you sure! you want to delete the selected songs ?');
            if (confirmDelete) {
                for (const id of idSongs) {
                    await deleteSongApi(id);
                }
                const updatedSongs = songs.filter(song => !idSongs.includes(song.id));
                setSongs(updatedSongs);
                setCheckState(Array(updatedSongs.length).fill(false));
                setIsAllChecked(false);
            }
        } catch (error) {
            console.error("Failed to delete songs", error);
        }
    };

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

    const deleteOneSong = async (id) => {
        try {
            const confirmDelete = window.confirm('Are you sure! you want to delete this song ?');
            if (confirmDelete) {
                await deleteSongApi(id);
                const updatedSongs = songs.filter(song => song.id !== id);
                setSongs(updatedSongs);
                setCheckState(checkState.filter((_, index) => songs[index].id !== id));
                setIsAllChecked(false);
            }
        } catch (error) {
            console.error("Failed to delete song", error);
        }
    };


    const handleAddSong = async (newSong) => {
        try {
            const addedSong = await addSongApi(newSong);
            setSongs(prevSongs => [...prevSongs, addedSong]);
            setModalShow(false);
        } catch (error) {
            console.error("Failed to add song", error);
        }
    };

    const handleEditSong = async (updatedSong) => {
        try {
            await updateSongApi(updatedSong.id, updatedSong);
            setSongs(prevSongs => prevSongs.map(song => (song.id === updatedSong.id ? updatedSong : song)));
            setEditModalShow(false);
        } catch (error) {
            console.error("Failed to edit song", error);
        }
    };

    const selectedItemsCount = checkState.filter(Boolean).length;

    return (
        <>
            <NavSong onSearchChange={handleSearchChange} deleteSongs={deleteSongs} showModal={() => setModalShow(true)} />
            <TableSong
                currentSongs={currentSongs}
                checkState={checkState}
                startIndex={startIndex}
                handleCheckboxChange={handleCheckboxChange}
                handleToggleAll={handleToggleAll}
                deleteOneSong={deleteOneSong}
                setEditModalShow={setEditModalShow}
                setSelectedSong={setSelectedSong}
                isAllChecked={isAllChecked}
            />
            <SongsPagination
                totalItems={totalSongs}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={(page, newItemsPerPage) => {
                    setItemsPerPage(newItemsPerPage || itemsPerPage);
                    setCurrentPage(page);
                }}
                selectedItemsCount={selectedItemsCount}
            />
            <AddSongModal show={modalShow} onHide={() => setModalShow(false)} onAddSong={handleAddSong} />
            {selectedSong && (
                <EditSongModal
                    show={editModalShow}
                    onHide={() => setEditModalShow(false)}
                    song={selectedSong}
                    onEditSong={handleEditSong}
                />
            )}
        </>
    );
}
