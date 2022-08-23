const axios = require('axios')
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads')

// const decaList = [
//   {
//     usernameOrAddress: 'Decaone',
//     cookie: '__Host-next-auth.csrf-token=034546af51db00467d45836ca869f207582e0a6be81f8c242b4898059463131f%7C0911c475df0ac693d67ac685b8df98db0b73bc9ea0452a0725fcf6d01f3186b4; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_ses_props.3997967461=%7B%22ts%22%3A1660871513824%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fdxp%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%227991602793304144%22%2C%22pageviewId%22%3A%226625449587465701%22%2C%22sessionId%22%3A%225582839444208281%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..TazKqDG7O8ldmXvY.QsVDGiWjXkiUtWNeC8CKcJzvNwO3o7CAwjUvYPCI_x8HDMEuZwHKULsq41lUrlIXCpabYVj_UHUSJHQ-mZl1C7WcHAlgM0iqnzVJQ6uXFqpDoaeLdLDy0PNOHBPxxqYvIBLjUJQL_bi3vSr8IviB5RRPEJH9Va_DozvKj8Oy7XI.YbIj3QaqhNHk8ujjk1KCvw'
//   },
//   {
//     usernameOrAddress: 'camera',
//     cookie: '_hp2_ses_props.3997967461=%7B%22ts%22%3A1660871555427%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fdxp%22%7D; __Host-next-auth.csrf-token=9304d833336f709c45573326fa8040b5aed73d5764b67dda8654d9bd356cdfe8%7Cbeb203f1052f9db1195d5c5b4755f90bf0db72ce304e672a93123b27ce915178; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_id.3997967461=%7B%22userId%22%3A%222225061314047190%22%2C%22pageviewId%22%3A%228499636757664270%22%2C%22sessionId%22%3A%226011343964860716%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..B6EdjuLpOjR8kFvb.KzYmRr5mYF9Bs3Yo0TFtLwcFXqGj8RJuzMEr_NhEAJBQ-5MwIO5eplb4MUTgajKrczwiqR7tD_vbv9sYa6hi0zwkiQdX5kkWgPVs0sCfLYSCU2u7Lksdsrl0gtrpkiqd5-nI_mEg5252-q30q5sH50acv0E1cWhsnBDUgnKhPLfu1DBGPaQpy58YmiR7YbAD8k0q6nlODw49_cd6V4Hn0yZ6viWk2pmy.dAqLvQOaw7-kvtXZGYdysQ'
//   },
//   {
//     usernameOrAddress: 'Funny',
//     cookie: '_hp2_ses_props.3997967461=%7B%22ts%22%3A1660871596873%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fdxp%22%7D; __Host-next-auth.csrf-token=f0641c97ec9ad950beb92529af3092f2281962b76b438bdb830fe3dfe5ae5095%7C3b78bade9e874502533d47a6e4ddd938c9b5c3571255b066c06c26cd34e8162b; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_id.3997967461=%7B%22userId%22%3A%224270991705080896%22%2C%22pageviewId%22%3A%224050750827511534%22%2C%22sessionId%22%3A%228318886172423427%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..l-9K8ZQSi0oxwjnM.LnJnGWMlpd8mD-8F6y3c-guwDiMz9l3WZa43uP0DfiTuYHEhueKHvhTvKoEJMonsAmCFPwMkDmqaDRLAOxrIRDKExxStTZuNv8EQo9kwqsjpbE7BTNF1fnxbTcZUPIfzbOFC6rPE2IwcoNMB5k9f9wurnVR6Ij1ZSIHWTtb0Xq7E.LBl-6kOaNRO8YRQvf6Yjag'
//   },
//   {
//     usernameOrAddress: '0x365',
//     cookie: '__Host-next-auth.csrf-token=76953ad147b0192aa9c7ac318ff15609db2c91733b30cb7e487043a96068d940%7C986ad4ecdbb88f785d6bc736e24cc1830eab531cccbe383e69bc7c76acfd316a; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..3vIBHUrsNymQv4eF.CyN3ufoLzLyebJUQVsO5KxM1HqwYWQlAkgkqPe7lP1ryWJZxaJO1qcRobWl5PX-6Jodr7xBhq1X4XME10jj09Wnzh-M6m1pn8vCtrrJPolISml8q2N2ql4sgob6rsTft94eH5bH-G3nmp8vPS20jqALEb3IwTP7R0HRF8tNItjQ.eifJtq8Hu_zKNwRyVlwVsg; _hp2_ses_props.3997967461=%7B%22ts%22%3A1660872406928%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fdxp%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%227942003470137650%22%2C%22pageviewId%22%3A%227931367406271008%22%2C%22sessionId%22%3A%227390481400009836%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D'
//   },
//   {
//     usernameOrAddress: 'pppost',
//     cookie: '__Host-next-auth.csrf-token=ce2e7e8b65d3f54c1b3a8ca85e199a04ae9b07cc6f0f5be3d7d76bffaf1c2fbb%7C1bec58b113bb4e189bdec048a3dc42c30a7854d3fd1dc2a75d3ec5991600f529; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_ses_props.3997967461=%7B%22ts%22%3A1660872466866%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fdxp%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%223567658953787451%22%2C%22pageviewId%22%3A%224854453498799927%22%2C%22sessionId%22%3A%224873217587266946%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..5nE8pe0nOUd81xj2.jCVJrFLcXN4W1rFVxsCAg3Nat1wrrIgttLjBxmYSzX_A1rjrOtoSAy1YQm7hLxacOj5xfXeU42TfFWukfzyI2zoLomEBuT9W0wKXQp6-9I6cWKO_EcD9Uqc6OoSfkN7-0ExHju_BucSTWMBvwulP0Sl5YJttOd9Law57XZhL5ko.2yJhfEKIbchjQGofnN8fCA'
//   },
//   {
//     usernameOrAddress: 'trable',
//     cookie: '__Host-next-auth.csrf-token=63bc2bac75cf3b46b7ebb8182315d3b32a9251fd7077a574f0c26f0ddba5364a%7Cf6e8cb4cc4a97dc7d88672347b2c3b8ae4ce4c4856aca06bb112856ac5f505f8; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_ses_props.3997967461=%7B%22ts%22%3A1660872475400%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fdxp%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%223795055323267207%22%2C%22pageviewId%22%3A%225102828358874028%22%2C%22sessionId%22%3A%221383521865340516%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..ZM39B0Uysyf6OOYU.95ksF-yoBaeYBdqiFF8EeL6a1WmpOUugws6bPUzm7y7IOr15E5JmWY_bSps02AVQPvgDKVyL-a6yDrQZtuqDHogbaRFVNj_h2Mo708KsFhA7K4SyV02iKuJj6itTCyWuEfFXOklUqhd9K1vuDT2mFh5cYWEeN1VDgrDtnUQbChI.WyQkHvVVxLqPUdMTjFh4vQ'
//   },
//   {
//     usernameOrAddress: 'object',
//     cookie: '__Host-next-auth.csrf-token=8ff778e99bf8c8aff9d14596a568bcfbfbc7bd789fe16b2275865318eb3764a5%7C667d4158931099bbdeaa79ece34134f1f9ca816ac1d7a1f0fda837e9128f1a3f; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_ses_props.3997967461=%7B%22ts%22%3A1660872620326%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fdxp%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%221132902069871330%22%2C%22pageviewId%22%3A%226975384833648071%22%2C%22sessionId%22%3A%227803420850193006%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..kjDhW7KoF3PX2SD9.Jer0f4zGhnTVOM9B7h8kjh_UtDNKcHWCvdmVXtILlvww-ek74paE1yHQDKD3t_SuJ844kEbiQvChDGZcjmY7DNih0AsVlhMTm34m8yzQ5yliVBHFud0pc6l6lTGMOrpJHq5dGP5swrLEWWm-qiFFcZRsetMyDoUGpOZjvFHyJ_U.qIK4j9-zvZXj1WdSAGfqlQ'
//   },
//   {
//     usernameOrAddress: 'human',
//     cookie: '__Host-next-auth.csrf-token=6d92543c7e9dbff6674cdf177d6b873fa1d810d0582fbbb2ea68fa970bd3bad6%7Cdb28642dfc97efa34f3b34341b5da052f8c35b5ea8c288603f2b83acf25d14fd; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_ses_props.3997967461=%7B%22ts%22%3A1660872661399%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fdxp%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%225686357603046112%22%2C%22pageviewId%22%3A%223466109881039515%22%2C%22sessionId%22%3A%221747084171834445%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..DRX_yoIpN4jFrnyU.7oRtOmkC8VK4o926uCcW4hh5aXUY0aelv3dRRRPHirVZHJc9I4uGdeVjHghgqG0YvDmmodToGXNgUaEtJF_ahZ152k_CflppdQdb2qFU3smUQtirCfpwY1JJ_4rLfhf1o47ISqz0Xuwim6FQAWAlB7SErF7jZ2FrBsWM-1UMWyE.agqjkoUUF79Cd74mQj0eJA'
//   },
//   {
//     usernameOrAddress: 'a16za',
//     cookie: '__Host-next-auth.csrf-token=070a2725a67e1fe2668b1e3e3352247bb9cf94b47a1d9cc2bbefb79dcf56d020%7C5ce4e4ab5a1bfb0e4a7fcc52a386bc9848c1cedf085b898cf5a767b58c1e6599; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_ses_props.3997967461=%7B%22ts%22%3A1660872702816%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fdxp%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%228823062517353748%22%2C%22pageviewId%22%3A%227784727795088056%22%2C%22sessionId%22%3A%223581077426106680%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..XRglM1QFaA50Dyph.suuUmbS-Sn-V8MgO2-dbaDbjv0b5kG5jfUVNPEaQgHlCt8KT9Pjk4YuyomWUaxsOtQSbwuknAVIRYUuboHhDIOCKQSVjA-bIsunlA4xjW3uDf5t4N_Wutr3sLPLGk1RWXCbxsS1EUhmTBsSuqiIafkNVLsSKHNjgo4FT4oVcY6c.vzqfFQLf2dpTRYasJlnPpA'
//   },
//   {
//     usernameOrAddress: 'spots',
//     cookie: '__Host-next-auth.csrf-token=ea708414ba209dcb49ced1583851d6d32b57057709f37a2046c7612a5b46ec31%7Cbc88a0f3b2a38e018b9234efa1fcfb0f54f2e3381b6d3a630afb6b88f05f11f9; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_ses_props.3997967461=%7B%22ts%22%3A1660872785675%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fdxp%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%221842369720303879%22%2C%22pageviewId%22%3A%222193195540599905%22%2C%22sessionId%22%3A%227853768967824700%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..KeNltTLJ11Db9R0Y.eVzOSN0j98xxCn6qG-XzcGbpNqSpeKVX4qxO1_HHRE_UyAkaiCA2kV-JewClqC5vxeo6EVecJjCW4rWtJwlpLLrGcxJ500iKNQjWEWzFsoRB7Og2BOg6rryms64-XKQuzb9M_e-_TBSRAmtyneZb3wVOCDQjIoxfzZdYJPbYlS0.1Acedo9cFyQ_Paxfqxv0bw'
//   },
//   {
//     usernameOrAddress: 'Dragon55',
//     cookie: '_hp2_ses_props.3997967461=%7B%22ts%22%3A1660871677483%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fdxp%22%7D; __Host-next-auth.csrf-token=11d12ffb5eaa0d6a31021241f00d0543b399e28fa907dc61766e60d96cff7824%7C23ff09622aff4f0ba4885abf2372469dd4a2cb713b70de764f21a30fb9b0165e; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_id.3997967461=%7B%22userId%22%3A%222886270944967815%22%2C%22pageviewId%22%3A%228813818334505560%22%2C%22sessionId%22%3A%224317458963234533%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..okIwZKYMrPZOySQ6.GjiTAOF8Y6yu5vscI85U_HC1gCGheCbM2bRaYqt1MTHCKWdhcUCkbBEzEWUSaiw70N1_uNu7lX4BUmNJ5QYyx2QGIFrwOtRWFXL1KOokpebQSRsdaswFLjZAj9B5PrpBtzgtlu8nTzNQlGKNcmOOHNBrRPJCNqgypKbm17MAodY.ZtkLXhuCG8q3S9QcSqOFog'
//   },
//   {
//     usernameOrAddress: 'giveme',
//     cookie: '_hp2_ses_props.3997967461=%7B%22ts%22%3A1660871681565%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fdxp%22%7D; __Host-next-auth.csrf-token=423a1a50936c0397fe7d10eb763f79a616c6529c446f2586d63e45bed933facb%7Cb8ec5054cdba4a2e2b4663854f9d274f89dfafb8a185e60639e31a84fd186000; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_id.3997967461=%7B%22userId%22%3A%225921330821054931%22%2C%22pageviewId%22%3A%22224220919050254%22%2C%22sessionId%22%3A%225989424971029407%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..c5sijUjFn-23Hdnn.yxW6-2XH5ekytXYDc3P_EG4KfLmypnAt6w4wD7ftisnnQh8b4LsZiB9NR6TVY6IeEw4-zG__RJRHfU251OKQUOnGyeeRmCV0Ws1jsByeLyjgc822nU9kp7o34gFw5GWDbQF2GETRo9rOQNl7MtCY8wh002EIAfuoGsO2OWJRZa8.g9ezzbYu9Z2t66yVRWB9rQ'
//   },
//   {
//     usernameOrAddress: 'sushiswap',
//     cookie: '__Host-next-auth.csrf-token=ac415bde2fac63753b074f8ae6e1d74d220d729b100dab255e1cc26b814f44b0%7Cd98bef8eeaddc849154d434d5f5575c624525144dd8cb7934177f4eb4ea1eb16; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_ses_props.3997967461=%7B%22ts%22%3A1660872899582%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fdxp%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%223791754165537788%22%2C%22pageviewId%22%3A%223589043496768173%22%2C%22sessionId%22%3A%226617758001761483%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..Av88iQvQY8fYag2V.5Jbyi9i_XQijCyr-DLJVJmwhUoakzZpcf4rVNh2A1wQeG7bGRSCVkezSmhN3Zmc4EEdpldshl_c-VJy-wahDRHKaPzhMyGER75LWjpMtGDc_WxzC0PPRrkymT_DfBTH4VYBNlh8U2PVLwT8kizI0p4EbZ2HQIzmW2YQOUTfgO64.WNCA8Fds4qyDOQcoeLsHHw'
//   }
// ]
// const decaList = [
//   {
//     usernameOrAddress: 'candyjayc',
//     cookie: '__Host-next-auth.csrf-token=40fb152f00b4cddb86196c4c8abcb011ad8dddc7f4b16e70b363598e6214e7cd%7C8e27598a26556a9376cd509dfb2b51724a75da962cede98660a34edaa9bb3723; botd-request-id=01GB1QXQRBXBXSR1S8WWS0HBNC; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art%2Fapp; _hp2_ses_props.3997967461=%7B%22ts%22%3A1661227249042%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fdxp%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%224618933511351623%22%2C%22pageviewId%22%3A%223465933359531812%22%2C%22sessionId%22%3A%225980823719525095%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..Hnb-i31GQvrfUX3X.s83L0WdkQKk2LTZ8Y-uLOZp0G11y1_3K3plXEWE_wX7goocqNcnCzXdc31O8J15Wki4n8arP41FYc20zDdj05P2bOd0bMj-5p3Dx2eIHricxldhJ1yip2PGW7orQGAGfhGwPOo4BI5rgSVjmj3cdBEjwFGreM3QSSFTSsWdCGIQ.QmNxIAF4BpAWnsW5qjomSg'
//   },
//   {
//     usernameOrAddress: '111219',
//     cookie: '_hp2_ses_props.3997967461=%7B%22ts%22%3A1661223789205%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fdxp%22%7D; __Host-next-auth.csrf-token=5c19b64eabb56287be2ffcaa30fa95d5e7c7fe626abb874052a24bfa38da6aa7%7C8a85288ef8cc2090037e4a6c9bded73f34a10bce746fb2b02a54391e2e046aaf; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_id.3997967461=%7B%22userId%22%3A%222082741876615336%22%2C%22pageviewId%22%3A%225899937872378533%22%2C%22sessionId%22%3A%226860315679376362%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..DQM3Uhxr6WJ4B23i.AcFx91EbEEsy2ZDbRaKyOJiT8yLfF4nuJ5HirS_QHifrsFRM5Pp1ILEvK-gRUcOItdPj-oqaMEX8R0U5v8W24jlBg0ok6utemgrQaMQnYWje3RPsIAPDj1qIkUZVokHSXiOmX8nKmG-_d3kpa1RM5482t8zIVoaA4s6alwoZAzY.iCn06yautPusKjRefQwJyw'
//   },
//   {
//     usernameOrAddress: 'battle',
//     cookie: '__Host-next-auth.csrf-token=c5dfef5fdbd0520b4f4538be45ddd912f6c54fd3aebe7a93941f46c1d6948fe6%7Cfe38ca4202bd8c5b8920195a3cd9045480cba46acf2b4927866c1fba9a04397f; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_ses_props.3997967461=%7B%22ts%22%3A1661223788308%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fdxp%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%225056116719419819%22%2C%22pageviewId%22%3A%227110146101138612%22%2C%22sessionId%22%3A%223382170386689188%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..v5RqSvE3MLVi3UtD.enqoyOgPp1BlB6RTKnO_WL7eWycMc6GAV82PP9BxQNi6TGEhu6dQL10uLeimfv3W-gMsMZA3UVzqGVvg5KF68AAU3Yko963xj6HCcLSpRzdKv85mKms0yWemBykFdbnKNRfqR2wOvsMb4oH0ZfX-EZvKQwHL_0eGYIMq9-0yGKM.2yEBdZAH8ry2_q0QHO1Z_w'
//   },
//   {
//     usernameOrAddress: 'coinclaim',
//     cookie: '__Host-next-auth.csrf-token=b509cca210a8e7ecc5d17d5bb4141e58fd775409899be1a3d4feca1a3ade956e%7C8fb4659ba19a1a9bc89ea96f690b6003c008ad9aa5f6c60bf34ebbbd7eace889; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_ses_props.3997967461=%7B%22ts%22%3A1661227112060%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fdxp%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%228490018211348393%22%2C%22pageviewId%22%3A%22429030349436536%22%2C%22sessionId%22%3A%225336594001627819%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..IY3GyLKfeyHU0kRv.QL7wj2Pq_1oJp7Y9riVNMLnziKRCXKemIIbxlJwWZiZFdYCVtpUFnOFdSojzAiHHPpFAgpZQYt0rQ7jw07AybEyNW1pBEHp8x7G1KR-ew3Ek4RxGIQihls8w3TJc1HDQgyiNr42WI6Cju21hNBSpE1w8v7r_LCkBvmAGAzLiMnw.EqgJ6XpLRcN47bHuqQ_lbw'
//   },
// ]

