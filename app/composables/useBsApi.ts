/**
 * Loads ODS JSON from a local static file at `/data/{odsId}.json`.
 *
 * Live data.bs.ch calls must use a Nitro server route with `NUXT_BS_API_KEY`
 * (`fetchDatasetJson` / `resolveBsApiKey` from `~~/server/utils/bsDataPortal`).
 * Never put the portal key under `runtimeConfig.public`.
 */
export function useBsApi() {
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
      // Fall through to the explicit error below.
    }

    throw new Error(
      `Missing local ${localPath}. Fetch live portal data from a server route using NUXT_BS_API_KEY.`,
    )
  }

  return { fetchDataset }
}
