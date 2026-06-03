export type DashboardCommitDetail = {
  hash: string;
  shortHash: string;
  date: string;
  displayDate: string;
  subject: string;
  keywords: string[];
  index: number;
  changedFiles: string[];
};

export type DashboardProjectKey = "personal-dashboard" | "image-analysis";

export type DashboardTimelineData = {
  commitCount: number;
  projectStartDate: string;
  commits: DashboardCommitDetail[];
  projectKey: DashboardProjectKey;
  projectLabel: string;
};

