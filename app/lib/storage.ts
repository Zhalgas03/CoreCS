export const SUPABASE_STORAGE_URL =
  "https://khmaxujhxdynzixtzrnd.supabase.co/storage/v1/object/public"

export function cover(path: string) {
  return `${SUPABASE_STORAGE_URL}/covers/${path}`
}
