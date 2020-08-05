export const noKeywordError = (keyword: String) => ({
  error: `Missing: ${keyword}`,
  detail:
    'The call requries the missing url to have query params that are missing',
})
