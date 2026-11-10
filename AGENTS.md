<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Repo map and dependency graph (read before editing)

Orientation docs, in order: `details.md` (folder structure, where to change what) → `architecture.md` (layers, auth flow, concurrency rules, known gaps) → the `AGENT_CONTEXT.md` in the folder you will touch (per-file purpose, imports, consumers, auth) → `public/AGENT_CONTEXT.md` for any image question (type, size, which file uses it). Also read `decisions.md`.

## Dependency graph command

```bash
npm run graph                          # rebuild graph/repo-graph.{json,md} AND refresh every AGENT_CONTEXT.md + public/ image blueprint
npm run graph -- --file <path>         # one file: imports, importers (direct + transitive), assets, fetched APIs, hazards
npm run graph -- --no-docs             # rebuild graph/ only
npm run graph:check                    # exit 1 if graph/ or any AGENT_CONTEXT.md is stale (use before finishing a task)
```

`graph/repo-graph.md` also lists routes, folder-level mermaid diagram, highest-fan-in files, orphans, import cycles, shared-state/race hazards, and `fetch("/api/...")` calls with no handler.

> **Currently unavailable:** `tools/graph.mjs` and the `graph/` directory are missing from the working tree, so every command above fails. Until the generator is restored, find importers with `grep -rn "from \"@/path/to/file\"" app components lib` and update the relevant `AGENT_CONTEXT.md` by hand. See `architecture.md` §10.

Rules for agents:
1. **Before editing a file** run `npm run graph -- --file <path>` (or grep for importers while the script is missing). Everything under "impacted if changed" must be re-checked (props/exports/types). Do not change an exported signature without updating every direct importer.
2. **Parallel work / multiple agents:** do not edit two files whose "impacted" sets overlap at the same time; edit shared files (`components/ui/*`, `lib/*`, `types/index.ts`) alone and first.
3. **Race-condition hazards:** never add module-level mutable state (`let`/`var`/singletons) in `app/`, `components/`, `lib/` - the server process is shared across requests and hot reloads. Auth checks belong in every protected page and server action, not only in a layout. Details: `architecture.md` §6.
4. **Do not introduce import cycles**; `npm run graph` reports them.
5. **After adding, moving, renaming or deleting a file** (including images in `public/`), run `npm run graph` and write a real description for any entry it marks `TODO:`. Only the description and `Permissions/Auth` lines of `AGENT_CONTEXT.md` are hand-written; Dependencies/Consumers/Runtime are regenerated and will be overwritten.
6. Finish every task with `npm run graph:check` and `npm run build`.
