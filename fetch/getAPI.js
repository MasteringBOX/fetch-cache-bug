export default async function getAPI({type, page, orderBy, order}) {

    const extraParams = orderBy !== "" && order !== "" ? `&order=${order}&orderby=${orderBy}` : "";
    const url = `https://www.masteringbox.com/api/wp/v2/${type}?per_page=50&page=${page}${extraParams}`;
    let res = await fetch(url, { cache: 'force-cache' });
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return await res.json();
}