"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Switch } from "@/components/ui/switch"
import { Brain, Save, Edit, Camera, Loader2, Upload, FileText, LinkIcon, Shield, Eye } from "lucide-react"
import Link from "next/link"

interface StudentProfile {
  id: number
  user_id: number
  academic_id: string
  department: string
  major: string
  gpa: number
  bio: string
  interests: string[]
  resume_url: string
  profile_picture_url: string
  phone: string
  email: string
  university: string
  graduation_year: number
  linkedin_url: string
  github_url: string
  portfolio_url: string
}

interface PrivacySettings {
  profile_visibility: "public" | "university" | "private"
  show_gpa: boolean
  show_contact_info: boolean
  allow_messages: boolean
  show_in_search: boolean
  data_sharing: boolean
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState("")
  const [saveError, setSaveError] = useState("")

  const [profile, setProfile] = useState<StudentProfile>({
    id: 1,
    user_id: 1,
    academic_id: "CS2021001",
    department: "Computer Science",
    major: "Computer Science",
    gpa: 3.8,
    bio: "Passionate computer science student interested in AI and machine learning. Looking for opportunities to apply my skills in real-world projects and contribute to innovative solutions.",
    interests: ["Machine Learning", "Web Development", "Data Science", "AI Research"],
    resume_url: "/documents/resume.pdf",
    profile_picture_url: "/placeholder.svg?height=128&width=128",
    phone: "+1 (555) 123-4567",
    email: "john.smith@university.edu",
    university: "University of Technology",
    graduation_year: 2025,
    linkedin_url: "https://linkedin.com/in/johnsmith",
    github_url: "https://github.com/johnsmith",
    portfolio_url: "https://johnsmith.dev",
  })

  const [editedProfile, setEditedProfile] = useState(profile)

  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>({
    profile_visibility: "university",
    show_gpa: true,
    show_contact_info: false,
    allow_messages: true,
    show_in_search: true,
    data_sharing: false,
  })

