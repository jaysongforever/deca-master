const axios = require('axios');
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

const decaList = [
  {
    usernameOrAddress: 'Decaone',
    cookie: '__Host-next-auth.csrf-token=034546af51db00467d45836ca869f207582e0a6be81f8c242b4898059463131f%7C0911c475df0ac693d67ac685b8df98db0b73bc9ea0452a0725fcf6d01f3186b4; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_ses_props.3997967461=%7B%22ts%22%3A1660871513824%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fdxp%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%227991602793304144%22%2C%22pageviewId%22%3A%226625449587465701%22%2C%22sessionId%22%3A%225582839444208281%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..TazKqDG7O8ldmXvY.QsVDGiWjXkiUtWNeC8CKcJzvNwO3o7CAwjUvYPCI_x8HDMEuZwHKULsq41lUrlIXCpabYVj_UHUSJHQ-mZl1C7WcHAlgM0iqnzVJQ6uXFqpDoaeLdLDy0PNOHBPxxqYvIBLjUJQL_bi3vSr8IviB5RRPEJH9Va_DozvKj8Oy7XI.YbIj3QaqhNHk8ujjk1KCvw'
  },
  {
    usernameOrAddress: 'camera',
    cookie: '_hp2_ses_props.3997967461=%7B%22ts%22%3A1660871555427%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fdxp%22%7D; __Host-next-auth.csrf-token=9304d833336f709c45573326fa8040b5aed73d5764b67dda8654d9bd356cdfe8%7Cbeb203f1052f9db1195d5c5b4755f90bf0db72ce304e672a93123b27ce915178; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_id.3997967461=%7B%22userId%22%3A%222225061314047190%22%2C%22pageviewId%22%3A%228499636757664270%22%2C%22sessionId%22%3A%226011343964860716%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..B6EdjuLpOjR8kFvb.KzYmRr5mYF9Bs3Yo0TFtLwcFXqGj8RJuzMEr_NhEAJBQ-5MwIO5eplb4MUTgajKrczwiqR7tD_vbv9sYa6hi0zwkiQdX5kkWgPVs0sCfLYSCU2u7Lksdsrl0gtrpkiqd5-nI_mEg5252-q30q5sH50acv0E1cWhsnBDUgnKhPLfu1DBGPaQpy58YmiR7YbAD8k0q6nlODw49_cd6V4Hn0yZ6viWk2pmy.dAqLvQOaw7-kvtXZGYdysQ'
  },
  {
    usernameOrAddress: 'Funny',
    cookie: '_hp2_ses_props.3997967461=%7B%22ts%22%3A1660871596873%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fdxp%22%7D; __Host-next-auth.csrf-token=f0641c97ec9ad950beb92529af3092f2281962b76b438bdb830fe3dfe5ae5095%7C3b78bade9e874502533d47a6e4ddd938c9b5c3571255b066c06c26cd34e8162b; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_id.3997967461=%7B%22userId%22%3A%224270991705080896%22%2C%22pageviewId%22%3A%224050750827511534%22%2C%22sessionId%22%3A%228318886172423427%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..l-9K8ZQSi0oxwjnM.LnJnGWMlpd8mD-8F6y3c-guwDiMz9l3WZa43uP0DfiTuYHEhueKHvhTvKoEJMonsAmCFPwMkDmqaDRLAOxrIRDKExxStTZuNv8EQo9kwqsjpbE7BTNF1fnxbTcZUPIfzbOFC6rPE2IwcoNMB5k9f9wurnVR6Ij1ZSIHWTtb0Xq7E.LBl-6kOaNRO8YRQvf6Yjag'
  },
  {
    usernameOrAddress: '0x365',
    cookie: '__Host-next-auth.csrf-token=76953ad147b0192aa9c7ac318ff15609db2c91733b30cb7e487043a96068d940%7C986ad4ecdbb88f785d6bc736e24cc1830eab531cccbe383e69bc7c76acfd316a; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..3vIBHUrsNymQv4eF.CyN3ufoLzLyebJUQVsO5KxM1HqwYWQlAkgkqPe7lP1ryWJZxaJO1qcRobWl5PX-6Jodr7xBhq1X4XME10jj09Wnzh-M6m1pn8vCtrrJPolISml8q2N2ql4sgob6rsTft94eH5bH-G3nmp8vPS20jqALEb3IwTP7R0HRF8tNItjQ.eifJtq8Hu_zKNwRyVlwVsg; _hp2_ses_props.3997967461=%7B%22ts%22%3A1660872406928%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fdxp%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%227942003470137650%22%2C%22pageviewId%22%3A%227931367406271008%22%2C%22sessionId%22%3A%227390481400009836%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D'
  },
  {
    usernameOrAddress: 'pppost',
    cookie: '__Host-next-auth.csrf-token=ce2e7e8b65d3f54c1b3a8ca85e199a04ae9b07cc6f0f5be3d7d76bffaf1c2fbb%7C1bec58b113bb4e189bdec048a3dc42c30a7854d3fd1dc2a75d3ec5991600f529; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_ses_props.3997967461=%7B%22ts%22%3A1660872466866%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fdxp%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%223567658953787451%22%2C%22pageviewId%22%3A%224854453498799927%22%2C%22sessionId%22%3A%224873217587266946%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..5nE8pe0nOUd81xj2.jCVJrFLcXN4W1rFVxsCAg3Nat1wrrIgttLjBxmYSzX_A1rjrOtoSAy1YQm7hLxacOj5xfXeU42TfFWukfzyI2zoLomEBuT9W0wKXQp6-9I6cWKO_EcD9Uqc6OoSfkN7-0ExHju_BucSTWMBvwulP0Sl5YJttOd9Law57XZhL5ko.2yJhfEKIbchjQGofnN8fCA'
  },
  {
    usernameOrAddress: 'trable',
    cookie: '__Host-next-auth.csrf-token=63bc2bac75cf3b46b7ebb8182315d3b32a9251fd7077a574f0c26f0ddba5364a%7Cf6e8cb4cc4a97dc7d88672347b2c3b8ae4ce4c4856aca06bb112856ac5f505f8; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_ses_props.3997967461=%7B%22ts%22%3A1660872475400%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fdxp%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%223795055323267207%22%2C%22pageviewId%22%3A%225102828358874028%22%2C%22sessionId%22%3A%221383521865340516%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..ZM39B0Uysyf6OOYU.95ksF-yoBaeYBdqiFF8EeL6a1WmpOUugws6bPUzm7y7IOr15E5JmWY_bSps02AVQPvgDKVyL-a6yDrQZtuqDHogbaRFVNj_h2Mo708KsFhA7K4SyV02iKuJj6itTCyWuEfFXOklUqhd9K1vuDT2mFh5cYWEeN1VDgrDtnUQbChI.WyQkHvVVxLqPUdMTjFh4vQ'
  },
  {
    usernameOrAddress: 'object',
    cookie: '__Host-next-auth.csrf-token=8ff778e99bf8c8aff9d14596a568bcfbfbc7bd789fe16b2275865318eb3764a5%7C667d4158931099bbdeaa79ece34134f1f9ca816ac1d7a1f0fda837e9128f1a3f; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_ses_props.3997967461=%7B%22ts%22%3A1660872620326%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fdxp%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%221132902069871330%22%2C%22pageviewId%22%3A%226975384833648071%22%2C%22sessionId%22%3A%227803420850193006%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..kjDhW7KoF3PX2SD9.Jer0f4zGhnTVOM9B7h8kjh_UtDNKcHWCvdmVXtILlvww-ek74paE1yHQDKD3t_SuJ844kEbiQvChDGZcjmY7DNih0AsVlhMTm34m8yzQ5yliVBHFud0pc6l6lTGMOrpJHq5dGP5swrLEWWm-qiFFcZRsetMyDoUGpOZjvFHyJ_U.qIK4j9-zvZXj1WdSAGfqlQ'
  },
  {
    usernameOrAddress: 'human',
    cookie: '__Host-next-auth.csrf-token=6d92543c7e9dbff6674cdf177d6b873fa1d810d0582fbbb2ea68fa970bd3bad6%7Cdb28642dfc97efa34f3b34341b5da052f8c35b5ea8c288603f2b83acf25d14fd; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_ses_props.3997967461=%7B%22ts%22%3A1660872661399%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fdxp%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%225686357603046112%22%2C%22pageviewId%22%3A%223466109881039515%22%2C%22sessionId%22%3A%221747084171834445%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..DRX_yoIpN4jFrnyU.7oRtOmkC8VK4o926uCcW4hh5aXUY0aelv3dRRRPHirVZHJc9I4uGdeVjHghgqG0YvDmmodToGXNgUaEtJF_ahZ152k_CflppdQdb2qFU3smUQtirCfpwY1JJ_4rLfhf1o47ISqz0Xuwim6FQAWAlB7SErF7jZ2FrBsWM-1UMWyE.agqjkoUUF79Cd74mQj0eJA'
  },
  {
    usernameOrAddress: 'a16za',
    cookie: '__Host-next-auth.csrf-token=070a2725a67e1fe2668b1e3e3352247bb9cf94b47a1d9cc2bbefb79dcf56d020%7C5ce4e4ab5a1bfb0e4a7fcc52a386bc9848c1cedf085b898cf5a767b58c1e6599; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_ses_props.3997967461=%7B%22ts%22%3A1660872702816%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fdxp%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%228823062517353748%22%2C%22pageviewId%22%3A%227784727795088056%22%2C%22sessionId%22%3A%223581077426106680%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..XRglM1QFaA50Dyph.suuUmbS-Sn-V8MgO2-dbaDbjv0b5kG5jfUVNPEaQgHlCt8KT9Pjk4YuyomWUaxsOtQSbwuknAVIRYUuboHhDIOCKQSVjA-bIsunlA4xjW3uDf5t4N_Wutr3sLPLGk1RWXCbxsS1EUhmTBsSuqiIafkNVLsSKHNjgo4FT4oVcY6c.vzqfFQLf2dpTRYasJlnPpA'
  },
  {
    usernameOrAddress: 'spots',
    cookie: '__Host-next-auth.csrf-token=ea708414ba209dcb49ced1583851d6d32b57057709f37a2046c7612a5b46ec31%7Cbc88a0f3b2a38e018b9234efa1fcfb0f54f2e3381b6d3a630afb6b88f05f11f9; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_ses_props.3997967461=%7B%22ts%22%3A1660872785675%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fdxp%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%221842369720303879%22%2C%22pageviewId%22%3A%222193195540599905%22%2C%22sessionId%22%3A%227853768967824700%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..KeNltTLJ11Db9R0Y.eVzOSN0j98xxCn6qG-XzcGbpNqSpeKVX4qxO1_HHRE_UyAkaiCA2kV-JewClqC5vxeo6EVecJjCW4rWtJwlpLLrGcxJ500iKNQjWEWzFsoRB7Og2BOg6rryms64-XKQuzb9M_e-_TBSRAmtyneZb3wVOCDQjIoxfzZdYJPbYlS0.1Acedo9cFyQ_Paxfqxv0bw'
  },
  {
    usernameOrAddress: 'Dragon55',
    cookie: '_hp2_ses_props.3997967461=%7B%22ts%22%3A1660871677483%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fdxp%22%7D; __Host-next-auth.csrf-token=11d12ffb5eaa0d6a31021241f00d0543b399e28fa907dc61766e60d96cff7824%7C23ff09622aff4f0ba4885abf2372469dd4a2cb713b70de764f21a30fb9b0165e; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_id.3997967461=%7B%22userId%22%3A%222886270944967815%22%2C%22pageviewId%22%3A%228813818334505560%22%2C%22sessionId%22%3A%224317458963234533%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..okIwZKYMrPZOySQ6.GjiTAOF8Y6yu5vscI85U_HC1gCGheCbM2bRaYqt1MTHCKWdhcUCkbBEzEWUSaiw70N1_uNu7lX4BUmNJ5QYyx2QGIFrwOtRWFXL1KOokpebQSRsdaswFLjZAj9B5PrpBtzgtlu8nTzNQlGKNcmOOHNBrRPJCNqgypKbm17MAodY.ZtkLXhuCG8q3S9QcSqOFog'
  },
  {
    usernameOrAddress: 'giveme',
    cookie: '_hp2_ses_props.3997967461=%7B%22ts%22%3A1660871681565%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fdxp%22%7D; __Host-next-auth.csrf-token=423a1a50936c0397fe7d10eb763f79a616c6529c446f2586d63e45bed933facb%7Cb8ec5054cdba4a2e2b4663854f9d274f89dfafb8a185e60639e31a84fd186000; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_id.3997967461=%7B%22userId%22%3A%225921330821054931%22%2C%22pageviewId%22%3A%22224220919050254%22%2C%22sessionId%22%3A%225989424971029407%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..c5sijUjFn-23Hdnn.yxW6-2XH5ekytXYDc3P_EG4KfLmypnAt6w4wD7ftisnnQh8b4LsZiB9NR6TVY6IeEw4-zG__RJRHfU251OKQUOnGyeeRmCV0Ws1jsByeLyjgc822nU9kp7o34gFw5GWDbQF2GETRo9rOQNl7MtCY8wh002EIAfuoGsO2OWJRZa8.g9ezzbYu9Z2t66yVRWB9rQ'
  },
  {
    usernameOrAddress: 'sushiswap',
    cookie: '__Host-next-auth.csrf-token=ac415bde2fac63753b074f8ae6e1d74d220d729b100dab255e1cc26b814f44b0%7Cd98bef8eeaddc849154d434d5f5575c624525144dd8cb7934177f4eb4ea1eb16; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_ses_props.3997967461=%7B%22ts%22%3A1660872899582%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fdxp%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%223791754165537788%22%2C%22pageviewId%22%3A%223589043496768173%22%2C%22sessionId%22%3A%226617758001761483%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..Av88iQvQY8fYag2V.5Jbyi9i_XQijCyr-DLJVJmwhUoakzZpcf4rVNh2A1wQeG7bGRSCVkezSmhN3Zmc4EEdpldshl_c-VJy-wahDRHKaPzhMyGER75LWjpMtGDc_WxzC0PPRrkymT_DfBTH4VYBNlh8U2PVLwT8kizI0p4EbZ2HQIzmW2YQOUTfgO64.WNCA8Fds4qyDOQcoeLsHHw'
  }
]

