import { Pool, type QueryResult, type QueryResultRow } from "pg";
declare global { var cmsPool: Pool | undefined; }
function getPool() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("DATABASE_URL is not configured");
  globalThis.cmsPool ??= new Pool({ connectionString, max: 5 });
  return globalThis.cmsPool;
}
export function query<T extends QueryResultRow = QueryResultRow>(text: string, values: (string | number | boolean | null)[] = []): Promise<QueryResult<T>> {
  return getPool().query<T>(text, values);
}
