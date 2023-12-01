import {getCategories, getCategory, getCategoryPosts, getPosts} from "../../../fetch/getData";

export async function generateStaticParams() {
    const posts = await getCategories();

    return posts.map((post) => ({
        slug: post.slug,
    }));

}

export default async function page({params: {slug}}) {
    const category = await getCategory({slug});
    const posts = await getCategoryPosts({ id: category.id})

    return <ul>
        {posts.map((post, index) => {
            return <li key={index}>{post.title.rendered}</li>
        })
        }
    </ul>
}