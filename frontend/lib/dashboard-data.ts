import { execSync } from "node:child_process";
import path from "node:path";

import type {
  DashboardProjectKey,
  DashboardTimelineData
} from "@/lib/dashboard-types";

type DashboardProjectConfig = {
  key: DashboardProjectKey;
  label: string;
  githubRepo?: string;
};

type GitCommit = {
  hash: string;
  date: string;
  subject: string;
  changedFiles?: string[];
};

const repoRoots: Record<DashboardProjectKey, string> = {
  "personal-dashboard": path.resolve(process.cwd(), ".."),
  "image-analysis": "/Users/helen/Desktop/Image-analysis"
};
export const dashboardProjects: DashboardProjectConfig[] = [
  {
    key: "personal-dashboard",
    label: "Personal Dashboard"
  },
  {
    key: "image-analysis",
    label: "Image-analysis"
  }
];

function formatDateLabel(date: string) {
  const parsed = new Date(`${date}T00:00:00`);
  const day = String(parsed.getDate()).padStart(2, "0");
  const month = parsed
    .toLocaleString("en-GB", { month: "short" })
    .toUpperCase();
  return `${day}.${month}`;
}

function extractKeywords(subject: string) {
  return subject
    .replace(/[:,-]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 3)
    .map((word) => word.toLowerCase());
}

function readLocalGitCommits(repoRoot: string): GitCommit[] {
  try {
    const output = execSync("git log --date=short --pretty=format:%H%x09%ad%x09%s", {
      cwd: repoRoot,
      encoding: "utf8"
    }).trim();

    if (!output) {
      return [];
    }

    return output.split("\n").map((line) => {
      const [hash, date, subject] = line.split("\t");
      return { hash, date, subject };
    });
  } catch {
    return [];
  }
}

function readLocalChangedFiles(repoRoot: string, hash: string) {
  try {
    const output = execSync(`git show --pretty=format: --name-only ${hash}`, {
      cwd: repoRoot,
      encoding: "utf8"
    }).trim();

    if (!output) {
      return [];
    }

    return output
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
  } catch {
    return [];
  }
}

function toTimelineData(
  commitsAscending: GitCommit[],
  projectKey: DashboardProjectKey,
  projectLabel: string
): DashboardTimelineData {
  const commits = commitsAscending.map((commit, index) => ({
    hash: commit.hash,
    shortHash: commit.hash.slice(0, 7),
    date: commit.date,
    displayDate: formatDateLabel(commit.date),
    subject: commit.subject,
    keywords: extractKeywords(commit.subject),
    index: index + 1,
    changedFiles: commit.changedFiles ?? []
  }));

  return {
    commitCount: commits.length,
    projectStartDate: commitsAscending[0].date,
    commits,
    projectKey,
    projectLabel
  };
}

export async function getDashboardTimelineData(
  projectKey: DashboardProjectKey
): Promise<DashboardTimelineData> {
  const project = dashboardProjects.find((item) => item.key === projectKey);
  const repoRoot = repoRoots[projectKey];

  if (!project) {
    return getDashboardTimelineData("personal-dashboard");
  }

  const chronologicalCommits = readLocalGitCommits(repoRoot)
    .map((commit) => ({
      ...commit,
      changedFiles: readLocalChangedFiles(repoRoot, commit.hash)
    }))
    .reverse();

  if (chronologicalCommits.length === 0) {
    return {
      commitCount: 0,
      projectStartDate:
        project.key === "personal-dashboard" ? "2026-06-02" : "Unknown",
      commits: [],
      projectKey: project.key,
      projectLabel: project.label
    };
  }

  return toTimelineData(chronologicalCommits, project.key, project.label);
}
