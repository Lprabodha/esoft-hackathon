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
  BookOpen,
  Play,
  Users,
  Calendar,
  Clock,
  Star,
  Award,
  ExternalLink,
  Target,
  CheckCircle,
  PlayCircle,
  Pause,
} from "lucide-react"
import Link from "next/link"

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
  provider: string
  rating: number
  enrollments: number
  price: "Free" | "Paid"
  description: string
  instructor?: string
  start_date?: string
  completion_date?: string
  certificate_url?: string
}

export default function LearningPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterDifficulty, setFilterDifficulty] = useState("all")

  const learningPaths: LearningPath[] = [
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
      provider: "Coursera",
      rating: 4.8,
      enrollments: 15420,
      price: "Free",
      description:
        "Master advanced ML techniques including neural networks, deep learning, and reinforcement learning.",
      instructor: "Dr. Andrew Ng",
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
      provider: "Tech Academy",
      rating: 4.6,
      enrollments: 2340,
      price: "Paid",
      description: "Learn modern React patterns, hooks, and performance optimization techniques.",
      instructor: "Sarah Chen",
      start_date: "2024-02-15",
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
      provider: "DataCamp",
      rating: 4.5,
      enrollments: 8760,
      price: "Free",
      description: "Create compelling visualizations using Python libraries like Matplotlib and Seaborn.",
      instructor: "Prof. Lisa Wang",
      completion_date: "2024-01-20",
      certificate_url: "/certificates/data-viz-python.pdf",
    },
    {
      id: 4,
      resource_id: 104,
      resource_title: "Industry Mentorship Program",
      resource_type: "course",
      target_skill_name: "Professional Development",
      status: "assigned",
      estimated_time_min: 4800, // 80 hours over 8 weeks
      difficulty_level: "intermediate",
      progress_percentage: 0,
      provider: "TechCorp",
      rating: 4.9,
      enrollments: 450,
      price: "Free",
      description: "Connect with industry professionals and receive personalized career guidance.",
      instructor: "Multiple Industry Experts",
      start_date: "2024-03-01",
    },
    {
      id: 5,
      resource_id: 105,
      resource_title: "AWS Cloud Practitioner Certification",
      resource_type: "course",
      target_skill_name: "Cloud Computing",
      status: "in_progress",
      estimated_time_min: 2400, // 40 hours
      difficulty_level: "beginner",
      progress_percentage: 25,
      provider: "Amazon Web Services",
      rating: 4.7,
      enrollments: 12500,
      price: "Paid",
      description: "Get certified in AWS cloud fundamentals and basic cloud architecture.",
    },
  ]

  const filteredPaths = learningPaths.filter((path) => {
    const matchesSearch =
      path.resource_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      path.target_skill_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      path.provider.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = filterType === "all" || path.resource_type === filterType
    const matchesStatus = filterStatus === "all" || path.status === filterStatus
    const matchesDifficulty = filterDifficulty === "all" || path.difficulty_level === filterDifficulty

    return matchesSearch && matchesType && matchesStatus && matchesDifficulty
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "course":
        return <BookOpen className="w-4 h-4" />
      case "webinar":
        return <Play className="w-4 h-4" />
      case "workshop":
        return <Users className="w-4 h-4" />
      case "tutorial":
        return <PlayCircle className="w-4 h-4" />
      case "book":
        return <BookOpen className="w-4 h-4" />
      default:
        return <BookOpen className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "course":
        return "bg-blue-100 text-blue-700"
      case "webinar":
        return "bg-green-100 text-green-700"
      case "workshop":
        return "bg-purple-100 text-purple-700"
      case "tutorial":
        return "bg-orange-100 text-orange-700"
      case "book":
        return "bg-yellow-100 text-yellow-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "text-green-600"
      case "intermediate":
        return "text-orange-600"
      case "advanced":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700"
      case "in_progress":
        return "bg-blue-100 text-blue-700"
      case "assigned":
        return "bg-yellow-100 text-yellow-700"
      case "skipped":
        return "bg-gray-100 text-gray-700"
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

  const learningStats = {
    total: learningPaths.length,
    inProgress: learningPaths.filter((p) => p.status === "in_progress").length,
    completed: learningPaths.filter((p) => p.status === "completed").length,
    assigned: learningPaths.filter((p) => p.status === "assigned").length,
    totalHours: Math.floor(learningPaths.reduce((acc, p) => acc + p.estimated_time_min, 0) / 60),
    completedHours: Math.floor(
      learningPaths.filter((p) => p.status === "completed").reduce((acc, p) => acc + p.estimated_time_min, 0) / 60,
    ),
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
            <Badge variant="secondary">Learning Paths</Badge>
          </div>
          <Link href="/dashboard/student">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Paths & Micro-Missions</h1>
          <p className="text-gray-600">Personalized learning recommendations to develop your skills</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium">Total Paths</p>
                  <p className="text-2xl font-bold">{learningStats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Play className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-sm font-medium">In Progress</p>
                  <p className="text-2xl font-bold">{learningStats.inProgress}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium">Completed</p>
                  <p className="text-2xl font-bold">{learningStats.completed}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-sm font-medium">Total Hours</p>
                  <p className="text-2xl font-bold">{learningStats.totalHours}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-yellow-600" />
                <div>
                  <p className="text-sm font-medium">Hours Completed</p>
                  <p className="text-2xl font-bold">{learningStats.completedHours}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Search & Filter Learning Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="md:col-span-2">
                <Input
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="course">Courses</SelectItem>
                    <SelectItem value="webinar">Webinars</SelectItem>
                    <SelectItem value="tutorial">Tutorials</SelectItem>
                    <SelectItem value="book">Books</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="assigned">Assigned</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={filterDifficulty} onValueChange={setFilterDifficulty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Resources</TabsTrigger>
            <TabsTrigger value="my-learning">My Learning</TabsTrigger>
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="grid gap-6">
              {filteredPaths.map((path) => (
                <Card key={path.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className={`${getTypeColor(path.resource_type)} text-xs`}>
                            {getTypeIcon(path.resource_type)}
                            <span className="ml-1 capitalize">{path.resource_type}</span>
                          </Badge>
                          <Badge variant="outline" className={`text-xs ${getDifficultyColor(path.difficulty_level)}`}>
                            {path.difficulty_level}
                          </Badge>
                          <Badge variant={path.price === "Free" ? "secondary" : "outline"} className="text-xs">
                            {path.price}
                          </Badge>
                          <Badge className={getStatusColor(path.status)}>{path.status.replace("_", " ")}</Badge>
                        </div>
                        <CardTitle className="text-lg">{path.resource_title}</CardTitle>
                        <CardDescription className="text-base">
                          {path.provider} • {path.instructor && `by ${path.instructor} • `}
                          {formatTimeEstimate(path.estimated_time_min)}
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-1 text-sm">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span>{path.rating}</span>
                        <span className="text-gray-500">({path.enrollments.toLocaleString()})</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{path.description}</p>

                    <div className="space-y-3 mb-4">
                      <div>
                        <h4 className="font-medium text-sm text-gray-700 mb-1">Target Skill:</h4>
                        <Badge variant="outline" className="text-xs">
                          {path.target_skill_name}
                        </Badge>
                      </div>

                      {path.progress_percentage > 0 && (
                        <div>
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span>Progress</span>
                            <span>{path.progress_percentage}%</span>
                          </div>
                          <Progress value={path.progress_percentage} className="h-2" />
                        </div>
                      )}

                      {path.start_date && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-1" />
                          Starts: {new Date(path.start_date).toLocaleDateString()}
                        </div>
                      )}

                      {path.completion_date && (
                        <div className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Completed: {new Date(path.completion_date).toLocaleDateString()}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button size="sm">
                        {path.status === "completed"
                          ? "Review"
                          : path.status === "in_progress"
                            ? "Continue Learning"
                            : "Start Learning"}
                      </Button>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="w-4 h-4 mr-1" />
                        View Details
                      </Button>
                      {path.certificate_url && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={path.certificate_url} target="_blank" rel="noopener noreferrer">
                            <Award className="w-4 h-4 mr-1" />
                            Certificate
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="my-learning" className="space-y-6">
            <div className="grid gap-6">
              {filteredPaths
                .filter((p) => p.status === "in_progress" || p.status === "assigned")
                .map((path) => (
                  <Card key={path.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{path.resource_title}</CardTitle>
                          <CardDescription>
                            {path.provider} • Target: {path.target_skill_name}
                          </CardDescription>
                        </div>
                        <Badge className={getStatusColor(path.status)}>{path.status.replace("_", " ")}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span>Progress</span>
                            <span>{path.progress_percentage}%</span>
                          </div>
                          <Progress value={path.progress_percentage} className="h-2" />
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button size="sm">
                            {path.status === "in_progress" ? (
                              <>
                                <Pause className="w-4 h-4 mr-1" />
                                Continue Learning
                              </>
                            ) : (
                              <>
                                <Play className="w-4 h-4 mr-1" />
                                Start Learning
                              </>
                            )}
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

          <TabsContent value="recommended" className="space-y-6">
            <div className="mb-4 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">AI-Powered Recommendations</h3>
              <p className="text-blue-700 text-sm">
                Based on your current skills, career goals, and application history, we recommend these learning
                resources to enhance your profile.
              </p>
            </div>

            <div className="grid gap-6">
              {filteredPaths.slice(0, 3).map((path) => (
                <Card key={path.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className="bg-blue-100 text-blue-700 text-xs">AI Recommended</Badge>
                          <Badge className={getTypeColor(path.resource_type)}>
                            {getTypeIcon(path.resource_type)}
                            <span className="ml-1 capitalize">{path.resource_type}</span>
                          </Badge>
                        </div>
                        <CardTitle className="text-lg">{path.resource_title}</CardTitle>
                        <CardDescription>
                          {path.provider} • {formatTimeEstimate(path.estimated_time_min)}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{path.description}</p>
                    <div className="flex items-center space-x-2">
                      <Button size="sm">Start Learning</Button>
                      <Button variant="outline" size="sm">
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            <div className="grid gap-6">
              {filteredPaths
                .filter((p) => p.status === "completed")
                .map((path) => (
                  <Card key={path.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{path.resource_title}</CardTitle>
                          <CardDescription>
                            {path.provider} • Completed:{" "}
                            {path.completion_date && new Date(path.completion_date).toLocaleDateString()}
                          </CardDescription>
                        </div>
                        <Badge className="bg-green-100 text-green-700">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Completed
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <Progress value={100} className="h-2" />
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <BookOpen className="w-4 h-4 mr-1" />
                            Review Content
                          </Button>
                          {path.certificate_url && (
                            <Button variant="outline" size="sm" asChild>
                              <a href={path.certificate_url} target="_blank" rel="noopener noreferrer">
                                <Award className="w-4 h-4 mr-1" />
                                Download Certificate
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
        </Tabs>

        {filteredPaths.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No learning resources found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
              <Button asChild>
                <Link href="/dashboard/student">Back to Dashboard</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
