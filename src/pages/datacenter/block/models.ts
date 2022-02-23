export interface BlockState {
  isSaving?: boolean
  isLoading?: boolean
  block?: BlockDetails
  blocks?: BlockDetails[]
  error?: BlockError
}

export interface BlockDetails extends BlockParams {
  id: number
}

export interface BlockParams {
  comment: string
  rack_id: number
  rack_pos: number
  u_size: number
}

export interface BlockError {
  message: string
}
