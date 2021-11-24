import { Link, useLoaderData } from 'remix';
import type { Post } from '~/models/post';
import { getPosts } from '~/models/post';
import adminStyles from '~/styles/admin.css';

export const links = () => {
  return [{
    rel: 'stylesheet',
    href: adminStyles
  }];
}

export default function Admin() {
  const posts = useLoaderData<Post[]>();
  return (
    <div className="admin">
      <nav>
        <h1>Admin</h1>
      </nav>
      <ul>
        {
          posts.map((post) => (
            <li key={post.slug}>
              <Link to={post.slug}>
                {post.title}
              </Link>
            </li>
          ))
        }
      </ul>
      <main></main>
    </div>
  );
}