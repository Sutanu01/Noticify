"use client";
import React from "react";
import { UserButton, OrganizationSwitcher } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 border border-gray-800 rounded-2xl px-8 py-4 flex justify-between items-center shadow-lg">
      <div>
        <h1 className="text-white font-bold text-3xl font-cursive tracking-wide drop-shadow">
          Noticify
        </h1>
      </div>
      <div className="flex items-center gap-6">
        <span className="border border-gray-700 bg-gray-800 px-4 py-2 rounded-xl flex items-center shadow">
          <OrganizationSwitcher
            appearance={{
              elements: {
                organizationSwitcherTrigger: {
                  color: "#d1d5db", // Tailwind zinc-300
                  fontWeight: "500",
                  fontSize: "1rem",
                  "&:hover": {
                    color: "#fff",
                  },
                },
                organizationSwitcherTriggerIcon: {
                  color: "#fff",
                },
              },
            }}
            afterSelectOrganizationUrl="/org/:slug"
            afterCreateOrganizationUrl="/org/:slug"
            afterSelectPersonalUrl="/"
          />
        </span>
        <UserButton
          appearance={{
            elements: {
              avatarBox: {
                border: "2px solid #fff",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              },
            },
          }}
        />
      </div>
    </nav>
  );
}
