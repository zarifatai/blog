import matter from 'gray-matter';
import { marked } from 'marked';

export interface FrontMatter {
  title: string;
  date: string;
  author: string;
  excerpt: string;
}

export interface PostInterface {
  frontMatter: FrontMatter;
  content: string | Promise<string>;
  slug: string;
}

export async function markdownToPost(slug: string) {
  // TODO: get content from file
  const markdownWithMeta = "";

  const { content, data: metadata } = matter(markdownWithMeta);
  const html: string | Promise<string> = marked.parse(content);

  const frontMatter: FrontMatter = {
    title: metadata.title,
    date: metadata.date,
    author: metadata.author,
    excerpt: metadata.excerpt,
  }

  const post: PostInterface = {
    frontMatter: frontMatter,
    content: html,
    slug: slug,
  };

  return post;
}

export async function getFrontMatters() {

}
