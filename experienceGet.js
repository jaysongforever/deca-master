const axios = require('axios')
// const HttpsProxyAgent = require("https-proxy-agent")

// const httpsAgent = new HttpsProxyAgent(`http://127.0.0.1:10802`)
// const axios = _axios.create({proxy: false, httpsAgent})

const userId = ''
const cookie = ''

;(async () => {
  const getExperience = (userId, cookie) => {
    const res = axios({
      method: 'get',
      url: `https://deca.art/api/web/user/${userId}/experience?`,
      headers: {
        authority: 'deca.art',
        accept: '*/*',
        'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
        'cache-control': 'no-cache',
        cookie: cookie,
        origin: 'https://deca.art',
        pragma: 'no-cache',
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

  let lastScore = 0
  let score = 905
  while(score !== lastScore) {
    lastScore = score
    const res = await getExperience(userId, cookie)
    if (res && res.data) {
      score = res.data.availableExperience
      console.log('🚀 ~ file: experienceGet.js ~ line 46 ~ ; ~ score', score)
    }
  }
})()
