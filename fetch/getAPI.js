export default async function getAPI({type, page, orderBy, order}) {

    const extraParams = orderBy !== "" && order !== "" ? `&order=${order}&orderby=${orderBy}` : "";
    const url = `https://www.masteringbox.com/api/wp/v2/${type}?per_page=10&page=${page}${extraParams}`;
    //console.log("Get API called: ", url);
    let res = await fetch(url);
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return await res.json();
}