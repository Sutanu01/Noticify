import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-sm border-gray-700/50 animate-in fade-in-50 duration-700">
          <CardContent className="py-12 px-6 text-center">
            <div className="flex flex-col items-center gap-6">
              <div className="p-4 rounded-full bg-gradient-to-br from-red-500/20 to-orange-600/20">
                <AlertTriangle className="w-12 h-12 text-red-400" />
              </div>
              <div>
                <h1 className="text-6xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
                  404
                </h1>
                <h2 className="text-xl font-semibold text-gray-300 mb-2">
                  Page Not Found
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  The page you're looking for doesn't exist or has been moved to another location.
                </p>
              </div>
              <Link href="/" className="w-full">
                <Button 
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-none transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                  size="lg"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Go to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}