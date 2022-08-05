const axios = require('axios')
// const HttpsProxyAgent = require("https-proxy-agent")

// const httpsAgent = new HttpsProxyAgent(`http://127.0.0.1:10802`)
// const axios = _axios.create({proxy: false, httpsAgent})

const userId = 'cl4vdfy7u089009mjco4zkigv'
const cookie = '__Host-next-auth.csrf-token=fc50e7455c7cdf45bccdda25adc81f51c5d15afb0232fd420b58bf98b4d96925%7C823b61647c8a6a63c9758d491036a9cee3340101984cd94da9f67dbb85aea97b; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_ses_props.3997967461=%7B%22ts%22%3A1657558195581%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2F%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..H-0dIrlAn13jF2gV.StBXNj1NWhPRJ1n7bBSIU5QanQtU9o3m-9f458jyYJNOvQfu_2Chjeg45nMcVCfOc1E-5FksARZ7Ktuns0eqk-guEiDaarKS0x5FTfGZh5D9IESh0uXV96ivbTz9cq_TMIPAoqI-ljDV4bvg5XKzeCPsMUA6bKoDYghx50TEemI.PN2ErNTUi4dwEY6pmTjm1A; _hp2_id.3997967461=%7B%22userId%22%3A%225316811474619736%22%2C%22pageviewId%22%3A%225882411972254565%22%2C%22sessionId%22%3A%228088618113563341%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D'

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

  // let lastScore = 0
  // let score = 905
  // while(score !== lastScore) {
  //   lastScore = score
  //   const res = await getExperience(userId, cookie).catch(err => {})
  //   if (res && res.data) {
  //     score = res.data.availableExperience
  //     console.log('🚀 ~ file: experienceGet.js ~ line 46 ~ ; ~ score', score)
  //   }
  // }

  let i = 0;
  while(i < 700) {
    const res = await getExperience(userId, cookie).catch(err => {})
    if (res && res.data) {
      console.log('🚀 ~ file: experienceGet.js ~ line 46 ~ ; ~ score', res.data.availableExperience)
      i++
    }    
  }
})()
