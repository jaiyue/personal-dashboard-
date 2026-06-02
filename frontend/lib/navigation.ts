import { siteSections } from "@/lib/site-data";

export type NavItem = {
  title: string;
  description: string;
  href: string;
  children?: { title: string; href: string }[];
};

export const navigation: NavItem[] = [
  ...siteSections.map((section) => ({
    title: section.title,
    description: section.description,
    href: `/${section.slug}`,
    children: section.children?.map((child) => ({
      title: child.title,
      href: `/${section.slug}/${child.slug}`
    }))
  }))
];
