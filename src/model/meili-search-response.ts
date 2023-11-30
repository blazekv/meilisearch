export interface MeiliSearchResponse<Data> {
  hits: Data[],
  query: string,
  processingTimeMs: number,
  limit: number,
  offset: number,
  estimatedTotalHits: number
  facetDistribution: Record<keyof Data, FacetDistribution>
}

export interface FacetDistribution {
  [index: string]: number
}
