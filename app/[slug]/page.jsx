import {getPostData, getPosts} from "../../fetch/getData";

export const dynamicParams = false; // Change to true to look for the page dynamically if not already cached and show it if exists.

export async function generateStaticParams() {

    const posts = await getPosts();

    return posts.map((post) => ({
                slug: post.slug,
            }));

}

export default async function page({params: {slug}}) {
    const post = await getPosts();

    return <div>Test</div>

}