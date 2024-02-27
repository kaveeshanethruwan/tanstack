# React + Vite + React query

# Default behavior of react query

Initial run will do the fetch.

If component got unmounted and then mounted will serve the cache and meantime will do the fetch again in background to make sure serve the updated data.

If you don't need this behavior you can set 'staleTime: Infinity'. This will stop doing background refetch.

If you want to remove caching functionality set 'cacheTime: 0'. By doing this whenever component get mounted will do fetch again and again.
