export interface FrontMatter {
  title: string;
  date: string;
  author: string;
  excerpt: string;
}

export interface Article {
  frontMatter: FrontMatter;
  content: string | Promise<string>;
  slug: string;
}

