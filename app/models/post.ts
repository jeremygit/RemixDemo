import path from 'path';
import fs from 'fs/promises';
import parseFrontMatter from 'front-matter';
import invariant from 'tiny-invariant';

export type Post = {
  slug: string;
  title: string;
}

export type PostAttributes = {
  title: string;
};

type PostNew = {
  title: string;
  slug: string;
  markdown: string;
};

const postsPath = path.join(__dirname, '../data/posts');

const isValidAttributes = (
  attributes: any
): attributes is PostAttributes => {
  return attributes?.title;
}

export async function getPosts() {
  const dir = await fs.readdir(postsPath);

  return Promise.all(
    dir.map(async (filename) => {
      
      const file = await fs.readFile(
        path.join(postsPath, filename)
      );
      
      const { attributes } = parseFrontMatter(
        file.toString()
      );

      invariant(
        isValidAttributes(attributes), 
        `${filename} has bad meta data!`
      );

      return {
        slug: filename.replace(/\.md$/, ''),
        title: attributes.title
      }

    })
  );
}

export async function getPost(slug: string) {
  const filepath = path.join(postsPath, slug + '.md');
  const file = await fs.readFile(filepath);
  const { attributes } = parseFrontMatter(file.toString());
  invariant(
    isValidAttributes(attributes),
    `Post ${filepath} is missing attributes`
  );
  return { slug, title: attributes.title }
}

export async function createPost(post: PostNew) {
  const md = `---\ntitle: ${post.title}\n---\n\n${post.markdown}`;
  await fs.writeFile(
    path.join(postsPath, post.slug + '.md'),
    md
  );
  return getPost(post.slug);
}