export type Post = {
  slug: string;
  title: string;
}

export function getPosts() {
  const posts: Post[] = [
    {
      slug: 'my-first-post',
      title: 'My First Post'
    },
    {
      slug: '90s-mixtape',
      title: 'My Mixtape'
    }
  ];
  return posts;
}