import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Direction({ path }) {
    return (
        <section id='direction'>
            <Link to="/">Home</Link>
            {path && <span> {path}</span>}
        </section>
    );
}