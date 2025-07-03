"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  Brain,
  BookOpen,
  Users,
  TrendingUp,
  Bell,
  Settings,
  Plus,
  Eye,
  MessageSquare,
  Calendar,
  Star,
  FileText,
  BarChart3,
  CheckCircle,
  Target,
  Award,
  Filter,
  Clock,
  MapPin,
} from "lucide-react"
import Link from "next/link"

interface FacultyProfile {
  id: number
  user_id: number
  organization_name: string
  department: string
  contact_phone: string
  contact_email: string
  website_url: string
  description: string
}

interface Opportunity {
  id: number
  posted_by_user_id: number
  title: string
  description: string
  type: "internship" | "research" | "training"
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
}

interface Application {
  id: number
  student_profile_id: number
  opportunity_id: number
  student_name: string
  student_email: string
  student_academic_id: string
  student_department: string
  student_gpa: number
  application_status: "applied" | "under_review" | "shortlisted" | "interview" | "accepted" | "rejected" | "withdrawn"
  applied_at: string
  cover_letter_url: string
  submission_details: any
  student_skills: Array<{
    name: string
    proficiency_level: string
    category: string
  }>
}

interface StudentProgress {
  student_id: number
  student_name: string
  student_academic_id: string
  opportunity_title: string
  start_date: string
  progress_percentage: number
  last_update: string
  performance_rating: number
  feedback_count: number
  skills_developed: string[]
  current_tasks: Array<{
    title: string
    due_date: string
    status: string
  }>
}

interface Feedback {
  id: number
  from_user_id: number
  to_user_id: number
  student_name: string
  related_application_id: number
  opportunity_title: string
  rating: number
  comments: string
  feedback_date: string
}

