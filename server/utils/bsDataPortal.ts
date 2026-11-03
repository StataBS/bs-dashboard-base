const BASE_URL = 'https://data.bs.ch/api/explore/v2.1/catalog/datasets'

/**
 * Reads the server-only portal API key from `runtimeConfig.bsApiKey`
 * (`NUXT_BS_API_KEY`). Do not expose this via `runtimeConfig.public`.
 */
export function resolveBsApiKey(config?: {
  bsApiKey?: string
}): string {
  return String(config?.bsApiKey || '').trim()
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
