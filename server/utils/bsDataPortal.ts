const BASE_URL = 'https://data.bs.ch/api/explore/v2.1/catalog/datasets'

/**
 * Fetches an ODS dataset JSON export from the Basel-Stadt data portal.
 * Prefers a private `runtimeConfig.bsApiKey`, falls back to `public.bsApiKey`.
 */
export function resolveBsApiKey(config?: {
  bsApiKey?: string
  public?: { bsApiKey?: string }
}): string {
  const privateKey = String(config?.bsApiKey || '').trim()
  if (privateKey)
    return privateKey
  return String(config?.public?.bsApiKey || '').trim()
}

export async function fetchDatasetJson(odsId: string, apiKey: string): Promise<unknown[]> {
  const key = apiKey.trim()
  if (!key)
    throw new Error('Missing BS API key for data portal access.')
  const rows = await $fetch<unknown[]>(`${BASE_URL}/${odsId}/exports/json`, {
    headers: { Authorization: `Apikey ${key}` },
  })
  return Array.isArray(rows) ? rows : []
}

export { BASE_URL as BS_DATA_PORTAL_BASE_URL }
