import fs from "node:fs/promises"
import path from "node:path";
import matter from "gray-matter"
import { FrontMatter } from "@/app/types/post";

export default async function PostsOverview() {
  const frontMatters = await getFrontMatters();

  return (
    <div>
      {frontMatters?.map((frontMatter) => (
        <div key={frontMatter.slug}>
          <h3>{frontMatter.title}</h3>
          <h4>{frontMatter.date}</h4>
          <h4>{frontMatter.author}</h4>
          <p>{frontMatter.excerpt}</p>
        </div>
      ))}
    </div>
  );
}

const getFrontMatters = async () => {
  const pathName = path.join(process.cwd(), "posts");
  const files = await fs.readdir(pathName);

  const frontMatters = await Promise.all(
    files
      .filter(file => file.endsWith(".md"))
      .map(async (file) => {
        const filePath = path.join(pathName, file);
        const markdownWithMeta = await fs.readFile(filePath, "utf-8");

        const { data: metadata } = matter(markdownWithMeta);
        const slug = file.replace(".md", "");
        const frontMatter: FrontMatter = {
          title: metadata.title,
          date: metadata.date,
          author: metadata.author,
          excerpt: metadata.excerpt,
          slug: slug,
        };

        return frontMatter;
      }));

  return frontMatters
}
