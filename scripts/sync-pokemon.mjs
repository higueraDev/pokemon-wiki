import { mkdir, writeFile } from "node:fs/promises";
const directory = new URL("../src/assets/pokemon/", import.meta.url);
await mkdir(directory, { recursive: true });
async function fetchResource(url, json = true) {
  const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error(`${response.status}: ${url}`);
  return json ? response.json() : Buffer.from(await response.arrayBuffer());
}
const entries = [];
for (let offset = 1; offset <= 151; offset += 8) {
  await Promise.all(
    Array.from({ length: Math.min(8, 152 - offset) }, async (_, index) => {
      const id = offset + index;
      const [pokemon, species] = await Promise.all([
        fetchResource(`https://pokeapi.co/api/v2/pokemon/${id}`),
        fetchResource(`https://pokeapi.co/api/v2/pokemon-species/${id}`),
      ]);
      const artwork = pokemon.sprites.other["official-artwork"].front_default;
      await writeFile(
        new URL(`${id}.png`, directory),
        await fetchResource(artwork, false),
      );
      entries.push({
        id,
        name: pokemon.name,
        types: pokemon.types.map((t) => t.type.name),
        height: pokemon.height / 10,
        weight: pokemon.weight / 10,
        abilities: pokemon.abilities.map((a) => a.ability.name),
        stats: pokemon.stats.map((s) => ({
          name: s.stat.name,
          value: s.base_stat,
        })),
        description:
          species.flavor_text_entries
            .find((t) => t.language.name === "en")
            ?.flavor_text.replace(/[\n\f]/g, " ") || "",
        genus:
          species.genera.find((g) => g.language.name === "en")?.genus || "",
      });
    }),
  );
  console.log(`Downloaded ${entries.length}/151`);
}
entries.sort((a, b) => a.id - b.id);
await writeFile(
  new URL("../src/app/pokemon-data.ts", import.meta.url),
  `export const POKEMON = ${JSON.stringify(entries)};\n`,
);
