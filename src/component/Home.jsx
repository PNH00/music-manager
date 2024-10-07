import React, { useEffect } from "react";

export default function Home({ setPath }) {

    useEffect(() => setPath(""), [setPath])

    return (
        <section style={{
            width: `100%`,
            height: '750px'
        }}>
        </section>
    )
}