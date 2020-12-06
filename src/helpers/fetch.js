import {navigateTo} from "svelte-router-spa"

export default async function OFetch(url, method, body) {
  return new Promise(async (resolve, reject) => {
    try {
      let token = ""
      const user = JSON.parse(localStorage.getItem("user"))
      if (user) token = user.token
      let headers = {}
      if (token) {
        headers["Authorization"] = `Bearer ${token}`
      }
      if (body) {
        headers['Content-Type'] = 'application/json'
      }
      let response = await fetch(
        url,
        {
          "method": method,
          "headers": headers,
          "body": JSON.stringify(body)
        }
      )
      if (response.status === 403) {
        throw "unauthorized"
      }
      response = await response.json()
      resolve(response)
    } catch(err) {
      if (err === "unauthorized") {
        navigateTo("/login")
      }
      reject(err)
    }
  })
}