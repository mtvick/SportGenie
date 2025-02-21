'use client'

import { FormEvent } from 'react'
import { Send as SendIcon, Square as StopIcon } from 'lucide-react'

interface InputFieldProps {
  input: string
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
  isLoading: boolean
  stop: () => void
}

export default function InputField({
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
  stop,
}: InputFieldProps) {
  return (
    <form onSubmit={handleSubmit} className="relative">
      <textarea
        value={input}
        onChange={handleInputChange}
        placeholder="Type your message..."
        rows={1}
        className="w-full p-4 pr-16 rounded-lg border focus:outline-none focus:border-blue-500 resize-none"
        style={{
          minHeight: '60px',
          maxHeight: '200px',
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            const form = e.currentTarget.form
            if (form) form.requestSubmit()
          }
        }}
      />
      <div className="absolute right-2 bottom-2">
        {isLoading ? (
          <button
            type="button"
            onClick={stop}
            className="p-2 text-gray-500 hover:text-gray-700 rounded-lg"
          >
            <StopIcon className="w-6 h-6" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={!input.trim()}
            className="p-2 text-blue-500 hover:text-blue-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <SendIcon className="w-6 h-6" />
          </button>
        )}
      </div>
    </form>
  )
} 