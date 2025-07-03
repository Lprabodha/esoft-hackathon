"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Brain,
  FileText,
  Search,
  TrendingUp,
  Bell,
  Settings,
  Eye,
  Calendar,
  MapPin,
  Clock,
  CheckCircle,
  MessageSquare,
  Upload,
  BookOpen,
  Award,
  Filter,
  Target,
} from "lucide-react"
import Link from "next/link"

interface StudentProfile {
  id: number
  user_id: number
  academic_id: string
  department: string
  major: string
  gpa: number
  bio: string
  interests: string[]
  resume_url: string
  profile_picture_url: string
}

interface Skill {
  id: number
  name: string
  category: string
  proficiency_level: "beginner" | "intermediate" | "advanced" | "expert"
  inferred_from: string
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
  required_skills: Skill[]
  match_percentage: number
  organization_name: string
  posted_by_name: string
}

interface Application {
  id: number
  opportunity_id: number
  opportunity_title: string
  organization_name: string
  application_status: "applied" | "under_review" | "shortlisted" | "interview" | "accepted" | "rejected" | "withdrawn"
  applied_at: string
  cover_letter_url: string
  submission_details: any
}

interface LearningPath {
  id: number
  resource_id: number
  resource_title: string
  resource_type: "course" | "webinar" | "article" | "tutorial" | "book"
  target_skill_name: string
  status: "assigned" | "in_progress" | "completed" | "skipped"
  estimated_time_min: number
  difficulty_level: "beginner" | "intermediate" | "advanced"
  progress_percentage: number
}

interface Notification {
  id: number
  type: string
  message: string
  is_read: boolean
  created_at: string
  related_entity_id: number
}

