"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Brain,
  Award,
  Plus,
  Search,
  TrendingUp,
  BookOpen,
  Code,
  Database,
  Palette,
  Users,
  Target,
  CheckCircle,
  Star,
  Edit,
  Trash2,
} from "lucide-react"
import Link from "next/link"

interface Skill {
  id: number
  name: string
  category: string
  proficiency_level: "beginner" | "intermediate" | "advanced" | "expert"
  inferred_from: string
  verified: boolean
  endorsements: number
  projects_used: string[]
  last_updated: string
  parent_skill_id?: number
  parent_skill_name?: string
}

interface SkillCategory {
  name: string
  icon: React.ReactNode
  color: string
  skills: Skill[]
}

export default function SkillsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterProficiency, setFilterProficiency] = useState("all")
  const [showAddSkillDialog, setShowAddSkillDialog] = useState(false)

  const skills: Skill[] = [
    {
      id: 1,
      name: "Python",
      category: "Programming",
      proficiency_level: "advanced",
      inferred_from: "resume_upload",
      verified: true,
      endorsements: 12,
      projects_used: ["AI Research Project", "Data Analysis Tool", "Web Scraper"],
      last_updated: "2025-01-15",
    },
    {
      id: 2,
      name: "JavaScript",
      category: "Programming",
      proficiency_level: "intermediate",
      inferred_from: "project_submission",
      verified: true,
      endorsements: 8,
      projects_used: ["Portfolio Website", "React Dashboard"],
      last_updated: "2025-01-10",
    },
    {
      id: 3,
      name: "React",
      category: "Frameworks",
      proficiency_level: "intermediate",
      inferred_from: "portfolio_analysis",
      verified: false,
      endorsements: 5,
      projects_used: ["Portfolio Website", "E-commerce App"],
      last_updated: "2025-01-08",
      parent_skill_id: 2,
      parent_skill_name: "JavaScript",
    },
    {
      id: 4,
      name: "Machine Learning",
      category: "Data Science",
      proficiency_level: "beginner",
      inferred_from: "course_completion",
      verified: true,
      endorsements: 3,
      projects_used: ["Stock Prediction Model"],
      last_updated: "2025-01-12",
    },
    {
      id: 5,
      name: "SQL",
      category: "Database",
      proficiency_level: "intermediate",
      inferred_from: "project_submission",
      verified: true,
      endorsements: 7,
      projects_used: ["Database Design Project", "Analytics Dashboard"],
      last_updated: "2025-01-05",
    },
    {
      id: 6,
      name: "UI/UX Design",
      category: "Design",
      proficiency_level: "beginner",
      inferred_from: "portfolio_analysis",
      verified: false,
      endorsements: 2,
      projects_used: ["Mobile App Mockup"],
      last_updated: "2025-01-03",
    },
    {
      id: 7,
      name: "Project Management",
      category: "Soft Skills",
      proficiency_level: "intermediate",
      inferred_from: "faculty_feedback",
      verified: true,
      endorsements: 6,
      projects_used: ["Team Capstone Project", "Hackathon Leadership"],
      last_updated: "2025-01-18",
    },
    {
      id: 8,
      name: "Git",
      category: "Tools",
      proficiency_level: "advanced",
      inferred_from: "github_analysis",
      verified: true,
      endorsements: 10,
      projects_used: ["All Programming Projects"],
      last_updated: "2025-01-20",
    },
  ]

  const skillCategories: SkillCategory[] = [
    {
      name: "Programming",
      icon: <Code className="w-5 h-5" />,
      color: "bg-blue-100 text-blue-700",
      skills: skills.filter((s) => s.category === "Programming"),
    },
    {
      name: "Frameworks",
      icon: <BookOpen className="w-5 h-5" />,
      color: "bg-green-100 text-green-700",
      skills: skills.filter((s) => s.category === "Frameworks"),
    },
    {
      name: "Data Science",
      icon: <TrendingUp className="w-5 h-5" />,
      color: "bg-purple-100 text-purple-700",
      skills: skills.filter((s) => s.category === "Data Science"),
    },
    {
      name: "Database",
      icon: <Database className="w-5 h-5" />,
      color: "bg-orange-100 text-orange-700",
      skills: skills.filter((s) => s.category === "Database"),
    },
    {
      name: "Design",
      icon: <Palette className="w-5 h-5" />,
      color: "bg-pink-100 text-pink-700",
      skills: skills.filter((s) => s.category === "Design"),
    },
    {
      name: "Soft Skills",
      icon: <Users className="w-5 h-5" />,
      color: "bg-yellow-100 text-yellow-700",
      skills: skills.filter((s) => s.category === "Soft Skills"),
    },
    {
      name: "Tools",
      icon: <Target className="w-5 h-5" />,
      color: "bg-gray-100 text-gray-700",
      skills: skills.filter((s) => s.category === "Tools"),
    },
  ]

  const filteredSkills = skills.filter((skill) => {
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = filterCategory === "all" || skill.category === filterCategory
    const matchesProficiency = filterProficiency === "all" || skill.proficiency_level === filterProficiency

    return matchesSearch && matchesCategory && matchesProficiency
  })

  const getProficiencyColor = (level: string) => {
    switch (level) {
      case "expert":
        return "bg-purple-100 text-purple-700 border-purple-200"
      case "advanced":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "intermediate":
        return "bg-green-100 text-green-700 border-green-200"
      case "beginner":
        return "bg-orange-100 text-orange-700 border-orange-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getProficiencyValue = (level: string) => {
    switch (level) {
      case "expert":
        return 100
      case "advanced":
        return 75
      case "intermediate":
        return 50
      case "beginner":
        return 25
      default:
        return 0
    }
  }

  const skillStats = {
    total: skills.length,
    verified: skills.filter((s) => s.verified).length,
    expert: skills.filter((s) => s.proficiency_level === "expert").length,
    advanced: skills.filter((s) => s.proficiency_level === "advanced").length,
    totalEndorsements: skills.reduce((acc, s) => acc + s.endorsements, 0),
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
            <Badge variant="secondary">Skills Profile</Badge>
          </div>
          <Link href="/dashboard/student">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Skills Profile</h1>
          <p className="text-gray-600">Track and manage your technical and soft skills</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium">Total Skills</p>
                  <p className="text-2xl font-bold">{skillStats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium">Verified</p>
                  <p className="text-2xl font-bold">{skillStats.verified}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-sm font-medium">Expert Level</p>
                  <p className="text-2xl font-bold">{skillStats.expert}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium">Advanced</p>
                  <p className="text-2xl font-bold">{skillStats.advanced}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-sm font-medium">Endorsements</p>
                  <p className="text-2xl font-bold">{skillStats.totalEndorsements}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Search className="w-5 h-5 mr-2" />
                Search & Filter Skills
              </CardTitle>
              <Dialog open={showAddSkillDialog} onOpenChange={setShowAddSkillDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Skill
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Skill</DialogTitle>
                    <DialogDescription>Add a skill to your profile manually</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="skill-name">Skill Name</Label>
                      <Input id="skill-name" placeholder="e.g., TypeScript" />
                    </div>
                    <div>
                      <Label htmlFor="skill-category">Category</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Programming">Programming</SelectItem>
                          <SelectItem value="Frameworks">Frameworks</SelectItem>
                          <SelectItem value="Data Science">Data Science</SelectItem>
                          <SelectItem value="Database">Database</SelectItem>
                          <SelectItem value="Design">Design</SelectItem>
                          <SelectItem value="Soft Skills">Soft Skills</SelectItem>
                          <SelectItem value="Tools">Tools</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="skill-proficiency">Proficiency Level</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select proficiency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                          <SelectItem value="expert">Expert</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="skill-evidence">Evidence/Projects</Label>
                      <Textarea
                        id="skill-evidence"
                        placeholder="Describe projects or experiences that demonstrate this skill..."
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setShowAddSkillDialog(false)}>
                        Cancel
                      </Button>
                      <Button onClick={() => setShowAddSkillDialog(false)}>Add Skill</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <Input
                  placeholder="Search skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Programming">Programming</SelectItem>
                    <SelectItem value="Frameworks">Frameworks</SelectItem>
                    <SelectItem value="Data Science">Data Science</SelectItem>
                    <SelectItem value="Database">Database</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Soft Skills">Soft Skills</SelectItem>
                    <SelectItem value="Tools">Tools</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={filterProficiency} onValueChange={setFilterProficiency}>
                  <SelectTrigger>
                    <SelectValue placeholder="Proficiency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="categories" className="space-y-6">
          <TabsList>
            <TabsTrigger value="categories">By Category</TabsTrigger>
            <TabsTrigger value="all">All Skills</TabsTrigger>
            <TabsTrigger value="verified">Verified</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>

          <TabsContent value="categories" className="space-y-6">
            <div className="grid gap-6">
              {skillCategories
                .filter((category) => category.skills.length > 0)
                .map((category) => (
                  <Card key={category.name}>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <div className={`p-2 rounded-lg ${category.color} mr-3`}>{category.icon}</div>
                        {category.name}
                        <Badge variant="secondary" className="ml-2">
                          {category.skills.length}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4">
                        {category.skills.map((skill) => (
                          <div key={skill.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h4 className="font-medium">{skill.name}</h4>
                                {skill.verified && <CheckCircle className="w-4 h-4 text-green-600" />}
                                {skill.parent_skill_name && (
                                  <Badge variant="outline" className="text-xs">
                                    extends {skill.parent_skill_name}
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                                <span>Inferred from: {skill.inferred_from.replace("_", " ")}</span>
                                <span>•</span>
                                <span>{skill.endorsements} endorsements</span>
                                <span>•</span>
                                <span>Updated: {new Date(skill.last_updated).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center space-x-2 mb-2">
                                <span className="text-sm text-gray-600">Proficiency:</span>
                                <Badge className={getProficiencyColor(skill.proficiency_level)}>
                                  {skill.proficiency_level}
                                </Badge>
                              </div>
                              <Progress value={getProficiencyValue(skill.proficiency_level)} className="h-2 mb-2" />
                              {skill.projects_used.length > 0 && (
                                <div>
                                  <span className="text-sm text-gray-600">Used in: </span>
                                  <span className="text-sm">{skill.projects_used.join(", ")}</span>
                                </div>
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button variant="outline" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="all" className="space-y-6">
            <div className="grid gap-4">
              {filteredSkills.map((skill) => (
                <Card key={skill.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-medium">{skill.name}</h4>
                          <Badge variant="outline">{skill.category}</Badge>
                          <Badge className={getProficiencyColor(skill.proficiency_level)}>
                            {skill.proficiency_level}
                          </Badge>
                          {skill.verified && <CheckCircle className="w-4 h-4 text-green-600" />}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>{skill.endorsements} endorsements</span>
                          <span>•</span>
                          <span>From: {skill.inferred_from.replace("_", " ")}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="verified" className="space-y-6">
            <div className="grid gap-4">
              {skills
                .filter((skill) => skill.verified)
                .map((skill) => (
                  <Card key={skill.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-medium">{skill.name}</h4>
                            <Badge variant="outline">{skill.category}</Badge>
                            <Badge className={getProficiencyColor(skill.proficiency_level)}>
                              {skill.proficiency_level}
                            </Badge>
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          </div>
                          <p className="text-sm text-gray-600">
                            Verified through {skill.inferred_from.replace("_", " ")} • {skill.endorsements} endorsements
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <div className="mb-4 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">AI Skill Recommendations</h3>
              <p className="text-blue-700 text-sm">
                Based on your current skills and career goals, we recommend developing these skills to enhance your
                profile.
              </p>
            </div>

            <div className="grid gap-4">
              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-medium">TypeScript</h4>
                        <Badge className="bg-blue-100 text-blue-700">Recommended</Badge>
                        <Badge variant="outline">Programming</Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        Enhance your JavaScript skills with TypeScript for better type safety and development experience
                      </p>
                    </div>
                    <Button size="sm">Add Skill</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-medium">Docker</h4>
                        <Badge className="bg-blue-100 text-blue-700">Recommended</Badge>
                        <Badge variant="outline">Tools</Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        Learn containerization to improve your deployment and development workflow
                      </p>
                    </div>
                    <Button size="sm">Add Skill</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-medium">Deep Learning</h4>
                        <Badge className="bg-blue-100 text-blue-700">Recommended</Badge>
                        <Badge variant="outline">Data Science</Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        Build on your Machine Learning foundation with advanced deep learning techniques
                      </p>
                    </div>
                    <Button size="sm">Add Skill</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