  const handleSave = async () => {
    setIsSaving(true)
    setSaveError("")
    setSaveSuccess("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setProfile(editedProfile)
      setIsEditing(false)
      setSaveSuccess("Profile updated successfully!")

      setTimeout(() => setSaveSuccess(""), 3000)
    } catch (error) {
      setSaveError("Failed to update profile. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setEditedProfile(profile)
    setIsEditing(false)
    setSaveError("")
    setSaveSuccess("")
  }

  const handleInterestAdd = (interest: string) => {
    if (interest && !editedProfile.interests.includes(interest)) {
      setEditedProfile({
        ...editedProfile,
        interests: [...editedProfile.interests, interest],
      })
    }
  }

  const handleInterestRemove = (interest: string) => {
    setEditedProfile({
      ...editedProfile,
      interests: editedProfile.interests.filter((i) => i !== interest),
    })
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
            <Badge variant="secondary">Profile Settings</Badge>
          </div>
          <Link href="/dashboard/student">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Settings</h1>
          <p className="text-gray-600">Manage your personal information and preferences</p>
        </div>

        {saveSuccess && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <AlertDescription className="text-green-700">{saveSuccess}</AlertDescription>
          </Alert>
        )}

        {saveError && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertDescription className="text-red-700">{saveError}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile">Profile Information</TabsTrigger>
            <TabsTrigger value="academic">Academic Details</TabsTrigger>
            <TabsTrigger value="social">Social Links</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="privacy">Privacy & Security</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details and bio</CardDescription>
                  </div>
                  {!isEditing ? (
                    <Button onClick={() => setIsEditing(true)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="flex space-x-2">
                      <Button variant="outline" onClick={handleCancel} disabled={isSaving}>
                        Cancel
                      </Button>
                      <Button onClick={handleSave} disabled={isSaving}>
                        {isSaving ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Picture */}
                <div className="flex items-center space-x-6">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={editedProfile.profile_picture_url || "/placeholder.svg"} />
                    <AvatarFallback className="text-lg">
                      {editedProfile.academic_id.split("").slice(0, 2).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">Profile Picture</h3>
                    <p className="text-sm text-gray-600 mb-2">Upload a professional photo</p>
                    <Button variant="outline" size="sm" disabled={!isEditing}>
                      <Camera className="w-4 h-4 mr-2" />
                      Change Photo
                    </Button>
                  </div>
                </div>

                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="academic-id">Academic ID</Label>
                    <Input
                      id="academic-id"
                      value={editedProfile.academic_id}
                      onChange={(e) => setEditedProfile({ ...editedProfile, academic_id: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={editedProfile.email}
                      onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={editedProfile.phone}
                      onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="university">University</Label>
                    <Input
                      id="university"
                      value={editedProfile.university}
                      onChange={(e) => setEditedProfile({ ...editedProfile, university: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    rows={4}
                    value={editedProfile.bio}
                    onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
                    disabled={!isEditing}
                    placeholder="Tell us about yourself, your interests, and career goals..."
                  />
                </div>

                {/* Interests */}
                <div className="space-y-2">
                  <Label>Interests</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {editedProfile.interests.map((interest) => (
                      <Badge key={interest} variant="secondary" className="flex items-center space-x-1">
                        <span>{interest}</span>
                        {isEditing && (
                          <button
                            onClick={() => handleInterestRemove(interest)}
                            className="ml-1 text-gray-500 hover:text-gray-700"
                          >
                            ×
                          </button>
                        )}
                      </Badge>
                    ))}
                  </div>
                  {isEditing && (
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Add an interest..."
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            handleInterestAdd(e.currentTarget.value)
                            e.currentTarget.value = ""
                          }
                        }}
                      />
                      <Button
                        variant="outline"
                        onClick={(e) => {
                          const input = e.currentTarget.previousElementSibling as HTMLInputElement
                          handleInterestAdd(input.value)
                          input.value = ""
                        }}
                      >
                        Add
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="academic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Academic Information</CardTitle>
                <CardDescription>Your academic details and performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      value={editedProfile.department}
                      onChange={(e) => setEditedProfile({ ...editedProfile, department: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="major">Major</Label>
                    <Input
                      id="major"
                      value={editedProfile.major}
                      onChange={(e) => setEditedProfile({ ...editedProfile, major: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gpa">GPA</Label>
                    <Input
                      id="gpa"
                      type="number"
                      step="0.01"
                      min="0"
                      max="4"
                      value={editedProfile.gpa}
                      onChange={(e) =>
                        setEditedProfile({ ...editedProfile, gpa: Number.parseFloat(e.target.value) || 0 })
                      }
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="graduation-year">Graduation Year</Label>
                    <Input
                      id="graduation-year"
                      type="number"
                      value={editedProfile.graduation_year}
                      onChange={(e) =>
                        setEditedProfile({ ...editedProfile, graduation_year: Number.parseInt(e.target.value) || 2025 })
                      }
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="social" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Social Links</CardTitle>
                <CardDescription>Connect your professional profiles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn Profile</Label>
                    <div className="flex items-center space-x-2">
                      <LinkIcon className="w-4 h-4 text-gray-400" />
                      <Input
                        id="linkedin"
                        value={editedProfile.linkedin_url}
                        onChange={(e) => setEditedProfile({ ...editedProfile, linkedin_url: e.target.value })}
                        disabled={!isEditing}
                        placeholder="https://linkedin.com/in/yourprofile"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub Profile</Label>
                    <div className="flex items-center space-x-2">
                      <LinkIcon className="w-4 h-4 text-gray-400" />
                      <Input
                        id="github"
                        value={editedProfile.github_url}
                        onChange={(e) => setEditedProfile({ ...editedProfile, github_url: e.target.value })}
                        disabled={!isEditing}
                        placeholder="https://github.com/yourusername"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="portfolio">Portfolio Website</Label>
                    <div className="flex items-center space-x-2">
                      <LinkIcon className="w-4 h-4 text-gray-400" />
                      <Input
                        id="portfolio"
                        value={editedProfile.portfolio_url}
                        onChange={(e) => setEditedProfile({ ...editedProfile, portfolio_url: e.target.value })}
                        disabled={!isEditing}
                        placeholder="https://yourportfolio.com"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Documents & Files</CardTitle>
                <CardDescription>Manage your resume, transcripts, and other documents</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <div className="text-center">
                      <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <h3 className="font-medium text-gray-900 mb-1">Resume/CV</h3>
                      <p className="text-sm text-gray-600 mb-4">Upload your latest resume or CV</p>
                      {profile.resume_url ? (
                        <div className="flex items-center justify-center space-x-2">
                          <Button variant="outline" size="sm" asChild>
                            <a href={profile.resume_url} target="_blank" rel="noopener noreferrer">
                              <FileText className="w-4 h-4 mr-2" />
                              View Current Resume
                            </a>
                          </Button>
                          <Button size="sm">
                            <Upload className="w-4 h-4 mr-2" />
                            Update Resume
                          </Button>
                        </div>
                      ) : (
                        <Button>
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Resume
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <div className="text-center">
                      <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <h3 className="font-medium text-gray-900 mb-1">Academic Transcript</h3>
                      <p className="text-sm text-gray-600 mb-4">Upload your official transcript</p>
                      <Button variant="outline">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Transcript
                      </Button>
                    </div>
                  </div>

                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <div className="text-center">
                      <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <h3 className="font-medium text-gray-900 mb-1">Portfolio Files</h3>
                      <p className="text-sm text-gray-600 mb-4">Upload project files, certificates, etc.</p>
                      <Button variant="outline">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Files
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Privacy & Security</CardTitle>
                <CardDescription>Control who can see your information and how it's used</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Profile Visibility</Label>
                      <p className="text-sm text-gray-600">Who can see your profile information</p>
                    </div>
                    <select
                      value={privacySettings.profile_visibility}
                      onChange={(e) =>
                        setPrivacySettings({ ...privacySettings, profile_visibility: e.target.value as any })
                      }
                      className="border rounded px-3 py-2"
                    >
                      <option value="public">Public</option>
                      <option value="university">University Only</option>
                      <option value="private">Private</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Show GPA</Label>
                      <p className="text-sm text-gray-600">Display your GPA on your profile</p>
                    </div>
                    <Switch
                      checked={privacySettings.show_gpa}
                      onCheckedChange={(checked) => setPrivacySettings({ ...privacySettings, show_gpa: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Show Contact Information</Label>
                      <p className="text-sm text-gray-600">Allow others to see your email and phone</p>
                    </div>
                    <Switch
                      checked={privacySettings.show_contact_info}
                      onCheckedChange={(checked) =>
                        setPrivacySettings({ ...privacySettings, show_contact_info: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Allow Messages</Label>
                      <p className="text-sm text-gray-600">Let faculty and organizations message you</p>
                    </div>
                    <Switch
                      checked={privacySettings.allow_messages}
                      onCheckedChange={(checked) => setPrivacySettings({ ...privacySettings, allow_messages: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Show in Search Results</Label>
                      <p className="text-sm text-gray-600">Appear in opportunity matching searches</p>
                    </div>
                    <Switch
                      checked={privacySettings.show_in_search}
                      onCheckedChange={(checked) => setPrivacySettings({ ...privacySettings, show_in_search: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Data Sharing for AI Matching</Label>
                      <p className="text-sm text-gray-600">Allow AI to analyze your data for better matches</p>
                    </div>
                    <Switch
                      checked={privacySettings.data_sharing}
                      onCheckedChange={(checked) => setPrivacySettings({ ...privacySettings, data_sharing: checked })}
                    />
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <h3 className="font-medium text-gray-900 mb-4">Account Security</h3>
                  <div className="space-y-4">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Shield className="w-4 h-4 mr-2" />
                      Change Password
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Eye className="w-4 h-4 mr-2" />
                      Two-Factor Authentication
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <FileText className="w-4 h-4 mr-2" />
                      Download My Data
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
