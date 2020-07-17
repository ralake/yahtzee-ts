import { useState, useEffect } from 'react'
import { isFunction, noop, get } from 'lodash-es'
import axios from 'axios'

export enum Method {
  GET = 'GET',
  POST = 'POST'
}

interface SuccessFunc { (data: any): void }
interface ErrorFunc { (error: string): void }
interface Data {}

interface RequestParams {
  url: string,
  method: Method,
  onSuccess?: SuccessFunc,
  onError?: ErrorFunc,
  data?: Data,
  lazy: boolean
}

interface AxiosParams {
  url: string
  method: Method,
  data?: Data
}

export default function useRequest (request: RequestParams) {
  const {
    url,
    method,
    data,
    onSuccess = noop,
    onError = noop,
    lazy = false
  } = request
  const [reqState, setReqState] = useState({
    loading: lazy ? false : true,
    data: null,
    error: null
  })

  useEffect(() => {
    if (!lazy) runRequest({ url, method, data })
  }, [])

  return { ...reqState, makeRequest }

  function makeRequest () {
    runRequest({
      url,
      method,
      data
    })
  }

  function runRequest ({ url, method, data }: AxiosParams) {
    setReqState({ loading: true, data: reqState.data, error: null })
    axios({
      url,
      method,
      data
    })
      .then(({ data }) => {
        setReqState({ loading: false, data, error: null })
        onSuccess(data)
      })
      .catch(e => {
        const error = get(e, 'response.data.message') || e
        setReqState({ loading: false, data: null, error })
        onError(error)
      })
  }
}
