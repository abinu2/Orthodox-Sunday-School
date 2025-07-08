"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, Clock, MapPin, Users } from "lucide-react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { useAuth } from "@/contexts/auth-context"

export default function CalendarPage() {
  const { user } = useAuth()
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [activeTab, setActiveTab] = useState("calendar")

  const events = [
    {
      id: "1",
      title: "The Nativity Fast Lesson",
      date: "2024-12-08",
      time: "10:00 AM",
      type: "lesson",
      location: "Main Hall",
      attendees: 24,
    },
    {
      id: "2",
      title: "Christmas Pageant Practice",
      date: "2024-12-10",
      time: "2:00 PM",
      type: "service",
      location: "Church Sanctuary",
      attendees: 45,
    },
    {
      id: "3",
      title: "St. Nicholas Feast Day",
      date: "2024-12-19",
      time: "10:00 AM",
      type: "feast",
      location: "Fellowship Hall",
      attendees: 120,
    },
    {
      id: "4",
      title: "Teacher Meeting",
      date: "2024-12-15",
      time: "11:30 AM",
      type: "meeting",
      location: "Conference Room",
      attendees: 8,
    },
  ]

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "lesson":
        return "default"
      case "service":
        return "secondary"
      case "feast":
        return "destructive"
      case "meeting":
        return "outline"
      default:
        return "default"
    }
  }

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case "lesson":
        return CalendarDays
      case "service":
        return Users
      case "feast":
        return CalendarDays
      case "meeting":
        return Clock
      default:
        return CalendarDays
    }
  }

  if (!user) return null

  return (
    <DashboardLayout role={user.role}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Calendar</h1>
          <p className="text-muted-foreground">View upcoming lessons, feast days, and community events</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            <TabsTrigger value="events">All Events</TabsTrigger>
            <TabsTrigger value="feasts">Feast Days</TabsTrigger>
          </TabsList>

          <TabsContent value="calendar" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>Select Date</CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Events for {selectedDate.toLocaleDateString()}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {events
                      .filter((event) => new Date(event.date).toDateString() === selectedDate.toDateString())
                      .map((event) => {
                        const IconComponent = getEventTypeIcon(event.type)
                        return (
                          <div key={event.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <IconComponent className="h-6 w-6 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">{event.title}</h4>
                              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                <div className="flex items-center space-x-1">
                                  <Clock className="h-4 w-4" />
                                  <span>{event.time}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <MapPin className="h-4 w-4" />
                                  <span>{event.location}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Users className="h-4 w-4" />
                                  <span>{event.attendees} attendees</span>
                                </div>
                              </div>
                            </div>
                            <Badge variant={getEventTypeColor(event.type)}>{event.type}</Badge>
                          </div>
                        )
                      })}
                    {events.filter((event) => new Date(event.date).toDateString() === selectedDate.toDateString())
                      .length === 0 && (
                      <p className="text-center text-muted-foreground py-8">No events scheduled for this date</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>All Upcoming Events</CardTitle>
                <CardDescription>Complete schedule of lessons, meetings, and activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {events.map((event) => {
                    const IconComponent = getEventTypeIcon(event.type)
                    return (
                      <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <IconComponent className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">{event.title}</h4>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span>{new Date(event.date).toLocaleDateString()}</span>
                              <span>{event.time}</span>
                              <span>{event.location}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={getEventTypeColor(event.type)}>{event.type}</Badge>
                          <span className="text-sm text-muted-foreground">{event.attendees}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feasts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Orthodox Feast Days & Holy Days</CardTitle>
                <CardDescription>Important dates in the Orthodox liturgical calendar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-red-100 rounded-lg">
                        <CalendarDays className="h-6 w-6 text-red-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">St. Nicholas Day</h4>
                        <p className="text-sm text-muted-foreground">December 19, 2024</p>
                      </div>
                    </div>
                    <Badge variant="destructive">Major Feast</Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <CalendarDays className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Nativity of Christ</h4>
                        <p className="text-sm text-muted-foreground">January 7, 2025</p>
                      </div>
                    </div>
                    <Badge variant="destructive">Great Feast</Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <CalendarDays className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Theophany</h4>
                        <p className="text-sm text-muted-foreground">January 19, 2025</p>
                      </div>
                    </div>
                    <Badge variant="destructive">Great Feast</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
