import { Link } from "react-router-dom";
import SongPlayer from "./SongPlayer"

export default function Aside() {

    const handlePlaySong = () => {

    }
    return (
        <aside>
            <>
                <Link
                    to='/songs'
                    style={{
                        textDecoration: 'none',
                        color: 'inherit'
                    }}
                >
                    <button>
                        Songs
                    </button>
                </Link>

                <Link
                    to='/playlists'
                    style={{
                        textDecoration: 'none',
                        color: 'inherit'
                    }}
                >
                    <button>
                        Playlist
                    </button>
                </Link>
                <SongPlayer></SongPlayer>

            </>
        </aside>
    );
}