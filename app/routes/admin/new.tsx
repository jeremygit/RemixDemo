import { Form, redirect } from 'remix';
import type { ActionFunction } from 'remix';
import { createPost } from '~/models/post';

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  
  const title = formData.get('title');
  const slug = formData.get('slug');
  const markdown = formData.get('markdown');

  // Before error handing
  await createPost({ title, slug, markdown });

  return redirect('/admin');
}

export default function NewPost() {
  return (
    <Form method="post">
      <p>
        <label>
          Post Title:
          <input type="text" name="title"/>
        </label>
      </p>
      <p>
        <label>
          Post Title:
          <input type="text" name="slug"/>
        </label>
      </p>
      <p>
        <label>
          <label htmlFor="markdown">Markdown</label>
          <br />
          <textarea rows={20} name="markdown" />
        </label>
      </p>
      <p>
        <button type="submit">Create Post</button>
      </p>
    </Form>
  );
}