export type PreferredTheme = "light" | "dark" | "system"

export type Placement = "top" | "bottom" | "left" | "right"

export type Tag = {
  name: string
  count: number
}

export type BlogPost = {
  id: string
  title: string
  tags: string[]
  createdAt: string
  url: string
  path: string
}
