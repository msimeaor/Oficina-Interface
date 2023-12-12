import React from 'react'

const useFetch = () => {
  const [data, setData] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const doFetch = React.useCallback(async (url, options) => {
    let response;
    let json;

    try {
      setLoading(true)
      setData(null)
      setError(null)

      response = await fetch(url, options)
      json = await response.json()

      if (!response.ok) {
        throw new Error(json.mensagemErro)
      }

    } catch (err) {
      setError(err.message)

    } finally {
      setData(json)
      setLoading(false)
      return [response, json]

    }

  }, [])

  return {
    data,
    loading,
    error,
    doFetch
  }

}

export default useFetch