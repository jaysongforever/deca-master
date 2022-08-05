const axios = require('axios')
// const HttpsProxyAgent = require("https-proxy-agent")

// const httpsAgent = new HttpsProxyAgent(`http://127.0.0.1:10802`)
// const axios = _axios.create({proxy: false, httpsAgent})

const cookie = ''
const targetLevel = 13
const tokenId = ''
;(async () => {
  const upgrade = (targetLevel, tokenId, cookie) => {
    const res = axios({
      method: 'post',
      url: `https://deca.art/api/web/decagon/upgrade?`,
      data: {
        targetLevel,
        tokenId
      },
      headers: {
        authority: 'deca.art',
        accept: '*/*',
        'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
        'cache-control': 'no-cache',
        'content-type': 'application/json',
        cookie: cookie,
        origin: 'https://deca.art',
        'sec-ch-ua':
          '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': 'macOS',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
      },
    })
    return res
  }

  const res = await upgrade(targetLevel, tokenId, cookie).catch(err => {})
  if (res && res.data) {
    console.log('🚀 ~ file: upgrade.js ~ line 42 ~ ; ~ res.data', res.data)
  }
})()
