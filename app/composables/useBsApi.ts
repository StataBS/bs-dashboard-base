const BASE_URL = 'https://data.bs.ch/api/explore/v2.1/catalog/datasets'

/**
 * Fetches ODS JSON export for a dataset using the Basel-Stadt data portal API.
 *
 * Resolution order:
 * 1. Local static file at `/data/{odsId}.json` (when present)
 * 2. Live API with `Authorization: Apikey …`
 *
 * API key: `runtimeConfig.public.bsApiKey` (client) or set the same value for
 * client-side fetches. Server routes should prefer `runtimeConfig.bsApiKey`
 * via `fetchDatasetJson` from `~~/server/utils/bsDataPortal`.
 */
export function useBsApi() {
  const config = useRuntimeConfig()
  const requestFetch = useRequestFetch()

  const fetchDataset = async (odsId: string) => {
    const localPath = `/data/${odsId}.json`
    try {
      const localData = await requestFetch<unknown[]>(localPath)
      if (Array.isArray(localData)) {
        return localData
      }
    }
    catch {
      // Fall back to live API when local JSON is unavailable.
    }

    const key = String(config.public.bsApiKey || config.bsApiKey || '').trim()
    if (!key) {
      throw new Error(`Missing local ${localPath} and no BS API key (NUXT_PUBLIC_BS_API_KEY / NUXT_BS_API_KEY).`)
    }
    try {
      const response = await requestFetch<unknown[]>(`${BASE_URL}/${odsId}/exports/json`, {
        headers: { Authorization: `Apikey ${key}` },
      })
      return Array.isArray(response) ? response : []
    }
    catch {
      throw new Error(`Failed to fetch dataset ${odsId} from data portal.`)
    }
  }

  return { fetchDataset }
}