const decaList = [
  {
    usernameOrAddress: 'f1fsa',
    cookie: '_hp2_ses_props.3997967461=%7B%22ts%22%3A1661248555153%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fdxp%22%7D; __Host-next-auth.csrf-token=101040520c1fc1e654ac416bdf95e43ae797f4e6710cf577cadb54f2d9ff9d52%7C9bbecda2bbffec5ff40b2d2f5369a536d848ae53f43911a7e62972bf881f9acb; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_id.3997967461=%7B%22userId%22%3A%222542154344638637%22%2C%22pageviewId%22%3A%225487367480811550%22%2C%22sessionId%22%3A%224158637759802551%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..xdeANRcyBuF49hzJ.nIHgSrzqY-h9xj-IzW9isErwv0qAzgF-X2S_xQa6_lMF2BkSKyfe7DJSwOH4pSUEOhh9s7YnpVT8FXpnNwEUmDeX7gfDP5zU_LWF8AKGHihH6Be67G1P-f6KOkpqr0u8YNE0C9gmyXR9P7gVIxnQ3y0lLVHl9Qa35MWZTjhS8oc.bmKrAJ796g2oH62ywcN7vg'
  },
  {
    usernameOrAddress: 'kraken11',
    cookie: '_hp2_ses_props.3997967461=%7B%22ts%22%3A1661248466346%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fdxp%22%7D; __Host-next-auth.csrf-token=14a0a54cabad68369a830371588647d839d6dd05b6b3f3d036d9b8c2c02867fa%7C4941e8b4d1727890539d22ad493c5801ac008f40ca77a974ee020b51d4c7dcdf; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_id.3997967461=%7B%22userId%22%3A%221988002264363912%22%2C%22pageviewId%22%3A%223141515798052462%22%2C%22sessionId%22%3A%225515245119260273%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..yXG-5yvqrB5BWEyZ.t7u2SUiSyOuTX0-B49qR8YA5Jiw6JIHhbj7TsUBrjA9ZQ4B4DAle5g0AU0gYTQs6cZFPde8Q7o3xhu5dWdctbfKTUaeIW1nKxpbyzlzR4StKqpA02jQiym7JbYvc0wZm6wJbJCFxFlPc0jYGBzbU1aphNxa1vide1yVKuOA-wlw.96favMESHpxrh9PPBgptmg'
  },
  {
    usernameOrAddress: 'easy55',
    cookie: '__Host-next-auth.csrf-token=6339b622195bd4f343469b384beb66d474732bbc88e486758694fd7488bf0de4%7Ca95a57bb57a27f8c66969f2b476272b3ac0e19259793942bdf7267dcd7a45c6d; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_ses_props.3997967461=%7B%22ts%22%3A1661248588482%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fupgrade%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%225723906647275650%22%2C%22pageviewId%22%3A%227788633027629250%22%2C%22sessionId%22%3A%222603814307916367%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..Du0vP2brka_DNlTJ.2xHlFEXg9OL7frugXflVZMPdlcK9oiLuZQI02rfvKrvFb-YOV3ZUqwMNsVEvcGQI31IXD2Dc7fC82UOT_uol040mPoNWsH4pYjiEWHBTRXXiPA0GrcCTFzf5UHetvmMFaLiDliCE2fCPWX4TQ0NKP_Bu70spqtMc2vosvFyxxMw.dhT1SUmIJO76UV7qa9rNKw'
  },
  {
    usernameOrAddress: 'pipun',
    cookie: '__Host-next-auth.csrf-token=e21a33e9263ab7bd414a90ac067c20ffb84dc9479052d06ff07d2fb81099f7bf%7C2cf60b0ef23bf589deffe33eb564b4ec39be7daf095da091fdd1ab2b27bb7804; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_ses_props.3997967461=%7B%22ts%22%3A1661248573513%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fupgrade%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%22228206889423142%22%2C%22pageviewId%22%3A%227984211927353383%22%2C%22sessionId%22%3A%221972887794065235%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..SMzJu8eJbCGCy9Uy.z2XlDYf1l0aIlayENge_QqeV1Iwt0ur3KC5vU0Y7jtfp6NFFc5SyaVi6dC2oQQNhgHP_9Tbfyb8xVoEThDX68tx2G1kkLYkTWgRJ9Whve2ozJ72p1lsBpjhq0NWBxdsAuHgFrIV03jy3F0qYGzqeKIxFrpDdA3pbC0BEz0YS53o.Xptb4J57p_4VSj8R3_JiJg'
  },
]

