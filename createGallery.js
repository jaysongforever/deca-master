const axios = require('axios')
const decaList = require('./user')
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads')
const genRanHex = (size, hex) => [...Array(size)].map(() => Math.floor(Math.random() * hex).toString(hex)).join('');
// const HttpsProxyAgent = require("https-proxy-agent")

// const httpsAgent = new HttpsProxyAgent(`http://127.0.0.1:10802`)
// const axios = _axios.create({proxy: false, httpsAgent})

const galleryCount = 10;

;(async () => {
  const getNfts = (cookie) => {
    const res = axios({
      method: 'post',
      url: `https://deca.art/api/graphql`,
      data: {
        query: '\n    query SearchNfts($searchSpace: SearchSpace!, $query: String!, $contract: String, $tokenId: String, $address: String, $showEth: Boolean!, $showTez: Boolean!, $showBtc: Boolean!, $showPoly: Boolean!, $showSol: Boolean!) {\n  searchNfts(\n    searchSpace: $searchSpace\n    query: $query\n    contract: $contract\n    tokenId: $tokenId\n    address: $address\n    showEth: $showEth\n    showTez: $showTez\n    showBtc: $showBtc\n    showPoly: $showPoly\n    showSol: $showSol\n  ) {\n    id\n    tokenId\n    contract\n    provider\n    mediaUrl\n    previewStorageKey\n    name\n  }\n}\n    ',
        variables: {
          query: "",
          searchSpace: "MINE",
          showBtc: true,
          showEth: true,
          showPoly: false,
          showSol: true,
          showTez: true
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
  const createGallery = (cookie, sectionId, galleryId, nftInfo = {}) => {
    const res = axios({
      method: 'post',
      url: `https://deca.art/api/graphql`,
      data: {
        query: '\n    mutation UpdateGallery($galleryId: ID!, $renderMode: RenderMode!, $showListings: Boolean!, $initialSimpleLayout: SimpleLayoutInput, $simpleLayout: SimpleLayoutInput, $freestyleLayout: FreestyleLayoutInput) {\n  updateGallery(\n    galleryId: $galleryId\n    renderMode: $renderMode\n    showListings: $showListings\n    initialSimpleLayout: $initialSimpleLayout\n    simpleLayout: $simpleLayout\n    freestyleLayout: $freestyleLayout\n  )\n}\n    ',
        variables: {
          freestyleLayout: {
            items: [{
              content: {
                nft: {
                  contract: nftInfo.contract,
                  id: nftInfo.id,
                  tokenId: nftInfo.tokenId
                },
                properties: {
                  zIndex: 10
                }
              },
              endColumn: Math.ceil(Math.random() * 8) + 27,
              endRow: Math.ceil(Math.random() * 8) + 27,
              id: sectionId,//
              sectionId: sectionId,//
              startColumn: Math.ceil(Math.random() * 7),
              startRow: Math.ceil(Math.random() * 7)
            }],
            numColumns: 60,
            numRows: 60
          },
          galleryId: galleryId,
          renderMode: 'INTERACTIVE',
          showListings: false
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


  const getGalleryId = (cookie, name, usernameOrAddress, requestId) => {
    const res = axios({
      method: 'post',
      url: `https://deca.art/api/graphql`,
      data: {
        query: '\n    query Gallery($usernameOrAddress: String!, $name: String!, $requestId: String!) {\n  gallery(\n    usernameOrAddress: $usernameOrAddress\n    name: $name\n    requestId: $requestId\n  ) {\n    ...FullGallery\n    views\n  }\n}\n    \n    fragment FullGallery on Gallery {\n  id\n  name\n  renderMode\n  showListings\n  showcase\n  coverNft {\n    ...FullBareAsset\n  }\n  sections {\n    ...FullSection\n  }\n}\n    \n\n    fragment FullBareAsset on BareAsset {\n  id\n  provider\n  contract\n  tokenId\n  mediaUrl\n  previewStorageKey\n  previewMimeType\n  previewAspectRatio\n  storageKey\n  mimeType\n  tokenUrl\n  name\n  multimediaUrl\n  aspectRatio\n  metadata\n}\n    \n\n    fragment FullSection on GallerySection {\n  id\n  position\n  simpleItems {\n    id\n    sectionId\n    asset {\n      ...FullBareAsset\n    }\n    position\n  }\n  simpleTitle\n  freestyleItems {\n    ...FullFreestyleLayoutItem\n  }\n  freestyleRows\n  freestyleColumns\n}\n    \n\n    fragment FullFreestyleLayoutItem on FreestyleLayoutItem {\n  id\n  sectionId\n  startRow\n  endRow\n  startColumn\n  endColumn\n  properties {\n    ...FullFreestyleProperties\n  }\n  asset {\n    ...FullBareAsset\n  }\n  text\n}\n    \n\n    fragment FullFreestyleProperties on FreestyleProperties {\n  objectFit\n  backgroundColor\n  zIndex\n  textColor\n  fontSize\n  relativeFontSize\n  fontName\n}\n    ',
        variables: {
          name: name,
          usernameOrAddress: usernameOrAddress,
          requestId : requestId
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
  const generateGallery = (cookie) => {
    const res = axios({
      method: 'post',
      url: `https://deca.art/api/graphql`,
      data: {
        query: '\n    mutation CreateGallery($showcase: Boolean!, $layoutType: LayoutType!) {\n  createGallery(showcase: $showcase, layoutType: $layoutType) {\n    name\n  }\n}\n    ',
        variables: {
          layoutType: "FREESTYLE",
          showcase: true
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

  const create = async(cookie, usernameOrAddress, index) => {
    for(let i = 0; i < galleryCount; i++) {
      const res = await generateGallery(cookie)
      if (res && res.data && res.data.data.createGallery) {
        const galleryName = res.data.data.createGallery.name
        const requestId = genRanHex(13, 10) + '.' + genRanHex(6, 32)
        const resIdInfo = await getGalleryId(cookie, galleryName, usernameOrAddress, requestId).catch(e => console.log(e))
        if (resIdInfo && resIdInfo.data && resIdInfo.data.data.gallery) {
          const galleryId = resIdInfo.data.data.gallery.id
          const sectionsId = resIdInfo.data.data.gallery.sections[0].id
  
          const nfts = await getNfts(cookie)
          if (nfts && nfts.data && nfts.data.data.searchNfts) {
            const len = nfts.data.data.searchNfts.length
            const randomIndex = Math.floor(Math.random() * len)
            const firstNftInfo = nfts.data.data.searchNfts[randomIndex]
            const nftInfo = {
              contract: firstNftInfo.contract,
              id: firstNftInfo.id,
              tokenId: firstNftInfo.tokenId
            }
            
            const result = await createGallery(cookie, sectionsId, galleryId, nftInfo)
            if (result && result.data && result.data.data.updateGallery) {
              console.log(`???${index + 1}????????????--${galleryName}--????????????`)
            }
          }
        }
      }
    }
  }

  if (isMainThread) { // ?????????
    const threadCount = decaList.length // ??????????????????????????????
    const threads = new Set()
    console.log(`----------Running with ${threadCount} threads-------------`)
  
    for (let i = 0; i < threadCount; i++) {
      threads.add(new Worker(__filename, { workerData: { cookie: decaList[i].cookie, usernameOrAddress: decaList[i].usernameOrAddress, index: i }}))
    }
  
    for (let worker of threads) {
      worker.on('error', (err) => { throw err })
      worker.on('exit', () => {
        threads.delete(worker)
        console.log(`--------Thread exiting, ${threads.size} running----------`)
        if (threads.size === 0) {
          console.log('--------????????????-------')
        }
      })

      worker.on('message', (msg) => {
        // primes.push(...msg)
      })
    }
  } else { // ?????????
    create(workerData.cookie, workerData.usernameOrAddress, workerData.index)
    // parentPort.postMessage(data)
  }
})()
