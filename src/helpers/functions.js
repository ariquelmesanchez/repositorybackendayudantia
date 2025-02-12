const HATEOS = ({ totalCount, count, pages, results, page, limit }) => {
    return {
        totalCount,
        count,
        pages,
        results: results.map((row) => ({
            id: row.id,
            title: row.titulo,
            url: `/api/v2/inmuebles/${row.id}`
        })),
        next: page < pages ? `/api/v2/inmuebles?limit=${limit}&page=${Number(page) + 1}` : null,
        prev: page > 1 ? `/api/v2/inmuebles?limit=${limit}&page=${Number(page) - 1}` : null
    }

}

module.exports = {
    HATEOS
}