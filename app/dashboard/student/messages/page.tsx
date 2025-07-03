"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  MessageSquare,
  Send,
  Search,
  Plus,
  Users,
  Building2,
  GraduationCap,
  CheckCircle,
  AlertCircle,
  Paperclip,
  Phone,
  Video,
} from "lucide-react"
import Link from "next/link"

interface Message {
  id: number
  sender_id: number
  sender_name: string
  sender_role: "student" | "faculty" | "organization"
  sender_avatar: string
  content: string
  timestamp: string
  read: boolean
  thread_id: number
  attachments?: string[]
}

interface Thread {
  id: number
  subject: string
  participants: {
    id: number
    name: string
    role: "student" | "faculty" | "organization"
    avatar: string
  }[]
  last_message: string
  last_message_time: string
  unread_count: number
  status: "active" | "archived"
  related_opportunity?: string
}

export default function MessagesPage() {
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [showNewMessageDialog, setShowNewMessageDialog] = useState(false)

  const threads: Thread[] = [
    {
      id: 1,
      subject: "AI Research Internship - Interview Details",
      participants: [
        {
          id: 10,
          name: "Dr. Sarah Johnson",
          role: "faculty",
          avatar: "/placeholder.svg?height=32&width=32",
        },
      ],
      last_message: "Looking forward to our interview on Friday at 2 PM. Please prepare a brief presentation...",
      last_message_time: "2024-01-20T14:30:00Z",
      unread_count: 2,
      status: "active",
      related_opportunity: "AI Research Internship",
    },
    {
      id: 2,
      subject: "Frontend Development Questions",
      participants: [
        {
          id: 11,
          name: "Tech Team",
          role: "organization",
          avatar: "/placeholder.svg?height=32&width=32",
        },
      ],
      last_message: "Thanks for your questions about our tech stack. We primarily use React with TypeScript...",
      last_message_time: "2024-01-19T16:45:00Z",
      unread_count: 0,
      status: "active",
      related_opportunity: "Frontend Development Internship",
    },
    {
      id: 3,
      subject: "Project Feedback and Next Steps",
      participants: [
        {
          id: 12,
          name: "Prof. Michael Chen",
          role: "faculty",
          avatar: "/placeholder.svg?height=32&width=32",
        },
      ],
      last_message: "Great work on the data analysis project. Here are some suggestions for improvement...",
      last_message_time: "2024-01-18T11:20:00Z",
      unread_count: 1,
      status: "active",
    },
    {
      id: 4,
      subject: "Mentorship Program Welcome",
      participants: [
        {
          id: 13,
          name: "Industry Mentor",
          role: "organization",
          avatar: "/placeholder.svg?height=32&width=32",
        },
      ],
      last_message: "Welcome to the mentorship program! I'm excited to work with you this semester...",
      last_message_time: "2024-01-17T09:15:00Z",
      unread_count: 0,
      status: "active",
    },
  ]

  const messages: Message[] = [
    {
      id: 1,
      sender_id: 10,
      sender_name: "Dr. Sarah Johnson",
      sender_role: "faculty",
      sender_avatar: "/placeholder.svg?height=32&width=32",
      content: "Hi John, congratulations on being shortlisted for the AI Research Internship!",
      timestamp: "2024-01-20T10:00:00Z",
      read: true,
      thread_id: 1,
    },
    {
      id: 2,
      sender_id: 1,
      sender_name: "John Smith",
      sender_role: "student",
      sender_avatar: "/placeholder.svg?height=32&width=32",
      content: "Thank you so much! I'm really excited about this opportunity.",
      timestamp: "2024-01-20T10:15:00Z",
      read: true,
      thread_id: 1,
    },
    {
      id: 3,
      sender_id: 10,
      sender_name: "Dr. Sarah Johnson",
      sender_role: "faculty",
      sender_avatar: "/placeholder.svg?height=32&width=32",
      content:
        "Looking forward to our interview on Friday at 2 PM. Please prepare a brief presentation about your research interests and any relevant projects you've worked on.",
      timestamp: "2024-01-20T14:30:00Z",
      read: false,
      thread_id: 1,
    },
    {
      id: 4,
      sender_id: 10,
      sender_name: "Dr. Sarah Johnson",
      sender_role: "faculty",
      sender_avatar: "/placeholder.svg?height=32&width=32",
      content: "Also, feel free to ask any questions about the research lab or the internship program.",
      timestamp: "2024-01-20T14:32:00Z",
      read: false,
      thread_id: 1,
    },
  ]

  const filteredThreads = threads.filter(
    (thread) =>
      thread.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thread.participants.some((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const getThreadMessages = (threadId: number) => {
    return messages.filter((msg) => msg.thread_id === threadId)
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "faculty":
        return <GraduationCap className="w-4 h-4" />
      case "organization":
        return <Building2 className="w-4 h-4" />
      case "student":
        return <Users className="w-4 h-4" />
      default:
        return <Users className="w-4 h-4" />
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "faculty":
        return "bg-blue-100 text-blue-700"
      case "organization":
        return "bg-green-100 text-green-700"
      case "student":
        return "bg-purple-100 text-purple-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedThread) {
      // In a real app, this would send the message to the backend
      console.log("Sending message:", newMessage)
      setNewMessage("")
    }
  }

  const messageStats = {
    total: threads.length,
    unread: threads.reduce((acc, thread) => acc + thread.unread_count, 0),
    active: threads.filter((t) => t.status === "active").length,
    faculty: threads.filter((t) => t.participants.some((p) => p.role === "faculty")).length,
    organizations: threads.filter((t) => t.participants.some((p) => p.role === "organization")).length,
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
            <Badge variant="secondary">Messages</Badge>
          </div>
          <Link href="/dashboard/student">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
          <p className="text-gray-600">Communicate with faculty, mentors, and organizations</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium">Total Conversations</p>
                  <p className="text-2xl font-bold">{messageStats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-sm font-medium">Unread Messages</p>
                  <p className="text-2xl font-bold">{messageStats.unread}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium">Active Threads</p>
                  <p className="text-2xl font-bold">{messageStats.active}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <GraduationCap className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-sm font-medium">Faculty Conversations</p>
                  <p className="text-2xl font-bold">{messageStats.faculty}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium">Organization Chats</p>
                  <p className="text-2xl font-bold">{messageStats.organizations}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Conversations List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Conversations</CardTitle>
                  <Dialog open={showNewMessageDialog} onOpenChange={setShowNewMessageDialog}>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        New
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Start New Conversation</DialogTitle>
                        <DialogDescription>Send a message to faculty or organization</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="recipient">Recipient</Label>
                          <Input id="recipient" placeholder="Search for faculty or organization..." />
                        </div>
                        <div>
                          <Label htmlFor="subject">Subject</Label>
                          <Input id="subject" placeholder="Message subject..." />
                        </div>
                        <div>
                          <Label htmlFor="message">Message</Label>
                          <Textarea id="message" placeholder="Type your message..." rows={4} />
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={() => setShowNewMessageDialog(false)}>
                            Cancel
                          </Button>
                          <Button onClick={() => setShowNewMessageDialog(false)}>Send Message</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {filteredThreads.map((thread) => (
                    <div
                      key={thread.id}
                      className={`p-4 cursor-pointer hover:bg-gray-50 border-l-4 ${
                        selectedThread?.id === thread.id
                          ? "bg-blue-50 border-l-blue-500"
                          : thread.unread_count > 0
                            ? "border-l-orange-500"
                            : "border-l-transparent"
                      }`}
                      onClick={() => setSelectedThread(thread)}
                    >
                      <div className="flex items-start space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={thread.participants[0]?.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {thread.participants[0]?.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900 truncate">{thread.participants[0]?.name}</p>
                            {thread.unread_count > 0 && (
                              <Badge variant="destructive" className="text-xs">
                                {thread.unread_count}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-1 mb-1">
                            <Badge className={`${getRoleColor(thread.participants[0]?.role)} text-xs`}>
                              {getRoleIcon(thread.participants[0]?.role)}
                              <span className="ml-1 capitalize">{thread.participants[0]?.role}</span>
                            </Badge>
                            {thread.related_opportunity && (
                              <Badge variant="outline" className="text-xs">
                                {thread.related_opportunity}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 truncate">{thread.subject}</p>
                          <p className="text-xs text-gray-500 truncate">{thread.last_message}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(thread.last_message_time).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Message Thread */}
          <div className="lg:col-span-2">
            {selectedThread ? (
              <Card className="h-[600px] flex flex-col">
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{selectedThread.subject}</CardTitle>
                      <CardDescription className="flex items-center space-x-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={selectedThread.participants[0]?.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {selectedThread.participants[0]?.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span>{selectedThread.participants[0]?.name}</span>
                        <Badge className={getRoleColor(selectedThread.participants[0]?.role)}>
                          {selectedThread.participants[0]?.role}
                        </Badge>
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Video className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-4">
                    {getThreadMessages(selectedThread.id).map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender_role === "student" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.sender_role === "student" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          {message.sender_role !== "student" && (
                            <p className="text-xs font-medium mb-1">{message.sender_name}</p>
                          )}
                          <p className="text-sm">{message.content}</p>
                          <p
                            className={`text-xs mt-1 ${
                              message.sender_role === "student" ? "text-blue-100" : "text-gray-500"
                            }`}
                          >
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <div className="border-t p-4">
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="h-[600px] flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                  <p className="text-gray-600">Choose a conversation from the list to start messaging</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
