'use client'

import { useChat } from 'ai/react'
import { useState, useEffect, useRef } from 'react'
import MessageList from './MessageList'
import InputField from './InputField'
import ModelSelector from './ModelSelector'
import Image from 'next/image'

export type Model = 'gpt-4' | 'claude-3-sonnet'

export default function ChatInterface() {
  const [model, setModel] = useState<Model>(() => {
    // Get the saved model from localStorage or default to gpt-4
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('selectedModel') as Model) || 'gpt-4'
    }
    return 'gpt-4'
  })

  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } = useChat({
    api: `/api/${model === 'gpt-4' ? 'openai' : 'anthropic'}/chat`,
  })

  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Save model selection to localStorage
  useEffect(() => {
    localStorage.setItem('selectedModel', model)
  }, [model])

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex flex-col h-screen max-w-5xl mx-auto">
      <div className="flex flex-col items-center p-6 border-b space-y-6">
        <div className="grid grid-cols-3 w-full items-center">
          <div /> {/* Left spacer */}
          <h1 className="text-4xl font-bold text-center">SportGenie</h1>
          <div className="flex justify-end">
            <ModelSelector model={model} setModel={setModel} />
          </div>
        </div>
        <Image
          src="/images/SportGenieLogo.jpeg"
          alt="SportGenie Logo"
          width={160}
          height={160}
          className="rounded-full object-cover"
          priority
        />
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <MessageList messages={messages} />
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t p-4">
        <InputField
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          stop={stop}
        />
      </div>
    </div>
  )
} 