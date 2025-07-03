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

interface JobForm {
  title: string
  type: string
  department: string
  description: string
  responsibilities: string[]
  requirements: string[]
  qualifications: string[]
  skills: string[]
  location: string
  workType: string
  duration: string
  salary: string
  benefits: string[]
  applicationDeadline: string
  startDate: string
  endDate: string
  positions: string
  experienceLevel: string
  educationLevel: string
  companyInfo: string
  contactEmail: string
  applicationProcess: string
  additionalInfo: string
  isRemote: boolean
  requiresVisa: boolean
  providesRelocation: boolean
  offersFullTime: boolean
}

export default function PostJobPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSavingDraft, setIsSavingDraft] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState("")
  const [submitError, setSubmitError] = useState("")

  const [form, setForm] = useState<JobForm>({
    title: "",
    type: "",
    department: "",
    description: "",
    responsibilities: [""],
    requirements: [""],
    qualifications: [""],
    skills: [""],
    location: "",
    workType: "",
    duration: "",
    salary: "",
    benefits: [""],
    applicationDeadline: "",
    startDate: "",
    endDate: "",
    positions: "",
    experienceLevel: "",
    educationLevel: "",
    companyInfo: "",
    contactEmail: "",
    applicationProcess: "",
    additionalInfo: "",
    isRemote: false,
    requiresVisa: false,
    providesRelocation: false,
    offersFullTime: false,
  })

  const [newResponsibility, setNewResponsibility] = useState("")
  const [newRequirement, setNewRequirement] = useState("")
  const [newQualification, setNewQualification] = useState("")
  const [newSkill, setNewSkill] = useState("")
  const [newBenefit, setNewBenefit] = useState("")

  const addResponsibility = () => {
    if (newResponsibility.trim()) {
      setForm({
        ...form,
        responsibilities: [...form.responsibilities.filter((r) => r.trim()), newResponsibility.trim()],
      })
      setNewResponsibility("")
    }
  }

  const removeResponsibility = (index: number) => {
    setForm({
      ...form,
      responsibilities: form.responsibilities.filter((_, i) => i !== index),
    })
  }

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

  const addQualification = () => {
    if (newQualification.trim()) {
      setForm({
        ...form,
        qualifications: [...form.qualifications.filter((q) => q.trim()), newQualification.trim()],
      })
      setNewQualification("")
    }
  }

  const removeQualification = (index: number) => {
    setForm({
      ...form,
      qualifications: form.qualifications.filter((_, i) => i !== index),
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

  const addBenefit = () => {
    if (newBenefit.trim()) {
      setForm({
        ...form,
        benefits: [...form.benefits.filter((b) => b.trim()), newBenefit.trim()],
      })
      setNewBenefit("")
    }
  }

  const removeBenefit = (index: number) => {
    setForm({
      ...form,
      benefits: form.benefits.filter((_, i) => i !== index),
    })
  }

  const validateForm = (): boolean => {
    if (!form.title.trim()) {
      setSubmitError("Job title is required")
      return false
    }
    if (!form.type) {
      setSubmitError("Job type is required")
      return false
    }
    if (!form.description.trim()) {
      setSubmitError("Job description is required")
      return false
    }
    if (!form.location.trim() && !form.isRemote) {
      setSubmitError("Location is required for non-remote positions")
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
    if (form.responsibilities.filter((r) => r.trim()).length === 0) {
      setSubmitError("At least one responsibility is required")
      return false
    }
    if (form.requirements.filter((r) => r.trim()).length === 0) {
      setSubmitError("At least one requirement is required")
      return false
    }
    if (form.skills.filter((s) => s.trim()).length === 0) {
      setSubmitError("At least one skill is required")
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

      const jobData = {
        ...form,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        status: "active",
        applications: 0,
        responsibilities: form.responsibilities.filter((r) => r.trim()),
        requirements: form.requirements.filter((r) => r.trim()),
        qualifications: form.qualifications.filter((q) => q.trim()),
        skills: form.skills.filter((s) => s.trim()),
        benefits: form.benefits.filter((b) => b.trim()),
      }

      console.log("Job posted:", jobData)

      setSubmitSuccess("Job posted successfully!")
      setTimeout(() => {
        router.push("/dashboard/organization")
      }, 2000)
    } catch (error) {
      setSubmitError("Failed to post job. Please try again.")
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
              <span className="text-xl font-bold">TalentSync</span>
            </Link>
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              Post New Job
            </Badge>
          </div>
          <Link href="/dashboard/organization">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Post New Job</h1>
          <p className="text-gray-600">Create a new job posting to attract top talent from universities</p>
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
              <CardTitle>Job Details</CardTitle>
              <CardDescription>Provide the essential information about the position</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Senior Software Engineer Intern"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Job Type *</Label>
                  <Select value={form.type} onValueChange={(value) => setForm({ ...form, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="internship">Internship</SelectItem>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="co-op">Co-op</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    placeholder="e.g., Engineering, Marketing, Data Science"
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="positions">Number of Positions</Label>
                  <Input
                    id="positions"
                    type="number"
                    placeholder="e.g., 3"
                    value={form.positions}
                    onChange={(e) => setForm({ ...form, positions: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Job Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Provide a comprehensive description of the role, what the intern/employee will do, and the impact they'll have..."
                  rows={6}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company-info">About the Company</Label>
                <Textarea
                  id="company-info"
                  placeholder="Brief description of your company, culture, and what makes it a great place to work..."
                  rows={4}
                  value={form.companyInfo}
                  onChange={(e) => setForm({ ...form, companyInfo: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Responsibilities */}
          <Card>
            <CardHeader>
              <CardTitle>Responsibilities</CardTitle>
              <CardDescription>What will the person be responsible for?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Key Responsibilities *</Label>
                <div className="space-y-2">
                  {form.responsibilities
                    .filter((r) => r.trim())
                    .map((responsibility, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Badge variant="outline" className="flex-1 justify-start">
                          {responsibility}
                        </Badge>
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeResponsibility(index)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="Add a responsibility..."
                      value={newResponsibility}
                      onChange={(e) => setNewResponsibility(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addResponsibility())}
                    />
                    <Button type="button" onClick={addResponsibility}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Requirements & Qualifications */}
          <Card>
            <CardHeader>
              <CardTitle>Requirements & Qualifications</CardTitle>
              <CardDescription>What are you looking for in candidates?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="experience-level">Experience Level</Label>
                  <Select
                    value={form.experienceLevel}
                    onValueChange={(value) => setForm({ ...form, experienceLevel: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entry">Entry Level</SelectItem>
                      <SelectItem value="junior">Junior (1-2 years)</SelectItem>
                      <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
                      <SelectItem value="senior">Senior (5+ years)</SelectItem>
                      <SelectItem value="student">Student/Intern</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="education-level">Education Level</Label>
                  <Select
                    value={form.educationLevel}
                    onValueChange={(value) => setForm({ ...form, educationLevel: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select education level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high-school">High School</SelectItem>
                      <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                      <SelectItem value="masters">Master's Degree</SelectItem>
                      <SelectItem value="phd">PhD</SelectItem>
                      <SelectItem value="any">Any</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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
                <Label>Preferred Qualifications</Label>
                <div className="space-y-2">
                  {form.qualifications
                    .filter((q) => q.trim())
                    .map((qualification, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Badge variant="secondary" className="flex-1 justify-start">
                          {qualification}
                        </Badge>
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeQualification(index)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="Add a preferred qualification..."
                      value={newQualification}
                      onChange={(e) => setNewQualification(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addQualification())}
                    />
                    <Button type="button" onClick={addQualification}>
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

          {/* Location & Work Details */}
          <Card>
            <CardHeader>
              <CardTitle>Location & Work Details</CardTitle>
              <CardDescription>Where and how will the work be done?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="e.g., San Francisco, CA"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="work-type">Work Type</Label>
                  <Select value={form.workType} onValueChange={(value) => setForm({ ...form, workType: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select work type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="onsite">On-site</SelectItem>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    placeholder="e.g., 3 months, Permanent"
                    value={form.duration}
                    onChange={(e) => setForm({ ...form, duration: e.target.value })}
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

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="is-remote"
                    checked={form.isRemote}
                    onCheckedChange={(checked) => setForm({ ...form, isRemote: checked as boolean })}
                  />
                  <Label htmlFor="is-remote">Remote work available</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="requires-visa"
                    checked={form.requiresVisa}
                    onCheckedChange={(checked) => setForm({ ...form, requiresVisa: checked as boolean })}
                  />
                  <Label htmlFor="requires-visa">Visa sponsorship required</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="provides-relocation"
                    checked={form.providesRelocation}
                    onCheckedChange={(checked) => setForm({ ...form, providesRelocation: checked as boolean })}
                  />
                  <Label htmlFor="provides-relocation">Relocation assistance provided</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="offers-full-time"
                    checked={form.offersFullTime}
                    onCheckedChange={(checked) => setForm({ ...form, offersFullTime: checked as boolean })}
                  />
                  <Label htmlFor="offers-full-time">Potential for full-time offer</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Compensation & Benefits */}
          <Card>
            <CardHeader>
              <CardTitle>Compensation & Benefits</CardTitle>
              <CardDescription>What are you offering?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="salary">Salary/Compensation</Label>
                <Input
                  id="salary"
                  placeholder="e.g., $4,000/month, $80,000-$120,000/year, Competitive"
                  value={form.salary}
                  onChange={(e) => setForm({ ...form, salary: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Benefits & Perks</Label>
                <div className="space-y-2">
                  {form.benefits
                    .filter((b) => b.trim())
                    .map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Badge variant="outline" className="flex-1 justify-start">
                          {benefit}
                        </Badge>
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeBenefit(index)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="Add a benefit..."
                      value={newBenefit}
                      onChange={(e) => setNewBenefit(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addBenefit())}
                    />
                    <Button type="button" onClick={addBenefit}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Application Process */}
          <Card>
            <CardHeader>
              <CardTitle>Application Process</CardTitle>
              <CardDescription>How should candidates apply?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
                <Label htmlFor="contact-email">Contact Email</Label>
                <Input
                  id="contact-email"
                  type="email"
                  placeholder="hr@company.com"
                  value={form.contactEmail}
                  onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="application-process">Application Process</Label>
                <Textarea
                  id="application-process"
                  placeholder="Describe the application process, interview stages, timeline, etc..."
                  rows={4}
                  value={form.applicationProcess}
                  onChange={(e) => setForm({ ...form, applicationProcess: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="additional-info">Additional Information</Label>
                <Textarea
                  id="additional-info"
                  placeholder="Any other information candidates should know..."
                  rows={3}
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
                  Posting Job...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Post Job
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
