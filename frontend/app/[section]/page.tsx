import Link from "next/link";
import { notFound } from "next/navigation";

import { AppShell } from "@/components/app-shell";
import { dashboardProgress, dashboardTimeline } from "@/lib/dashboard-data";
import { getModuleDetail } from "@/lib/api";
import { getSectionBySlug } from "@/lib/site-data";

export default async function SectionPage({
  params
}: {
  params: Promise<{ section: string }>;
}) {
  const { section: sectionSlug } = await params;
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
    return (
      <AppShell>
        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
            Dashboard
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
            Current project progress
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
            This view tracks the current implementation state of Personal Hub.
            It focuses on delivery progress and the git history that will
            eventually document each milestone.
          </p>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
                Progress
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                Delivery status by area
              </h2>
            </div>
            <p className="text-sm text-slate-500">Current repository state</p>
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            {dashboardProgress.map((item) => (
              <article
                key={item.label}
                className="rounded-xl border border-slate-200 bg-slate-50 p-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {item.label}
                  </h3>
                  <span className="text-sm font-medium text-slate-600">
                    {item.percent}%
                  </span>
                </div>
                <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-slate-900"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-600">
                  {item.summary}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
              Timeline
            </p>
            <h2 className="text-2xl font-semibold text-slate-900">
              Progress and commit commentary
            </h2>
            <p className="text-sm leading-6 text-slate-600">
              The repository currently has no commits on `main`, so commit notes
              are shown as working-tree status until git history exists.
            </p>
          </div>

          <div className="mt-8 space-y-6">
            {dashboardTimeline.map((item, index) => (
              <div key={item.title} className="relative pl-10">
                {index < dashboardTimeline.length - 1 ? (
                  <div className="absolute left-[0.6875rem] top-8 h-[calc(100%+1rem)] w-px bg-slate-200" />
                ) : null}
                <div
                  className={`absolute left-0 top-1 h-6 w-6 rounded-full border-4 ${
                    item.status === "done"
                      ? "border-slate-900 bg-slate-900"
                      : item.status === "active"
                        ? "border-slate-900 bg-white"
                        : "border-slate-300 bg-white"
                  }`}
                />

                <article className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
                      {item.phase}
                    </span>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {item.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {item.summary}
                  </p>
                  <div className="mt-4 rounded-lg border border-slate-200 bg-white px-4 py-3">
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
                      Git Comment
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-700">
                      {item.commitComment}
                    </p>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </section>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_16rem]">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
              Module
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
              {moduleDetail?.name ?? localSection.title}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
              {moduleDetail?.description ?? localSection.description}
            </p>
          </div>

          {items.length > 0 ? (
            <div className="border-t border-slate-200 pt-4 text-right lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
                Sections
              </p>
              <div className="mt-4 flex flex-col items-end gap-3">
                {items.map((item) => (
                  <Link
                    key={item.slug}
                    className="text-sm text-slate-900 underline underline-offset-4"
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
