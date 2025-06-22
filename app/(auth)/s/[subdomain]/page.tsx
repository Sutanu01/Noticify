import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { clerkClient } from "@clerk/nextjs/server";
import { db } from "@/db";
import { noticeTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { RefreshCw, Bell, Calendar, FileText, Expand } from "lucide-react";

type ParamType = {
  subdomain: string;
};

export default async function Page({ params }: { params: Promise<ParamType> }) {
  const { subdomain } = await params;

  if (!subdomain) {
    redirect("/not-found");
  }

  const client = await clerkClient();
  const organization = await client.organizations.getOrganization({
    slug: subdomain,
  });

  if (!organization) {
    redirect("/not-found");
  }

  const notices = await db
    .select()
    .from(noticeTable)
    .where(eq(noticeTable.orgId, organization.id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-950">

      <style>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #4b5563 #1f2937;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1f2937;
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #4b5563;
          border-radius: 3px;
          transition: background-color 0.2s ease;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #6b7280;
        }

        .custom-scrollbar::-webkit-scrollbar-corner {
          background: #1f2937;
        }
      `}</style>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 lg:mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-2 sm:p-3 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
              <Bell className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {organization.name} Notices
            </h1>
          </div>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto px-4">
            Stay updated with the latest announcements and important information
          </p>
        </div>

        {notices.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {notices.map((notice: any, index: number) => (
              <Dialog key={notice.id}>
                <DialogTrigger asChild>
                  <Card
                    className={`
                                            bg-gradient-to-br from-gray-900/80 to-gray-800/60 
                                            backdrop-blur-sm border-gray-700/50 
                                            hover:border-gray-600/70 
                                            transition-all duration-500 ease-out
                                            hover:transform hover:scale-[1.02] 
                                            hover:shadow-2xl hover:shadow-blue-500/10
                                            group cursor-pointer
                                            animate-in slide-in-from-bottom-4
                                            flex flex-col h-full
                                        `}
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animationDuration: "600ms",
                    }}
                  >
                    <CardHeader className="pb-3 flex-shrink-0">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 min-w-0 flex-1">
                          <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-600/20 group-hover:from-blue-500/30 group-hover:to-purple-600/30 transition-all duration-300 flex-shrink-0">
                            <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <CardTitle className="text-lg sm:text-xl font-semibold text-white group-hover:text-blue-100 transition-colors duration-300 break-words">
                              {notice.title}
                            </CardTitle>
                            <CardDescription className="flex items-center gap-2 mt-2 text-gray-400 text-sm">
                              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                              <span className="truncate">
                                {new Date(notice.createdAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  }
                                )}
                              </span>
                            </CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Expand className="w-4 h-4 text-gray-400 group-hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-60 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0"></div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0 flex-1">
                      <div className="pl-9 sm:pl-10">
                        <p className="text-gray-200 leading-relaxed group-hover:text-gray-100 transition-colors duration-300 text-sm sm:text-base break-words line-clamp-3">
                          {notice.body}
                        </p>
                        {notice.body.length > 150 && (
                          <div className="mt-2">
                            <span className="text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors duration-300">
                              Click to read more...
                            </span>
                          </div>
                        )}
                      </div>
                    </CardContent>

                    <CardFooter className="pt-4 border-t border-gray-700/30 group-hover:border-gray-600/50 transition-colors duration-300 flex-shrink-0">
                      <div className="w-full flex justify-end">
                        <div className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-300 truncate">
                          Notice #{notice.id}
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </DialogTrigger>

                <DialogContent className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 text-white max-w-3xl max-h-[85vh] overflow-hidden sm:rounded-lg">
                  <div className="flex flex-col h-full max-h-[85vh]">
                    <DialogHeader className="flex-shrink-0 space-y-4 pb-4 border-b border-gray-700/50">
                      <div className="flex items-start gap-3">
                        <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex-shrink-0">
                          <FileText className="w-6 h-6 text-blue-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <DialogTitle className="text-xl sm:text-2xl font-bold text-white break-words leading-tight">
                            {notice.title}
                          </DialogTitle>
                          <div className="flex items-center gap-2 mt-2 text-gray-400 text-sm">
                            <Calendar className="w-4 h-4 flex-shrink-0" />
                            <span>
                              Created on{" "}
                              {new Date(notice.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </DialogHeader>

                    <div className="flex-1 overflow-y-auto py-4 min-h-0 custom-scrollbar">
                      <DialogDescription asChild>
                        <div className="text-white leading-relaxed text-base whitespace-pre-wrap break-words pr-2">
                          {notice.body}
                        </div>
                      </DialogDescription>
                    </div>

                    <div className="flex-shrink-0 pt-4 border-t border-gray-700/50 flex justify-between items-center text-sm text-gray-400">
                      <span>Notice #{notice.id}</span>
                      <span>{notice.body.length} characters</span>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-sm border-gray-700/50 animate-in fade-in-50 duration-700">
              <CardContent className="py-12 sm:py-16 text-center px-4">
                <div className="flex flex-col items-center gap-4">
                  <div className="p-4 sm:p-6 rounded-full bg-gradient-to-br from-gray-700/50 to-gray-800/50">
                    <Bell className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-300 mb-2">
                      No notices available
                    </h3>
                    <p className="text-gray-500 max-w-md text-sm sm:text-base">
                      There are currently no notices to display. Check back
                      later for updates and announcements.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="mt-12 lg:mt-16 text-center">
          <p className="text-gray-500 text-xs sm:text-sm">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
