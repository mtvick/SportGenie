'use client'

import { Message } from 'ai'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { useState } from 'react'
import { Components } from 'react-markdown'
import type { SyntaxHighlighterProps } from 'react-syntax-highlighter'

interface MessageListProps {
  messages: Omit<Message, 'id'>[]  // Remove id requirement since it's not always present
}

export default function MessageList({ messages }: MessageListProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (err) {
      console.error('Failed to copy text:', err)
    }
  }

  const components: Components = {
    code({ className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '')
      const syntaxProps: SyntaxHighlighterProps = {
        style: atomDark,
        language: match?.[1] || 'text',
        PreTag: 'div',
        children: String(children).replace(/\n$/, '')
      }

      return match ? (
        <SyntaxHighlighter {...syntaxProps} />
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      )
    }
  }

  return (
    <div className="space-y-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${
            message.role === 'assistant'
              ? 'bg-gray-100'
              : 'bg-blue-50'
          } rounded-lg p-4`}
        >
          <div className="flex-shrink-0 w-8 h-8">
            {message.role === 'assistant' ? (
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-white text-sm">AI</span>
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                <span className="text-white text-sm">You</span>
              </div>
            )}
          </div>
          <div className="ml-4 flex-1">
            <div className="prose max-w-none dark:prose-invert">
              <ReactMarkdown components={components}>
                {message.content}
              </ReactMarkdown>
            </div>
            <button
              onClick={() => copyToClipboard(message.content, index)}
              className="text-sm text-gray-500 hover:text-gray-700 mt-2"
            >
              {copiedIndex === index ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
} 