;(async () => {
  const getGalleries = (usernameOrAddress, cookie) => {
    const res = axios({
      method: 'post',
      url: `https://deca.art/api/graphql`,
      data: {
        query:
          '\n    query Galleries($usernameOrAddress: String!) {\n  galleries(usernameOrAddress: $usernameOrAddress) {\n    ...FullGallery\n  }\n}\n    \n    fragment FullGallery on Gallery {\n  id\n  name\n  renderMode\n  showListings\n  showcase\n  coverNft {\n    ...FullBareAsset\n  }\n  sections {\n    ...FullSection\n  }\n}\n    \n\n    fragment FullBareAsset on BareAsset {\n  id\n  provider\n  contract\n  tokenId\n  mediaUrl\n  previewStorageKey\n  previewMimeType\n  previewAspectRatio\n  storageKey\n  mimeType\n  tokenUrl\n  name\n  multimediaUrl\n  aspectRatio\n  metadata\n}\n    \n\n    fragment FullSection on GallerySection {\n  id\n  position\n  simpleItems {\n    id\n    sectionId\n    asset {\n      ...FullBareAsset\n    }\n    position\n  }\n  simpleTitle\n  freestyleItems {\n    ...FullFreestyleLayoutItem\n  }\n  freestyleRows\n  freestyleColumns\n}\n    \n\n    fragment FullFreestyleLayoutItem on FreestyleLayoutItem {\n  id\n  sectionId\n  startRow\n  endRow\n  startColumn\n  endColumn\n  properties {\n    ...FullFreestyleProperties\n  }\n  asset {\n    ...FullBareAsset\n  }\n  text\n}\n    \n\n    fragment FullFreestyleProperties on FreestyleProperties {\n  objectFit\n  backgroundColor\n  zIndex\n  textColor\n  fontSize\n  relativeFontSize\n  fontName\n}\n    ',
        variables: {
          usernameOrAddress: usernameOrAddress
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
      const info = galleryInfo.data
      const galleries = info.data.galleries
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

