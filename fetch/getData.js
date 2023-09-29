import getAPI from "./getAPI";
import { cache } from 'react';

const getCachedData = cache(async function getData({type, pages = 1, orderBy = "", order = ""}) {

    if(pages === 1) {
        return getAPI({type, page: pages, order:order, orderBy: orderBy});
    }

    const promises = [];

    for (let i = 1; i < pages+1; i++){
        promises.push(getAPI({type, page: i, order: order, orderBy:orderBy}));
    }

    const results = await Promise.all(promises);

    return results.flat();

});

export async function getPosts(lang) {
    return getCachedData({lang, type: "posts", pages: 5}); // Fetches 5 pages with 50 posts per page. (Total posts 205).
}
export async function getCategories() {
    return getCachedData({type: "categories", pages: 1, orderBy: "count", order:"desc"});
}

export async function getBlogData() {
    const promises = [];
    promises.push(getCategories());
    promises.push(getPosts());

    return await Promise.all(promises).then(([categories, posts]) => {

        return posts.map((post) => {
            const category = categories.find(item => item.id === post.category_id);
            if(category !== undefined) post.category = category.name;
            return post;
        })
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
