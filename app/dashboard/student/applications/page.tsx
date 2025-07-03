"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  Search,
  Eye,
  MessageSquare,
  Upload,
  FileText,
  Calendar,
  Clock,
  Building2,
  CheckCircle,
  AlertCircle,
  XCircle,
} from "lucide-react"
import Link from "next/link"

interface Application {
  id: number
  opportunity_id: number
  opportunity_title: string
  organization_name: string
  department: string
  application_status: "applied" | "under_review" | "shortlisted" | "interview" | "accepted" | "rejected" | "withdrawn"
  applied_at: string
  cover_letter_url: string
  submission_details: any
  interview_date?: string
  feedback?: string
  next_step?: string
  progress_percentage: number
}

export default function ApplicationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [sortBy, setSortBy] = useState("applied_date")

  const applications: Application[] = [
    {
      id: 1,
      opportunity_id: 1,
      opportunity_title: "AI Research Internship",
      organization_name: "TechCorp Research Labs",
      department: "Computer Science",
      application_status: "interview",
      applied_at: "2025-01-10T14:20:00Z",
      cover_letter_url: "/documents/cover_letter_1.pdf",
      submission_details: { research_interests: "Computer Vision, NLP" },
      interview_date: "2025-02-05T10:00:00Z",
      next_step: "Technical Interview",
      progress_percentage: 75,
    },
    {
      id: 2,
      opportunity_id: 2,
      opportunity_title: "Frontend Development Internship",
      organization_name: "StartupXYZ",
      department: "Engineering",
      application_status: "under_review",
      applied_at: "2025-01-15T10:30:00Z",
      cover_letter_url: "/documents/cover_letter_2.pdf",
      submission_details: { portfolio_url: "https://portfolio.example.com" },
      next_step: "Portfolio Review",
      progress_percentage: 50,
    },
    {
      id: 3,
      opportunity_id: 3,
      opportunity_title: "Data Science Training Program",
      organization_name: "University Research Center",
      department: "Statistics",
      application_status: "accepted",
      applied_at: "2025-01-05T09:15:00Z",
      cover_letter_url: "/documents/cover_letter_3.pdf",
      submission_details: { gpa: 3.8, relevant_courses: ["Statistics", "Machine Learning"] },
      feedback: "Excellent academic background and strong motivation. Welcome to the program!",
      progress_percentage: 100,
    },
    {
      id: 4,
      opportunity_id: 4,
      opportunity_title: "Software Engineering Internship",
      organization_name: "Tech Solutions Inc",
      department: "Development",
      application_status: "rejected",
      applied_at: "2025-01-08T16:45:00Z",
      cover_letter_url: "/documents/cover_letter_4.pdf",
      submission_details: { github_profile: "https://github.com/student" },
      feedback: "Strong technical skills but looking for candidates with more industry experience.",
      progress_percentage: 25,
    },
  ]

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.opportunity_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.organization_name.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = filterStatus === "all" || app.application_status === filterStatus

    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-700 border-green-200"
      case "interview":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "shortlisted":
        return "bg-purple-100 text-purple-700 border-purple-200"
      case "under_review":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "rejected":
        return "bg-red-100 text-red-700 border-red-200"
      case "withdrawn":
        return "bg-gray-100 text-gray-700 border-gray-200"
      default:
        return "bg-blue-100 text-blue-700 border-blue-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "accepted":
        return <CheckCircle className="w-4 h-4" />
      case "interview":
        return <Calendar className="w-4 h-4" />
      case "shortlisted":
        return <Eye className="w-4 h-4" />
      case "under_review":
        return <Clock className="w-4 h-4" />
      case "rejected":
        return <XCircle className="w-4 h-4" />
      case "withdrawn":
        return <AlertCircle className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  const applicationStats = {
    total: applications.length,
    pending: applications.filter((a) => ["applied", "under_review", "shortlisted"].includes(a.application_status))
      .length,
    interviews: applications.filter((a) => a.application_status === "interview").length,
    accepted: applications.filter((a) => a.application_status === "accepted").length,
    rejected: applications.filter((a) => a.application_status === "rejected").length,
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
            <Badge variant="secondary">My Applications</Badge>
          </div>
          <Link href="/dashboard/student">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Applications</h1>
          <p className="text-gray-600">Track the status of your opportunity applications</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium">Total Applications</p>
                  <p className="text-2xl font-bold">{applicationStats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-yellow-600" />
                <div>
                  <p className="text-sm font-medium">Pending Review</p>
                  <p className="text-2xl font-bold">{applicationStats.pending}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-sm font-medium">Interviews</p>
                  <p className="text-2xl font-bold">{applicationStats.interviews}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium">Accepted</p>
                  <p className="text-2xl font-bold">{applicationStats.accepted}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <XCircle className="w-5 h-5 text-red-600" />
                <div>
                  <p className="text-sm font-medium">Rejected</p>
                  <p className="text-2xl font-bold">{applicationStats.rejected}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="w-5 h-5 mr-2" />
              Search & Filter Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <Input
                  placeholder="Search by opportunity title or organization..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="applied">Applied</SelectItem>
                    <SelectItem value="under_review">Under Review</SelectItem>
                    <SelectItem value="shortlisted">Shortlisted</SelectItem>
                    <SelectItem value="interview">Interview</SelectItem>
                    <SelectItem value="accepted">Accepted</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="applied_date">Application Date</SelectItem>
                    <SelectItem value="status">Status</SelectItem>
                    <SelectItem value="organization">Organization</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Applications</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="grid gap-6">
              {filteredApplications.map((application) => (
                <Card key={application.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl">{application.opportunity_title}</CardTitle>
                        <CardDescription className="text-base flex items-center mt-1">
                          <Building2 className="w-4 h-4 mr-1" />
                          {application.organization_name} • {application.department}
                        </CardDescription>
                      </div>
                      <Badge
                        className={`${getStatusColor(application.application_status)} flex items-center space-x-1`}
                      >
                        {getStatusIcon(application.application_status)}
                        <span className="capitalize">{application.application_status.replace("_", " ")}</span>
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Applied:</span>{" "}
                          <span className="font-medium">{new Date(application.applied_at).toLocaleDateString()}</span>
                        </div>
                        {application.interview_date && (
                          <div>
                            <span className="text-gray-600">Interview:</span>{" "}
                            <span className="font-medium">
                              {new Date(application.interview_date).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                        {application.next_step && (
                          <div>
                            <span className="text-gray-600">Next Step:</span>{" "}
                            <span className="font-medium">{application.next_step}</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span>Application Progress</span>
                          <span>{application.progress_percentage}%</span>
                        </div>
                        <Progress value={application.progress_percentage} className="h-2" />
                      </div>

                      {application.feedback && (
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm font-medium text-blue-900 mb-1">Feedback:</p>
                          <p className="text-sm text-blue-700">{application.feedback}</p>
                        </div>
                      )}

                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Message Recruiter
                        </Button>
                        {application.cover_letter_url && (
                          <Button variant="outline" size="sm" asChild>
                            <a href={application.cover_letter_url} target="_blank" rel="noopener noreferrer">
                              <FileText className="w-4 h-4 mr-1" />
                              View Cover Letter
                            </a>
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <Upload className="w-4 h-4 mr-1" />
                          Upload Document
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="active" className="space-y-6">
            <div className="grid gap-6">
              {filteredApplications
                .filter((app) =>
                  ["applied", "under_review", "shortlisted", "interview"].includes(app.application_status),
                )
                .map((application) => (
                  <Card key={application.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl">{application.opportunity_title}</CardTitle>
                          <CardDescription className="text-base">
                            {application.organization_name} • {application.department}
                          </CardDescription>
                        </div>
                        <Badge className={getStatusColor(application.application_status)}>
                          {application.application_status.replace("_", " ")}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span>Progress</span>
                            <span>{application.progress_percentage}%</span>
                          </div>
                          <Progress value={application.progress_percentage} className="h-2" />
                        </div>
                        {application.next_step && (
                          <div className="p-3 bg-yellow-50 rounded-lg">
                            <p className="text-sm font-medium text-yellow-900 mb-1">Next Step:</p>
                            <p className="text-sm text-yellow-700">{application.next_step}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            <div className="grid gap-6">
              {filteredApplications
                .filter((app) => ["accepted", "rejected", "withdrawn"].includes(app.application_status))
                .map((application) => (
                  <Card key={application.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl">{application.opportunity_title}</CardTitle>
                          <CardDescription className="text-base">
                            {application.organization_name} • {application.department}
                          </CardDescription>
                        </div>
                        <Badge className={getStatusColor(application.application_status)}>
                          {application.application_status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {application.feedback && (
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm font-medium text-gray-900 mb-1">Final Feedback:</p>
                          <p className="text-sm text-gray-700">{application.feedback}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>

        {filteredApplications.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
              <p className="text-gray-600 mb-4">
                {searchQuery || filterStatus !== "all"
                  ? "Try adjusting your search criteria"
                  : "You haven't applied to any opportunities yet"}
              </p>
              <Button asChild>
                <Link href="/dashboard/student/opportunities">Find Opportunities</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
