import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Brain,
  TrendingUp,
  BookOpen,
  GraduationCap,
  Building2,
  CheckCircle,
  Users,
  MessageSquare,
  Calendar,
  BarChart3,
  FileText,
  Bell,
  Search,
  Upload,
  Award,
} from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TalentSync
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#features" className="text-gray-600 hover:text-gray-900">
              Features
            </Link>
            <Link href="#workflow" className="text-gray-600 hover:text-gray-900">
              Workflow
            </Link>
            <Link href="#roles" className="text-gray-600 hover:text-gray-900">
              For You
            </Link>
            <Button asChild>
              <Link href="/auth">Get Started</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100">
            🚀 Complete Academic & Professional Development Platform
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
            Connect. Learn. Grow. Succeed.
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto">
            The comprehensive platform connecting students, faculty, and industry partners for internships, research
            projects, and professional development. Track progress, manage tasks, and achieve learning outcomes with
            AI-powered insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              asChild
            >
              <Link href="/auth">
                Start Your Journey <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/demo">Watch Demo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section id="workflow" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Complete Workflow Management</h2>
            <p className="text-xl text-gray-600">From opportunity posting to skill development tracking</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Post Opportunities</CardTitle>
                <CardDescription>
                  Universities and organizations post internships, research projects, and training programs
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Search className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-lg">Search & Apply</CardTitle>
                <CardDescription>
                  Students discover opportunities, filter by interests, and submit applications with documents
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg">Review & Select</CardTitle>
                <CardDescription>
                  Faculty and organizations review applications, shortlist candidates, and assign roles
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="text-lg">Track Progress</CardTitle>
                <CardDescription>
                  Monitor tasks, milestones, submissions, and skill development with AI insights
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section id="features" className="py-20 bg-gray-50 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Feature Set</h2>
            <p className="text-xl text-gray-600">Everything you need for academic and professional development</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <FileText className="w-8 h-8 text-blue-600 mb-2" />
                <CardTitle>Opportunity Management</CardTitle>
                <CardDescription>
                  Post detailed opportunities with eligibility criteria, learning outcomes, and requirements
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Search className="w-8 h-8 text-green-600 mb-2" />
                <CardTitle>Advanced Search & Filtering</CardTitle>
                <CardDescription>
                  Find opportunities by academic background, skills, interests, and program requirements
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Upload className="w-8 h-8 text-purple-600 mb-2" />
                <CardTitle>Application System</CardTitle>
                <CardDescription>
                  Complete application workflow with document uploads, forms, and status tracking
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Bell className="w-8 h-8 text-orange-600 mb-2" />
                <CardTitle>Smart Notifications</CardTitle>
                <CardDescription>
                  Automated alerts for deadlines, application status, feedback, and important updates
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Calendar className="w-8 h-8 text-red-600 mb-2" />
                <CardTitle>Task & Milestone Tracking</CardTitle>
                <CardDescription>
                  Assign tasks, set deadlines, track progress, and manage project milestones
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <MessageSquare className="w-8 h-8 text-indigo-600 mb-2" />
                <CardTitle>Integrated Communication</CardTitle>
                <CardDescription>
                  Built-in messaging, feedback system, and collaboration tools for mentors and students
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <BarChart3 className="w-8 h-8 text-teal-600 mb-2" />
                <CardTitle>Progress Analytics</CardTitle>
                <CardDescription>
                  Comprehensive dashboards with performance metrics, skill development, and insights
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Award className="w-8 h-8 text-yellow-600 mb-2" />
                <CardTitle>Learning Resources</CardTitle>
                <CardDescription>
                  Integration with external courses, webinars, peer discussions, and mentoring sessions
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Brain className="w-8 h-8 text-pink-600 mb-2" />
                <CardTitle>AI-Powered Insights</CardTitle>
                <CardDescription>
                  Smart matching, skill recommendations, performance analysis, and career guidance
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Role-based Features */}
      <section id="roles" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Tailored for Every Role</h2>
            <p className="text-xl text-gray-600">Specialized dashboards and features for each user type</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Students */}
            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <GraduationCap className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-blue-600">👨‍🎓 For Students</CardTitle>
                <CardDescription>Your comprehensive learning and development hub</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Search and filter opportunities by interests and skills</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Apply with document uploads and application forms</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Track application status and receive notifications</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Manage tasks, deadlines, and submit progress reports</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Access learning resources and skill development tools</span>
                </div>
              </CardContent>
            </Card>

            {/* Faculty */}
            <Card className="border-2 hover:border-purple-200 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-purple-600">🎓 For Faculty & Mentors</CardTitle>
                <CardDescription>Complete mentorship and opportunity management</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Post opportunities with detailed criteria and outcomes</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Review applications and shortlist candidates</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Assign tasks, set milestones, and track progress</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Provide feedback and validate student contributions</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Monitor skill development and learning objectives</span>
                </div>
              </CardContent>
            </Card>

            {/* Organizations */}
            <Card className="border-2 hover:border-green-200 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Building2 className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-green-600">🏢 For Organizations</CardTitle>
                <CardDescription>Industry partnership and talent development</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Post internships and professional development programs</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Access qualified candidates with AI matching</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Manage application review and selection process</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Communicate with students and track project outcomes</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Analytics on program effectiveness and talent pipeline</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Academic Development?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join the comprehensive platform connecting students, faculty, and industry for meaningful learning
            experiences
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
              <Link href="/auth">
                Start Free Trial <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              asChild
            >
              <Link href="/contact">Schedule Demo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">TalentSync</span>
              </div>
              <p className="text-gray-400">
                The complete platform for academic and professional development, connecting students with opportunities
                and mentors.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/features" className="hover:text-white">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/workflow" className="hover:text-white">
                    Workflow
                  </Link>
                </li>
                <li>
                  <Link href="/integrations" className="hover:text-white">
                    Integrations
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/docs" className="hover:text-white">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/api" className="hover:text-white">
                    API Reference
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 TalentSync. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
