import { getCollection, type CollectionEntry } from 'astro:content';

export type SectionEntry = CollectionEntry<'sections'>;

export async function loadSections(): Promise<SectionEntry[]> {
  return (await getCollection('sections')).sort((a, b) => a.data.order - b.data.order);
}

export async function getSection(id: string): Promise<SectionEntry> {
  const section = (await loadSections()).find(entry => entry.id === id);
  if (!section) throw new Error(`Unknown section "${id}"`);
  return section;
}
