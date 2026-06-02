export type ApiNavigationItem = {
  name: string;
  slug: string;
  description: string;
  items: { name: string; slug: string }[];
};

export type ApiSystemStatus = {
  name: string;
  version: string;
  database: string;
  modules: string[];
};

export type ApiModuleDetail = {
  name: string;
  slug: string;
  description: string;
  items: { name: string; slug: string; description: string }[];
};

const API_BASE_URL = process.env.API_BASE_URL ?? "http://127.0.0.1:8000";

async function fetchApi<T>(path: string): Promise<T | null> {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      cache: "no-store"
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export function getSystemStatus() {
  return fetchApi<ApiSystemStatus>("/api/status");
}

export function getNavigation() {
  return fetchApi<ApiNavigationItem[]>("/api/navigation");
}

export function getModuleDetail(slug: string) {
  return fetchApi<ApiModuleDetail>(`/api/modules/${slug}`);
}

