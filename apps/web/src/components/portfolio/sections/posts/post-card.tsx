import { IconHeart, IconMessageCircle, IconSend } from "@tabler/icons-react"
import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Textarea } from "@workspace/ui/components/textarea"
import { cn } from "@workspace/ui/lib/utils"
import { useEffect, useMemo, useState } from "react"
import type { FormEvent } from "react"
import type { Post } from "@/data/portfolio"

type Comment = {
  id: string
  name: string
  body: string
  createdAt: string
}

type PostState = {
  supported: boolean
  supportCount: number
  comments: Comment[]
  lastCommentAt?: number
}

type StoredState = Record<string, PostState>

const STORAGE_KEY = "rald-folio-posts-v1"
const MAX_COMMENT_LENGTH = 280
const COMMENT_DELAY_MS = 4000

function readStoredState(): StoredState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as StoredState) : {}
  } catch {
    return {}
  }
}

function writeStoredState(state: StoredState) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

function defaultState(postId: string): PostState {
  return {
    supported: false,
    supportCount: postId.length + 7,
    comments: [],
  }
}

export function PostCard({ post }: { post: Post }) {
  const [state, setState] = useState<PostState>(() => defaultState(post.id))
  const [comment, setComment] = useState("")
  const [error, setError] = useState("")
  const formattedDate = useMemo(
    () =>
      new Intl.DateTimeFormat("en", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(new Date(post.date)),
    [post.date]
  )

  useEffect(() => {
    const stored = readStoredState()
    setState(stored[post.id] ?? defaultState(post.id))
  }, [post.id])

  function persist(nextState: PostState) {
    setState(nextState)
    const stored = readStoredState()
    writeStoredState({ ...stored, [post.id]: nextState })
  }

  function toggleSupport() {
    persist({
      ...state,
      supported: !state.supported,
      supportCount: state.supportCount + (state.supported ? -1 : 1),
    })
  }

  function submitComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const body = comment.trim().replace(/\s+/g, " ")
    const now = Date.now()

    if (!body) {
      setError("Write a short comment before posting.")
      return
    }

    if (body.length > MAX_COMMENT_LENGTH) {
      setError(`Keep comments under ${MAX_COMMENT_LENGTH} characters.`)
      return
    }

    if (state.lastCommentAt && now - state.lastCommentAt < COMMENT_DELAY_MS) {
      setError("Please wait a moment before adding another comment.")
      return
    }

    persist({
      ...state,
      lastCommentAt: now,
      comments: [
        {
          id: `${post.id}-${now}`,
          name: "Anonymous Guest",
          body,
          createdAt: new Date(now).toISOString(),
        },
        ...state.comments,
      ],
    })
    setComment("")
    setError("")
  }

  return (
    <Card className="bg-card/80">
      <CardHeader>
        <div className="flex items-start gap-3">
          <Avatar size="lg">
            <AvatarFallback>RH</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <CardTitle>{post.title}</CardTitle>
              <Badge variant="outline">{formattedDate}</Badge>
            </div>
            <p className="mt-2 text-xs leading-6 text-muted-foreground">{post.body}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <IconHeart className={cn("size-3.5", state.supported && "fill-current")} />
            {state.supportCount} support
          </span>
          <span className="inline-flex items-center gap-1">
            <IconMessageCircle className="size-3.5" />
            {state.comments.length} comments
          </span>
        </div>

        <form className="space-y-2" onSubmit={submitComment}>
          <label className="sr-only" htmlFor={`comment-${post.id}`}>
            Add anonymous comment
          </label>
          <Textarea
            id={`comment-${post.id}`}
            value={comment}
            maxLength={MAX_COMMENT_LENGTH}
            placeholder="Add a respectful anonymous comment..."
            aria-invalid={Boolean(error)}
            onChange={(event) => setComment(event.target.value)}
          />
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">
              {error || `${MAX_COMMENT_LENGTH - comment.length} characters left`}
            </p>
            <Button size="sm" type="submit">
              <IconSend />
              Comment
            </Button>
          </div>
        </form>

        {state.comments.length > 0 ? (
          <div className="space-y-2">
            {state.comments.map((item) => (
              <div
                key={item.id}
                className="border border-border bg-background/60 p-3 text-xs leading-6"
              >
                <div className="mb-1 flex flex-wrap items-center gap-2 text-muted-foreground">
                  <span className="font-medium text-foreground">{item.name}</span>
                  <span>{new Date(item.createdAt).toLocaleString()}</span>
                </div>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        ) : null}
      </CardContent>
      <CardFooter>
        <Button
          type="button"
          variant={state.supported ? "secondary" : "outline"}
          size="sm"
          onClick={toggleSupport}
        >
          <IconHeart className={cn(state.supported && "fill-current")} />
          {state.supported ? "Supported" : "Support"}
        </Button>
      </CardFooter>
    </Card>
  )
}
