"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Brain, Plus, Eye, Save, Loader2, X, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface OpportunityForm {
  title: string
  type: string
  description: string
  eligibility: string
  requirements: string[]
  learningOutcomes: string[]
  skills: string[]
  duration: string
  location: string
  stipend: string
  applicationDeadline: string
  startDate: string
  endDate: string
  maxStudents: string
  department: string
  contactEmail: string
  additionalInfo: string
  isRemote: boolean
  requiresInterview: boolean
  provideCertificate: boolean
}

export default function CreateOpportunityPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSavingDraft, setIsSavingDraft] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState("")
  const [submitError, setSubmitError] = useState("")

  const [form, setForm] = useState<OpportunityForm>({
    title: "",
    type: "",
    description: "",
    eligibility: "",
    requirements: [""],
    learningOutcomes: [""],
    skills: [""],
    duration: "",
    location: "",
    stipend: "",
    applicationDeadline: "",
    startDate: "",
    endDate: "",
    maxStudents: "",
    department: "",
    contactEmail: "",
    additionalInfo: "",
    isRemote: false,
    requiresInterview: false,
    provideCertificate: false,
  })

  const [newRequirement, setNewRequirement] = useState("")
  const [newOutcome, setNewOutcome] = useState("")
  const [newSkill, setNewSkill] = useState("")

  const addRequirement = () => {
    if (newRequirement.trim()) {
      setForm({
        ...form,
        requirements: [...form.requirements.filter((r) => r.trim()), newRequirement.trim()],
      })
      setNewRequirement("")
    }
  }

  const removeRequirement = (index: number) => {
    setForm({
      ...form,
      requirements: form.requirements.filter((_, i) => i !== index),
    })
  }

  const addLearningOutcome = () => {
    if (newOutcome.trim()) {
      setForm({
        ...form,
        learningOutcomes: [...form.learningOutcomes.filter((o) => o.trim()), newOutcome.trim()],
      })
      setNewOutcome("")
    }
  }

  const removeLearningOutcome = (index: number) => {
    setForm({
      ...form,
      learningOutcomes: form.learningOutcomes.filter((_, i) => i !== index),
    })
  }

  const addSkill = () => {
    if (newSkill.trim()) {
      setForm({
        ...form,
        skills: [...form.skills.filter((s) => s.trim()), newSkill.trim()],
      })
      setNewSkill("")
    }
  }

  const removeSkill = (index: number) => {
    setForm({
      ...form,
      skills: form.skills.filter((_, i) => i !== index),
    })
  }

  const validateForm = (): boolean => {
    if (!form.title.trim()) {
      setSubmitError("Title is required")
      return false
    }
    if (!form.type) {
      setSubmitError("Type is required")
      return false
    }
    if (!form.description.trim()) {
      setSubmitError("Description is required")
      return false
    }
    if (!form.eligibility.trim()) {
      setSubmitError("Eligibility criteria is required")
      return false
    }
    if (!form.duration.trim()) {
      setSubmitError("Duration is required")
      return false
    }
    if (!form.applicationDeadline) {
      setSubmitError("Application deadline is required")
      return false
    }
    if (!form.startDate) {
      setSubmitError("Start date is required")
      return false
    }
    if (form.requirements.filter((r) => r.trim()).length === 0) {
      setSubmitError("At least one requirement is needed")
      return false
    }
    if (form.learningOutcomes.filter((o) => o.trim()).length === 0) {
      setSubmitError("At least one learning outcome is needed")
      return false
    }
    if (form.skills.filter((s) => s.trim()).length === 0) {
      setSubmitError("At least one skill is needed")
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError("")
    setSubmitSuccess("")

    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const opportunityData = {
        ...form,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        status: "active",
        applications: 0,
        requirements: form.requirements.filter((r) => r.trim()),
        learningOutcomes: form.learningOutcomes.filter((o) => o.trim()),
        skills: form.skills.filter((s) => s.trim()),
      }

      console.log("Opportunity created:", opportunityData)

      setSubmitSuccess("Opportunity created successfully!")
      setTimeout(() => {
        router.push("/dashboard/faculty")
      }, 2000)
    } catch (error) {
      setSubmitError("Failed to create opportunity. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSaveDraft = async () => {
    setIsSavingDraft(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const draftData = {
        ...form,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        status: "draft",
      }

      console.log("Draft saved:", draftData)
      setSubmitSuccess("Draft saved successfully!")
      setTimeout(() => setSubmitSuccess(""), 3000)
    } catch (error) {
      setSubmitError("Failed to save draft.")
    } finally {
      setIsSavingDraft(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">AI TalentTrack</span>
            </Link>
            <Badge variant="secondary" className="bg-purple-100 text-purple-700">
              Create Opportunity
            </Badge>
          </div>
          <Link href="/dashboard/faculty">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Opportunity</h1>
          <p className="text-gray-600">Post a new research project, internship, or training program for students</p>
        </div>

        {submitError && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertDescription className="text-red-700">{submitError}</AlertDescription>
          </Alert>
        )}

        {submitSuccess && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <AlertDescription className="text-green-700">{submitSuccess}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Provide the essential details about your opportunity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Machine Learning Research Project"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Type *</Label>
                  <Select value={form.type} onValueChange={(value) => setForm({ ...form, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select opportunity type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="research">Research Project</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                      <SelectItem value="training">Training Program</SelectItem>
                      <SelectItem value="workshop">Workshop</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Provide a detailed description of the opportunity, what students will do, and what they'll learn..."
                  rows={6}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    placeholder="e.g., Computer Science"
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Contact Email</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="your.email@university.edu"
                    value={form.contactEmail}
                    onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Requirements and Eligibility */}
          <Card>
            <CardHeader>
              <CardTitle>Requirements & Eligibility</CardTitle>
              <CardDescription>Define who can apply and what's required</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="eligibility">Eligibility Criteria *</Label>
                <Textarea
                  id="eligibility"
                  placeholder="e.g., CS/AI students, GPA 3.5+, programming experience required..."
                  rows={3}
                  value={form.eligibility}
                  onChange={(e) => setForm({ ...form, eligibility: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Requirements *</Label>
                <div className="space-y-2">
                  {form.requirements
                    .filter((r) => r.trim())
                    .map((requirement, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Badge variant="outline" className="flex-1 justify-start">
                          {requirement}
                        </Badge>
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeRequirement(index)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="Add a requirement..."
                      value={newRequirement}
                      onChange={(e) => setNewRequirement(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addRequirement())}
                    />
                    <Button type="button" onClick={addRequirement}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Required Skills *</Label>
                <div className="space-y-2">
                  {form.skills
                    .filter((s) => s.trim())
                    .map((skill, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Badge variant="secondary" className="flex-1 justify-start">
                          {skill}
                        </Badge>
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeSkill(index)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="Add a skill..."
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                    />
                    <Button type="button" onClick={addSkill}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Learning Outcomes */}
          <Card>
            <CardHeader>
              <CardTitle>Learning Outcomes</CardTitle>
              <CardDescription>What will students learn and achieve?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Learning Outcomes *</Label>
                <div className="space-y-2">
                  {form.learningOutcomes
                    .filter((o) => o.trim())
                    .map((outcome, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Badge variant="outline" className="flex-1 justify-start">
                          {outcome}
                        </Badge>
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeLearningOutcome(index)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="Add a learning outcome..."
                      value={newOutcome}
                      onChange={(e) => setNewOutcome(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addLearningOutcome())}
                    />
                    <Button type="button" onClick={addLearningOutcome}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Logistics */}
          <Card>
            <CardHeader>
              <CardTitle>Logistics & Timeline</CardTitle>
              <CardDescription>When and where will this opportunity take place?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration *</Label>
                  <Input
                    id="duration"
                    placeholder="e.g., 3 months, 10 weeks"
                    value={form.duration}
                    onChange={(e) => setForm({ ...form, duration: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-students">Max Students</Label>
                  <Input
                    id="max-students"
                    type="number"
                    placeholder="e.g., 5"
                    value={form.maxStudents}
                    onChange={(e) => setForm({ ...form, maxStudents: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stipend">Stipend/Compensation</Label>
                  <Input
                    id="stipend"
                    placeholder="e.g., $2000/month, Unpaid"
                    value={form.stipend}
                    onChange={(e) => setForm({ ...form, stipend: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="application-deadline">Application Deadline *</Label>
                  <Input
                    id="application-deadline"
                    type="date"
                    value={form.applicationDeadline}
                    onChange={(e) => setForm({ ...form, applicationDeadline: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="start-date">Start Date *</Label>
                  <Input
                    id="start-date"
                    type="date"
                    value={form.startDate}
                    onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-date">End Date</Label>
                  <Input
                    id="end-date"
                    type="date"
                    value={form.endDate}
                    onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="e.g., University Campus, Remote, Hybrid"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="is-remote"
                    checked={form.isRemote}
                    onCheckedChange={(checked) => setForm({ ...form, isRemote: checked as boolean })}
                  />
                  <Label htmlFor="is-remote">This is a remote opportunity</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="requires-interview"
                    checked={form.requiresInterview}
                    onCheckedChange={(checked) => setForm({ ...form, requiresInterview: checked as boolean })}
                  />
                  <Label htmlFor="requires-interview">Requires interview process</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="provide-certificate"
                    checked={form.provideCertificate}
                    onCheckedChange={(checked) => setForm({ ...form, provideCertificate: checked as boolean })}
                  />
                  <Label htmlFor="provide-certificate">Provide completion certificate</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
              <CardDescription>Any other details students should know</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="additional-info">Additional Information</Label>
                <Textarea
                  id="additional-info"
                  placeholder="Any additional details, special requirements, or information for applicants..."
                  rows={4}
                  value={form.additionalInfo}
                  onChange={(e) => setForm({ ...form, additionalInfo: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-4 pt-6">
            <Button type="button" variant="outline" onClick={handleSaveDraft} disabled={isSubmitting || isSavingDraft}>
              {isSavingDraft ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving Draft...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save as Draft
                </>
              )}
            </Button>

            <Button type="button" variant="outline" disabled={isSubmitting || isSavingDraft}>
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>

            <Button type="submit" disabled={isSubmitting || isSavingDraft}>
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating Opportunity...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Create Opportunity
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
