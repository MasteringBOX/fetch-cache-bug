import getAPI from "./getAPI";
import { cache } from 'react';

const getCachedData = cache(async function getData({type, pages = 1, orderBy = "", order = ""}) {

    if (pages === 1) {
        return getAPI({type, page: pages, order: order, orderBy: orderBy});
    }

    const results = [];

    /**  Doing sequential requests seems to solve the issue.
     * But fetch is still calling the API twice from generateStaticParams and from the Page.
     * It should cache the result and not call the API twice.
      */


    for (let i = 1; i < pages + 1; i++) {
        results.push(await getAPI({type, page: i, order: order, orderBy: orderBy}));
    }

    return results.flat();


    /*const promises = [];

    for (let i = 1; i < pages+1; i++){
        promises.push(getAPI({type, page: i, order: order, orderBy:orderBy}));
    }

    const results = await Promise.all(promises);

    return results.flat(); */

});

export async function getPosts(lang) {
    return getCachedData({lang, type: "posts", pages: 1}); // Fetches 5 pages with 50 posts per page. (Total posts 205).
}
export async function getCategories() {
    return getCachedData({type: "categories", pages: 1, orderBy: "count", order:"desc"});
}

export async function getTags() {
    return getCachedData({type: "tags", pages: 1, orderBy: "count", order:"desc"});
}

/**
 * Removed promises to do sequential requests.
 */
export async function getBlogData() {
    const categories = await getCategories();
    const posts = await getPosts();

    return posts.map((post) => {
        const category = categories.find(item => item.id === post.category_id);
        if(category !== undefined) post.category = category.name;
        return post;
    });
}

export async function getPostData({slug}){
    const posts = await getBlogData();
    return posts.find(post => post.slug === slug);
}

export async function getCategoryPosts({id}){
    const posts = await getBlogData();
    return posts.filter(post => post.category_id === id);
}

export async function getTagPosts({lang, id}){
    const posts = await getBlogData(lang);
    return posts.filter(post => {
        return post.tags.find(tag => tag === id);
    });
}

export async function getCategory({slug}) {
    const categories = await getCategories();
    return categories.find(category => category.slug === slug);
}

export async function getTag({slug}) {
    const tags = await getTags();
    return tags.find(tag => tag.slug === slug);
}
