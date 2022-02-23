export interface RightSiderState {
  content?: RightSiderContent
}

export interface RightSiderContent {
  title: string
  body: React.ReactNode
  footer?: string
  path: string
}
