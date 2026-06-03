import { notFound } from "next/navigation";

import { AppShell } from "@/components/app-shell";
import { getModuleDetail } from "@/lib/api";
import { getSectionBySlug, getSubItem } from "@/lib/site-data";

export default async function SectionItemPage({
  params
}: {
  params: Promise<{ section: string; item: string }>;
}) {
  const { section: sectionSlug, item: itemSlug } = await params;
  const section = getSectionBySlug(sectionSlug);
  const localItem = getSubItem(sectionSlug, itemSlug);

  if (!section || !localItem) {
    notFound();
  }

  const moduleDetail = await getModuleDetail(sectionSlug);
  const apiItem = moduleDetail?.items.find((item) => item.slug === itemSlug);

  return (
    <AppShell>
      <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
          {section.title}
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
          {apiItem?.name ?? localItem.title}
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-600">
          {apiItem?.description ?? localItem.description}
        </p>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Template Content</h2>
        <p className="mt-4 text-sm leading-6 text-slate-600">
          This page is a real route and is ready for forms, tables, search, or
          editor components. Replace this placeholder with the actual module UI.
        </p>
      </section>
    </AppShell>
  );
}
