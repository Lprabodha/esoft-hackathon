"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Brain, GraduationCap, BookOpen, Building2, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface SignInForm {
  email: string
  password: string
  role: string
}

interface SignUpForm {
  name: string
  email: string
  password: string
  confirmPassword: string
  role: string
  university?: string
  department?: string
  organization?: string
  phone?: string
}

export default function AuthPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [signInForm, setSignInForm] = useState<SignInForm>({
    email: "",
    password: "",
    role: "",
  })

  const [signUpForm, setSignUpForm] = useState<SignUpForm>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    university: "",
    department: "",
    organization: "",
    phone: "",
  })

  const validateSignIn = (): boolean => {
    if (!signInForm.email || !signInForm.password || !signInForm.role) {
      setError("Please fill in all required fields")
      return false
    }
    if (!/\S+@\S+\.\S+/.test(signInForm.email)) {
      setError("Please enter a valid email address")
      return false
    }
    return true
  }

  const validateSignUp = (): boolean => {
    if (!signUpForm.name || !signUpForm.email || !signUpForm.password || !signUpForm.role) {
      setError("Please fill in all required fields")
      return false
    }
    if (!/\S+@\S+\.\S+/.test(signUpForm.email)) {
      setError("Please enter a valid email address")
      return false
    }
    if (signUpForm.password.length < 6) {
      setError("Password must be at least 6 characters long")
      return false
    }
    if (signUpForm.password !== signUpForm.confirmPassword) {
      setError("Passwords do not match")
      return false
    }
    return true
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!validateSignIn()) return

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock authentication - in real app, this would be an API call
      const userData = {
        id: "1",
        name: "John Smith",
        email: signInForm.email,
        role: signInForm.role,
      }

      // Store user data (in real app, use proper auth state management)
      localStorage.setItem("user", JSON.stringify(userData))

      setSuccess("Sign in successful! Redirecting...")
      setTimeout(() => {
        router.push(`/dashboard/${signInForm.role}`)
      }, 1000)
    } catch (error) {
      setError("Invalid credentials. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!validateSignUp()) return

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock registration - in real app, this would be an API call
      const userData = {
        id: Date.now().toString(),
        name: signUpForm.name,
        email: signUpForm.email,
        role: signUpForm.role,
        university: signUpForm.university,
        department: signUpForm.department,
        organization: signUpForm.organization,
        phone: signUpForm.phone,
      }

      // Store user data
      localStorage.setItem("user", JSON.stringify(userData))

      setSuccess("Account created successfully! Redirecting...")
      setTimeout(() => {
        router.push(`/dashboard/${signUpForm.role}`)
      }, 1000)
    } catch (error) {
      setError("Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI TalentTrack
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your account or create a new one</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Authentication</CardTitle>
            <CardDescription>Choose your role and sign in to continue</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert className="mb-4 border-red-200 bg-red-50">
                <AlertDescription className="text-red-700">{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="mb-4 border-green-200 bg-green-50">
                <AlertDescription className="text-green-700">{success}</AlertDescription>
              </Alert>
            )}

            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email *</Label>
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="Enter your email"
                      value={signInForm.email}
                      onChange={(e) => setSignInForm({ ...signInForm, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password *</Label>
                    <Input
                      id="signin-password"
                      type="password"
                      placeholder="Enter your password"
                      value={signInForm.password}
                      onChange={(e) => setSignInForm({ ...signInForm, password: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-role">Role *</Label>
                    <Select
                      value={signInForm.role}
                      onValueChange={(value) => setSignInForm({ ...signInForm, role: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">
                          <div className="flex items-center space-x-2">
                            <GraduationCap className="w-4 h-4" />
                            <span>Student</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="faculty">
                          <div className="flex items-center space-x-2">
                            <BookOpen className="w-4 h-4" />
                            <span>Faculty/Mentor</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="organization">
                          <div className="flex items-center space-x-2">
                            <Building2 className="w-4 h-4" />
                            <span>Organization</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Signing In...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                  <div className="text-center">
                    <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                      Forgot your password?
                    </Link>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name *</Label>
                    <Input
                      id="signup-name"
                      placeholder="Enter your full name"
                      value={signUpForm.name}
                      onChange={(e) => setSignUpForm({ ...signUpForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email *</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      value={signUpForm.email}
                      onChange={(e) => setSignUpForm({ ...signUpForm, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password *</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="Create a password"
                        value={signUpForm.password}
                        onChange={(e) => setSignUpForm({ ...signUpForm, password: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-confirm-password">Confirm Password *</Label>
                      <Input
                        id="signup-confirm-password"
                        type="password"
                        placeholder="Confirm password"
                        value={signUpForm.confirmPassword}
                        onChange={(e) => setSignUpForm({ ...signUpForm, confirmPassword: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-role">Role *</Label>
                    <Select
                      value={signUpForm.role}
                      onValueChange={(value) => setSignUpForm({ ...signUpForm, role: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">
                          <div className="flex items-center space-x-2">
                            <GraduationCap className="w-4 h-4" />
                            <span>Student</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="faculty">
                          <div className="flex items-center space-x-2">
                            <BookOpen className="w-4 h-4" />
                            <span>Faculty/Mentor</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="organization">
                          <div className="flex items-center space-x-2">
                            <Building2 className="w-4 h-4" />
                            <span>Organization</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Role-specific fields */}
                  {signUpForm.role === "student" && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="signup-university">University</Label>
                        <Input
                          id="signup-university"
                          placeholder="Your university"
                          value={signUpForm.university}
                          onChange={(e) => setSignUpForm({ ...signUpForm, university: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-department">Department</Label>
                        <Input
                          id="signup-department"
                          placeholder="Your department"
                          value={signUpForm.department}
                          onChange={(e) => setSignUpForm({ ...signUpForm, department: e.target.value })}
                        />
                      </div>
                    </div>
                  )}

                  {signUpForm.role === "faculty" && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="signup-university-faculty">University</Label>
                        <Input
                          id="signup-university-faculty"
                          placeholder="Your university"
                          value={signUpForm.university}
                          onChange={(e) => setSignUpForm({ ...signUpForm, university: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-department-faculty">Department</Label>
                        <Input
                          id="signup-department-faculty"
                          placeholder="Your department"
                          value={signUpForm.department}
                          onChange={(e) => setSignUpForm({ ...signUpForm, department: e.target.value })}
                        />
                      </div>
                    </div>
                  )}

                  {signUpForm.role === "organization" && (
                    <div className="space-y-2">
                      <Label htmlFor="signup-organization">Organization Name</Label>
                      <Input
                        id="signup-organization"
                        placeholder="Your organization"
                        value={signUpForm.organization}
                        onChange={(e) => setSignUpForm({ ...signUpForm, organization: e.target.value })}
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="signup-phone">Phone Number</Label>
                    <Input
                      id="signup-phone"
                      type="tel"
                      placeholder="Your phone number"
                      value={signUpForm.phone}
                      onChange={(e) => setSignUpForm({ ...signUpForm, phone: e.target.value })}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                  <p className="text-xs text-gray-500 text-center">
                    By signing up, you agree to our Terms of Service and Privacy Policy
                  </p>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Role Benefits */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <GraduationCap className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-sm font-medium">Students</p>
            <p className="text-xs text-gray-500">AI CV & Career Growth</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <BookOpen className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-sm font-medium">Faculty</p>
            <p className="text-xs text-gray-500">Mentor & Track Progress</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <Building2 className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-sm font-medium">Organizations</p>
            <p className="text-xs text-gray-500">Find Top Talent</p>
          </div>
        </div>
      </div>
    </div>
  )
}
