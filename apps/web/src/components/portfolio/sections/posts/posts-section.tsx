import { posts } from "@/data/portfolio"
import { PostCard } from "./post-card"
import { Section } from "../../shared/section"

export function PostsSection() {
  return (
    <Section
      id="posts"
      eyebrow="Thoughts"
      title="Short posts with lightweight support."
      description="Short notes on product, design, and engineering for people who want to understand how I think."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </Section>
  )
}
