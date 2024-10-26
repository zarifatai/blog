import matter from "gray-matter";
import { marked } from "marked";
import { Article, FrontMatter } from "@/app/types/post";
import fs from "node:fs/promises";
import path from "node:path";

export default async function Post({ params }: { params: { slug: string } }) {
  const { slug } = await params
  const article = await getArticle(slug);
  return (
    <div>
      <h2>Title:{article.frontMatter.title}</h2>
      <h3>Author:{article.frontMatter.author}</h3>
      <h3>Date:{article.frontMatter.date}</h3>
      <div dangerouslySetInnerHTML={{ __html: article.content }} />
    </div>
  )
}

const getArticle = async (slug: string) => {
  const pathName = path.join(process.cwd(), 'posts', `${slug}.md`);
  const markdownWithMeta = await fs.readFile(pathName, 'utf-8');
  const { content, data: metadata } = matter(markdownWithMeta);
  const html: string | Promise<string> = marked.parse(content);

  const frontMatter: FrontMatter = {
    title: metadata.title,
    date: metadata.date,
    author: metadata.author,
    excerpt: metadata.excerpt,
    slug: slug,
  }
  const article: Article = {
    frontMatter: frontMatter,
    content: html,
  }

  return article
}
