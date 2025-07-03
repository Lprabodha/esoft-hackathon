"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Brain,
  Target,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Upload,
  MessageSquare,
  Eye,
  Search,
  FileText,
  Loader2,
} from "lucide-react"
import Link from "next/link"

interface Task {
  id: string
  title: string
  description: string
  assignedTo: string
  assignedBy: string
  project: string
  priority: "Low" | "Medium" | "High"
  status: "Pending" | "In Progress" | "Completed" | "Overdue"
  dueDate: string
  createdDate: string
  progress: number
  submissions: Submission[]
  feedback?: string
  points: number
  tags: string[]
  estimatedHours: number
  actualHours?: number
}

interface Submission {
  id: string
  studentId: string
  studentName: string
  submittedAt: string
  files: string[]
  notes: string
  status: "Submitted" | "Reviewed" | "Approved" | "Needs Revision"
  feedback?: string
  grade?: number
}

export default function TasksPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterPriority, setFilterPriority] = useState("all")
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [showSubmissionDialog, setShowSubmissionDialog] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState("")
  const [submitError, setSubmitError] = useState("")

  const [submissionForm, setSubmissionForm] = useState({
    notes: "",
    files: [] as File[],
    hoursSpent: "",
  })

  const tasks: Task[] = [
    {
      id: "1",
      title: "Literature Review on Neural Networks",
      description:
        "Complete a comprehensive literature review on neural network architectures for computer vision applications. Include at least 20 recent papers and provide critical analysis.",
      assignedTo: "John Smith",
      assignedBy: "Dr. Sarah Johnson",
      project: "AI Research Internship",
      priority: "High",
      status: "In Progress",
      dueDate: "2024-02-15",
      createdDate: "2024-01-15",
      progress: 75,
      submissions: [
        {
          id: "1",
          studentId: "1",
          studentName: "John Smith",
          submittedAt: "2024-01-25T10:00:00Z",
          files: ["literature_review_draft.pdf"],
          notes: "Initial draft with 15 papers reviewed. Still working on the analysis section.",
          status: "Reviewed",
          feedback: "Good start! Please add more recent papers from 2023 and expand the critical analysis.",
          grade: 85,
        },
      ],
      points: 25,
      tags: ["Research", "Writing", "Analysis"],
      estimatedHours: 40,
      actualHours: 32,
    },
    {
      id: "2",
      title: "Data Preprocessing Pipeline",
      description:
        "Develop a robust data preprocessing pipeline for the healthcare dataset. Include data cleaning, normalization, and feature engineering steps.",
      assignedTo: "John Smith",
      assignedBy: "Prof. Michael Chen",
      project: "Data Science Project",
      priority: "Medium",
      status: "Pending",
      dueDate: "2024-02-20",
      createdDate: "2024-01-20",
      progress: 0,
      submissions: [],
      points: 20,
      tags: ["Programming", "Data Science", "Python"],
      estimatedHours: 25,
    },
    {
      id: "3",
      title: "Frontend Component Development",
      description:
        "Create reusable React components for the dashboard interface. Focus on accessibility and responsive design principles.",
      assignedTo: "John Smith",
      assignedBy: "Tech Team Lead",
      project: "Frontend Development Internship",
      priority: "High",
      status: "Completed",
      dueDate: "2024-01-30",
      createdDate: "2024-01-10",
      progress: 100,
      submissions: [
        {
          id: "2",
          studentId: "1",
          studentName: "John Smith",
          submittedAt: "2024-01-28T14:30:00Z",
          files: ["components.zip", "documentation.md"],
          notes: "Completed all required components with full test coverage and documentation.",
          status: "Approved",
          feedback: "Excellent work! Components are well-structured and follow best practices.",
          grade: 95,
        },
      ],
      points: 30,
      tags: ["React", "Frontend", "UI/UX"],
      estimatedHours: 35,
      actualHours: 38,
    },
    {
      id: "4",
      title: "Weekly Progress Report",
      description:
        "Submit weekly progress report detailing accomplishments, challenges, and next steps for the research project.",
      assignedTo: "John Smith",
      assignedBy: "Dr. Sarah Johnson",
      project: "AI Research Internship",
      priority: "Low",
      status: "Overdue",
      dueDate: "2024-01-28",
      createdDate: "2024-01-21",
      progress: 0,
      submissions: [],
      points: 5,
      tags: ["Reporting", "Communication"],
      estimatedHours: 2,
    },
  ]

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesStatus = filterStatus === "all" || task.status.toLowerCase() === filterStatus.toLowerCase()
    const matchesPriority = filterPriority === "all" || task.priority.toLowerCase() === filterPriority.toLowerCase()

    return matchesSearch && matchesStatus && matchesPriority
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-700 border-red-200"
      case "Medium":
        return "bg-orange-100 text-orange-700 border-orange-200"
      case "Low":
        return "bg-green-100 text-green-700 border-green-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700 border-green-200"
      case "In Progress":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "Overdue":
        return "bg-red-100 text-red-700 border-red-200"
      case "Pending":
        return "bg-gray-100 text-gray-700 border-gray-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const isOverdue = (dueDate: string, status: string) => {
    return new Date(dueDate) < new Date() && status !== "Completed"
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setSubmissionForm({
        ...submissionForm,
        files: [...submissionForm.files, ...newFiles],
      })
    }
  }

  const removeFile = (index: number) => {
    const newFiles = submissionForm.files.filter((_, i) => i !== index)
    setSubmissionForm({ ...submissionForm, files: newFiles })
  }

  const handleSubmitWork = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedTask) return

    setIsSubmitting(true)
    setSubmitError("")
    setSubmitSuccess("")

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setSubmitSuccess("Work submitted successfully!")
      setSubmissionForm({ notes: "", files: [], hoursSpent: "" })

      setTimeout(() => {
        setShowSubmissionDialog(false)
        setSubmitSuccess("")
      }, 2000)
    } catch (error) {
      setSubmitError("Failed to submit work. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const taskStats = {
    total: tasks.length,
    pending: tasks.filter((t) => t.status === "Pending").length,
    inProgress: tasks.filter((t) => t.status === "In Progress").length,
    completed: tasks.filter((t) => t.status === "Completed").length,
    overdue: tasks.filter((t) => isOverdue(t.dueDate, t.status)).length,
    totalPoints: tasks.reduce((acc, t) => acc + t.points, 0),
    earnedPoints: tasks.filter((t) => t.status === "Completed").reduce((acc, t) => acc + t.points, 0),
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
            <Badge variant="secondary">My Tasks</Badge>
          </div>
          <Link href="/dashboard/student">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Tasks & Assignments</h1>
          <p className="text-gray-600">Track your progress on assigned tasks and projects</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium">Total Tasks</p>
                  <p className="text-2xl font-bold">{taskStats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="text-sm font-medium">Pending</p>
                  <p className="text-2xl font-bold">{taskStats.pending}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium">In Progress</p>
                  <p className="text-2xl font-bold">{taskStats.inProgress}</p>
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
                  <p className="text-2xl font-bold">{taskStats.completed}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <div>
                  <p className="text-sm font-medium">Overdue</p>
                  <p className="text-2xl font-bold">{taskStats.overdue}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-sm font-medium">Points</p>
                  <p className="text-2xl font-bold">
                    {taskStats.earnedPoints}/{taskStats.totalPoints}
                  </p>
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
              Search & Filter Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <Input
                  placeholder="Search tasks, projects, or tags..."
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
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={filterPriority} onValueChange={setFilterPriority}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Tasks</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="overdue">Overdue</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="grid gap-6">
              {filteredTasks.map((task) => (
                <Card key={task.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{task.title}</CardTitle>
                        <CardDescription className="text-base">
                          {task.project} • Assigned by: {task.assignedBy}
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getPriorityColor(task.priority)}>{task.priority} Priority</Badge>
                        <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                        {isOverdue(task.dueDate, task.status) && (
                          <Badge className="bg-red-100 text-red-700">Overdue</Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{task.description}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-1" />
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-1" />
                        Est: {task.estimatedHours}h{task.actualHours && ` (${task.actualHours}h actual)`}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Target className="w-4 h-4 mr-1" />
                        {task.points} points
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Upload className="w-4 h-4 mr-1" />
                        {task.submissions.length} submissions
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div>
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span>Progress</span>
                          <span>{task.progress}%</span>
                        </div>
                        <Progress value={task.progress} className="h-2" />
                      </div>

                      <div>
                        <h4 className="font-medium text-sm text-gray-700 mb-1">Tags:</h4>
                        <div className="flex flex-wrap gap-2">
                          {task.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {task.submissions.length > 0 && (
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm font-medium text-blue-900 mb-1">Latest Submission:</p>
                          <p className="text-sm text-blue-700">
                            {task.submissions[task.submissions.length - 1].status} •{" "}
                            {new Date(task.submissions[task.submissions.length - 1].submittedAt).toLocaleDateString()}
                          </p>
                          {task.submissions[task.submissions.length - 1].feedback && (
                            <p className="text-sm text-blue-700 mt-1">
                              Feedback: {task.submissions[task.submissions.length - 1].feedback}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      <Dialog open={showSubmissionDialog} onOpenChange={setShowSubmissionDialog}>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            onClick={() => setSelectedTask(task)}
                            disabled={task.status === "Completed"}
                          >
                            <Upload className="w-4 h-4 mr-1" />
                            Submit Work
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Submit Work for: {selectedTask?.title}</DialogTitle>
                            <DialogDescription>
                              Upload your completed work and add any notes for your mentor
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

                          <form onSubmit={handleSubmitWork} className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="submission-notes">Notes & Comments</Label>
                              <Textarea
                                id="submission-notes"
                                placeholder="Describe what you've completed, any challenges faced, or questions you have..."
                                rows={4}
                                value={submissionForm.notes}
                                onChange={(e) => setSubmissionForm({ ...submissionForm, notes: e.target.value })}
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="hours-spent">Hours Spent</Label>
                              <Input
                                id="hours-spent"
                                type="number"
                                placeholder="e.g., 8"
                                value={submissionForm.hoursSpent}
                                onChange={(e) => setSubmissionForm({ ...submissionForm, hoursSpent: e.target.value })}
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="submission-files">Upload Files</Label>
                              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                                <div className="text-center">
                                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                  <p className="text-sm text-gray-600 mb-2">Upload your work files</p>
                                  <Input
                                    id="submission-files"
                                    type="file"
                                    multiple
                                    accept=".pdf,.doc,.docx,.txt,.zip,.py,.js,.html,.css"
                                    onChange={handleFileUpload}
                                    className="hidden"
                                  />
                                  <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => document.getElementById("submission-files")?.click()}
                                  >
                                    <Upload className="w-4 h-4 mr-2" />
                                    Choose Files
                                  </Button>
                                </div>
                              </div>

                              {submissionForm.files.length > 0 && (
                                <div className="space-y-2">
                                  <p className="text-sm font-medium">Selected Files:</p>
                                  {submissionForm.files.map((file, index) => (
                                    <div
                                      key={index}
                                      className="flex items-center justify-between p-2 bg-gray-50 rounded"
                                    >
                                      <div className="flex items-center space-x-2">
                                        <FileText className="w-4 h-4 text-gray-500" />
                                        <span className="text-sm">{file.name}</span>
                                        <span className="text-xs text-gray-500">
                                          ({(file.size / 1024).toFixed(1)} KB)
                                        </span>
                                      </div>
                                      <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(index)}>
                                        ×
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>

                            <div className="flex items-center justify-end space-x-2 pt-4">
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => setShowSubmissionDialog(false)}
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
                                    Submit Work
                                  </>
                                )}
                              </Button>
                            </div>
                          </form>
                        </DialogContent>
                      </Dialog>

                      <Button variant="outline" size="sm">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        Message Mentor
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="active" className="space-y-6">
            <div className="grid gap-6">
              {filteredTasks
                .filter((task) => task.status === "Pending" || task.status === "In Progress")
                .map((task) => (
                  <Card key={task.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{task.title}</CardTitle>
                          <CardDescription>{task.project}</CardDescription>
                        </div>
                        <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span>Progress</span>
                            <span>{task.progress}%</span>
                          </div>
                          <Progress value={task.progress} className="h-2" />
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                          <span>{task.points} points</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            <div className="grid gap-6">
              {filteredTasks
                .filter((task) => task.status === "Completed")
                .map((task) => (
                  <Card key={task.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{task.title}</CardTitle>
                          <CardDescription>{task.project}</CardDescription>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-green-100 text-green-700">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Completed
                          </Badge>
                          <Badge variant="outline">{task.points} points</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Progress value={100} className="h-2" />
                        {task.submissions.length > 0 && task.submissions[task.submissions.length - 1].grade && (
                          <p className="text-sm text-green-600">
                            Grade: {task.submissions[task.submissions.length - 1].grade}/100
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="overdue" className="space-y-6">
            <div className="grid gap-6">
              {filteredTasks
                .filter((task) => isOverdue(task.dueDate, task.status))
                .map((task) => (
                  <Card key={task.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-red-500">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{task.title}</CardTitle>
                          <CardDescription>{task.project}</CardDescription>
                        </div>
                        <Badge className="bg-red-100 text-red-700">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Overdue
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-3 bg-red-50 rounded-lg">
                          <p className="text-sm text-red-700">
                            This task was due on {new Date(task.dueDate).toLocaleDateString()}. Please submit as soon as
                            possible.
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="destructive">
                            <Upload className="w-4 h-4 mr-1" />
                            Submit Now
                          </Button>
                          <Button variant="outline" size="sm">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Contact Mentor
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>

        {filteredTasks.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Target className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
              <p className="text-gray-600 mb-4">
                {searchQuery || filterStatus !== "all" || filterPriority !== "all"
                  ? "Try adjusting your search criteria"
                  : "You don't have any tasks assigned yet"}
              </p>
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
