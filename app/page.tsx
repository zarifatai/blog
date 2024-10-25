import PostsOverview from "@/app/ui/PostsOverview";

export default function Home() {
  return (
    <div className="container">
      <div className="title">
        <h1>{"Zarif's blog"}</h1>
      </div>
      <PostsOverview />
    </div>
  );
}
