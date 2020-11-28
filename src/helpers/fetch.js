export default async function OFetch(url, method, body) {
  return new Promise(async (resolve, reject) => {
    try {
      let token = ""
      const user = JSON.parse(localStorage.getItem("user"))
      if (user) token = user.token
      let response = await fetch(
        url,
        {
          "method": method,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : token
          },
          "body": JSON.stringify(body)
        }
      )
      response = await response.json()
      resolve(response)
    } catch(err) {
      reject(err)
    }
  })
}