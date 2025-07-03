"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Play, Users, Calendar, Clock, Star, Award, ExternalLink } from "lucide-react"

interface LearningResource {
  id: string
  title: string
  type: "course" | "webinar" | "workshop" | "tutorial" | "certification"
  provider: string
  duration: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  rating: number
  enrollments: number
  price: "Free" | "Paid"
  skills: string[]
  description: string
  relevantTo?: string
  progress?: number
  startDate?: string
  instructor?: string
  thumbnail?: string
}

export function LearningResources() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterDifficulty, setFilterDifficulty] = useState("all")

  const resources: LearningResource[] = [
    {
      id: "1",
      title: "Advanced Machine Learning Specialization",
      type: "course",
      provider: "Coursera",
      duration: "6 weeks",
      difficulty: "Advanced",
      rating: 4.8,
      enrollments: 15420,
      price: "Free",
      skills: ["Machine Learning", "Deep Learning", "Python", "TensorFlow"],
      description:
        "Master advanced ML techniques including neural networks, deep learning, and reinforcement learning.",
      relevantTo: "AI Research Internship",
      progress: 60,
      instructor: "Dr. Andrew Ng",
    },
    {
      id: "2",
      title: "React Best Practices Workshop",
      type: "workshop",
      provider: "Tech Academy",
      duration: "3 hours",
      difficulty: "Intermediate",
      rating: 4.6,
      enrollments: 2340,
      price: "Paid",
      skills: ["React", "JavaScript", "Frontend Development"],
      description: "Learn modern React patterns, hooks, and performance optimization techniques.",
      relevantTo: "Frontend Development",
      startDate: "2024-02-15",
      instructor: "Sarah Chen",
    },
    {
      id: "3",
      title: "Data Visualization with Python",
      type: "tutorial",
      provider: "DataCamp",
      duration: "4 hours",
      difficulty: "Beginner",
      rating: 4.5,
      enrollments: 8760,
      price: "Free",
      skills: ["Python", "Matplotlib", "Seaborn", "Data Analysis"],
      description: "Create compelling visualizations using Python libraries like Matplotlib and Seaborn.",
      progress: 25,
      instructor: "Prof. Lisa Wang",
    },
    {
      id: "4",
      title: "Industry Mentorship Program",
      type: "workshop",
      provider: "TechCorp",
      duration: "8 weeks",
      difficulty: "Intermediate",
      rating: 4.9,
      enrollments: 450,
      price: "Free",
      skills: ["Professional Development", "Networking", "Career Growth"],
      description: "Connect with industry professionals and receive personalized career guidance.",
      startDate: "2024-03-01",
      instructor: "Multiple Industry Experts",
    },
    {
      id: "5",
      title: "AWS Cloud Practitioner Certification",
      type: "certification",
      provider: "Amazon Web Services",
      duration: "40 hours",
      difficulty: "Beginner",
      rating: 4.7,
      enrollments: 12500,
      price: "Paid",
      skills: ["Cloud Computing", "AWS", "DevOps"],
      description: "Get certified in AWS cloud fundamentals and basic cloud architecture.",
      progress: 0,
    },
  ]

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
      resource.provider.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = filterType === "all" || resource.type === filterType
    const matchesDifficulty =
      filterDifficulty === "all" || resource.difficulty.toLowerCase() === filterDifficulty.toLowerCase()

    return matchesSearch && matchesType && matchesDifficulty
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
        return <Play className="w-4 h-4" />
      case "certification":
        return <Award className="w-4 h-4" />
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
      case "certification":
        return "bg-yellow-100 text-yellow-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "text-green-600"
      case "Intermediate":
        return "text-orange-600"
      case "Advanced":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Learning Resources</h2>
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search resources..."
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
              <SelectItem value="course">Courses</SelectItem>
              <SelectItem value="webinar">Webinars</SelectItem>
              <SelectItem value="workshop">Workshops</SelectItem>
              <SelectItem value="tutorial">Tutorials</SelectItem>
              <SelectItem value="certification">Certifications</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterDifficulty} onValueChange={setFilterDifficulty}>
            <SelectTrigger className="w-32">
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

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Resources</TabsTrigger>
          <TabsTrigger value="enrolled">My Learning</TabsTrigger>
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="grid gap-6">
            {filteredResources.map((resource) => (
              <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className={`${getTypeColor(resource.type)} text-xs`}>
                          {getTypeIcon(resource.type)}
                          <span className="ml-1 capitalize">{resource.type}</span>
                        </Badge>
                        <Badge variant="outline" className={`text-xs ${getDifficultyColor(resource.difficulty)}`}>
                          {resource.difficulty}
                        </Badge>
                        <Badge variant={resource.price === "Free" ? "secondary" : "outline"} className="text-xs">
                          {resource.price}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{resource.title}</CardTitle>
                      <CardDescription className="text-base">
                        {resource.provider} • {resource.instructor && `by ${resource.instructor} • `}
                        {resource.duration}
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-1 text-sm">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span>{resource.rating}</span>
                      <span className="text-gray-500">({resource.enrollments.toLocaleString()})</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{resource.description}</p>

                  <div className="space-y-3 mb-4">
                    <div>
                      <h4 className="font-medium text-sm text-gray-700 mb-2">Skills You'll Learn:</h4>
                      <div className="flex flex-wrap gap-2">
                        {resource.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {resource.relevantTo && (
                      <div>
                        <h4 className="font-medium text-sm text-gray-700 mb-1">Relevant to:</h4>
                        <Badge variant="outline" className="text-xs">
                          {resource.relevantTo}
                        </Badge>
                      </div>
                    )}

                    {resource.progress !== undefined && resource.progress > 0 && (
                      <div>
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span>Progress</span>
                          <span>{resource.progress}%</span>
                        </div>
                        <Progress value={resource.progress} className="h-2" />
                      </div>
                    )}

                    {resource.startDate && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-1" />
                        Starts: {resource.startDate}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button size="sm">
                      {resource.progress !== undefined && resource.progress > 0
                        ? "Continue Learning"
                        : "Start Learning"}
                    </Button>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      View Details
                    </Button>
                    {resource.type === "certification" && (
                      <Button variant="outline" size="sm">
                        <Award className="w-4 h-4 mr-1" />
                        Get Certified
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="enrolled" className="space-y-6">
          <div className="grid gap-6">
            {filteredResources
              .filter((r) => r.progress !== undefined)
              .map((resource) => (
                <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{resource.title}</CardTitle>
                        <CardDescription>{resource.provider}</CardDescription>
                      </div>
                      <Badge className={getTypeColor(resource.type)}>
                        {getTypeIcon(resource.type)}
                        <span className="ml-1 capitalize">{resource.type}</span>
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span>Progress</span>
                          <span>{resource.progress}%</span>
                        </div>
                        <Progress value={resource.progress} className="h-2" />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button size="sm">Continue Learning</Button>
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
            <h3 className="font-semibold text-blue-900 mb-2">Personalized Recommendations</h3>
            <p className="text-blue-700 text-sm">
              Based on your current projects and career goals, we recommend these learning resources to enhance your
              skills.
            </p>
          </div>

          <div className="grid gap-6">
            {filteredResources
              .filter((r) => r.relevantTo)
              .slice(0, 3)
              .map((resource) => (
                <Card key={resource.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className="bg-blue-100 text-blue-700 text-xs">Recommended</Badge>
                          <Badge className={getTypeColor(resource.type)}>
                            {getTypeIcon(resource.type)}
                            <span className="ml-1 capitalize">{resource.type}</span>
                          </Badge>
                        </div>
                        <CardTitle className="text-lg">{resource.title}</CardTitle>
                        <CardDescription>
                          {resource.provider} • {resource.duration}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{resource.description}</p>
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

        <TabsContent value="upcoming" className="space-y-6">
          <div className="grid gap-6">
            {filteredResources
              .filter((r) => r.startDate)
              .map((resource) => (
                <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{resource.title}</CardTitle>
                        <CardDescription>
                          {resource.provider} • {resource.instructor}
                        </CardDescription>
                      </div>
                      <Badge className={getTypeColor(resource.type)}>
                        {getTypeIcon(resource.type)}
                        <span className="ml-1 capitalize">{resource.type}</span>
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{resource.description}</p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-1" />
                        Starts: {resource.startDate}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-1" />
                        {resource.duration}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button size="sm">Register Now</Button>
                      <Button variant="outline" size="sm">
                        <Calendar className="w-4 h-4 mr-1" />
                        Add to Calendar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
