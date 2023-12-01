import {getBlogData, getCategories, getCategoryPosts} from "../../fetch/getData";


export default async function Category() {
    return <div>Test</div>
    const categories = await getCategories();

    const promises = categories.slice(0, 20).map(async (category) => ({
        name: category.name,
        description: category.description,
        slug: category.slug,
        posts: await getCategoryPosts({ id: category.id }),
    }));

    const data = await Promise.all(promises);
  return (
    <main>
      <h1 className="text-2xl">Show the post titles</h1>
      <ul>
        {data.map((item, index) => {
          return <li key={index}>{item.name}</li>
        })
        }
      </ul>
    </main>
  )
}