const galleryCount = 34;

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


  const getGalleryId = (cookie, name, usernameOrAddress) => {
    const res = axios({
      method: 'post',
      url: `https://deca.art/api/graphql`,
      data: {
        query: '\n    query Gallery($usernameOrAddress: String!, $name: String!) {\n  gallery(usernameOrAddress: $usernameOrAddress, name: $name) {\n    ...FullGallery\n    views\n  }\n}\n    \n    fragment FullGallery on Gallery {\n  id\n  name\n  renderMode\n  showListings\n  showcase\n  coverNft {\n    ...FullBareAsset\n  }\n  sections {\n    ...FullSection\n  }\n}\n    \n\n    fragment FullBareAsset on BareAsset {\n  id\n  provider\n  contract\n  tokenId\n  mediaUrl\n  previewStorageKey\n  previewMimeType\n  previewAspectRatio\n  storageKey\n  mimeType\n  tokenUrl\n  name\n  multimediaUrl\n  aspectRatio\n  metadata\n}\n    \n\n    fragment FullSection on GallerySection {\n  id\n  position\n  simpleItems {\n    id\n    sectionId\n    asset {\n      ...FullBareAsset\n    }\n    position\n  }\n  simpleTitle\n  freestyleItems {\n    ...FullFreestyleLayoutItem\n  }\n  freestyleRows\n  freestyleColumns\n}\n    \n\n    fragment FullFreestyleLayoutItem on FreestyleLayoutItem {\n  id\n  sectionId\n  startRow\n  endRow\n  startColumn\n  endColumn\n  properties {\n    ...FullFreestyleProperties\n  }\n  asset {\n    ...FullBareAsset\n  }\n  text\n}\n    \n\n    fragment FullFreestyleProperties on FreestyleProperties {\n  objectFit\n  backgroundColor\n  zIndex\n  textColor\n  fontSize\n  relativeFontSize\n  fontName\n}\n    ',
        variables: {
          name: name,
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
  const generateGallery = (cookie, name) => {
    const res = axios({
      method: 'post',
      url: `https://deca.art/api/graphql`,
      data: {
        query: '\n    mutation CreateGallery($name: String!, $showcase: Boolean!, $layoutType: LayoutType!) {\n  createGallery(name: $name, showcase: $showcase, layoutType: $layoutType)\n}\n    ',
        variables: {
          layoutType: "FREESTYLE",
          name: name,
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
      const galleryName = `Gallery${i === 0 ? '' : i + 1}`
      const res = await generateGallery(cookie, galleryName)
      if (res && res.data && res.data.data.createGallery) {
        const resIdInfo = await getGalleryId(cookie, galleryName, usernameOrAddress)
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
              console.log(`第${index + 1}个用户的--${galleryName}--创建成功`)
            }
          }
        }
      }
    }
  }

  if (isMainThread) { // 主线程
    const threadCount = decaList.length // 每个点赞用户一个线程
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
          console.log('--------任务完成-------')
        }
      })

      worker.on('message', (msg) => {
        // primes.push(...msg)
      })
    }
  } else { // 子线程
    create(workerData.cookie, workerData.usernameOrAddress, workerData.index)
    // parentPort.postMessage(data)
  }
})()
