"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Brain,
  Search,
  Filter,
  MapPin,
  Clock,
  Calendar,
  Eye,
  MessageSquare,
  Upload,
  FileText,
  CheckCircle,
  Loader2,
  X,
} from "lucide-react"
import Link from "next/link"

interface Opportunity {
  id: string
  title: string
  organization: string
  department: string
  type: "Research" | "Internship" | "Training"
  location: string
  duration: string
  deadline: string
  match: number
  skills: string[]
  eligibility: string
  learningOutcomes: string[]
  status: "open" | "applied" | "closed"
  stipend: string
  description: string
  requirements: string[]
  applicationDeadline: string
  startDate: string
  contactEmail: string
}

interface ApplicationForm {
  coverLetter: string
  motivation: string
  relevantExperience: string
  availability: string
  additionalInfo: string
  documents: File[]
}

export default function OpportunitiesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterLocation, setFilterLocation] = useState("all")
  const [filterSkill, setFilterSkill] = useState("all")
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null)
  const [showApplicationDialog, setShowApplicationDialog] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState("")
  const [submitError, setSubmitError] = useState("")

  const [applicationForm, setApplicationForm] = useState<ApplicationForm>({
    coverLetter: "",
    motivation: "",
    relevantExperience: "",
    availability: "",
    additionalInfo: "",
    documents: [],
  })

  const opportunities: Opportunity[] = [
    {
      id: "1",
      title: "AI Research Internship",
      organization: "TechCorp Research Labs",
      department: "Computer Science",
      type: "Research",
      location: "Remote",
      duration: "3 months",
      deadline: "2024-02-15",
      match: 95,
      skills: ["Python", "Machine Learning", "TensorFlow", "Research"],
      eligibility: "CS/AI students, GPA 3.5+, programming experience required",
      learningOutcomes: ["Research methodology", "AI model development", "Technical writing", "Publication skills"],
      status: "open",
      stipend: "$2,000/month",
      description:
        "Join our cutting-edge AI research team to develop next-generation machine learning models for healthcare applications. You'll work alongside PhD researchers and contribute to publications in top-tier conferences.",
      requirements: [
        "Strong programming skills in Python",
        "Understanding of machine learning concepts",
        "Experience with TensorFlow or PyTorch",
        "Excellent written communication skills",
        "Ability to work independently",
      ],
      applicationDeadline: "2024-02-15",
      startDate: "2024-03-01",
      contactEmail: "research@techcorp.com",
    },
    {
      id: "2",
      title: "Frontend Development Training",
      organization: "StartupXYZ",
      department: "Engineering",
      type: "Training",
      location: "San Francisco, CA",
      duration: "6 weeks",
      deadline: "2024-02-20",
      match: 88,
      skills: ["React", "TypeScript", "Next.js", "CSS"],
      eligibility: "Web development experience required, portfolio preferred",
      learningOutcomes: ["Modern React patterns", "TypeScript proficiency", "Production deployment", "Code review"],
      status: "open",
      stipend: "Unpaid (Certificate provided)",
      description:
        "Intensive training program covering modern frontend development with React, TypeScript, and industry best practices. Includes mentorship from senior engineers and real project experience.",
      requirements: [
        "Basic knowledge of HTML, CSS, JavaScript",
        "Some experience with React",
        "Portfolio of previous projects",
        "Commitment to full-time training",
        "Located in SF Bay Area or willing to relocate",
      ],
      applicationDeadline: "2024-02-20",
      startDate: "2024-03-05",
      contactEmail: "training@startupxyz.com",
    },
    {
      id: "3",
      title: "Data Science Internship",
      organization: "University Research Center",
      department: "Statistics",
      type: "Internship",
      location: "Boston, MA",
      duration: "4 months",
      deadline: "2024-02-25",
      match: 92,
      skills: ["Python", "Statistics", "SQL", "Tableau", "R"],
      eligibility: "Statistics/Math majors, Junior/Senior level, strong analytical skills",
      learningOutcomes: ["Statistical analysis", "Data visualization", "Research presentation", "Industry tools"],
      status: "open",
      stipend: "$1,500/month",
      description:
        "Work with faculty on real-world data science projects, analyzing large datasets and presenting findings to stakeholders. Gain experience with industry-standard tools and methodologies.",
      requirements: [
        "Major in Statistics, Mathematics, or related field",
        "Proficiency in Python and R",
        "Understanding of statistical concepts",
        "Experience with data visualization",
        "Strong presentation skills",
      ],
      applicationDeadline: "2024-02-25",
      startDate: "2024-03-10",
      contactEmail: "datasci@university.edu",
    },
  ]

  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesSearch =
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
      opp.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = filterType === "all" || opp.type.toLowerCase() === filterType.toLowerCase()
    const matchesLocation =
      filterLocation === "all" ||
      opp.location.toLowerCase().includes(filterLocation.toLowerCase()) ||
      (filterLocation === "remote" && opp.location.toLowerCase().includes("remote"))
    const matchesSkill =
      filterSkill === "all" || opp.skills.some((skill) => skill.toLowerCase().includes(filterSkill.toLowerCase()))

    return matchesSearch && matchesType && matchesLocation && matchesSkill
  })

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setApplicationForm({
        ...applicationForm,
        documents: [...applicationForm.documents, ...newFiles],
      })
    }
  }

  const removeFile = (index: number) => {
    const newDocuments = applicationForm.documents.filter((_, i) => i !== index)
    setApplicationForm({ ...applicationForm, documents: newDocuments })
  }

  const validateApplication = (): boolean => {
    if (!applicationForm.coverLetter.trim()) {
      setSubmitError("Cover letter is required")
      return false
    }
    if (!applicationForm.motivation.trim()) {
      setSubmitError("Motivation statement is required")
      return false
    }
    if (!applicationForm.relevantExperience.trim()) {
      setSubmitError("Relevant experience is required")
      return false
    }
    if (applicationForm.documents.length === 0) {
      setSubmitError("Please upload at least one document (resume/CV)")
      return false
    }
    return true
  }

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError("")
    setSubmitSuccess("")

    if (!validateApplication()) return

    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock application submission
      const applicationData = {
        opportunityId: selectedOpportunity?.id,
        ...applicationForm,
        submittedAt: new Date().toISOString(),
        status: "submitted",
      }

      console.log("Application submitted:", applicationData)

      setSubmitSuccess("Application submitted successfully!")
      setTimeout(() => {
        setShowApplicationDialog(false)
        setApplicationForm({
          coverLetter: "",
          motivation: "",
          relevantExperience: "",
          availability: "",
          additionalInfo: "",
          documents: [],
        })
        setSubmitSuccess("")
      }, 2000)
    } catch (error) {
      setSubmitError("Failed to submit application. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleApplyClick = (opportunity: Opportunity) => {
    setSelectedOpportunity(opportunity)
    setShowApplicationDialog(true)
    setSubmitError("")
    setSubmitSuccess("")
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
            <Badge variant="secondary">Find Opportunities</Badge>
          </div>
          <Link href="/dashboard/student">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Discover Opportunities</h1>
          <p className="text-gray-600">
            Find internships, research projects, and training programs that match your interests
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="w-5 h-5 mr-2" />
              Search & Filter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-2">
                <Label htmlFor="search">Search</Label>
                <Input
                  id="search"
                  placeholder="Search by title, organization, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="type-filter">Type</Label>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                    <SelectItem value="research">Research</SelectItem>
                    <SelectItem value="training">Training</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="location-filter">Location</Label>
                <Select value={filterLocation} onValueChange={setFilterLocation}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="san francisco">San Francisco</SelectItem>
                    <SelectItem value="boston">Boston</SelectItem>
                    <SelectItem value="new york">New York</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="skill-filter">Skills</Label>
                <Select value={filterSkill} onValueChange={setFilterSkill}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Skills</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="react">React</SelectItem>
                    <SelectItem value="machine learning">Machine Learning</SelectItem>
                    <SelectItem value="statistics">Statistics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-gray-600">
            Found {filteredOpportunities.length} opportunities
            {searchQuery && ` for "${searchQuery}"`}
          </p>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Advanced Filters
          </Button>
        </div>

        {/* Opportunities List */}
        <div className="grid gap-6">
          {filteredOpportunities.map((opportunity) => (
            <Card key={opportunity.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{opportunity.title}</CardTitle>
                    <CardDescription className="text-base">
                      {opportunity.organization} • {opportunity.department}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={opportunity.match >= 90 ? "default" : "secondary"}>
                      {opportunity.match}% Match
                    </Badge>
                    {opportunity.status === "applied" && <Badge variant="outline">Applied</Badge>}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{opportunity.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    {opportunity.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-1" />
                    {opportunity.duration}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-1" />
                    Due: {opportunity.deadline}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Badge variant="outline">{opportunity.type}</Badge>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div>
                    <h4 className="font-medium text-sm text-gray-700 mb-1">Required Skills:</h4>
                    <div className="flex flex-wrap gap-2">
                      {opportunity.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm text-gray-700 mb-1">Eligibility:</h4>
                    <p className="text-sm text-gray-600">{opportunity.eligibility}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm text-gray-700 mb-1">Learning Outcomes:</h4>
                    <div className="flex flex-wrap gap-2">
                      {opportunity.learningOutcomes.map((outcome, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {outcome}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      Stipend: <strong>{opportunity.stipend}</strong>
                    </span>
                    <span className="text-gray-600">
                      Start Date: <strong>{opportunity.startDate}</strong>
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button onClick={() => handleApplyClick(opportunity)} disabled={opportunity.status === "applied"}>
                    {opportunity.status === "applied" ? "Applied" : "Apply Now"}
                  </Button>
                  <Button variant="outline">
                    <Eye className="w-4 h-4 mr-1" />
                    View Details
                  </Button>
                  <Button variant="outline">
                    <MessageSquare className="w-4 h-4 mr-1" />
                    Ask Questions
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredOpportunities.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No opportunities found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setFilterType("all")
                  setFilterLocation("all")
                  setFilterSkill("all")
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Application Dialog */}
      <Dialog open={showApplicationDialog} onOpenChange={setShowApplicationDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Apply for {selectedOpportunity?.title}</DialogTitle>
            <DialogDescription>
              {selectedOpportunity?.organization} • Complete the application form below
            </DialogDescription>
          </DialogHeader>

          {submitError && (
            <Alert className="border-red-200 bg-red-50">
              <AlertDescription className="text-red-700">{submitError}</AlertDescription>
            </Alert>
          )}

          {submitSuccess && (
            <Alert className="border-green-200 bg-green-50">
              <AlertDescription className="text-green-700">{submitSuccess}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmitApplication} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="cover-letter">Cover Letter *</Label>
              <Textarea
                id="cover-letter"
                placeholder="Write a compelling cover letter explaining why you're interested in this opportunity..."
                rows={6}
                value={applicationForm.coverLetter}
                onChange={(e) => setApplicationForm({ ...applicationForm, coverLetter: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="motivation">Motivation Statement *</Label>
              <Textarea
                id="motivation"
                placeholder="Explain your motivation and what you hope to achieve from this opportunity..."
                rows={4}
                value={applicationForm.motivation}
                onChange={(e) => setApplicationForm({ ...applicationForm, motivation: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="relevant-experience">Relevant Experience *</Label>
              <Textarea
                id="relevant-experience"
                placeholder="Describe your relevant experience, projects, and skills..."
                rows={4}
                value={applicationForm.relevantExperience}
                onChange={(e) => setApplicationForm({ ...applicationForm, relevantExperience: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="availability">Availability</Label>
              <Textarea
                id="availability"
                placeholder="Describe your availability, preferred start date, and any constraints..."
                rows={3}
                value={applicationForm.availability}
                onChange={(e) => setApplicationForm({ ...applicationForm, availability: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="additional-info">Additional Information</Label>
              <Textarea
                id="additional-info"
                placeholder="Any additional information you'd like to share..."
                rows={3}
                value={applicationForm.additionalInfo}
                onChange={(e) => setApplicationForm({ ...applicationForm, additionalInfo: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="documents">Upload Documents *</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <div className="text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">Upload your resume, portfolio, and other documents</p>
                  <Input
                    id="documents"
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Button type="button" variant="outline" onClick={() => document.getElementById("documents")?.click()}>
                    <Upload className="w-4 h-4 mr-2" />
                    Choose Files
                  </Button>
                </div>
              </div>

              {applicationForm.documents.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Uploaded Files:</p>
                  {applicationForm.documents.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{file.name}</span>
                        <span className="text-xs text-gray-500">({(file.size / 1024).toFixed(1)} KB)</span>
                      </div>
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(index)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="terms" required />
              <Label htmlFor="terms" className="text-sm">
                I confirm that all information provided is accurate and I agree to the terms and conditions
              </Label>
            </div>

            <div className="flex items-center justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowApplicationDialog(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Submit Application
                  </>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
