import React, { useState } from 'react';
import { useSong } from './SongContext';
import dvd from '../img/dvd-icon.png';
import next from '../img/next-icon.png';
import prev from '../img/prev-icon.png';
import pause from '../img/pause-icon.png';
import play from '../img/play-song-icon.png';
import '../scss/songPlayer.scss';

export default function SongPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const { currentSong, songList, setCurrentSong } = useSong();

    const handlePlayPause = () => {
        setIsPlaying(prev => !prev);
    };

    const handleNext = () => {
        if (!currentSong) return; // Nếu không có bài hát hiện tại, không làm gì
        const currentIndex = songList.findIndex(song => song.id === currentSong.id); // Lấy chỉ số của bài hát hiện tại
        const nextIndex = (currentIndex + 1) % songList.length; // Chuyển đến bài hát tiếp theo, nếu tới cuối thì quay lại đầu
        setCurrentSong(songList[nextIndex]); // Cập nhật bài hát hiện tại
    };

    const handlePrev = () => {
        if (!currentSong) return; // Nếu không có bài hát hiện tại, không làm gì
        const currentIndex = songList.findIndex(song => song.id === currentSong.id); // Lấy chỉ số của bài hát hiện tại
        const prevIndex = (currentIndex - 1 + songList.length) % songList.length; // Chuyển đến bài hát trước đó, nếu tới đầu thì quay lại cuối
        setCurrentSong(songList[prevIndex]); // Cập nhật bài hát hiện tại
    };

    console.log(songList);

    return (
        <div className="player-container">
            <section className="icon-section">
                <img src={dvd} alt="player-icon" />
            </section>
            <section>
                <h3>{currentSong ? currentSong.songName : 'Title'}</h3>
                <h5>{currentSong ? currentSong.artist : 'Artist'}</h5>
            </section>
            <section className="button-container">
                <button onClick={handlePrev}>
                    <img src={prev} alt="Previous" />
                </button>
                <button onClick={handlePlayPause}>
                    <img src={isPlaying ? pause : play} alt={isPlaying ? "Pause" : "Play"} />
                </button>
                <button onClick={handleNext}>
                    <img src={next} alt="Next" />
                </button>
            </section>
        </div>
    );
}