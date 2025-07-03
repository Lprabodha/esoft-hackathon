"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  TrendingUp,
  Target,
  Award,
  Clock,
  BookOpen,
  CheckCircle,
  BarChart3,
  PieChartIcon as RechartsPieChart,
  PhoneIcon as Cell,
  PieChartIcon as Pie,
} from "lucide-react"
import Link from "next/link"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import Download from "@/components/ui/download" // Import Download component

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("6months")

  // Mock analytics data
  const skillProgressData = [
    { month: "Aug", python: 65, javascript: 45, react: 30, ml: 20 },
    { month: "Sep", python: 70, javascript: 55, react: 40, ml: 30 },
    { month: "Oct", python: 75, javascript: 65, react: 55, ml: 40 },
    { month: "Nov", python: 80, javascript: 70, react: 65, ml: 50 },
    { month: "Dec", python: 85, javascript: 75, react: 70, ml: 60 },
    { month: "Jan", python: 90, javascript: 80, react: 75, ml: 70 },
  ]

  const applicationSuccessData = [
    { month: "Aug", applied: 2, interviews: 0, offers: 0 },
    { month: "Sep", applied: 3, interviews: 1, offers: 0 },
    { month: "Oct", applied: 4, interviews: 2, offers: 1 },
    { month: "Nov", applied: 2, interviews: 1, offers: 0 },
    { month: "Dec", applied: 5, interviews: 3, offers: 1 },
    { month: "Jan", applied: 3, interviews: 2, offers: 2 },
  ]

  const learningTimeData = [
    { week: "Week 1", hours: 12 },
    { week: "Week 2", hours: 15 },
    { week: "Week 3", hours: 8 },
    { week: "Week 4", hours: 20 },
    { week: "Week 5", hours: 18 },
    { week: "Week 6", hours: 22 },
    { week: "Week 7", hours: 16 },
    { week: "Week 8", hours: 25 },
  ]

  const skillDistributionData = [
    { name: "Programming", value: 40, color: "#3B82F6" },
    { name: "Data Science", value: 25, color: "#8B5CF6" },
    { name: "Web Development", value: 20, color: "#10B981" },
    { name: "Soft Skills", value: 10, color: "#F59E0B" },
    { name: "Tools", value: 5, color: "#EF4444" },
  ]

  const performanceMetrics = {
    overallScore: 87,
    skillGrowth: 23,
    applicationSuccess: 42,
    learningConsistency: 78,
    projectCompletion: 91,
    mentorRating: 4.6,
  }

  const achievements = [
    {
      title: "Fast Learner",
      description: "Completed 5 courses in 2 months",
      date: "2024-01-15",
      type: "learning",
      icon: <BookOpen className="w-5 h-5" />,
    },
    {
      title: "Project Master",
      description: "Successfully completed 3 major projects",
      date: "2024-01-10",
      type: "project",
      icon: <Target className="w-5 h-5" />,
    },
    {
      title: "Interview Pro",
      description: "Achieved 80% interview success rate",
      date: "2024-01-05",
      type: "achievement",
      icon: <Award className="w-5 h-5" />,
    },
    {
      title: "Skill Specialist",
      description: "Reached advanced level in Python",
      date: "2024-01-01",
      type: "skill",
      icon: <TrendingUp className="w-5 h-5" />,
    },
  ]

  const recentActivity = [
    {
      type: "application",
      title: "Applied to Data Science Internship",
      date: "2024-01-20",
      status: "pending",
    },
    {
      type: "learning",
      title: "Completed Advanced ML Course",
      date: "2024-01-18",
      status: "completed",
    },
    {
      type: "task",
      title: "Submitted Literature Review",
      date: "2024-01-15",
      status: "completed",
    },
    {
      type: "interview",
      title: "Technical Interview - TechCorp",
      date: "2024-01-12",
      status: "completed",
    },
  ]

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
            <Badge variant="secondary">Analytics Dashboard</Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">1 Month</SelectItem>
                <SelectItem value="3months">3 Months</SelectItem>
                <SelectItem value="6months">6 Months</SelectItem>
                <SelectItem value="1year">1 Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Link href="/dashboard/student">
              <Button variant="outline">Back to Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics & Insights</h1>
          <p className="text-gray-600">Track your progress and performance across all activities</p>
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium">Overall Score</p>
                  <p className="text-2xl font-bold">{performanceMetrics.overallScore}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium">Skill Growth</p>
                  <p className="text-2xl font-bold">+{performanceMetrics.skillGrowth}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-sm font-medium">Success Rate</p>
                  <p className="text-2xl font-bold">{performanceMetrics.applicationSuccess}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-sm font-medium">Learning Hours</p>
                  <p className="text-2xl font-bold">142h</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium">Completion</p>
                  <p className="text-2xl font-bold">{performanceMetrics.projectCompletion}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-yellow-600" />
                <div>
                  <p className="text-sm font-medium">Mentor Rating</p>
                  <p className="text-2xl font-bold">{performanceMetrics.mentorRating}/5</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="skills" className="space-y-6">
          <TabsList>
            <TabsTrigger value="skills">Skill Progress</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="learning">Learning Analytics</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="skills" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Skill Development Over Time</CardTitle>
                  <CardDescription>Track your skill proficiency growth</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={skillProgressData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="python" stroke="#3B82F6" strokeWidth={2} name="Python" />
                      <Line type="monotone" dataKey="javascript" stroke="#10B981" strokeWidth={2} name="JavaScript" />
                      <Line type="monotone" dataKey="react" stroke="#8B5CF6" strokeWidth={2} name="React" />
                      <Line type="monotone" dataKey="ml" stroke="#F59E0B" strokeWidth={2} name="Machine Learning" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Skill Distribution</CardTitle>
                  <CardDescription>Your current skill portfolio breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={skillDistributionData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {skillDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Current Skill Levels</CardTitle>
                <CardDescription>Your proficiency in different skill areas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Python Programming</span>
                      <span className="text-sm text-gray-600">90%</span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">JavaScript</span>
                      <span className="text-sm text-gray-600">80%</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">React</span>
                      <span className="text-sm text-gray-600">75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Machine Learning</span>
                      <span className="text-sm text-gray-600">70%</span>
                    </div>
                    <Progress value={70} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Data Science</span>
                      <span className="text-sm text-gray-600">65%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Application Success Trends</CardTitle>
                <CardDescription>Track your application performance over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={applicationSuccessData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="applied" fill="#3B82F6" name="Applied" />
                    <Bar dataKey="interviews" fill="#10B981" name="Interviews" />
                    <Bar dataKey="offers" fill="#F59E0B" name="Offers" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Application Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Total Applications</span>
                      <span className="font-bold">19</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Interviews</span>
                      <span className="font-bold">9</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Offers</span>
                      <span className="font-bold">4</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Success Rate</span>
                      <span className="font-bold text-green-600">21%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Areas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Badge className="bg-blue-100 text-blue-700">AI/ML Roles</Badge>
                    <Badge className="bg-green-100 text-green-700">Research Positions</Badge>
                    <Badge className="bg-purple-100 text-purple-700">Tech Internships</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Areas for Improvement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">• Strengthen portfolio projects</p>
                    <p className="text-sm text-gray-600">• Improve interview skills</p>
                    <p className="text-sm text-gray-600">• Expand network connections</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="learning" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Learning Hours</CardTitle>
                <CardDescription>Your learning consistency over the past 8 weeks</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={learningTimeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="hours" fill="#8B5CF6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Learning Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Total Learning Hours</span>
                      <span className="font-bold">142h</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Courses Completed</span>
                      <span className="font-bold">8</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Certificates Earned</span>
                      <span className="font-bold">5</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Average Weekly Hours</span>
                      <span className="font-bold">17h</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Learning Consistency</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span>Weekly Goal Achievement</span>
                        <span className="text-sm text-gray-600">78%</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span>Course Completion Rate</span>
                        <span className="text-sm text-gray-600">85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span>Learning Streak</span>
                        <span className="text-sm text-gray-600">12 days</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid gap-6">
              {achievements.map((achievement, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-blue-100 rounded-full text-blue-600">{achievement.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{achievement.title}</h3>
                        <p className="text-gray-600">{achievement.description}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          Earned on {new Date(achievement.date).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant="outline" className="capitalize">
                        {achievement.type}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity Timeline</CardTitle>
                <CardDescription>Your latest actions and milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-sm text-gray-600">{new Date(activity.date).toLocaleDateString()}</p>
                      </div>
                      <Badge
                        variant={activity.status === "completed" ? "default" : "secondary"}
                        className={activity.status === "completed" ? "bg-green-100 text-green-700" : ""}
                      >
                        {activity.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
