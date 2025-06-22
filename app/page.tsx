"use client"
import { useOrganization } from '@clerk/nextjs'
import { useEffect } from 'react'
import Navbar from '@/components/Navbar'
import { Card, CardContent } from "@/components/ui/card"
import { Bell, Calendar, CheckCircle, MessageSquare, Shield, Users, Zap } from "lucide-react"
import { useRouter } from 'next/navigation'

export default function page() {
  const selectedOrganization = useOrganization();
  const router = useRouter();
  
  useEffect(() => {
    console.log("Selected Organization:", selectedOrganization.organization);
    if(selectedOrganization.organization){
      router.push(`/org/${selectedOrganization.organization.slug}`);
    }
  }, [selectedOrganization.organization, router]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-950">
      <Navbar/>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center animate-in fade-in-50 duration-1000">
            <div className="inline-flex items-center justify-center p-3 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 mb-8">
              <Bell className="w-8 h-8 text-blue-400" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">
              Organization
              <span className="block bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Notice Board
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed">
              Streamline your organization's communication with our modern notice board system. 
              Share announcements, updates, and important information effortlessly across your entire team.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
              Powerful Features
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Everything you need to keep your organization informed and connected
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: MessageSquare,
                title: "Instant Announcements",
                description: "Share important updates and announcements instantly with your entire organization or specific teams."
              },
              {
                icon: Users,
                title: "Team Management",
                description: "Organize notices by departments, teams, or access levels for targeted communication."
              },
              {
                icon: Calendar,
                title: "Event Scheduling",
                description: "Schedule notices for future publication and set expiration dates for time-sensitive information."
              },
              {
                icon: Shield,
                title: "Secure Access",
                description: "Role-based permissions ensure only authorized personnel can create and manage notices."
              },
              {
                icon: Zap,
                title: "Real-time Updates",
                description: "Instant notifications and live updates keep everyone informed as soon as notices are published."
              },
              {
                icon: Bell,
                title: "Smart Notifications",
                description: "Customizable notification settings help users stay informed without overwhelming them."
              }
            ].map((feature, index) => (
              <Card 
                key={index} 
                className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-sm border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:scale-105 animate-in fade-in-50"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-3 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 mb-4">
                      <feature.icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-200 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-600/5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-in slide-in-from-left-10 duration-1000">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">
                Why Choose Our Notice Board?
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                Transform your organization's communication with a modern, efficient, and user-friendly notice board system.
              </p>
              
              <div className="space-y-4">
                {[
                  "Reduce email clutter and missed communications",
                  "Improve organizational transparency and engagement",
                  "Save time with automated scheduling and notifications",
                  "Enhance security with role-based access controls"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="animate-in slide-in-from-right-10 duration-1000">
              <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-sm border-gray-700/50">
                <CardContent className="p-8">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center p-4 rounded-full bg-gradient-to-br from-green-500/20 to-blue-500/20 mb-6">
                      <Users className="w-8 h-8 text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-200 mb-4">
                      Join Thousands of Organizations
                    </h3>
                    <p className="text-gray-400 mb-6">
                      Already using our notice board system to improve their internal communication and boost productivity.
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                          500+
                        </div>
                        <div className="text-sm text-gray-400">Organizations</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                          50K+
                        </div>
                        <div className="text-sm text-gray-400">Active Users</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}