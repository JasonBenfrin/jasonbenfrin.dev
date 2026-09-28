"use client";

import { useState } from "react";

interface ISidebarToggleWrapper { children: React.ReactNode }
export default function SidebarToggleWrapper({ children }: ISidebarToggleWrapper) {
  const [showSidebar, setShowSidebar] = useState(false)
  
  return <div className={`flex-1 flex flex-col overflow-y-hidden group/sidebar ${showSidebar ? "showSidebar" : ""}`}>
    {children}
    <div className="border-2 m-1 mt-0 p-1 flex justify-center items-center gap-1 *:flex-1 *:p-1 md:hidden">
      <button className={showSidebar ? "text-surface bg-primary" : "border-2"} onClick={() => setShowSidebar(true)}>
        Tree
      </button>
      <button className={showSidebar ? "border-2" : "text-surface bg-primary"} onClick={() => setShowSidebar(false)}>
        File
      </button>
    </div>
  </div>
}