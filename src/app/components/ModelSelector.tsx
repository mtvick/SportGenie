'use client'

import { Model } from './ChatInterface'

interface ModelSelectorProps {
  model: Model
  setModel: (model: Model) => void
}

export default function ModelSelector({ model, setModel }: ModelSelectorProps) {
  return (
    <div className="flex items-center space-x-2">
      <label className="text-sm text-gray-600">Model:</label>
      <select
        value={model}
        onChange={(e) => setModel(e.target.value as Model)}
        className="p-2 rounded-lg border focus:outline-none focus:border-blue-500"
      >
        <option value="gpt-4">GPT-4</option>
        <option value="claude-3-sonnet">Claude 3 Sonnet</option>
      </select>
    </div>
  )
} 