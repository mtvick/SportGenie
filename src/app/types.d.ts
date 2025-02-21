declare module '@ai-sdk/openai' {
  export function openai(model: string): any
}

declare module '@ai-sdk/anthropic' {
  export function anthropic(model: string): any
}

declare module 'ai' {
  export interface Message {
    id: string
    role: 'system' | 'user' | 'assistant'
    content: string
  }

  export function convertToCoreMessages(messages: Message[]): any
  export function streamText(options: any): Promise<{ toDataStreamResponse: () => Response }>
  export function useChat(options: any): {
    messages: Message[]
    input: string
    handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    isLoading: boolean
    stop: () => void
  }
} 