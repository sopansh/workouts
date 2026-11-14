import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';
import type { Loader } from 'astro/loaders';

/** Loads every `*.yml` file in a folder; each file holds a list of entries with unique `id` fields. */
export function yamlDir(dir: string): Loader {
  return {
    name: `yaml-dir:${dir}`,
    load: async ({ store, parseData, generateDigest, config, watcher }) => {
      const root = fileURLToPath(new URL(dir, config.root));
      const read = async () => {
        store.clear();
        const files = (await readdir(root)).filter(f => f.endsWith('.yml')).sort();
        for (const file of files) {
          const items = parse(await readFile(path.join(root, file), 'utf8')) as Array<Record<string, unknown>>;
          for (const item of items ?? []) {
            const id = String(item.id);
            if (store.has(id)) throw new Error(`Duplicate id "${id}" in ${dir}/${file}`);
            const data = await parseData({ id, data: item });
            store.set({ id, data, digest: generateDigest(item) });
          }
        }
      };
      await read();
      watcher?.add(root);
      watcher?.on('change', changed => { if (changed.startsWith(root)) void read(); });
    },
  };
}
