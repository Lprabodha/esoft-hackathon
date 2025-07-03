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
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Plus,
  Calendar,
  Clock,
  User,
  CheckCircle,
  AlertCircle,
  Upload,
  MessageSquare,
  Eye,
  Trash2,
  Target,
  Loader2,
} from "lucide-react"

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

interface TaskForm {
  title: string
  description: string
  assignedTo: string
  project: string
  priority: string
  dueDate: string
  points: string
}

export function TaskManagement() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Literature Review",
      description: "Complete a comprehensive literature review on neural network architectures",
      assignedTo: "Alice Johnson",
      assignedBy: "Dr. Sarah Johnson",
      project: "AI Research Internship",
      priority: "High",
      status: "In Progress",
      dueDate: "2024-01-30",
      createdDate: "2024-01-15",
      progress: 75,
      submissions: [],
      points: 20,
    },
    {
      id: "2",
      title: "Data Collection",
      description: "Gather and preprocess dataset for the machine learning model",
      assignedTo: "Bob Smith",
      assignedBy: "Prof. Michael Chen",
      project: "Data Science Project",
      priority: "Medium",
      status: "Pending",
      dueDate: "2024-02-05",
      createdDate: "2024-01-20",
      progress: 0,
      submissions: [],
      points: 15,
    },
  ])

  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showSubmissionDialog, setShowSubmissionDialog] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState("")
  const [submitError, setSubmitError] = useState("")

  const [taskForm, setTaskForm] = useState<TaskForm>({
    title: "",
    description: "",
    assignedTo: "",
    project: "",
    priority: "",
    dueDate: "",
    points: "",
  })

  const [submissionForm, setSubmissionForm] = useState({
    notes: "",
    files: [] as File[],
  })

  const students = ["Alice Johnson", "Bob Smith", "Carol Davis", "David Park"]
  const projects = ["AI Research Internship", "Data Science Project", "Web Development Training"]

  const validateTaskForm = (): boolean => {
    if (!taskForm.title.trim()) {
      setSubmitError("Task title is required")
      return false
    }
    if (!taskForm.description.trim()) {
      setSubmitError("Task description is required")
      return false
    }
    if (!taskForm.assignedTo) {
      setSubmitError("Please assign the task to a student")
      return false
    }
    if (!taskForm.dueDate) {
      setSubmitError("Due date is required")
      return false
    }
    return true
  }

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError("")
    setSubmitSuccess("")

    if (!validateTaskForm()) return

    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newTask: Task = {
        id: Date.now().toString(),
        ...taskForm,
        assignedBy: "Dr. Sarah Johnson", // Current user
        status: "Pending",
        createdDate: new Date().toISOString().split("T")[0],
        progress: 0,
        submissions: [],
        points: Number.parseInt(taskForm.points) || 10,
      }

      setTasks([...tasks, newTask])
      setSubmitSuccess("Task created successfully!")

      // Reset form
      setTaskForm({
        title: "",
        description: "",
        assignedTo: "",
        project: "",
        priority: "",
        dueDate: "",
        points: "",
      })

      setTimeout(() => {
        setShowCreateDialog(false)
        setSubmitSuccess("")
      }, 1500)
    } catch (error) {
      setSubmitError("Failed to create task. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
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
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const newSubmission: Submission = {
        id: Date.now().toString(),
        studentId: "1",
        studentName: "John Smith", // Current student
        submittedAt: new Date().toISOString(),
        files: submissionForm.files.map((f) => f.name),
        notes: submissionForm.notes,
        status: "Submitted",
      }

      // Update task with new submission
      const updatedTasks = tasks.map((task) =>
        task.id === selectedTask.id
          ? {
              ...task,
              submissions: [...task.submissions, newSubmission],
              status: "In Progress" as const,
              progress: Math.min(task.progress + 25, 100),
            }
          : task,
      )
      setTasks(updatedTasks)

      setSubmitSuccess("Work submitted successfully!")
      setSubmissionForm({ notes: "", files: [] })

      setTimeout(() => {
        setShowSubmissionDialog(false)
        setSubmitSuccess("")
      }, 1500)
    } catch (error) {
      setSubmitError("Failed to submit work. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateTaskStatus = (taskId: string, newStatus: Task["status"]) => {
    const updatedTasks = tasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task))
    setTasks(updatedTasks)
  }

  const updateTaskProgress = (taskId: string, newProgress: number) => {
    const updatedTasks = tasks.map((task) => (task.id === taskId ? { ...task, progress: newProgress } : task))
    setTasks(updatedTasks)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-700"
      case "Medium":
        return "bg-orange-100 text-orange-700"
      case "Low":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700"
      case "In Progress":
        return "bg-blue-100 text-blue-700"
      case "Overdue":
        return "bg-red-100 text-red-700"
      case "Pending":
        return "bg-gray-100 text-gray-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date() && tasks.find((t) => t.dueDate === dueDate)?.status !== "Completed"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Task Management</h2>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Task
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
              <DialogDescription>
                Assign a new task to a student with specific requirements and deadlines
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

            <form onSubmit={handleCreateTask} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="task-title">Task Title *</Label>
                  <Input
                    id="task-title"
                    placeholder="e.g., Literature Review"
                    value={taskForm.title}
                    onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="task-student">Assign to Student *</Label>
                  <Select
                    value={taskForm.assignedTo}
                    onValueChange={(value) => setTaskForm({ ...taskForm, assignedTo: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select student" />
                    </SelectTrigger>
                    <SelectContent>
                      {students.map((student) => (
                        <SelectItem key={student} value={student}>
                          {student}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="task-description">Description *</Label>
                <Textarea
                  id="task-description"
                  placeholder="Describe the task requirements, expectations, and deliverables..."
                  rows={4}
                  value={taskForm.description}
                  onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="task-project">Project</Label>
                  <Select
                    value={taskForm.project}
                    onValueChange={(value) => setTaskForm({ ...taskForm, project: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent>
                      {projects.map((project) => (
                        <SelectItem key={project} value={project}>
                          {project}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="task-priority">Priority</Label>
                  <Select
                    value={taskForm.priority}
                    onValueChange={(value) => setTaskForm({ ...taskForm, priority: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="task-points">Points</Label>
                  <Input
                    id="task-points"
                    type="number"
                    placeholder="10"
                    value={taskForm.points}
                    onChange={(e) => setTaskForm({ ...taskForm, points: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="task-deadline">Due Date *</Label>
                <Input
                  id="task-deadline"
                  type="date"
                  value={taskForm.dueDate}
                  onChange={(e) => setTaskForm({ ...taskForm, dueDate: e.target.value })}
                  required
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowCreateDialog(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      Create Task
                    </>
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Task Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Total Tasks</p>
                <p className="text-2xl font-bold">{tasks.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-sm font-medium">In Progress</p>
                <p className="text-2xl font-bold">{tasks.filter((t) => t.status === "In Progress").length}</p>
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
                <p className="text-2xl font-bold">{tasks.filter((t) => t.status === "Completed").length}</p>
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
                <p className="text-2xl font-bold">{tasks.filter((t) => isOverdue(t.dueDate)).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tasks List */}
      <div className="grid gap-6">
        {tasks.map((task) => (
          <Card key={task.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{task.title}</CardTitle>
                  <CardDescription>
                    {task.project} • Assigned to: {task.assignedTo}
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getPriorityColor(task.priority)}>{task.priority} Priority</Badge>
                  <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                  {isOverdue(task.dueDate) && <Badge className="bg-red-100 text-red-700">Overdue</Badge>}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{task.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-1" />
                  Due: {task.dueDate}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <User className="w-4 h-4 mr-1" />
                  By: {task.assignedBy}
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

                {task.feedback && (
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-blue-900 mb-1">Latest Feedback:</p>
                    <p className="text-sm text-blue-700">{task.feedback}</p>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Dialog open={showSubmissionDialog} onOpenChange={setShowSubmissionDialog}>
                  <DialogTrigger asChild>
                    <Button size="sm" onClick={() => setSelectedTask(task)}>
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
                              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                <span className="text-sm">{file.name}</span>
                                <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(index)}>
                                  <Trash2 className="w-4 h-4" />
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

                {/* Faculty/Mentor actions */}
                <Select
                  value={task.status}
                  onValueChange={(value) => updateTaskStatus(task.id, value as Task["status"])}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {tasks.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Target className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks yet</h3>
            <p className="text-gray-600 mb-4">Create your first task to get started with project management</p>
            <Button onClick={() => setShowCreateDialog(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create First Task
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
