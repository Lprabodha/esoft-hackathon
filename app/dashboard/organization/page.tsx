"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  Brain,
  Building2,
  Users,
  TrendingUp,
  Bell,
  Settings,
  Plus,
  Eye,
  MessageSquare,
  Calendar,
  Clock,
  BarChart3,
  Download,
  Filter,
  CheckCircle,
  FileText,
  Target,
  Award,
  MapPin,
  Star,
} from "lucide-react"
import Link from "next/link"

interface OrganizationProfile {
  id: number
  user_id: number
  organization_name: string
  department: string
  contact_phone: string
  contact_email: string
  website_url: string
  description: string
}

interface JobPosting {
  id: number
  posted_by_user_id: number
  title: string
  description: string
  type: "internship" | "full-time" | "part-time" | "contract"
  department: string
  location: string
  start_date: string
  end_date: string
  application_deadline: string
  num_positions: number
  status: "open" | "closed" | "archived"
  created_at: string
  applications_count: number
  required_skills: string[]
  salary_range: string
  experience_level: string
}

interface Candidate {
  id: number
  student_profile_id: number
  opportunity_id: number
  student_name: string
  student_email: string
  student_academic_id: string
  student_department: string
  student_university: string
  student_gpa: number
  application_status: "applied" | "under_review" | "shortlisted" | "interview" | "accepted" | "rejected" | "withdrawn"
  applied_at: string
  cover_letter_url: string
  resume_url: string
  portfolio_url: string
  match_percentage: number
  student_skills: Array<{
    name: string
    proficiency_level: string
    category: string
  }>
  experience_years: number
}

interface ActiveIntern {
  id: number
  student_name: string
  student_academic_id: string
  position_title: string
  start_date: string
  end_date: string
  progress_percentage: number
  mentor_name: string
  performance_rating: number
  skills_developed: string[]
  current_projects: Array<{
    name: string
    status: string
    completion_percentage: number
  }>
  feedback_count: number
}

