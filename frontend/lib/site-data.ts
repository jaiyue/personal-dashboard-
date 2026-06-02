export type SubItem = {
  title: string;
  slug: string;
  description: string;
};

export type SectionItem = {
  title: string;
  slug: string;
  description: string;
  children?: SubItem[];
};

export const siteSections: SectionItem[] = [
  {
    title: "Dashboard",
    slug: "dashboard",
    description: "High-level overview of personal data and activity."
  },
  {
    title: "CV Manager",
    slug: "cv-manager",
    description: "Structured records for career development.",
    children: [
      {
        title: "Education",
        slug: "education",
        description: "Add degree, institution, dates, modules, and notable results."
      },
      {
        title: "Experience",
        slug: "experience",
        description: "Add role title, organisation, timeline, impact statements, and tools."
      },
      {
        title: "Projects",
        slug: "projects",
        description: "Add problem, implementation, stack, outcomes, and repository links."
      },
      {
        title: "Skills",
        slug: "skills",
        description: "Group skills by language, framework, tools, and proficiency level."
      }
    ]
  },
  {
    title: "Portfolio",
    slug: "portfolio",
    description: "Project showcase and supporting materials.",
    children: [
      {
        title: "AI Quiz Show",
        slug: "ai-quiz-show",
        description: "Placeholder portfolio page section for concept, tech stack, and screenshots."
      },
      {
        title: "LFA Analysis",
        slug: "lfa-analysis",
        description: "Placeholder section for objectives, methodology, findings, and visuals."
      },
      {
        title: "Energy Trading",
        slug: "energy-trading",
        description: "Placeholder section for market context, models, and outcomes."
      }
    ]
  },
  {
    title: "Travel Planner",
    slug: "travel-planner",
    description: "Trips, destinations, and itinerary generation.",
    children: [
      {
        title: "Countries",
        slug: "countries",
        description: "Maintain destination metadata, status, tags, and research notes."
      },
      {
        title: "Trips",
        slug: "trips",
        description: "Track itinerary, budget, bookings, and post-trip summaries."
      },
      {
        title: "AI Generator",
        slug: "ai-generator",
        description: "Generate itinerary drafts from interests, dates, and budget constraints."
      }
    ]
  },
  {
    title: "Postcard Collection",
    slug: "postcard-collection",
    description: "Catalogue of postcards, images, and tags.",
    children: [
      {
        title: "Images",
        slug: "images",
        description: "Store postcard image references, filenames, and display ordering."
      },
      {
        title: "Maps",
        slug: "maps",
        description: "Attach postcard origin to geographic metadata and visual map views."
      },
      {
        title: "Tags",
        slug: "tags",
        description: "Organise postcards by theme, location, date, or personal category."
      }
    ]
  },
  {
    title: "AI Assistant",
    slug: "ai-assistant",
    description: "Content generation and summarisation tools.",
    children: [
      {
        title: "Generate CV",
        slug: "generate-cv",
        description: "Select target role and compile a role-specific CV from stored records."
      },
      {
        title: "Generate Cover Letter",
        slug: "generate-cover-letter",
        description: "Use job description and experience data to draft tailored applications."
      },
      {
        title: "Generate Travel Plan",
        slug: "generate-travel-plan",
        description: "Produce draft itineraries using trip constraints and saved preferences."
      },
      {
        title: "Summarise Projects",
        slug: "summarise-projects",
        description: "Generate concise project summaries for portfolio and CV reuse."
      }
    ]
  }
];

export function getSectionBySlug(slug: string) {
  return siteSections.find((section) => section.slug === slug);
}

export function getSubItem(sectionSlug: string, itemSlug: string) {
  const section = getSectionBySlug(sectionSlug);
  return section?.children?.find((item) => item.slug === itemSlug);
}

