export default function PlayListTable({ playlists, checkState, handleCheckboxChange, handleToggleAll, isAllChecked }) {
    return (
        <div id="table-container">
            <table id="table">
                <thead>
                    <tr id="fixed-title">
                        <th className="checkBox-column">
                            <input
                                id="checkBoxAll"
                                type="checkbox"
                                checked={isAllChecked}
                                onChange={handleToggleAll}
                            />
                        </th>
                        <th className="name-column">Name</th>
                        <th className="action-column">Songs</th>
                        <th className="action-column">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {playlists.length === 0 ? (
                        <tr>
                            <td colSpan="4">No playlists found.</td>
                        </tr>
                    ) : (
                        playlists.map((playlist, index) => (
                            <tr key={playlist.id}>
                                <td className="checkBox-column">
                                    <input
                                        type="checkbox"
                                        checked={checkState[index] || false}
                                        onChange={() => handleCheckboxChange(index)}
                                    />
                                </td>
                                <td className="name-column">{playlist.name}</td>
                                <td className="action-column">{playlist.songs.length}</td>
                                <td className="action-column">
                                    {/* Các hành động như sửa, xóa playlist */}
                                    <button>Edit</button>
                                    <button>Delete</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
