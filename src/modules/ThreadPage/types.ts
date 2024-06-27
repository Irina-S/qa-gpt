export type CreateThreadResponse = string

export interface CreateMessageInThreadRequest {
  thread_id: CreateThreadResponse
  content: string
}

export type CreateMessageInThreadResponse = string
