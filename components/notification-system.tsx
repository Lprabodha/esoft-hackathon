"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Bell, X, CheckCircle, AlertCircle, Clock, MessageSquare, FileText } from "lucide-react"

interface Notification {
  id: string
  type: "application" | "task" | "message" | "deadline" | "feedback"
  title: string
  message: string
  timestamp: string
  read: boolean
  priority: "low" | "medium" | "high"
  actionUrl?: string
}

export function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "application",
      title: "Application Status Update",
      message: "Your application for 'AI Research Internship' has been approved!",
      timestamp: "2 hours ago",
      read: false,
      priority: "high",
      actionUrl: "/dashboard/student/applications",
    },
    {
      id: "2",
      type: "task",
      title: "Task Deadline Reminder",
      message: "Your 'Literature Review' task is due in 2 days.",
      timestamp: "1 day ago",
      read: false,
      priority: "medium",
      actionUrl: "/dashboard/student/tasks",
    },
    {
      id: "3",
      type: "message",
      title: "New Message from Mentor",
      message: "Dr. Johnson has provided feedback on your recent submission.",
      timestamp: "3 days ago",
      read: true,
      priority: "medium",
      actionUrl: "/dashboard/student/messages",
    },
    {
      id: "4",
      type: "deadline",
      title: "Application Deadline Approaching",
      message: "Application for 'Data Science Internship' closes in 3 days.",
      timestamp: "1 week ago",
      read: true,
      priority: "high",
      actionUrl: "/dashboard/student/opportunities",
    },
  ])

  const [isOpen, setIsOpen] = useState(false)

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "application":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "task":
        return <Clock className="w-4 h-4 text-orange-500" />
      case "message":
        return <MessageSquare className="w-4 h-4 text-blue-500" />
      case "deadline":
        return <AlertCircle className="w-4 h-4 text-red-500" />
      case "feedback":
        return <FileText className="w-4 h-4 text-purple-500" />
      default:
        return <Bell className="w-4 h-4 text-gray-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500"
      case "medium":
        return "border-l-orange-500"
      case "low":
        return "border-l-blue-500"
      default:
        return "border-l-gray-300"
    }
  }

  return (
    <div className="relative">
      <Button variant="ghost" size="icon" className="relative" onClick={() => setIsOpen(!isOpen)}>
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-12 w-96 bg-white border rounded-lg shadow-lg z-50 max-h-96 overflow-hidden">
          <div className="p-4 border-b flex items-center justify-between">
            <h3 className="font-semibold">Notifications</h3>
            <div className="flex items-center space-x-2">
              {unreadCount > 0 && (
                <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                  Mark all read
                </Button>
              )}
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                <Bell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p>No notifications</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-l-4 hover:bg-gray-50 cursor-pointer ${getPriorityColor(
                    notification.priority,
                  )} ${!notification.read ? "bg-blue-50" : ""}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      {getNotificationIcon(notification.type)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <p className="font-medium text-sm">{notification.title}</p>
                          {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-2">{notification.timestamp}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={(e) => {
                        e.stopPropagation()
                        removeNotification(notification.id)
                      }}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>

          {notifications.length > 0 && (
            <div className="p-4 border-t">
              <Button variant="outline" className="w-full bg-transparent" size="sm">
                View All Notifications
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
