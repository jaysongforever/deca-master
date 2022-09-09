const axios = require('axios')
const decaList = require('./user')

const usernameOrAddress = JSON.parse(JSON.stringify(decaList))
// const usernameOrAddress = [
//   {
//     usernameOrAddress: 'wowowoooo'
//   }
// ]
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads')
// const HttpsProxyAgent = require("https-proxy-agent")

// const httpsAgent = new HttpsProxyAgent(`http://127.0.0.1:10802`)
// const axios = _axios.create({proxy: false, httpsAgent})

// 随机生成固定长度的16进制字符串
const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

// 点赞类型
// 单个画廊多种类型点赞，也只计一种的分数，所以此处取其中一种类型点赞即可
const type = 'MINDBLOWN' // 'FIRE', 'LAUGH', 'MINDBLOWN', 'LIKE'

;(async () => {
  const getGalleries = (usernameOrAddress) => {
    const res = axios({
      method: 'get',
      url: `https://api.deca.art/trpc/gallery.previews?batch=1&input=%7B%220%22%3A%7B%22json%22%3A%7B%22usernameOrAddress%22%3A%22${usernameOrAddress}%22%7D%7D%7D`,
      headers: {
        authority: 'deca.art',
        accept: '*/*',
        'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
        'cache-control': 'no-cache',
        'content-type': 'application/json',
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

  const addEmoji = (cookie, type, galleryId, deviceId) => {
    const res = axios({
      method: 'post',
      url: `https://deca.art/api/web/gallery/${galleryId}/reactions`,
      data: {
        json: {
          deviceId: deviceId,
          recaptchaToken: null,
          type: type
        },
        meta: {
          values: {
            recaptchaToken: ["undefined"]
          }
        }
      },
      headers: {
        'path': `/api/web/gallery/${galleryId}/reactions`,
        'authority': 'deca.art',
        accept: '*/*',
        'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
        'cache-control': 'no-cache',
        'content-type': 'application/json',
        cookie: cookie,
        origin: 'https://deca.art',
        pragma: 'no-cache',
        referer: 'https://deca.art/Decaone/gallery',
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
  const view = (cookie, galleryId, deviceId) => {
    const res = axios({
      method: 'post',
      url: `https://deca.art/api/web/gallery/${galleryId}/view`,
      data: {
        json: {
          deviceId: deviceId,
          recaptchaToken: null
        },
        meta: {
          values: {
            recaptchaToken: ["undefined"]
          }
        }
      },
      headers: {
        authority: 'deca.art',
        accept: '*/*',
        'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
        'cache-control': 'no-cache',
        'content-type': 'application/json',
        cookie: cookie,
        origin: 'https://deca.art',
        pragma: 'no-cache',
        referer: 'https://deca.art/0xDoge/gallery2',
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


  const addLike = async(cookie, c, username) => {
    for(let u = 0; u < usernameOrAddress.length; u++) {
      if (username === usernameOrAddress[u].usernameOrAddress) {
        continue
      }
      const galleryInfo = await getGalleries(usernameOrAddress[u].usernameOrAddress)
      if (galleryInfo && galleryInfo.data) {
        const info = galleryInfo.data
        const galleries = info[0].result.data.json.previews
        const deviceId = genRanHex(32)
        for (let i = 0; i < galleries.length; i++) {
          setTimeout(async() => {
            if (i < 31) {
              await view(cookie, galleries[i].id, deviceId)
            }
            const resStatus = await addEmoji(cookie, type, galleries[i].id, deviceId).catch(e => console.log('error-------',e))
            if (resStatus && resStatus.data && resStatus.data.json.message === 'Ok') {
              console.log(`🚀 ~ file: index.js ~ line 86 ~ main ~ 第${c + 1}个用户点击第${u + 1}个用户的第${i + 1}个作品，点赞方式${type}点赞完成`)
            }
          }, 3000 * i)
        }
      }
    }
  }

  if (isMainThread) { // 主线程
    const threadCount = decaList.length // 每个点赞用户一个线程
    const threads = new Set()
    console.log(`-----------Running with ${threadCount} threads---------`)
  
    for (let i = 0; i < threadCount; i++) {
      threads.add(new Worker(__filename, { workerData: { cookie: decaList[i].cookie, usernameOrAddress: decaList[i].usernameOrAddress, index: i }}))
    }
  
    for (let worker of threads) {
      worker.on('error', (err) => { throw err })
      worker.on('exit', () => {
        threads.delete(worker)
        console.log(`---------Thread exiting, ${threads.size} running--------`)
        if (threads.size === 0) {
          console.log('--------任务完成-------')
        }
      })

      worker.on('message', (msg) => {
        // primes.push(...msg)
      })
    }
  } else { // 子线程
    addLike(workerData.cookie, workerData.index, workerData.usernameOrAddress)
    // parentPort.postMessage(data)
  }
})()
