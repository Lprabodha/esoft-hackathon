"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Brain, Download, Eye, Sparkles, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

interface StudentProfile {
  name: string
  email: string
  phone: string
  education: string
  skills: string[]
  projects: string[]
  experience: string[]
  achievements: string[]
}

export function AICVGenerator() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedCV, setGeneratedCV] = useState("")
  const [customPrompt, setCustomPrompt] = useState("")

  // Mock student profile data
  const studentProfile: StudentProfile = {
    name: "John Smith",
    email: "john.smith@university.edu",
    phone: "+1 (555) 123-4567",
    education: "Bachelor of Science in Computer Science, University of Technology (2021-2025)",
    skills: ["Python", "JavaScript", "React", "Node.js", "Machine Learning", "SQL", "Git"],
    projects: [
      "E-commerce Web Application - Built with React and Node.js",
      "Machine Learning Stock Predictor - Python, TensorFlow",
      "Mobile Task Manager - React Native, Firebase",
    ],
    experience: [
      "Software Development Intern at TechStart (Summer 2023)",
      "Teaching Assistant for Data Structures Course (Fall 2023)",
    ],
    achievements: [
      "Dean's List for 3 consecutive semesters",
      "Winner of University Hackathon 2023",
      "Published research paper on ML applications",
    ],
  }

  const generateCV = async () => {
    setIsGenerating(true)
    try {
      const prompt = `
        Generate a professional CV/resume for the following student profile:
        
        Name: ${studentProfile.name}
        Email: ${studentProfile.email}
        Phone: ${studentProfile.phone}
        Education: ${studentProfile.education}
        Skills: ${studentProfile.skills.join(", ")}
        Projects: ${studentProfile.projects.join("; ")}
        Experience: ${studentProfile.experience.join("; ")}
        Achievements: ${studentProfile.achievements.join("; ")}
        
        ${customPrompt ? `Additional requirements: ${customPrompt}` : ""}
        
        Create a well-structured, professional CV with proper formatting. Include sections for:
        - Contact Information
        - Professional Summary
        - Education
        - Technical Skills
        - Projects
        - Experience
        - Achievements
        
        Make it ATS-friendly and highlight the most relevant skills for tech roles.
      `

      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: prompt,
        system:
          "You are a professional CV writer specializing in creating compelling resumes for students and new graduates in technology fields.",
      })

      setGeneratedCV(text)
    } catch (error) {
      console.error("Error generating CV:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="w-5 h-5 mr-2 text-purple-600" />
            AI CV Generator
          </CardTitle>
          <CardDescription>Generate a professional CV automatically from your profile using AI</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Profile Summary</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-blue-700 font-medium">Skills:</span> {studentProfile.skills.length} verified
              </div>
              <div>
                <span className="text-blue-700 font-medium">Projects:</span> {studentProfile.projects.length} completed
              </div>
              <div>
                <span className="text-blue-700 font-medium">Experience:</span> {studentProfile.experience.length}{" "}
                positions
              </div>
              <div>
                <span className="text-blue-700 font-medium">Achievements:</span> {studentProfile.achievements.length}{" "}
                awards
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="custom-prompt">Custom Requirements (Optional)</Label>
            <Textarea
              id="custom-prompt"
              placeholder="e.g., Focus on machine learning skills, emphasize leadership experience, target software engineering roles..."
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Button onClick={generateCV} disabled={isGenerating}>
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating CV...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate AI CV
                </>
              )}
            </Button>
            {generatedCV && (
              <>
                <Button variant="outline">
                  <Eye className="w-4 h-4 mr-1" />
                  Preview
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-1" />
                  Download PDF
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {generatedCV && (
        <Card>
          <CardHeader>
            <CardTitle>Generated CV</CardTitle>
            <CardDescription>Your AI-generated professional CV</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-white border rounded-lg p-6 max-h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap text-sm font-mono">{generatedCV}</pre>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Badge variant="default" className="bg-green-100 text-green-700">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  ATS Optimized
                </Badge>
                <Badge variant="secondary">Professional Format</Badge>
              </div>
              <div className="text-sm text-gray-500">Generated with AI • Ready to download</div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">CV Optimization Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 mb-2">94%</div>
            <Progress value={94} className="h-2 mb-2" />
            <p className="text-xs text-gray-500">Excellent keyword optimization</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Match Potential</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600 mb-2">High</div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-gray-600">Ready for tech roles</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">AI Recommendations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center p-3 bg-green-50 rounded-lg">
            <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
            <span className="text-sm">Strong technical skills section with relevant keywords</span>
          </div>
          <div className="flex items-center p-3 bg-blue-50 rounded-lg">
            <CheckCircle className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
            <span className="text-sm">Projects showcase practical application of skills</span>
          </div>
          <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
            <AlertCircle className="w-4 h-4 text-yellow-600 mr-2 flex-shrink-0" />
            <span className="text-sm">Consider adding more quantifiable achievements</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
