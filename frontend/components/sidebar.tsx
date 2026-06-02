"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { navigation } from "@/lib/navigation";

type SidebarProps = {
  collapsed: boolean;
  onCollapsedChange: (value: boolean) => void;
  onWidthChange: (value: number) => void;
  width: number;
};

const MIN_WIDTH = 220;
const MAX_WIDTH = 420;
const COLLAPSED_WIDTH = 56;

function getItemIcon(title: string) {
  switch (title) {
    case "Home":
      return (
        <path
          d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      );
    case "Dashboard":
      return (
        <>
          <rect x="4" y="4" width="7" height="7" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <rect x="13" y="4" width="7" height="12" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <rect x="4" y="13" width="7" height="7" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <rect x="13" y="18" width="7" height="2" rx="1" fill="currentColor" />
        </>
      );
    case "CV Manager":
      return (
        <>
          <rect x="6" y="4" width="12" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path d="M9 9h6M9 13h6M9 17h4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </>
      );
    case "Portfolio":
      return (
        <>
          <rect x="3.5" y="6" width="17" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path d="M7 15 10 12l2.5 2.5L16 11l2.5 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </>
      );
    case "Travel Planner":
      return (
        <>
          <path d="M12 3c4 0 7 3.1 7 6.9 0 5.3-7 11.2-7 11.2S5 15.2 5 9.9C5 6.1 8 3 12 3Z" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="12" cy="10" r="2.4" fill="none" stroke="currentColor" strokeWidth="1.8" />
        </>
      );
    case "Postcard Collection":
      return (
        <>
          <rect x="4" y="6" width="16" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path d="M12 6v12M4 10h8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </>
      );
    case "AI Assistant":
      return (
        <>
          <rect x="7" y="7" width="10" height="10" rx="3" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M6 6l1.7 1.7M16.3 16.3 18 18M18 6l-1.7 1.7M6 18l1.7-1.7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </>
      );
    default:
      return (
        <circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" strokeWidth="1.8" />
      );
  }
}

function SidebarIcon({ title }: { title: string }) {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5 shrink-0 text-slate-300"
      fill="none"
      viewBox="0 0 24 24"
    >
      {getItemIcon(title)}
    </svg>
  );
}

export function Sidebar({
  collapsed,
  onCollapsedChange,
  onWidthChange,
  width
}: SidebarProps) {
  const pathname = usePathname();
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    if (!isResizing) {
      return;
    }

    function handlePointerMove(event: PointerEvent) {
      const nextWidth = Math.min(Math.max(event.clientX, MIN_WIDTH), MAX_WIDTH);
      onWidthChange(nextWidth);
    }

    function handlePointerUp() {
      setIsResizing(false);
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [isResizing, onWidthChange]);

  const asideStyle = useMemo(
    () => ({ width: collapsed ? `${COLLAPSED_WIDTH}px` : `${width}px` }),
    [collapsed, width]
  );

  return (
    <aside
      className="relative sticky top-0 h-screen shrink-0 overflow-visible border-r border-slate-200 bg-slate-950 text-slate-100 transition-[width] duration-200"
      style={asideStyle}
    >
      <div className="flex h-full flex-col">
        <div className="border-b border-slate-800 px-4 py-4">
          <div
            className={`flex gap-3 ${
              collapsed ? "justify-center" : "items-start justify-between"
            }`}
          >
            {!collapsed ? (
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  Personal Hub
                </p>
                <Link className="mt-2 block text-2xl font-semibold" href="/">
                  Home
                </Link>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Initial dashboard template for portfolio, CV, travel,
                  collection, and AI workflows.
                </p>
              </div>
            ) : null}

            <button
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-300 transition hover:text-white"
              onClick={() => onCollapsedChange(!collapsed)}
              type="button"
            >
              {collapsed ? "→" : "←"}
            </button>
          </div>
        </div>

        {!collapsed ? (
          <nav className="flex-1 overflow-visible px-3 py-4">
            <ul className="space-y-3">
              {navigation.map((item) => (
                <li
                  key={item.title}
                  className="group relative rounded-xl border border-slate-800 bg-slate-900/60"
                >
                  <Link
                    className={`flex items-center gap-3 rounded-xl px-3 py-3 ${
                      pathname === item.href ? "text-white" : "text-slate-100"
                    }`}
                    href={item.href}
                  >
                    <SidebarIcon title={item.title} />
                    <div className="min-w-0 text-sm font-semibold">{item.title}</div>
                  </Link>

                  {item.children ? (
                    <div className="pointer-events-none absolute left-[calc(100%-0.25rem)] top-2 z-30 w-64 rounded-xl border border-slate-800 bg-slate-950/95 p-4 opacity-0 shadow-2xl transition-all duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
                      <Link
                        className="block text-sm font-semibold text-white underline underline-offset-4"
                        href={item.href}
                      >
                        {item.title}
                      </Link>
                      <ul className="mt-4 flex flex-col gap-3">
                        {item.children.map((child) => (
                          <li key={child.title}>
                            <Link
                              className={`text-sm underline underline-offset-4 transition hover:text-white ${
                                pathname === child.href
                                  ? "text-white"
                                  : "text-slate-300"
                              }`}
                              href={child.href}
                            >
                              {child.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
          </nav>
        ) : null}

        {!collapsed ? (
          <button
            aria-label="Resize sidebar"
            className={`absolute inset-y-0 right-0 w-2 cursor-col-resize bg-transparent transition hover:bg-slate-700/40 ${
              isResizing ? "bg-slate-700/50" : ""
            }`}
            onPointerDown={() => setIsResizing(true)}
            type="button"
          />
        ) : null}
      </div>
    </aside>
  );
}
