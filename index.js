const axios = require('axios')
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads')
// const HttpsProxyAgent = require("https-proxy-agent")

// const httpsAgent = new HttpsProxyAgent(`http://127.0.0.1:10809`)
// const axios = _axios.create({proxy: false, httpsAgent})

// 随机生成固定长度的16进制字符串
const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

;(async () => {
  // 点赞类型
  // 单个画廊多种类型点赞，也只计一种的分数，所以此处取其中一种类型点赞即可
  const types = ['FIRE'] // 'FIRE', 'LAUGH', 'MINDBLOWN', 'LIKE'
  // 点赞用户凭证
  const cookies = [
    {
      usernameOrAddress: 'candyjayc',
      cookie: '__Host-next-auth.csrf-token=40fb152f00b4cddb86196c4c8abcb011ad8dddc7f4b16e70b363598e6214e7cd%7C8e27598a26556a9376cd509dfb2b51724a75da962cede98660a34edaa9bb3723; botd-request-id=01GB1QXQRBXBXSR1S8WWS0HBNC; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art%2Fapp; _hp2_ses_props.3997967461=%7B%22ts%22%3A1661227249042%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fdxp%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%224618933511351623%22%2C%22pageviewId%22%3A%223465933359531812%22%2C%22sessionId%22%3A%225980823719525095%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..Hnb-i31GQvrfUX3X.s83L0WdkQKk2LTZ8Y-uLOZp0G11y1_3K3plXEWE_wX7goocqNcnCzXdc31O8J15Wki4n8arP41FYc20zDdj05P2bOd0bMj-5p3Dx2eIHricxldhJ1yip2PGW7orQGAGfhGwPOo4BI5rgSVjmj3cdBEjwFGreM3QSSFTSsWdCGIQ.QmNxIAF4BpAWnsW5qjomSg'
    },
    {
      usernameOrAddress: '111219',
      cookie: '_hp2_ses_props.3997967461=%7B%22ts%22%3A1661223789205%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fdxp%22%7D; __Host-next-auth.csrf-token=5c19b64eabb56287be2ffcaa30fa95d5e7c7fe626abb874052a24bfa38da6aa7%7C8a85288ef8cc2090037e4a6c9bded73f34a10bce746fb2b02a54391e2e046aaf; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_id.3997967461=%7B%22userId%22%3A%222082741876615336%22%2C%22pageviewId%22%3A%225899937872378533%22%2C%22sessionId%22%3A%226860315679376362%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..DQM3Uhxr6WJ4B23i.AcFx91EbEEsy2ZDbRaKyOJiT8yLfF4nuJ5HirS_QHifrsFRM5Pp1ILEvK-gRUcOItdPj-oqaMEX8R0U5v8W24jlBg0ok6utemgrQaMQnYWje3RPsIAPDj1qIkUZVokHSXiOmX8nKmG-_d3kpa1RM5482t8zIVoaA4s6alwoZAzY.iCn06yautPusKjRefQwJyw'
    },
    {
      usernameOrAddress: 'battle',
      cookie: '__Host-next-auth.csrf-token=c5dfef5fdbd0520b4f4538be45ddd912f6c54fd3aebe7a93941f46c1d6948fe6%7Cfe38ca4202bd8c5b8920195a3cd9045480cba46acf2b4927866c1fba9a04397f; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_ses_props.3997967461=%7B%22ts%22%3A1661223788308%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fdxp%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%225056116719419819%22%2C%22pageviewId%22%3A%227110146101138612%22%2C%22sessionId%22%3A%223382170386689188%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..v5RqSvE3MLVi3UtD.enqoyOgPp1BlB6RTKnO_WL7eWycMc6GAV82PP9BxQNi6TGEhu6dQL10uLeimfv3W-gMsMZA3UVzqGVvg5KF68AAU3Yko963xj6HCcLSpRzdKv85mKms0yWemBykFdbnKNRfqR2wOvsMb4oH0ZfX-EZvKQwHL_0eGYIMq9-0yGKM.2yEBdZAH8ry2_q0QHO1Z_w'
    },
    {
      usernameOrAddress: 'coinclaim',
      cookie: '__Host-next-auth.csrf-token=b509cca210a8e7ecc5d17d5bb4141e58fd775409899be1a3d4feca1a3ade956e%7C8fb4659ba19a1a9bc89ea96f690b6003c008ad9aa5f6c60bf34ebbbd7eace889; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_ses_props.3997967461=%7B%22ts%22%3A1661227112060%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fdxp%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%228490018211348393%22%2C%22pageviewId%22%3A%22429030349436536%22%2C%22sessionId%22%3A%225336594001627819%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..IY3GyLKfeyHU0kRv.QL7wj2Pq_1oJp7Y9riVNMLnziKRCXKemIIbxlJwWZiZFdYCVtpUFnOFdSojzAiHHPpFAgpZQYt0rQ7jw07AybEyNW1pBEHp8x7G1KR-ew3Ek4RxGIQihls8w3TJc1HDQgyiNr42WI6Cju21hNBSpE1w8v7r_LCkBvmAGAzLiMnw.EqgJ6XpLRcN47bHuqQ_lbw'
    },
  ]
  // 被点赞用户username
  const usernameOrAddress = [
    {
      usernameOrAddress: 'candyjayc',
      cookie: '__Host-next-auth.csrf-token=40fb152f00b4cddb86196c4c8abcb011ad8dddc7f4b16e70b363598e6214e7cd%7C8e27598a26556a9376cd509dfb2b51724a75da962cede98660a34edaa9bb3723; botd-request-id=01GB1QXQRBXBXSR1S8WWS0HBNC; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art%2Fapp; _hp2_ses_props.3997967461=%7B%22ts%22%3A1661227249042%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fdxp%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%224618933511351623%22%2C%22pageviewId%22%3A%223465933359531812%22%2C%22sessionId%22%3A%225980823719525095%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..Hnb-i31GQvrfUX3X.s83L0WdkQKk2LTZ8Y-uLOZp0G11y1_3K3plXEWE_wX7goocqNcnCzXdc31O8J15Wki4n8arP41FYc20zDdj05P2bOd0bMj-5p3Dx2eIHricxldhJ1yip2PGW7orQGAGfhGwPOo4BI5rgSVjmj3cdBEjwFGreM3QSSFTSsWdCGIQ.QmNxIAF4BpAWnsW5qjomSg'
    },
    {
      usernameOrAddress: '111219',
      cookie: '_hp2_ses_props.3997967461=%7B%22ts%22%3A1661223789205%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fdxp%22%7D; __Host-next-auth.csrf-token=5c19b64eabb56287be2ffcaa30fa95d5e7c7fe626abb874052a24bfa38da6aa7%7C8a85288ef8cc2090037e4a6c9bded73f34a10bce746fb2b02a54391e2e046aaf; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_id.3997967461=%7B%22userId%22%3A%222082741876615336%22%2C%22pageviewId%22%3A%225899937872378533%22%2C%22sessionId%22%3A%226860315679376362%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..DQM3Uhxr6WJ4B23i.AcFx91EbEEsy2ZDbRaKyOJiT8yLfF4nuJ5HirS_QHifrsFRM5Pp1ILEvK-gRUcOItdPj-oqaMEX8R0U5v8W24jlBg0ok6utemgrQaMQnYWje3RPsIAPDj1qIkUZVokHSXiOmX8nKmG-_d3kpa1RM5482t8zIVoaA4s6alwoZAzY.iCn06yautPusKjRefQwJyw'
    },
    {
      usernameOrAddress: 'battle',
      cookie: '__Host-next-auth.csrf-token=c5dfef5fdbd0520b4f4538be45ddd912f6c54fd3aebe7a93941f46c1d6948fe6%7Cfe38ca4202bd8c5b8920195a3cd9045480cba46acf2b4927866c1fba9a04397f; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_ses_props.3997967461=%7B%22ts%22%3A1661223788308%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fdxp%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%225056116719419819%22%2C%22pageviewId%22%3A%227110146101138612%22%2C%22sessionId%22%3A%223382170386689188%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..v5RqSvE3MLVi3UtD.enqoyOgPp1BlB6RTKnO_WL7eWycMc6GAV82PP9BxQNi6TGEhu6dQL10uLeimfv3W-gMsMZA3UVzqGVvg5KF68AAU3Yko963xj6HCcLSpRzdKv85mKms0yWemBykFdbnKNRfqR2wOvsMb4oH0ZfX-EZvKQwHL_0eGYIMq9-0yGKM.2yEBdZAH8ry2_q0QHO1Z_w'
    },
    {
      usernameOrAddress: 'coinclaim',
      cookie: '__Host-next-auth.csrf-token=b509cca210a8e7ecc5d17d5bb4141e58fd775409899be1a3d4feca1a3ade956e%7C8fb4659ba19a1a9bc89ea96f690b6003c008ad9aa5f6c60bf34ebbbd7eace889; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_ses_props.3997967461=%7B%22ts%22%3A1661227112060%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fdxp%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%228490018211348393%22%2C%22pageviewId%22%3A%22429030349436536%22%2C%22sessionId%22%3A%225336594001627819%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..IY3GyLKfeyHU0kRv.QL7wj2Pq_1oJp7Y9riVNMLnziKRCXKemIIbxlJwWZiZFdYCVtpUFnOFdSojzAiHHPpFAgpZQYt0rQ7jw07AybEyNW1pBEHp8x7G1KR-ew3Ek4RxGIQihls8w3TJc1HDQgyiNr42WI6Cju21hNBSpE1w8v7r_LCkBvmAGAzLiMnw.EqgJ6XpLRcN47bHuqQ_lbw'
    },
  ]

  const getGalleries = (usernameOrAddress, cookie) => {
    const res = axios({
      method: 'get',
      url: `https://api.deca.art/trpc/gallery.previews?batch=1&input=%7B%220%22%3A%7B%22json%22%3A%7B%22usernameOrAddress%22%3A%22${usernameOrAddress}%22%7D%7D%7D`,
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
      const galleryInfo = await getGalleries(usernameOrAddress[u].usernameOrAddress, cookie)
      if (galleryInfo && galleryInfo.data) {
        const info = galleryInfo.data
        const galleries = info[0].result.data.json
        const deviceId = genRanHex(32)
        for (let i = 0; i < galleries.length; i++) {
          for (let j = 0; j < types.length; j++) {
            if (i < 31) {
              await view(cookie, galleries[i].id, deviceId)
            }
            const resStatus = await addEmoji(cookie, types[j], galleries[i].id, deviceId).catch(e => console.log('error-------',e))
            if (resStatus && resStatus.data && resStatus.data.json.message === 'Ok') {
              console.log(`🚀 ~ file: index.js ~ line 86 ~ main ~ 第${c + 1}个用户点击第${u + 1}个用户的第${i + 1}个作品，点赞方式${types[j]}点赞完成`)
            }
          }
        }
      }
    }
  }

  if (isMainThread) { // 主线程
    const threadCount = cookies.length // 每个点赞用户一个线程
    const threads = new Set()
    console.log(`-----------Running with ${threadCount} threads---------`)
  
    for (let i = 0; i < threadCount; i++) {
      threads.add(new Worker(__filename, { workerData: { cookie: cookies[i].cookie, usernameOrAddress: cookies[i].usernameOrAddress, index: i }}))
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
