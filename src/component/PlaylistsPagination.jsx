import '../scss/pagination.scss'

export default function Pagination({ totalItems, itemsPerPage, currentPage, onPageChange, selectedItemsCount }) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    return (
        <div className="pagination">
            <span>Total Items: {totalItems}</span>
            <span>Page size:
                <select
                    defaultValue={itemsPerPage}
                    onChange={(e) => onPageChange(1, e.target.value)}
                >
                    <option value={14}>14</option>
                    <option value={30}>30</option>
                    <option value={50}>50</option>
                </select>
            </span>
            <span>Selected Items: {selectedItemsCount}</span>
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
            <span>{currentPage} / {totalPages}</span>
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
        </div>
    );
}