export default function StudentDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterSkill, setFilterSkill] = useState("all")
  const [loading, setLoading] = useState(true)

  // Mock data based on schema
  const [studentProfile] = useState<StudentProfile>({
    id: 1,
    user_id: 1,
    academic_id: "CS2021001",
    department: "Computer Science",
    major: "Computer Science",
    gpa: 3.8,
    bio: "Passionate computer science student interested in AI and machine learning",
    interests: ["Machine Learning", "Web Development", "Data Science"],
    resume_url: "/documents/resume.pdf",
    profile_picture_url: "/placeholder.svg?height=32&width=32",
  })

  const [studentSkills] = useState<Skill[]>([
    { id: 1, name: "Python", category: "Programming", proficiency_level: "advanced", inferred_from: "resume_upload" },
    {
      id: 2,
      name: "JavaScript",
      category: "Programming",
      proficiency_level: "intermediate",
      inferred_from: "project_submission",
    },
    {
      id: 3,
      name: "React",
      category: "Frameworks",
      proficiency_level: "intermediate",
      inferred_from: "portfolio_analysis",
    },
    {
      id: 4,
      name: "Machine Learning",
      category: "Data Science",
      proficiency_level: "beginner",
      inferred_from: "course_completion",
    },
    {
      id: 5,
      name: "SQL",
      category: "Database",
      proficiency_level: "intermediate",
      inferred_from: "project_submission",
    },
  ])

  const [opportunities, setOpportunities] = useState<Opportunity[]>([
    {
      id: 1,
      posted_by_user_id: 10,
      title: "AI Research Internship",
      description:
        "Join our cutting-edge AI research team to develop next-generation machine learning models for healthcare applications.",
      type: "research",
      department: "Computer Science",
      location: "Remote",
      start_date: "2024-03-01",
      end_date: "2024-06-01",
      application_deadline: "2024-02-15",
      num_positions: 3,
      status: "open",
      required_skills: [
        { id: 1, name: "Python", category: "Programming", proficiency_level: "intermediate", inferred_from: "" },
        { id: 4, name: "Machine Learning", category: "Data Science", proficiency_level: "beginner", inferred_from: "" },
      ],
      match_percentage: 95,
      organization_name: "TechCorp Research Labs",
      posted_by_name: "Dr. Sarah Johnson",
    },
    {
      id: 2,
      posted_by_user_id: 11,
      title: "Frontend Development Internship",
      description: "Work with our frontend team on cutting-edge React applications and modern web technologies.",
      type: "internship",
      department: "Engineering",
      location: "San Francisco, CA",
      start_date: "2024-03-15",
      end_date: "2024-08-15",
      application_deadline: "2024-02-20",
      num_positions: 2,
      status: "open",
      required_skills: [
        { id: 2, name: "JavaScript", category: "Programming", proficiency_level: "intermediate", inferred_from: "" },
        { id: 3, name: "React", category: "Frameworks", proficiency_level: "intermediate", inferred_from: "" },
      ],
      match_percentage: 88,
      organization_name: "StartupXYZ",
      posted_by_name: "Tech Team",
    },
    {
      id: 3,
      posted_by_user_id: 12,
      title: "Data Science Training Program",
      description:
        "Comprehensive training program covering statistical analysis, data visualization, and machine learning.",
      type: "training",
      department: "Statistics",
      location: "Boston, MA",
      start_date: "2024-04-01",
      end_date: "2024-07-01",
      application_deadline: "2024-02-25",
      num_positions: 15,
      status: "open",
      required_skills: [
        { id: 1, name: "Python", category: "Programming", proficiency_level: "beginner", inferred_from: "" },
        { id: 5, name: "SQL", category: "Database", proficiency_level: "beginner", inferred_from: "" },
      ],
      match_percentage: 92,
      organization_name: "University Research Center",
      posted_by_name: "Prof. Michael Chen",
    },
  ])

  const [applications] = useState<Application[]>([
    {
      id: 1,
      opportunity_id: 2,
      opportunity_title: "Frontend Development Internship",
      organization_name: "StartupXYZ",
      application_status: "under_review",
      applied_at: "2024-01-15T10:30:00Z",
      cover_letter_url: "/documents/cover_letter_1.pdf",
      submission_details: { portfolio_url: "https://portfolio.example.com" },
    },
    {
      id: 2,
      opportunity_id: 1,
      opportunity_title: "AI Research Internship",
      organization_name: "TechCorp Research Labs",
      application_status: "interview",
      applied_at: "2024-01-10T14:20:00Z",
      cover_letter_url: "/documents/cover_letter_2.pdf",
      submission_details: { research_interests: "Computer Vision, NLP" },
    },
  ])

  const [learningPaths] = useState<LearningPath[]>([
    {
      id: 1,
      resource_id: 101,
      resource_title: "Advanced Machine Learning Specialization",
      resource_type: "course",
      target_skill_name: "Machine Learning",
      status: "in_progress",
      estimated_time_min: 2400, // 40 hours
      difficulty_level: "advanced",
      progress_percentage: 60,
    },
    {
      id: 2,
      resource_id: 102,
      resource_title: "React Best Practices Workshop",
      resource_type: "webinar",
      target_skill_name: "React",
      status: "assigned",
      estimated_time_min: 180, // 3 hours
      difficulty_level: "intermediate",
      progress_percentage: 0,
    },
    {
      id: 3,
      resource_id: 103,
      resource_title: "Data Visualization with Python",
      resource_type: "tutorial",
      target_skill_name: "Data Visualization",
      status: "completed",
      estimated_time_min: 240, // 4 hours
      difficulty_level: "beginner",
      progress_percentage: 100,
    },
  ])

  const [notifications] = useState<Notification[]>([
    {
      id: 1,
      type: "application_status_update",
      message: "Your application for 'AI Research Internship' has been shortlisted for interview.",
      is_read: false,
      created_at: "2024-01-20T09:00:00Z",
      related_entity_id: 2,
    },
    {
      id: 2,
      type: "deadline_reminder",
      message: "Application deadline for 'Data Science Training Program' is in 5 days.",
      is_read: false,
      created_at: "2024-01-19T16:30:00Z",
      related_entity_id: 3,
    },
    {
      id: 3,
      type: "new_recommendation",
      message: "New learning resource 'Advanced React Patterns' has been recommended for you.",
      is_read: true,
      created_at: "2024-01-18T11:15:00Z",
      related_entity_id: 102,
    },
  ])

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1000)
  }, [])

  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesSearch =
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.organization_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.required_skills.some((skill) => skill.name.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesType = filterType === "all" || opp.type === filterType
    const matchesSkill =
      filterSkill === "all" ||
      opp.required_skills.some((skill) => skill.name.toLowerCase().includes(filterSkill.toLowerCase()))

    return matchesSearch && matchesType && matchesSkill
  })

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

  const formatTimeEstimate = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Brain className="w-5 h-5 text-white animate-pulse" />
          </div>
          <p className="text-gray-600">Loading your dashboard...</p>
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
              <span className="text-xl font-bold">TalentSync</span>
            </Link>
            <Badge variant="secondary">Student Dashboard</Badge>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              {notifications.filter((n) => !n.is_read).length > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
              )}
            </Button>
            <Button variant="ghost" size="icon">
              <MessageSquare className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
            <Avatar>
              <AvatarImage src={studentProfile.profile_picture_url || "/placeholder.svg"} />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r min-h-screen p-6">
          <nav className="space-y-2">
            <Button variant="ghost" className="w-full justify-start bg-blue-50 text-blue-700" asChild>
              <Link href="/dashboard/student">
                <TrendingUp className="w-4 h-4 mr-2" />
                Overview
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/dashboard/student/opportunities">
                <Search className="w-4 h-4 mr-2" />
                Find Opportunities
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/dashboard/student/applications">
                <FileText className="w-4 h-4 mr-2" />
                My Applications
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/dashboard/student/learning">
                <BookOpen className="w-4 h-4 mr-2" />
                Learning Paths
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/dashboard/student/skills">
                <Award className="w-4 h-4 mr-2" />
                Skills Profile
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/dashboard/student/messages">
                <MessageSquare className="w-4 h-4 mr-2" />
                Messages
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/dashboard/student/profile">
                <Settings className="w-4 h-4 mr-2" />
                Profile Settings
              </Link>
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {studentProfile.academic_id}!</h1>
            <p className="text-gray-600">
              {studentProfile.major} • {studentProfile.department} • GPA: {studentProfile.gpa}
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Profile Completion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600 mb-2">85%</div>
                <Progress value={85} className="h-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Active Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{applications.length}</div>
                <p className="text-sm text-gray-500">
                  {applications.filter((a) => a.application_status === "under_review").length} pending
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Learning Paths</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{learningPaths.length}</div>
                <p className="text-sm text-gray-500">
                  {learningPaths.filter((lp) => lp.status === "in_progress").length} in progress
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Skills Tracked</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">{studentSkills.length}</div>
                <p className="text-sm text-gray-500">
                  {
                    studentSkills.filter((s) => s.proficiency_level === "advanced" || s.proficiency_level === "expert")
                      .length
                  }{" "}
                  advanced
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">AI Match Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-indigo-600">92%</div>
                <p className="text-sm text-gray-500">Above average</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="opportunities" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="learning">Learning Paths</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>

            <TabsContent value="opportunities" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">AI-Matched Opportunities</h2>
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Search opportunities..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64"
                  />
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                      <SelectItem value="research">Research</SelectItem>
                      <SelectItem value="training">Training</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterSkill} onValueChange={setFilterSkill}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Skills" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Skills</SelectItem>
                      {studentSkills.map((skill) => (
                        <SelectItem key={skill.id} value={skill.name.toLowerCase()}>
                          {skill.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid gap-6">
                {filteredOpportunities.map((opportunity) => (
                  <Card key={opportunity.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{opportunity.title}</CardTitle>
                          <CardDescription className="text-base">
                            {opportunity.organization_name} • {opportunity.department}
                          </CardDescription>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={opportunity.match_percentage >= 90 ? "default" : "secondary"}>
                            {opportunity.match_percentage}% Match
                          </Badge>
                          <Badge variant="outline" className="capitalize">
                            {opportunity.type}
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
                          Due: {new Date(opportunity.application_deadline).toLocaleDateString()}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Target className="w-4 h-4 mr-1" />
                          {opportunity.num_positions} positions
                        </div>
                      </div>

                      <div className="space-y-3 mb-4">
                        <div>
                          <h4 className="font-medium text-sm text-gray-700 mb-1">Required Skills:</h4>
                          <div className="flex flex-wrap gap-2">
                            {opportunity.required_skills.map((skill) => {
                              const studentHasSkill = studentSkills.find((s) => s.name === skill.name)
                              return (
                                <Badge
                                  key={skill.id}
                                  variant={studentHasSkill ? "default" : "outline"}
                                  className="text-xs"
                                >
                                  {skill.name}
                                  {studentHasSkill && <CheckCircle className="w-3 h-3 ml-1" />}
                                </Badge>
                              )
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button size="sm" asChild>
                          <Link href={`/dashboard/student/opportunities/${opportunity.id}/apply`}>Apply Now</Link>
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Ask Questions
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="applications" className="space-y-6">
              <h2 className="text-xl font-semibold">My Applications</h2>
              <div className="grid gap-4">
                {applications.map((application) => (
                  <Card key={application.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{application.opportunity_title}</CardTitle>
                          <CardDescription>{application.organization_name}</CardDescription>
                        </div>
                        <Badge className={getStatusColor(application.application_status)}>
                          {application.application_status.replace("_", " ")}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Applied:</span>{" "}
                            {new Date(application.applied_at).toLocaleDateString()}
                          </div>
                          <div>
                            <span className="text-gray-600">Status:</span>{" "}
                            {application.application_status.replace("_", " ")}
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            View Application
                          </Button>
                          <Button variant="outline" size="sm">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Message Recruiter
                          </Button>
                          {application.cover_letter_url && (
                            <Button variant="outline" size="sm" asChild>
                              <a href={application.cover_letter_url} target="_blank" rel="noopener noreferrer">
                                <Upload className="w-4 h-4 mr-1" />
                                View Cover Letter
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

            <TabsContent value="learning" className="space-y-6">
              <h2 className="text-xl font-semibold">Learning Paths & Micro-Missions</h2>
              <div className="grid gap-4">
                {learningPaths.map((path) => (
                  <Card key={path.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{path.resource_title}</CardTitle>
                          <CardDescription>
                            Target Skill: {path.target_skill_name} • {formatTimeEstimate(path.estimated_time_min)}
                          </CardDescription>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="capitalize">
                            {path.resource_type}
                          </Badge>
                          <Badge variant="secondary" className="capitalize">
                            {path.difficulty_level}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span>Progress</span>
                            <span>{path.progress_percentage}%</span>
                          </div>
                          <Progress value={path.progress_percentage} className="h-2" />
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button size="sm">
                            {path.status === "completed"
                              ? "Review"
                              : path.status === "in_progress"
                                ? "Continue"
                                : "Start Learning"}
                          </Button>
                          <Button variant="outline" size="sm">
                            <Award className="w-4 h-4 mr-1" />
                            View Certificate
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="skills" className="space-y-6">
              <h2 className="text-xl font-semibold">Skills Profile</h2>
              <div className="grid gap-4">
                {Object.entries(
                  studentSkills.reduce(
                    (acc, skill) => {
                      if (!acc[skill.category]) acc[skill.category] = []
                      acc[skill.category].push(skill)
                      return acc
                    },
                    {} as Record<string, Skill[]>,
                  ),
                ).map(([category, skills]) => (
                  <Card key={category}>
                    <CardHeader>
                      <CardTitle className="text-lg">{category}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-3">
                        {skills.map((skill) => (
                          <div key={skill.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium">{skill.name}</p>
                              <p className="text-sm text-gray-600">
                                Inferred from: {skill.inferred_from.replace("_", " ")}
                              </p>
                            </div>
                            <Badge className={getProficiencyColor(skill.proficiency_level)}>
                              {skill.proficiency_level}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <h2 className="text-xl font-semibold">Recent Notifications</h2>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <Card key={notification.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div
                          className={`w-2 h-2 rounded-full mt-2 ${notification.is_read ? "bg-gray-300" : "bg-blue-500"}`}
                        ></div>
                        <div className="flex-1">
                          <p className="font-medium">{notification.type.replace("_", " ")}</p>
                          <p className="text-sm text-gray-600">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(notification.created_at).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