export default function OrganizationDashboard() {
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTab, setSelectedTab] = useState("candidates")

  // Mock data based on schema
  const [organizationProfile] = useState<OrganizationProfile>({
    id: 1,
    user_id: 20,
    organization_name: "TechCorp Industries",
    department: "Human Resources",
    contact_phone: "+1-555-0199",
    contact_email: "hr@techcorp.com",
    website_url: "https://techcorp.com",
    description: "Leading technology company specializing in AI and cloud solutions",
  })

  const [jobPostings] = useState<JobPosting[]>([
    {
      id: 1,
      posted_by_user_id: 20,
      title: "Senior Frontend Developer Internship",
      description: "Work with our frontend team on cutting-edge React applications and modern web technologies",
      type: "internship",
      department: "Engineering",
      location: "San Francisco, CA",
      start_date: "2024-03-15",
      end_date: "2024-08-15",
      application_deadline: "2024-02-15",
      num_positions: 2,
      status: "open",
      created_at: "2024-01-10T10:00:00Z",
      applications_count: 45,
      required_skills: ["React", "JavaScript", "TypeScript", "CSS"],
      salary_range: "$4,000-$5,000/month",
      experience_level: "Junior",
    },
    {
      id: 2,
      posted_by_user_id: 20,
      title: "Data Science Internship",
      description: "Analyze large datasets and build predictive models using machine learning techniques",
      type: "internship",
      department: "Data Science",
      location: "Remote",
      start_date: "2024-04-01",
      end_date: "2024-09-01",
      application_deadline: "2024-02-20",
      num_positions: 3,
      status: "open",
      created_at: "2024-01-15T14:30:00Z",
      applications_count: 32,
      required_skills: ["Python", "Machine Learning", "SQL", "Statistics"],
      salary_range: "$3,500-$4,500/month",
      experience_level: "Entry Level",
    },
  ])

  const [candidates] = useState<Candidate[]>([
    {
      id: 1,
      student_profile_id: 1,
      opportunity_id: 1,
      student_name: "Sarah Chen",
      student_email: "sarah.chen@university.edu",
      student_academic_id: "CS2021001",
      student_department: "Computer Science",
      student_university: "Stanford University",
      student_gpa: 3.9,
      application_status: "interview",
      applied_at: "2024-01-12T10:30:00Z",
      cover_letter_url: "/documents/sarah_cover_letter.pdf",
      resume_url: "/documents/sarah_resume.pdf",
      portfolio_url: "https://sarahchen.dev",
      match_percentage: 95,
      student_skills: [
        { name: "React", proficiency_level: "advanced", category: "Frontend" },
        { name: "TypeScript", proficiency_level: "intermediate", category: "Programming" },
        { name: "Node.js", proficiency_level: "intermediate", category: "Backend" },
      ],
      experience_years: 2,
    },
    {
      id: 2,
      student_profile_id: 2,
      opportunity_id: 2,
      student_name: "Michael Rodriguez",
      student_email: "m.rodriguez@mit.edu",
      student_academic_id: "DS2021002",
      student_department: "Data Science",
      student_university: "MIT",
      student_gpa: 3.8,
      application_status: "under_review",
      applied_at: "2024-01-16T14:20:00Z",
      cover_letter_url: "/documents/michael_cover_letter.pdf",
      resume_url: "/documents/michael_resume.pdf",
      portfolio_url: "https://github.com/mrodriguez",
      match_percentage: 88,
      student_skills: [
        { name: "Python", proficiency_level: "advanced", category: "Programming" },
        { name: "Machine Learning", proficiency_level: "intermediate", category: "Data Science" },
        { name: "SQL", proficiency_level: "advanced", category: "Database" },
      ],
      experience_years: 1,
    },
  ])

  const [activeInterns] = useState<ActiveIntern[]>([
    {
      id: 1,
      student_name: "Emily Johnson",
      student_academic_id: "CS2020001",
      position_title: "Frontend Developer Intern",
      start_date: "2024-01-01",
      end_date: "2024-06-01",
      progress_percentage: 75,
      mentor_name: "John Smith",
      performance_rating: 4.5,
      skills_developed: ["React Hooks", "TypeScript", "Testing", "Git Workflow"],
      current_projects: [
        { name: "Component Library", status: "completed", completion_percentage: 100 },
        { name: "User Dashboard", status: "in_progress", completion_percentage: 75 },
        { name: "Mobile Optimization", status: "pending", completion_percentage: 0 },
      ],
      feedback_count: 5,
    },
    {
      id: 2,
      student_name: "David Park",
      student_academic_id: "DS2020002",
      position_title: "Data Science Intern",
      start_date: "2024-01-01",
      end_date: "2024-06-01",
      progress_percentage: 60,
      mentor_name: "Dr. Lisa Wang",
      performance_rating: 4.0,
      skills_developed: ["Pandas", "Scikit-learn", "Data Visualization", "Statistical Analysis"],
      current_projects: [
        { name: "Customer Segmentation", status: "completed", completion_percentage: 100 },
        { name: "Predictive Model", status: "in_progress", completion_percentage: 60 },
        { name: "Dashboard Creation", status: "pending", completion_percentage: 0 },
      ],
      feedback_count: 3,
    },
  ])

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-700"
      case "interview":
        return "bg-blue-100 text-blue-700"
      case "under_review":
        return "bg-yellow-100 text-yellow-700"
      case "rejected":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getProficiencyColor = (level: string) => {
    switch (level) {
      case "expert":
        return "bg-purple-100 text-purple-700"
      case "advanced":
        return "bg-blue-100 text-blue-700"
      case "intermediate":
        return "bg-green-100 text-green-700"
      case "beginner":
        return "bg-orange-100 text-orange-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getProjectStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "in_progress":
        return "bg-blue-500"
      case "pending":
        return "bg-gray-400"
      default:
        return "bg-gray-400"
    }
  }

  const filteredCandidates = candidates.filter(
    (candidate) =>
      candidate.student_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.student_university.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.student_skills.some((skill) => skill.name.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Brain className="w-5 h-5 text-white animate-pulse" />
          </div>
          <p className="text-gray-600">Loading organization dashboard...</p>
        </div>
      </div>
    )
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
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              Organization Dashboard
            </Badge>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
            </Button>
            <Button variant="ghost" size="icon">
              <MessageSquare className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>TC</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r min-h-screen p-6">
          <nav className="space-y-2">
            <Button variant="ghost" className="w-full justify-start bg-green-50 text-green-700" asChild>
              <Link href="/dashboard/organization">
                <TrendingUp className="w-4 h-4 mr-2" />
                Overview
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/dashboard/organization/jobs">
                <Building2 className="w-4 h-4 mr-2" />
                Job Postings
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/dashboard/organization/candidates">
                <Users className="w-4 h-4 mr-2" />
                Candidates
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/dashboard/organization/interns">
                <Target className="w-4 h-4 mr-2" />
                Active Interns
              </Link>
            </Button>
            {/* <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/dashboard/organization/analytics">
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </Link>
            </Button> */}
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/dashboard/organization/post-job">
                <Plus className="w-4 h-4 mr-2" />
                Post New Job
              </Link>
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {organizationProfile.organization_name}!
            </h1>
            <p className="text-gray-600">
              {organizationProfile.department} • Manage your talent pipeline and track intern progress
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Active Postings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {jobPostings.filter((j) => j.status === "open").length}
                </div>
                <p className="text-sm text-gray-500">
                  {jobPostings.filter((j) => j.created_at > "2024-01-01").length} new this week
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {jobPostings.reduce((acc, job) => acc + job.applications_count, 0)}
                </div>
                <p className="text-sm text-gray-500">
                  {candidates.filter((c) => c.application_status === "under_review").length} pending review
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Active Interns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">{activeInterns.length}</div>
                <p className="text-sm text-gray-500">Across all programs</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Avg Match Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">
                  {Math.round(candidates.reduce((acc, c) => acc + c.match_percentage, 0) / candidates.length)}%
                </div>
                <p className="text-sm text-gray-500">AI-powered matching</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Success Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-indigo-600">94%</div>
                <p className="text-sm text-gray-500">Intern completion</p>
              </CardContent>
            </Card>
          </div>

          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="candidates">Top Candidates</TabsTrigger>
              <TabsTrigger value="jobs">Job Postings</TabsTrigger>
              <TabsTrigger value="interns">Active Interns</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="pipeline">Talent Pipeline</TabsTrigger>
            </TabsList>

            <TabsContent value="candidates" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">AI-Matched Candidates</h2>
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Search candidates..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64"
                  />
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Select>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="match">Match Score</SelectItem>
                      <SelectItem value="gpa">GPA</SelectItem>
                      <SelectItem value="experience">Experience</SelectItem>
                      <SelectItem value="date">Application Date</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-6">
                {filteredCandidates.map((candidate) => (
                  <Card key={candidate.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src="/placeholder.svg?height=48&width=48" />
                            <AvatarFallback>
                              {candidate.student_name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">{candidate.student_name}</CardTitle>
                            <CardDescription>
                              {candidate.student_university} • {candidate.student_department} • GPA:{" "}
                              {candidate.student_gpa}
                            </CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={candidate.match_percentage >= 90 ? "default" : "secondary"}>
                            {candidate.match_percentage}% Match
                          </Badge>
                          <Badge className={getStatusColor(candidate.application_status)}>
                            {candidate.application_status.replace("_", " ")}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Experience: </span>
                            <span className="font-medium">{candidate.experience_years} years</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Applied: </span>
                            <span className="font-medium">{new Date(candidate.applied_at).toLocaleDateString()}</span>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-sm text-gray-700 mb-2">Skills:</h4>
                          <div className="flex flex-wrap gap-2">
                            {candidate.student_skills.map((skill, index) => (
                              <Badge
                                key={index}
                                className={getProficiencyColor(skill.proficiency_level)}
                                variant="outline"
                              >
                                {skill.name} ({skill.proficiency_level})
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Hire
                          </Button>
                          <Button size="sm" variant="outline">
                            <Calendar className="w-4 h-4 mr-1" />
                            Schedule Interview
                          </Button>
                          <Button size="sm" variant="outline">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Message
                          </Button>
                          <Button size="sm" variant="outline" asChild>
                            <a href={candidate.resume_url} target="_blank" rel="noopener noreferrer">
                              <Download className="w-4 h-4 mr-1" />
                              Download CV
                            </a>
                          </Button>
                          {candidate.portfolio_url && (
                            <Button size="sm" variant="outline" asChild>
                              <a href={candidate.portfolio_url} target="_blank" rel="noopener noreferrer">
                                <Eye className="w-4 h-4 mr-1" />
                                Portfolio
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="jobs" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Your Job Postings</h2>
                <Button asChild>
                  <Link href="/dashboard/organization/post-job">
                    <Plus className="w-4 h-4 mr-2" />
                    New Job Posting
                  </Link>
                </Button>
              </div>

              <div className="grid gap-6">
                {jobPostings.map((job) => (
                  <Card key={job.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{job.title}</CardTitle>
                          <CardDescription>
                            {job.department} • {job.location} • {job.applications_count} applications
                          </CardDescription>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="capitalize">
                            {job.type}
                          </Badge>
                          <Badge variant={job.status === "open" ? "default" : "secondary"}>{job.status}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{job.description}</p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-1" />
                          {job.location}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="w-4 h-4 mr-1" />
                          {new Date(job.start_date).toLocaleDateString()} -{" "}
                          {new Date(job.end_date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-1" />
                          Deadline: {new Date(job.application_deadline).toLocaleDateString()}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="w-4 h-4 mr-1" />
                          {job.num_positions} positions
                        </div>
                      </div>

                      <div className="space-y-3 mb-4">
                        <div>
                          <h4 className="font-medium text-sm text-gray-700 mb-1">Required Skills:</h4>
                          <div className="flex flex-wrap gap-2">
                            {job.required_skills.map((skill, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">
                            Salary: <strong>{job.salary_range}</strong>
                          </span>
                          <span className="text-gray-600">
                            Level: <strong>{job.experience_level}</strong>
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View Applications ({job.applications_count})
                        </Button>
                        <Button variant="outline" size="sm">
                          Edit Posting
                        </Button>
                        <Button variant="outline" size="sm">
                          <BarChart3 className="w-4 h-4 mr-1" />
                          Analytics
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="interns" className="space-y-6">
              <h2 className="text-xl font-semibold">Active Interns Progress</h2>
              <div className="grid gap-6">
                {activeInterns.map((intern) => (
                  <Card key={intern.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{intern.student_name}</CardTitle>
                          <CardDescription>
                            {intern.position_title} • Started: {new Date(intern.start_date).toLocaleDateString()} •
                            Mentor: {intern.mentor_name}
                          </CardDescription>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium">{intern.performance_rating}</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span>Overall Progress</span>
                            <span>{intern.progress_percentage}%</span>
                          </div>
                          <Progress value={intern.progress_percentage} className="h-2" />
                        </div>

                        <div>
                          <h4 className="font-medium text-sm text-gray-700 mb-2">Current Projects:</h4>
                          <div className="space-y-2">
                            {intern.current_projects.map((project, index) => (
                              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                <div className="flex items-center space-x-2">
                                  <div
                                    className={`w-2 h-2 rounded-full ${getProjectStatusColor(project.status)}`}
                                  ></div>
                                  <span className="text-sm">{project.name}</span>
                                </div>
                                <div className="text-xs text-gray-500">{project.completion_percentage}%</div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-sm text-gray-700 mb-2">Skills Developed:</h4>
                          <div className="flex flex-wrap gap-2">
                            {intern.skills_developed.map((skill, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                <Award className="w-3 h-3 mr-1" />
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Message
                          </Button>
                          <Button variant="outline" size="sm">
                            <Target className="w-4 h-4 mr-1" />
                            Assign Project
                          </Button>
                          <Button variant="outline" size="sm">
                            <FileText className="w-4 h-4 mr-1" />
                            View Reports
                          </Button>
                          <Button variant="outline" size="sm">
                            <Award className="w-4 h-4 mr-1" />
                            Add Feedback
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <h2 className="text-xl font-semibold">Recruitment Analytics</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Application Funnel</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Applications</span>
                        <span className="font-medium">{candidates.length}</span>
                      </div>
                      <Progress value={100} className="h-2" />

                      <div className="flex justify-between items-center">
                        <span className="text-sm">Reviewed</span>
                        <span className="font-medium">
                          {candidates.filter((c) => c.application_status !== "applied").length}
                        </span>
                      </div>
                      <Progress value={75} className="h-2" />

                      <div className="flex justify-between items-center">
                        <span className="text-sm">Interviewed</span>
                        <span className="font-medium">
                          {candidates.filter((c) => c.application_status === "interview").length}
                        </span>
                      </div>
                      <Progress value={50} className="h-2" />

                      <div className="flex justify-between items-center">
                        <span className="text-sm">Hired</span>
                        <span className="font-medium">
                          {candidates.filter((c) => c.application_status === "accepted").length}
                        </span>
                      </div>
                      <Progress value={25} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Top Skills in Demand</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {["React", "Python", "JavaScript", "Machine Learning", "TypeScript"].map((skill, index) => (
                        <div key={skill} className="flex justify-between items-center">
                          <span className="text-sm">{skill}</span>
                          <div className="flex items-center space-x-2">
                            <Progress value={90 - index * 15} className="h-2 w-20" />
                            <span className="text-xs text-gray-500">{90 - index * 15}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">University Partners</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {["Stanford University", "MIT", "UC Berkeley", "Carnegie Mellon", "Harvard"].map((uni, index) => (
                        <div key={uni} className="flex justify-between items-center">
                          <span className="text-sm">{uni}</span>
                          <span className="text-xs text-gray-500">{25 - index * 3} candidates</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="pipeline" className="space-y-6">
              <h2 className="text-xl font-semibold">Talent Pipeline Overview</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Pipeline by Stage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { stage: "Sourced", count: 150, color: "bg-gray-500" },
                        { stage: "Applied", count: 77, color: "bg-blue-500" },
                        { stage: "Screening", count: 45, color: "bg-yellow-500" },
                        { stage: "Interview", count: 24, color: "bg-orange-500" },
                        { stage: "Offer", count: 12, color: "bg-green-500" },
                        { stage: "Hired", count: 8, color: "bg-purple-500" },
                      ].map((item) => (
                        <div key={item.stage} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                            <span className="text-sm font-medium">{item.stage}</span>
                          </div>
                          <span className="text-sm text-gray-600">{item.count}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Conversion Rates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { metric: "Application Rate", value: "51%", trend: "up" },
                        { metric: "Screen to Interview", value: "53%", trend: "up" },
                        { metric: "Interview to Offer", value: "50%", trend: "down" },
                        { metric: "Offer Acceptance", value: "67%", trend: "up" },
                        { metric: "Overall Conversion", value: "5.3%", trend: "up" },
                      ].map((item) => (
                        <div key={item.metric} className="flex items-center justify-between">
                          <span className="text-sm">{item.metric}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">{item.value}</span>
                            <div
                              className={`w-2 h-2 rounded-full ${item.trend === "up" ? "bg-green-500" : "bg-red-500"}`}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
