"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Send, Paperclip, Search, Phone, Video, MoreHorizontal, Star } from "lucide-react"

interface Message {
  id: string
  sender: string
  senderRole: "student" | "faculty" | "organization"
  content: string
  timestamp: string
  read: boolean
  attachments?: string[]
}

interface Conversation {
  id: string
  participants: Array<{
    name: string
    role: "student" | "faculty" | "organization"
    avatar?: string
  }>
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  project?: string
}

export function CommunicationHub() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const conversations: Conversation[] = [
    {
      id: "1",
      participants: [
        { name: "Dr. Sarah Johnson", role: "faculty", avatar: "/placeholder.svg?height=32&width=32" },
        { name: "John Smith", role: "student" },
      ],
      lastMessage: "Great progress on the literature review! Please schedule a meeting to discuss next steps.",
      lastMessageTime: "2 hours ago",
      unreadCount: 2,
      project: "AI Research Internship",
    },
    {
      id: "2",
      participants: [
        { name: "TechCorp Recruiter", role: "organization", avatar: "/placeholder.svg?height=32&width=32" },
        { name: "John Smith", role: "student" },
      ],
      lastMessage: "We'd like to schedule a technical interview for next week.",
      lastMessageTime: "1 day ago",
      unreadCount: 1,
      project: "Frontend Developer Internship",
    },
    {
      id: "3",
      participants: [
        { name: "Prof. Michael Chen", role: "faculty", avatar: "/placeholder.svg?height=32&width=32" },
        { name: "John Smith", role: "student" },
      ],
      lastMessage: "Your data analysis looks good. Can you add more visualizations?",
      lastMessageTime: "3 days ago",
      unreadCount: 0,
      project: "Data Science Project",
    },
  ]

  const messages: Record<string, Message[]> = {
    "1": [
      {
        id: "1",
        sender: "Dr. Sarah Johnson",
        senderRole: "faculty",
        content: "Hi John, I've reviewed your literature review draft. Overall, it's excellent work!",
        timestamp: "10:30 AM",
        read: true,
      },
      {
        id: "2",
        sender: "John Smith",
        senderRole: "student",
        content:
          "Thank you, Dr. Johnson! I'm glad you found it comprehensive. Are there any specific areas you'd like me to expand on?",
        timestamp: "10:45 AM",
        read: true,
      },
      {
        id: "3",
        sender: "Dr. Sarah Johnson",
        senderRole: "faculty",
        content: "Great progress on the literature review! Please schedule a meeting to discuss next steps.",
        timestamp: "2 hours ago",
        read: false,
      },
    ],
    "2": [
      {
        id: "1",
        sender: "TechCorp Recruiter",
        senderRole: "organization",
        content:
          "Hi John, congratulations on passing the initial screening! We'd like to move forward with a technical interview.",
        timestamp: "Yesterday",
        read: true,
      },
      {
        id: "2",
        sender: "TechCorp Recruiter",
        senderRole: "organization",
        content: "We'd like to schedule a technical interview for next week.",
        timestamp: "1 day ago",
        read: false,
      },
    ],
  }

  const sendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      // Add message logic here
      setNewMessage("")
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "faculty":
        return "text-purple-600"
      case "organization":
        return "text-green-600"
      case "student":
        return "text-blue-600"
      default:
        return "text-gray-600"
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "faculty":
        return "Faculty"
      case "organization":
        return "Organization"
      case "student":
        return "Student"
      default:
        return role
    }
  }

  return (
    <div className="h-[600px] bg-white border rounded-lg overflow-hidden">
      <div className="flex h-full">
        {/* Conversations List */}
        <div className="w-1/3 border-r">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Messages</h3>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="overflow-y-auto h-full">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                  selectedConversation === conversation.id ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
                }`}
                onClick={() => setSelectedConversation(conversation.id)}
              >
                <div className="flex items-start space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={conversation.participants[0].avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {conversation.participants[0].name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm truncate">{conversation.participants[0].name}</p>
                      <div className="flex items-center space-x-2">
                        {conversation.unreadCount > 0 && (
                          <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1">
                            {conversation.unreadCount}
                          </span>
                        )}
                        <span className="text-xs text-gray-500">{conversation.lastMessageTime}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {getRoleBadge(conversation.participants[0].role)}
                      </Badge>
                      {conversation.project && (
                        <span className="text-xs text-gray-500 truncate">{conversation.project}</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 truncate mt-1">{conversation.lastMessage}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src={
                        conversations.find((c) => c.id === selectedConversation)?.participants[0].avatar ||
                        "/placeholder.svg"
                      }
                    />
                    <AvatarFallback>
                      {conversations
                        .find((c) => c.id === selectedConversation)
                        ?.participants[0].name.split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">
                      {conversations.find((c) => c.id === selectedConversation)?.participants[0].name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {conversations.find((c) => c.id === selectedConversation)?.project}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Star className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages[selectedConversation]?.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderRole === "student" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.senderRole === "student" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      {message.senderRole !== "student" && (
                        <p className={`text-xs font-medium mb-1 ${getRoleColor(message.senderRole)}`}>
                          {message.sender}
                        </p>
                      )}
                      <p className="text-sm">{message.content}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.senderRole === "student" ? "text-blue-100" : "text-gray-500"
                        }`}
                      >
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Select a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
