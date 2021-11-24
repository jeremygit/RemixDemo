import { Link, useLoaderData } from 'remix';
import type { Post } from '~/models/post';
import { getPosts } from '~/models/post';

export const loader = () => {
  // return [
  //   {
  //     slug: 'my-first-post',
  //     title: 'My First Post'
  //   },
  //   {
  //     slug: '90s-mixtape',
  //     title: 'My Mixtape'
  //   }
  // ];
  return getPosts();
}

export default function Posts() {

  const posts = useLoaderData<Post[]>();

  console.log(posts)

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {
          posts.map((post) => (
            <li key={post.slug}>
              <Link to={post.slug}>{post.title}</Link>
            </li>
          ))
        }
      </ul>
    </div>
  );
}