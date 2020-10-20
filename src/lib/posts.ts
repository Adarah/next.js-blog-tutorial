import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export default function getSortedPostsData(): PostData[] {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName: string): PostData => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      contentHtml: '',
      title: matterResult.data.title,
      date: matterResult.data.date,
    };
  });
    // Sort posts by date
  return allPostsData.sort((a: PostData, b: PostData): number => {
    if (a.date < b.date) {
      return 1;
    }
    return -1;
  });
}

export function getAllPostIds(): {params: PostParams}[] {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName: string): {params: PostParams} => ({
    params: {
      id: fileName.replace(/\.md/, ''),
    },
  }));
}

export async function getPostData(id: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  const processedContent = await remark().use(html).process(matterResult.content);
  const contentHtml = processedContent.toString();
  return {
    id,
    contentHtml,
    title: matterResult.data.title,
    date: matterResult.data.date,
  };
}

export interface PostParams {
  id: string;
}

export interface PostData {
  id: string;
  contentHtml: string;
  title: string;
  date: string;
}
