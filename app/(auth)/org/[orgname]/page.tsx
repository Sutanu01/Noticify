"use client";
import React, { useState } from "react";
import { useOrganization } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { createNotice } from "./actions";
import { toast } from "sonner";

export default function OrgLandingPage() {
  const selectedOrganization = useOrganization();
  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrganization.organization?.id) return;
    try {
      await createNotice({
        body: content.trim(),
        title: title.trim(),
        orgId: selectedOrganization.organization?.id,
      });
      setContent("");
      setTitle("");
      toast.success("Notice issued successfully!");
    } catch (error) {
      toast.error("Failed to issue notice! Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-gradient-to-br from-gray-900/90 to-gray-800/70 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-700/50 overflow-hidden transform transition-all hover:shadow-3xl hover:shadow-blue-500/10 hover:scale-[1.01] animate-in fade-in-50 slide-in-from-bottom-4 duration-500">
        <div className="p-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                {selectedOrganization.organization?.name}
              </span>{" "}
              Organization
            </h1>
            <p className="text-gray-400 text-lg">
              Here you can issue notices to your organization members.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="group">
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Enter Notice title"
                className="bg-gray-800/70 text-gray-300 font-semibold border-gray-700/50 focus:border-blue-500/70 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 hover:bg-gray-800/90 hover:border-gray-600/70 placeholder:text-gray-500 group-hover:shadow-lg"
              />
            </div>

            <div className="group">
              <Textarea
                placeholder="Write your notice here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="bg-gray-800/70 text-gray-300 font-semibold border-gray-700/50 focus:border-blue-500/70 focus:ring-2 focus:ring-blue-500/20 min-h-[120px] max-h-[900px] resize-none transition-all duration-300 hover:bg-gray-800/90 hover:border-gray-600/70 placeholder:text-gray-500 group-hover:shadow-lg"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/25 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              Issue a Notice
            </Button>
          </form>
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-full blur-xl animate-pulse"></div>
          <div
            className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-blue-600/10 rounded-full blur-xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
