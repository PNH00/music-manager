import { Link } from "react-router-dom";
import logo from "../img/music-icon.png";

export default function Headers() {
    return (
        <header>
            <img src={logo} alt="music-icon" />

            <Link
                to='/'
                style={{
                    textDecoration: 'none',
                    color: 'inherit'
                }}
            >
                <h1>Spotifier</h1>
            </Link>
        </header>
    );
}