"use client";

import { ReactNode, useMemo, useState } from "react";

import { Sidebar } from "@/components/sidebar";

export function AppShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(220);

  const contentClassName = useMemo(
    () => (collapsed ? "px-6 py-8 lg:px-8" : "px-6 py-8 lg:px-10"),
    [collapsed]
  );

  return (
    <main className="flex min-h-screen">
      <Sidebar
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
        onWidthChange={setSidebarWidth}
        width={sidebarWidth}
      />
      <div className={`min-w-0 flex-1 ${contentClassName}`}>{children}</div>
    </main>
  );
}
