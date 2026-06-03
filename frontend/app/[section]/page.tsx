import Link from "next/link";
import { notFound } from "next/navigation";

import { AppShell } from "@/components/app-shell";
import { DashboardTimeline } from "@/components/dashboard-timeline";
import {
  dashboardProjects,
  type DashboardProjectKey,
  getDashboardTimelineData
} from "@/lib/dashboard-data";
import { getModuleDetail } from "@/lib/api";
import { getSectionBySlug } from "@/lib/site-data";

export default async function SectionPage({
  params,
  searchParams
}: {
  params: Promise<{ section: string }>;
  searchParams?: Promise<{ project?: string }>;
}) {
  const { section: sectionSlug } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const localSection = getSectionBySlug(sectionSlug);

  if (!localSection) {
    notFound();
  }

  const moduleDetail = await getModuleDetail(sectionSlug);
  const items =
    moduleDetail?.items ??
    (localSection.children ?? []).map((item) => ({
      name: item.title,
      slug: item.slug,
      description: item.description
    }));

  if (sectionSlug === "dashboard") {
    const requestedProject =
      resolvedSearchParams?.project === "image-analysis"
        ? "image-analysis"
        : "personal-dashboard";
    const dashboardData = await getDashboardTimelineData(
      requestedProject as DashboardProjectKey
    );

    return (
      <AppShell>
        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
                Current project progress
              </h1>
            </div>

            <div className="text-right">
              <div className="flex flex-col items-end gap-3">
                {dashboardProjects.map((project) => (
                  <Link
                    key={project.key}
                    className={`text-sm underline underline-offset-4 ${
                      project.key === dashboardData.projectKey
                        ? "font-semibold text-slate-900"
                        : "text-slate-600"
                    }`}
                    href={{
                      pathname: "/dashboard",
                      query:
                        project.key === "personal-dashboard"
                          ? {}
                          : { project: project.key }
                    }}
                  >
                    {project.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-6 text-xs text-slate-600">
            <div>
              <span className="font-medium text-slate-900">Project start:</span>{" "}
              {dashboardData.projectStartDate}
            </div>
            <div>
              <span className="font-medium text-slate-900">Commit count:</span>{" "}
              {dashboardData.commitCount}
            </div>
          </div>
        </section>

        <DashboardTimeline commits={dashboardData.commits} />
      </AppShell>
    );
  }

  return (
    <AppShell>
      <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_16rem]">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
              Module
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
              {moduleDetail?.name ?? localSection.title}
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-600">
              {moduleDetail?.description ?? localSection.description}
            </p>
          </div>

          {items.length > 0 ? (
            <div className="border-t border-slate-200 pt-4 text-right lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
                Sections
              </p>
              <div className="mt-4 flex flex-col items-end gap-3">
                {items.map((item) => (
                  <Link
                    key={item.slug}
                    className="text-xs text-slate-900 underline underline-offset-4"
                    href={`/${sectionSlug}/${item.slug}`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </AppShell>
  );
}
