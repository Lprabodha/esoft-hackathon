import { AICVGenerator } from "@/components/ai-cv-generator"

export default function CVGeneratorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI CV Generator</h1>
          <p className="text-gray-600">Create a professional CV automatically using AI</p>
        </div>
        <AICVGenerator />
      </div>
    </div>
  )
}
