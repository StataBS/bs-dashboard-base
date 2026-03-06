const BASE_URL = 'https://data.bs.ch/api/explore/v2.1/catalog/datasets'

export function useBsApi() {
    const fetchDataset = async (odsId: string) => {
        return await $fetch<any[]>(`${BASE_URL}/${odsId}/exports/json`)
    }

    return {
        fetchDataset,
    }
}
