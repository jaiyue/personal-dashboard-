import Link from "next/link";

import { AppShell } from "@/components/app-shell";
import { getNavigation, getSystemStatus } from "@/lib/api";
import { siteSections } from "@/lib/site-data";

type HomeSection = {
  name: string;
  slug: string;
  description: string;
  items: { name: string; slug: string }[];
};

export default async function HomePage() {
  const [status, modules] = await Promise.all([getSystemStatus(), getNavigation()]);
  const sectionCards: HomeSection[] =
    modules ??
    siteSections.map((section) => ({
      name: section.title,
      slug: section.slug,
      description: section.description,
      items: (section.children ?? []).map((item) => ({
        name: item.title,
        slug: item.slug
      }))
    }));

  return (
    <AppShell>
      <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
          Starter Template
        </p>
        <h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
          Personal Hub initial workspace
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
          This template maps the README into an initial interface skeleton so
          you can start wiring real data, APIs, and database models without
          redefining the structure.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              API Name
            </p>
            <p className="mt-2 text-lg font-semibold text-slate-900">
              {status?.name ?? "Backend offline"}
            </p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Version
            </p>
            <p className="mt-2 text-lg font-semibold text-slate-900">
              {status?.version ?? "-"}
            </p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Database
            </p>
            <p className="mt-2 text-lg font-semibold text-slate-900">
              {status?.database ?? "-"}
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {sectionCards.map((section) => (
          <article
            key={section.slug}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h3 className="text-xl font-semibold text-slate-900">{section.name}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {section.description}
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {section.items.map((item) => (
                <li key={item.slug} className="rounded-lg bg-slate-50 px-3 py-2">
                  <Link className="block" href={`/${section.slug}/${item.slug}`}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              className="mt-4 inline-block text-sm font-medium text-slate-900 underline"
              href={`/${section.slug}`}
            >
              Open module
            </Link>
          </article>
        ))}
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
            Templates
          </p>
          <h3 className="text-2xl font-semibold text-slate-900">
            Module pages are now routed
          </h3>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {siteSections.flatMap((section) =>
            (section.children ?? []).map((item) => (
              <article
                key={`${section.slug}-${item.slug}`}
                className="rounded-xl border border-slate-200 bg-slate-50 p-5"
              >
                <h4 className="text-lg font-semibold text-slate-900">
                  {item.title}
                </h4>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.description}
                </p>
                <Link
                  className="mt-4 inline-block text-sm font-medium text-slate-900 underline"
                  href={`/${section.slug}/${item.slug}`}
                >
                  Open page
                </Link>
              </article>
            ))
          )}
        </div>
      </section>
    </AppShell>
  );
}
