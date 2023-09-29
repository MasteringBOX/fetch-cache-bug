import {getBlogData} from "../fetch/getData";


export default async function Home() {

  const data = await getBlogData();
  const posts = data.slice(0, 50); // Show 50 for the sake of the test.
  return (
    <main>
      <h1 className="text-2xl">Show the post titles</h1>
      <ul>
        {posts.map((post, index) => {
          return <li key={index}>{post.title.rendered}</li>
        })
        }
      </ul>
    </main>
  )
}
