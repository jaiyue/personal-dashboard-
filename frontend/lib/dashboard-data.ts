export type ProgressItem = {
  label: string;
  percent: number;
  summary: string;
};

export type TimelineItem = {
  phase: string;
  title: string;
  summary: string;
  commitComment: string;
  status: "done" | "active" | "next";
};

export const dashboardProgress: ProgressItem[] = [
  {
    label: "Project Structure",
    percent: 85,
    summary: "Root-level backend structure, frontend scaffold, and shared routing are in place."
  },
  {
    label: "Frontend Navigation",
    percent: 80,
    summary: "Sidebar, module pages, hover navigation, and resizable layout are implemented."
  },
  {
    label: "Backend API",
    percent: 60,
    summary: "FastAPI status and module endpoints exist, but persistent content endpoints are still pending."
  },
  {
    label: "Database Setup",
    percent: 40,
    summary: "SQLite initialization exists, but real module CRUD tables and workflows are not complete yet."
  }
];

export const dashboardTimeline: TimelineItem[] = [
  {
    phase: "Phase 1",
    title: "Repository bootstrap",
    summary: "Created the initial README, bilingual docs, frontend skeleton, backend skeleton, and SQLite setup.",
    commitComment: "No git commit yet — initial scaffold changes exist only in the working tree.",
    status: "done"
  },
  {
    phase: "Phase 2",
    title: "Navigation and routing",
    summary: "Added real sidebar navigation, module routes, subpages, and backend-driven navigation data.",
    commitComment: "No git commit yet — routing and sidebar revisions are still uncommitted.",
    status: "active"
  },
  {
    phase: "Phase 3",
    title: "Module implementation",
    summary: "Next step is replacing placeholders with real forms, tables, and persistent SQLite-backed records.",
    commitComment: "Planned commit comment: implement first CRUD workflow for CV Manager.",
    status: "next"
  }
];

