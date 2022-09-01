const axios = require('axios');
const decaList = require('./user')
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

;(async () => {
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
  const deleteGallery = (galleryId, cookie) => {
    const res = axios({
      method: 'post',
      url: `https://deca.art/api/graphql`,
      data: {
        query:
          '\n    mutation DeleteGallery($galleryId: ID!) {\n  deleteGallery(galleryId: $galleryId)\n}\n    ',
        variables: {
          galleryId: galleryId,
        },
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

  const deleteFunc = async(cookie, usernameOrAddress, index) => {
    const galleryInfo = await getGalleries(usernameOrAddress, cookie).catch(err => {})
    if (galleryInfo && galleryInfo.data) {
      const galleries = galleryInfo.data[0].result.data.json.previews
      for (let i = 0; i < galleries.length; i++) {
        const res = await deleteGallery(galleries[i].id, cookie)
        if (res.data && res.data.data.deleteGallery) {
          console.log(`第 ${ index + 1} 个用户已删除 第 ${i + 1} 个画廊`)
        }
      }
    }
  }



  if (isMainThread) { // 主线程
    const threadCount = decaList.length // 每个点赞用户一个线程
    const threads = new Set()
    console.log(`----------Running with ${threadCount} threads---------`)
  
    for (let i = 0; i < threadCount; i++) {
      threads.add(new Worker(__filename, { workerData: { cookie: decaList[i].cookie, usernameOrAddress: decaList[i].usernameOrAddress, index: i }}))
    }
  
    for (let worker of threads) {
      worker.on('error', (err) => { throw err })
      worker.on('exit', () => {
        threads.delete(worker)
        console.log(`------------Thread exiting, ${threads.size} running-------------`)
        if (threads.size === 0) {
          console.log('--------任务完成-------')
        }
      })

      worker.on('message', (msg) => {
        // primes.push(...msg)
      })
    }
  } else { // 子线程
    deleteFunc(workerData.cookie, workerData.usernameOrAddress, workerData.index)
    // parentPort.postMessage(data)
  }

})()

