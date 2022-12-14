const AuthFetch = async (url, method = 'GET', body) => {
  return new Promise(async (resolve, reject) => {
    try {
      let token = `${window.localStorage.getItem("token")}`
      let headers = {}
      if (token) {
        headers["Authorization"] = `Bearer ${token}`
      }
      if (body) {
        headers['Content-Type'] = 'application/json'
      }
      let options = {
        method,
        headers,
      }
      if (body) {
        options.body = JSON.stringify(body)
      }
      let response = await fetch(
        url,
        options
      )
      if (response.status === 403) {
        window.localStorage.removeItem('token')
        window.location.reload()
      }
      response = await response.json()
      resolve(response)
    } catch (err) {
      reject(err)
    }
  })
}

export default AuthFetch