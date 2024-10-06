import { Link } from "react-router-dom";
import Direction from "./Direction";

export default function Aside() {
    return (
        <aside>
            <Link
                to='/songs'
                style={{
                    textDecoration: 'none',
                    color: 'inherit'
                }}
            >
                <button style={{ padding: '10px 20px', cursor: 'pointer' }}>
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
                <button style={{ padding: '10px 20px', cursor: 'pointer' }}>
                    Playlists
                </button>
            </Link>
        </aside>
    );
}
