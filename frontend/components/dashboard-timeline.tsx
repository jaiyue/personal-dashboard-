"use client";

import { useMemo, useState } from "react";

import type { DashboardCommitDetail } from "@/lib/dashboard-types";

type DashboardTimelineProps = {
  commits: DashboardCommitDetail[];
};

export function DashboardTimeline({ commits }: DashboardTimelineProps) {
  const groupedCommits = useMemo(() => {
    const groups = new Map<
      string,
      {
        date: string;
        displayDate: string;
        commits: DashboardCommitDetail[];
      }
    >();

    commits.forEach((commit) => {
      const existing = groups.get(commit.date);
      if (existing) {
        existing.commits.push(commit);
      } else {
        groups.set(commit.date, {
          date: commit.date,
          displayDate: commit.displayDate,
          commits: [commit]
        });
      }
    });

    return Array.from(groups.values());
  }, [commits]);

  const [selectedDate, setSelectedDate] = useState<string | null>(
    groupedCommits.at(-1)?.date ?? null
  );

  const selectedGroup = useMemo(
    () =>
      groupedCommits.find((group) => group.date === selectedDate) ??
      groupedCommits.at(-1) ??
      null,
    [groupedCommits, selectedDate]
  );
  const selectedCommits = selectedGroup?.commits ?? [];

  if (groupedCommits.length === 0) {
    return (
      <section className="mt-8">
        <div className="text-sm text-slate-600">No commits yet.</div>
      </section>
    );
  }

  return (
    <section className="mt-6">
      <div className="overflow-x-auto">
        <div
          className="inline-block"
        >
          <div
            className="grid items-start gap-x-0 gap-y-0"
            style={{
              gridTemplateColumns: `repeat(${groupedCommits.length}, max-content)`,
              gridTemplateRows: "minmax(5.5rem, auto) 1.5rem auto minmax(5.5rem, auto)"
            }}
          >
            {groupedCommits.map((group, index) => {
              const showTop = index % 2 === 0;
              const isSelected = selectedGroup?.date === group.date;

              return (
                <div key={group.date} className="contents">
                  {showTop ? (
                    <div className="row-[1] flex min-w-[3.4rem] items-end justify-center self-end pb-[0.45rem]">
                      <button
                        className={`w-fit rounded-2xl border px-3 py-2 text-left transition ${
                          isSelected
                            ? "border-slate-900 bg-white shadow-sm"
                            : "border-slate-200 bg-slate-50"
                        }`}
                        onClick={() => setSelectedDate(group.date)}
                        type="button"
                      >
                        <div className="text-xs font-semibold text-slate-900">
                          {group.commits.length} commit
                          {group.commits.length === 1 ? "" : "s"}
                        </div>
                        <div
                          className={`mt-1 gap-x-3 gap-y-0.5 text-xs text-slate-600 ${
                            group.commits.length > 1
                              ? "grid grid-cols-2"
                              : "flex flex-col"
                          }`}
                        >
                          {group.commits.map((commit) => (
                            <div key={commit.hash}>- {commit.changedFiles.length} files</div>
                          ))}
                        </div>
                      </button>
                    </div>
                  ) : (
                    <div className="row-[1] min-w-[3.4rem]" />
                  )}

                  <div className="row-[2] relative z-10 flex w-full min-w-[3.4rem] items-center justify-center self-center">
                    {index > 0 ? (
                      <div className="absolute left-0 right-1/2 top-1/2 h-px -translate-y-1/2 bg-slate-300" />
                    ) : null}
                    {index < groupedCommits.length - 1 ? (
                      <div className="absolute left-1/2 right-0 top-1/2 h-px -translate-y-1/2 bg-slate-300" />
                    ) : null}
                    <div
                      className={`relative z-10 h-4 w-4 rounded-full border-2 bg-white ${
                        isSelected
                          ? "border-slate-900 bg-slate-900"
                          : "border-slate-500 bg-white"
                      }`}
                    />
                  </div>

                  <div className="row-[3] text-center text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                    {group.displayDate}
                  </div>

                  {!showTop ? (
                    <div className="row-[4] flex min-w-[3.4rem] items-start justify-center self-start pt-[0.45rem]">
                      <button
                        className={`w-fit rounded-2xl border px-3 py-2 text-left transition ${
                          isSelected
                            ? "border-slate-900 bg-white shadow-sm"
                            : "border-slate-200 bg-slate-50"
                        }`}
                        onClick={() => setSelectedDate(group.date)}
                        type="button"
                      >
                        <div className="text-xs font-semibold text-slate-900">
                          {group.commits.length} commit
                          {group.commits.length === 1 ? "" : "s"}
                        </div>
                        <div
                          className={`mt-1 gap-x-3 gap-y-0.5 text-xs text-slate-600 ${
                            group.commits.length > 1
                              ? "grid grid-cols-2"
                              : "flex flex-col"
                          }`}
                        >
                          {group.commits.map((commit) => (
                            <div key={commit.hash}>- {commit.changedFiles.length} files</div>
                          ))}
                        </div>
                      </button>
                    </div>
                  ) : (
                    <div className="row-[4] min-w-[3.4rem]" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {selectedGroup ? (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center gap-4">
            <div className="text-sm font-semibold text-slate-900">{selectedGroup.date}</div>
            <div className="text-xs uppercase tracking-[0.2em] text-slate-500">
              {selectedGroup.commits.length} commit
              {selectedGroup.commits.length === 1 ? "" : "s"}
            </div>
          </div>

          <div className="mt-5 space-y-4">
            {selectedCommits.map((commit) => {
              const primaryFiles = commit.changedFiles.slice(0, 3);
              const remainingFileCount = Math.max(
                commit.changedFiles.length - primaryFiles.length,
                0
              );

              return (
                <div key={commit.hash} className="grid gap-3 lg:grid-cols-[14rem_1fr]">
                  <div>
                    <div className="text-sm font-semibold text-slate-900">
                      {commit.subject}
                    </div>
                    <div className="mt-1 flex flex-wrap gap-2 text-xs uppercase tracking-[0.16em] text-slate-500">
                      <span>{commit.shortHash}</span>
                      <span>{commit.changedFiles.length} files</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {primaryFiles.map((file) => (
                      <div
                        key={file}
                        className="flex h-7 min-w-[5rem] items-center justify-center whitespace-nowrap rounded-full border border-slate-200 px-4 text-sm leading-none text-slate-700"
                      >
                        {file}
                      </div>
                    ))}
                    {remainingFileCount > 0 ? (
                      <div className="flex h-7 min-w-[5rem] items-center justify-center whitespace-nowrap rounded-full border border-slate-200 px-4 text-sm leading-none text-slate-500">
                        +{remainingFileCount} more
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </section>
  );
}