export default function FacultyDashboard() {
  const [loading, setLoading] = useState(true)
  const [selectedTab, setSelectedTab] = useState("applications")

  // Mock data based on schema
  const [facultyProfile] = useState<FacultyProfile>({
    id: 1,
    user_id: 10,
    organization_name: "University Research Center",
    department: "Computer Science",
    contact_phone: "+1-555-0123",
    contact_email: "dr.johnson@university.edu",
    website_url: "https://cs.university.edu/faculty/johnson",
    description: "Professor of Computer Science specializing in AI and Machine Learning research",
  })

  const [opportunities] = useState<Opportunity[]>([
    {
      id: 1,
      posted_by_user_id: 10,
      title: "Machine Learning Research Project",
      description: "Advanced ML research focusing on neural network optimization for healthcare applications",
      type: "research",
      department: "Computer Science",
      location: "University Campus",
      start_date: "2024-03-01",
      end_date: "2024-08-31",
      application_deadline: "2024-02-15",
      num_positions: 3,
      status: "open",
      created_at: "2024-01-10T10:00:00Z",
      applications_count: 24,
      required_skills: ["Python", "Machine Learning", "TensorFlow", "Research Methodology"],
    },
    {
      id: 2,
      posted_by_user_id: 10,
      title: "Web Development Training Program",
      description: "Comprehensive web development training with modern frameworks and best practices",
      type: "training",
      department: "Computer Science",
      location: "Hybrid",
      start_date: "2024-04-01",
      end_date: "2024-06-30",
      application_deadline: "2024-02-20",
      num_positions: 15,
      status: "open",
      created_at: "2024-01-15T14:30:00Z",
      applications_count: 18,
      required_skills: ["JavaScript", "React", "Node.js", "HTML/CSS"],
    },
  ])

  const [applications] = useState<Application[]>([
    {
      id: 1,
      student_profile_id: 1,
      opportunity_id: 1,
      student_name: "Alice Johnson",
      student_email: "alice.j@university.edu",
      student_academic_id: "CS2021001",
      student_department: "Computer Science",
      student_gpa: 3.8,
      application_status: "under_review",
      applied_at: "2024-01-15T10:30:00Z",
      cover_letter_url: "/documents/alice_cover_letter.pdf",
      submission_details: {
        portfolio_url: "https://alice-portfolio.com",
        research_interests: "Computer Vision, Natural Language Processing",
      },
      student_skills: [
        { name: "Python", proficiency_level: "advanced", category: "Programming" },
        { name: "Machine Learning", proficiency_level: "intermediate", category: "Data Science" },
        { name: "TensorFlow", proficiency_level: "beginner", category: "Frameworks" },
      ],
    },
    {
      id: 2,
      student_profile_id: 2,
      opportunity_id: 1,
      student_name: "Bob Smith",
      student_email: "bob.s@university.edu",
      student_academic_id: "CS2021002",
      student_department: "Computer Science",
      student_gpa: 3.6,
      application_status: "shortlisted",
      applied_at: "2024-01-18T14:20:00Z",
      cover_letter_url: "/documents/bob_cover_letter.pdf",
      submission_details: {
        github_url: "https://github.com/bobsmith",
        previous_research: "Undergraduate thesis on neural networks",
      },
      student_skills: [
        { name: "Python", proficiency_level: "intermediate", category: "Programming" },
        { name: "Statistics", proficiency_level: "advanced", category: "Mathematics" },
        { name: "Research Methodology", proficiency_level: "intermediate", category: "Academic" },
      ],
    },
  ])

  const [studentProgress] = useState<StudentProgress[]>([
    {
      student_id: 1,
      student_name: "Alice Johnson",
      student_academic_id: "CS2021001",
      opportunity_title: "ML Research Project",
      start_date: "2024-01-20",
      progress_percentage: 75,
      last_update: "2024-01-25",
      performance_rating: 4.5,
      feedback_count: 3,
      skills_developed: ["Research Methodology", "Python Programming", "Data Analysis"],
      current_tasks: [
        { title: "Literature Review", due_date: "2024-02-01", status: "completed" },
        { title: "Data Collection", due_date: "2024-02-15", status: "in_progress" },
        { title: "Model Development", due_date: "2024-03-01", status: "pending" },
      ],
    },
    {
      student_id: 2,
      student_name: "Bob Smith",
      student_academic_id: "CS2021002",
      opportunity_title: "Web Dev Training",
      start_date: "2024-01-22",
      progress_percentage: 60,
      last_update: "2024-01-24",
      performance_rating: 4.0,
      feedback_count: 2,
      skills_developed: ["React", "Node.js", "Database Design"],
      current_tasks: [
        { title: "React Fundamentals", due_date: "2024-01-30", status: "completed" },
        { title: "Backend API", due_date: "2024-02-10", status: "in_progress" },
        { title: "Final Project", due_date: "2024-02-25", status: "pending" },
      ],
    },
  ])

  const [feedbackHistory] = useState<Feedback[]>([
    {
      id: 1,
      from_user_id: 10,
      to_user_id: 1,
      student_name: "Alice Johnson",
      related_application_id: 1,
      opportunity_title: "ML Research Project",
      rating: 5,
      comments: "Excellent progress on the literature review. Shows strong analytical skills and attention to detail.",
      feedback_date: "2024-01-25T16:00:00Z",
    },
    {
      id: 2,
      from_user_id: 10,
      to_user_id: 2,
      student_name: "Bob Smith",
      related_application_id: 2,
      opportunity_title: "Web Dev Training",
      rating: 4,
      comments: "Good understanding of React concepts. Needs to work on code organization and best practices.",
      feedback_date: "2024-01-24T14:30:00Z",
    },
  ])

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-700"
      case "shortlisted":
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

  const getTaskStatusColor = (status: string) => {
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Brain className="w-5 h-5 text-white animate-pulse" />
          </div>
          <p className="text-gray-600">Loading faculty dashboard...</p>
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
            <Badge variant="secondary" className="bg-purple-100 text-purple-700">
              Faculty Dashboard
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
              <AvatarFallback>DR</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r min-h-screen p-6">
          <nav className="space-y-2">
            <Button variant="ghost" className="w-full justify-start bg-purple-50 text-purple-700" asChild>
              <Link href="/dashboard/faculty">
                <TrendingUp className="w-4 h-4 mr-2" />
                Overview
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/dashboard/faculty/opportunities">
                <BookOpen className="w-4 h-4 mr-2" />
                My Opportunities
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/dashboard/faculty/applications">
                <FileText className="w-4 h-4 mr-2" />
                Applications
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/dashboard/faculty/students">
                <Users className="w-4 h-4 mr-2" />
                Student Progress
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/dashboard/faculty/feedback">
                <Star className="w-4 h-4 mr-2" />
                Feedback & Evaluation
              </Link>
            </Button>
            {/* <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/dashboard/faculty/analytics">
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </Link>
            </Button> */}
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/dashboard/faculty/create-opportunity">
                <Plus className="w-4 h-4 mr-2" />
                Create Opportunity
              </Link>
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Dr. Johnson!</h1>
            <p className="text-gray-600">
              {facultyProfile.department} • {facultyProfile.organization_name}
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Active Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">
                  {opportunities.filter((o) => o.status === "open").length}
                </div>
                <p className="text-sm text-gray-500">
                  {opportunities.filter((o) => o.created_at > "2024-01-01").length} new this month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Pending Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">
                  {applications.filter((a) => a.application_status === "under_review").length}
                </div>
                <p className="text-sm text-gray-500">Need review</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Active Students</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{studentProgress.length}</div>
                <p className="text-sm text-gray-500">Across all projects</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Avg Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {(studentProgress.reduce((acc, s) => acc + s.performance_rating, 0) / studentProgress.length).toFixed(
                    1,
                  )}
                </div>
                <p className="text-sm text-gray-500">Out of 5.0</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Completion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-indigo-600">89%</div>
                <p className="text-sm text-gray-500">Project success rate</p>
              </CardContent>
            </Card>
          </div>

          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
              <TabsTrigger value="students">Students</TabsTrigger>
              <TabsTrigger value="feedback">Feedback</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="applications" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Pending Applications</h2>
                <div className="flex items-center space-x-2">
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Select>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date">Application Date</SelectItem>
                      <SelectItem value="gpa">GPA</SelectItem>
                      <SelectItem value="relevance">Skill Match</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-6">
                {applications.map((application) => (
                  <Card key={application.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{application.student_name}</CardTitle>
                          <CardDescription>
                            {application.student_academic_id} • {application.student_department} • GPA:{" "}
                            {application.student_gpa}
                          </CardDescription>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(application.application_status)}>
                            {application.application_status.replace("_", " ")}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-sm text-gray-700 mb-2">Student Skills:</h4>
                          <div className="flex flex-wrap gap-2">
                            {application.student_skills.map((skill, index) => (
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

                        {application.submission_details && (
                          <div>
                            <h4 className="font-medium text-sm text-gray-700 mb-2">Additional Information:</h4>
                            <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                              {Object.entries(application.submission_details).map(([key, value]) => (
                                <div key={key} className="mb-1">
                                  <strong>{key.replace("_", " ")}:</strong> {value as string}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>Applied: {new Date(application.applied_at).toLocaleDateString()}</span>
                          <span>Email: {application.student_email}</span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Accept
                          </Button>
                          <Button size="sm" variant="outline">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Interview
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-1" />
                            View Profile
                          </Button>
                          <Button size="sm" variant="destructive">
                            Reject
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="opportunities" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">My Opportunities</h2>
                <Button asChild>
                  <Link href="/dashboard/faculty/create-opportunity">
                    <Plus className="w-4 h-4 mr-2" />
                    New Opportunity
                  </Link>
                </Button>
              </div>

              <div className="grid gap-6">
                {opportunities.map((opportunity) => (
                  <Card key={opportunity.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{opportunity.title}</CardTitle>
                          <CardDescription>
                            {opportunity.department} • {opportunity.applications_count} applications
                          </CardDescription>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="capitalize">
                            {opportunity.type}
                          </Badge>
                          <Badge variant={opportunity.status === "open" ? "default" : "secondary"}>
                            {opportunity.status}
                          </Badge>
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
                          {new Date(opportunity.start_date).toLocaleDateString()} -{" "}
                          {new Date(opportunity.end_date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-1" />
                          Deadline: {new Date(opportunity.application_deadline).toLocaleDateString()}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="w-4 h-4 mr-1" />
                          {opportunity.num_positions} positions
                        </div>
                      </div>

                      <div className="space-y-3 mb-4">
                        <div>
                          <h4 className="font-medium text-sm text-gray-700 mb-1">Required Skills:</h4>
                          <div className="flex flex-wrap gap-2">
                            {opportunity.required_skills.map((skill, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View Applications ({opportunity.applications_count})
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Message Students
                        </Button>
                        <Button variant="outline" size="sm">
                          Edit
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

            <TabsContent value="students" className="space-y-6">
              <h2 className="text-xl font-semibold">Student Progress Tracking</h2>
              <div className="grid gap-6">
                {studentProgress.map((student) => (
                  <Card key={student.student_id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src="/placeholder.svg?height=48&width=48" />
                            <AvatarFallback>
                              {student.student_name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">{student.student_name}</CardTitle>
                            <CardDescription>
                              {student.student_academic_id} • {student.opportunity_title}
                            </CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium">{student.performance_rating}</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span>Overall Progress</span>
                            <span>{student.progress_percentage}%</span>
                          </div>
                          <Progress value={student.progress_percentage} className="h-2" />
                        </div>

                        <div>
                          <h4 className="font-medium text-sm text-gray-700 mb-2">Current Tasks:</h4>
                          <div className="space-y-2">
                            {student.current_tasks.map((task, index) => (
                              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                <div className="flex items-center space-x-2">
                                  <div className={`w-2 h-2 rounded-full ${getTaskStatusColor(task.status)}`}></div>
                                  <span className="text-sm">{task.title}</span>
                                </div>
                                <div className="text-xs text-gray-500">
                                  Due: {new Date(task.due_date).toLocaleDateString()}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-sm text-gray-700 mb-2">Skills Developed:</h4>
                          <div className="flex flex-wrap gap-2">
                            {student.skills_developed.map((skill, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                <Award className="w-3 h-3 mr-1" />
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            Last update: {new Date(student.last_update).toLocaleDateString()}
                          </span>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <MessageSquare className="w-4 h-4 mr-1" />
                              Message
                            </Button>
                            <Button variant="outline" size="sm">
                              <Target className="w-4 h-4 mr-1" />
                              Assign Task
                            </Button>
                            <Button variant="outline" size="sm">
                              <Star className="w-4 h-4 mr-1" />
                              Add Feedback
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="feedback" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Feedback & Evaluation History</h2>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Feedback
                </Button>
              </div>

              <div className="grid gap-4">
                {feedbackHistory.map((feedback) => (
                  <Card key={feedback.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{feedback.student_name}</CardTitle>
                          <CardDescription>{feedback.opportunity_title}</CardDescription>
                        </div>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < feedback.rating ? "text-yellow-500 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                          <span className="ml-2 text-sm font-medium">{feedback.rating}/5</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-3">{feedback.comments}</p>
                      <p className="text-sm text-gray-500">
                        Given on: {new Date(feedback.feedback_date).toLocaleDateString()}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <h2 className="text-xl font-semibold">Analytics & Insights</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Application Funnel</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Total Applications</span>
                        <span className="font-medium">{applications.length}</span>
                      </div>
                      <Progress value={100} className="h-2" />

                      <div className="flex justify-between items-center">
                        <span className="text-sm">Under Review</span>
                        <span className="font-medium">
                          {applications.filter((a) => a.application_status === "under_review").length}
                        </span>
                      </div>
                      <Progress value={50} className="h-2" />

                      <div className="flex justify-between items-center">
                        <span className="text-sm">Shortlisted</span>
                        <span className="font-medium">
                          {applications.filter((a) => a.application_status === "shortlisted").length}
                        </span>
                      </div>
                      <Progress value={25} className="h-2" />

                      <div className="flex justify-between items-center">
                        <span className="text-sm">Accepted</span>
                        <span className="font-medium">
                          {applications.filter((a) => a.application_status === "accepted").length}
                        </span>
                      </div>
                      <Progress value={12} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Top Skills in Demand</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {["Python", "Machine Learning", "JavaScript", "React", "Research"].map((skill, index) => (
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
                    <CardTitle className="text-lg">Student Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600 mb-2">
                          {(
                            studentProgress.reduce((acc, s) => acc + s.performance_rating, 0) / studentProgress.length
                          ).toFixed(1)}
                        </div>
                        <p className="text-sm text-gray-600">Average Rating</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Excellent (4.5-5.0)</span>
                          <span>{studentProgress.filter((s) => s.performance_rating >= 4.5).length}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Good (3.5-4.4)</span>
                          <span>
                            {
                              studentProgress.filter((s) => s.performance_rating >= 3.5 && s.performance_rating < 4.5)
                                .length
                            }
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Needs Improvement (&lt;3.5)</span>
                          <span>{studentProgress.filter((s) => s.performance_rating < 3.5).length}</span>
                        </div>
                      </div>
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
