import type { Route } from "next";

import { siteSections } from "@/lib/site-data";

export type NavItem = {
  title: string;
  description: string;
  href: Route;
  children?: { title: string; href: Route }[];
};

export const navigation: NavItem[] = [
  ...siteSections.map((section) => ({
    title: section.title,
    description: section.description,
    href: `/${section.slug}` as Route,
    children: section.children?.map((child) => ({
      title: child.title,
      href: `/${section.slug}/${child.slug}` as Route
    }))
  }))
];
