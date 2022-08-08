const axios = require('axios')
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads')

const decaList = [
  // {
  //   usernameOrAddress: 'camera',
  //   cookie: '__Host-next-auth.csrf-token=5d690a97dcaef952fa5ffb20d233d79e89d0914f7fcac578f8f256d9c5721239%7Ca7cd70179b54a5ad22601b1d33085e7166eb71fcd7b21e632f213b870a6f97f8; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_ses_props.3997967461=%7B%22ts%22%3A1659620624687%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fdxp%22%2C%22ubv%22%3A%22103.0.5060.134%22%2C%22upv%22%3A%2214.0.0%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%223878790825908765%22%2C%22pageviewId%22%3A%226721043930598190%22%2C%22sessionId%22%3A%226697250807126389%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..uT0hWizdR51zEGxy.ae0mSz4i_oR2H71vjZtt3cOID31WRLdRV0Am7pLgquM58yqZoqC--mlt5n1M_IB7-lkaN-3c4k1_a2ouA_tAc25QMhk4GKOlbs8ZzzUFJN6CH6t07IUfKrnv1WdI9RNAKs0yWnSRi2is6WPiLgjvfEvjmFYTVEzacxKmlxxncOA.5POXLMSFOvw_KXKKGAv6Gw'
  // },
  // {
  //   usernameOrAddress: 'sushiswap',
  //   cookie: '_hp2_ses_props.3997967461=%7B%22ts%22%3A1659620600838%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fdxp%22%2C%22ubv%22%3A%22103.0.5060.134%22%2C%22upv%22%3A%2214.0.0%22%7D; __Host-next-auth.csrf-token=a789c46a09fe18ea4405f4e410386f3db6c44961dcf90075517fa1dd1b867c25%7C25eda41b8d23c3ddffc426e4c49e0f9845781eb3ed366257025e7ece5eaa03b0; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_id.3997967461=%7B%22userId%22%3A%225554369726775283%22%2C%22pageviewId%22%3A%224183882912829044%22%2C%22sessionId%22%3A%227279793359064381%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..SHAXTJRbe2WJQmAs.C43IPtvfHFVBlz9PdViZWZdGQQIJd4eAD0E_TWuhaolcYe5WuPEJepaCCjFIaxdQBdQbaETI-MjhCJTE1FcPa8TDlBKkf_MyJjxOJA8DweG_7ySSsOE4S9_sLyY2R94zIKjAelhF6nViQ9F8RpyrKDi3ysFfHqWRQxeEsOHXvEvxjXA5bqV81yUi2nr3CLvTJDmazOHQHAsgpTb4-92D8yygtat4oDp2.iy1MsaEpFGAMifuP4aAsHA'
  // },
  // {
  //   usernameOrAddress: 'Funny',
  //   cookie: '_hp2_ses_props.3997967461=%7B%22ts%22%3A1659620627788%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fdxp%22%2C%22ubv%22%3A%22103.0.5060.134%22%2C%22upv%22%3A%2214.0.0%22%7D; __Host-next-auth.csrf-token=4be152d3576b3e2029e2c86300647702004cafb1b41c877cfb727f01a73ae670%7C3c58ee5584fa7de0c7ea4cffd7934f542456bfc5afc547e65871c149def757ea; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_id.3997967461=%7B%22userId%22%3A%222063711366323619%22%2C%22pageviewId%22%3A%228552577292222118%22%2C%22sessionId%22%3A%227974561684493460%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..sfTT34iNh7JWgCfR.ihqAPAazPi94VmMV4_38krsky8g2sQqKWNAUNexMfX6buNfnvSvmMJAAbCnyqa6CUO_jxnzcAxPgQ2ss3PIglzp7Fp1Qgui1nnr8KtiRBYhtlXVpXhymA_y8E_GqHQgAwJ28SVNcPuVDQAU4gSV7JoRBsVwLwgY69U8eMVpAlshRFXCtZXIzWzA4Eyxz5fmTFvMUsKPqksxoq_i-RIOEN2-YY2SOx3OJWw.pAzSyHsZI0ui0Ku6iTb24g'
  // },
  // {
  //   usernameOrAddress: 'pppost',
  //   cookie: '__Host-next-auth.csrf-token=79ba86cc8c63056e70dce1a0417829b0a27c7624879b40401099ac7d1d4c73ad%7C6b642f3585ec88c418c88e0492545e20c01f9e6f94848f3b84b4079f3ade03aa; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_ses_props.3997967461=%7B%22ts%22%3A1659620608126%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fdxp%22%2C%22ubv%22%3A%22103.0.5060.134%22%2C%22upv%22%3A%2214.0.0%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%227483410050653078%22%2C%22pageviewId%22%3A%221369462546496524%22%2C%22sessionId%22%3A%224478763855462996%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..ckBMo5ATMzRqykJ5.ec9RzOZojKIhPfg3pW6BWtcJ_Ii9vjx3gENY_z3YMpkxv2wGtfdTTpiZmNl8ySI4tBFpCqWuxdiwCyx-zOkySGa_MpDCN6YxqcsXdDIpFJ80PlUYDCR63xjeIvDQvXSRX12rcuy_nHQGSAawtigEMcAxKoEeV1jHKo5ubUUVS0rueNOSxCvVkvUeQ6_mg9AfzUKl6RBkKnCMym9ncG-nMuG0F573NF19.XCycUgihnhXpl_xZN-aKGQ'
  // },
  // {
  //   usernameOrAddress: 'trable',
  //   cookie: '__Host-next-auth.csrf-token=7d5fc7bebb797cbda0079d05243ddd4d134dcdc2c742de75c2f4a623e5f2cec9%7Caebcecb31f68e251ffc11a9b0e8cdef479da84dd85101041c04cc56713d92374; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_ses_props.3997967461=%7B%22ts%22%3A1659620610687%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fdxp%22%2C%22ubv%22%3A%22103.0.5060.134%22%2C%22upv%22%3A%2214.0.0%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%228127818524524228%22%2C%22pageviewId%22%3A%224502676938713891%22%2C%22sessionId%22%3A%223457212410722657%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..9_aIHcYKYI2ZL8rA.-ed6z6mQQPF7ITr27YpH_FfVs5V8krXrN2iZTja3gXrL22853JEPSblZuFrYrCpbUthdqR1qwzvtrgxV9SJSnEeUSjvfCyabpsKJhGn4TfdGfViF31QJOtYSVhuNosBuWQancUTIiHYf5HskbqMMsYLJnKju0xdvmwnBVY8iNH7fE_EjHY8udPZulpq_KUgfEesui6GhSkt2c55yEK08qjpLTWot-lIp.u2aitJjJqRV3jFOquvIN3g'
  // },
  {
    usernameOrAddress: 'monkeyboy',
    cookie: '__Host-next-auth.csrf-token=af5783eaf9bd5a2703b095bb8dd9d57f9fa190acb1cfd420ab82599d1bba6916%7Cb6b33d2aba9147b623824dd52f5e0d394511efd019b7514848fa96ab42959dd9; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_ses_props.3997967461=%7B%22ts%22%3A1659620612868%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fdxp%22%2C%22ubv%22%3A%22103.0.5060.134%22%2C%22upv%22%3A%2214.0.0%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%221320394680254514%22%2C%22pageviewId%22%3A%227402917125367744%22%2C%22sessionId%22%3A%225718690737045983%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..nOhqGzNBw7XZqom4.UeYOWGP3f4H-rvtXECGwHTYYl08IskgIRgebbi9J1LcfNkTkZJ1l5m22hid8vI8R30uEgwDy7ltvYh5XzHcWH-KwTGLuWZIKiQEUQ5N9K3pVf74LbwSfD3Z3aD-QapF5esRAzMod0ylf6ixvNFh-TKxq6vNM9X1GEUWQDaYSh3BJNHsMsbYweEhyRQoG4LKExuWWYCd6n8vJvrcfCUZGtJvj0oQt8wCz.eoliA4lirOfPbyPgy2qoMg'
  },
  {
    usernameOrAddress: 'cakecake',
    cookie: '__Host-next-auth.csrf-token=5782f3d64d49d8f6ffc45934e730c9fe6271a72587983704fb42252e8fb4f139%7C0ae506f3f4e17ae5c6e5610ab95c99a79c303a29b582edcc15309014ca0d2754; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_ses_props.3997967461=%7B%22ts%22%3A1659620615433%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fdxp%22%2C%22ubv%22%3A%22103.0.5060.134%22%2C%22upv%22%3A%2214.0.0%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%228911226311949396%22%2C%22pageviewId%22%3A%222994311521525455%22%2C%22sessionId%22%3A%223605286705754869%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..MOcwpzgBm0IKIZUL.exQEQg1uanhGaSLZlFajQWQr2-E_pOEAz57Rg_l1oYWQS5APx1D-BKdy0UGMh-C6Gbz4YeUzuFKqbqs0RKTSxj9kWhigr4BsZZSw267YPvdwMy6B1VoQR0zLnPEwHij9fslSdraliaYJnXttlM5Xj8PzPvo3wVcG_9Y9gdSwS27GGSJFxNrHLcihpJPx0jaSaYAwJxXTkEBgLcPQOkIEZMZS8AudjoeK.jZv9AKUYOgfPG3OkUUTB-g'
  },
  // {
  //   usernameOrAddress: 'object',
  //   cookie: '__Host-next-auth.csrf-token=686fb7265a2c43c3c6288987eba176be8bf39a0e62f141c4fb318254a8e52723%7C13c260b11fc1a6d29f8e862a6083d568a5d5c98dda482fdb2026a7ff8b14d203; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_ses_props.3997967461=%7B%22ts%22%3A1659620617949%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fdxp%22%2C%22ubv%22%3A%22103.0.5060.134%22%2C%22upv%22%3A%2214.0.0%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%224310684043550752%22%2C%22pageviewId%22%3A%22401124879076731%22%2C%22sessionId%22%3A%224926219207748375%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..s4IfzCKRU3aj4RaK.npXvxT1zlhfFGHfFyPrqAX07A8svRl93b3fPUvEsKgflSOStATuKnIcSCjTYz4fIbm0lLgDmTf5b0D9aYsiKBlvm26YxnduHNVbrypYzuN66zHVW47BCmfJjJ_ombsKDdP8nlxQzJQNSFeAc7k4DX82S3lBLtv9_KSPF0rc1NgKW2WuJIh8hVyQ1_f5GGrKuGZnwB8-_P07VOPjvQbIcuFpwDLc-m4bP.v_ltGM4QTw0OUkhNeTRcvQ'
  // },
  // {
  //   usernameOrAddress: 'human',
  //   cookie: '__Host-next-auth.csrf-token=c54cd449e34137044c4f5eca890335f14e02b0e73946f0c7d4d1f7c4f46448fc%7Cdfff1af75e7a2145477c38b2c131abd046a0f673c20a652b47125d5939553ef1; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_ses_props.3997967461=%7B%22ts%22%3A1659620620368%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fdxp%22%2C%22ubv%22%3A%22103.0.5060.134%22%2C%22upv%22%3A%2214.0.0%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%225761194858392707%22%2C%22pageviewId%22%3A%226077733398079884%22%2C%22sessionId%22%3A%222086826632559099%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..V0lPGWDSs-XJpQPJ.NVvjnpD1B-7J0F5KAxvHlkqsr7AwcKwVvPUTPH-31QQNOOJdWU7mTLGaCClq6YftVyXwmOVIZv_uXH1EMIYOZFnNIoZmVqdECNY_KQUvoHm5_0YeZpqdqnHsEFxJ9Y7yNLEQvGLaDhGEwa0niPgOBm85yYUcpNhVJDstPGCZWeNhAz6m83meGjfxlIsIVnDc8XXzXekjAX8lUXs_8_BF4R6QEfzLYNMy.ewuxSi4bEHBPVc8kRXmV-g'
  // },
  // {
  //   usernameOrAddress: 'a16za',
  //   cookie: '__Host-next-auth.csrf-token=e9efad2bf4dedb32b58f223a802609c25be45fcf82a627d140504aa96dcec1de%7C2399f73c7eec23e9948993d5159605712910634ac1af44c936aa411200182c3f; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_ses_props.3997967461=%7B%22ts%22%3A1659620622912%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fdxp%22%2C%22ubv%22%3A%22103.0.5060.134%22%2C%22upv%22%3A%2214.0.0%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%222496264982485921%22%2C%22pageviewId%22%3A%222259140529729365%22%2C%22sessionId%22%3A%22269236160335310%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..MBXZQa4949PLJ2E9.OOQUwfENSeLoSQtcxjjByPT8lO25vLWMygfTx9zA6d-cWcfSrgmtZx1YSN5B5ywhXTom3XKvMlI9zgXPTTukEyghzfGKGTfsugTyXgruLa_VLWlEDZWhxJrAYlKgjf77_HGQIhSWZgefVo07jmTpSfF26g3brhYYHOxIJp-CXaRaz2cstNW0EPQ_jMxH_EUa8Xjqq-9vRIejv4E8kpYQV4FxcoXygzld.3BszS4oVAbNIyL0eNJI5pQ'
  // },
  // {
  //   usernameOrAddress: 'spots',
  //   cookie: '__Host-next-auth.csrf-token=f0bd8f87648006f79ca74bb47fc6786579aa50f953acd9f22275f07d98f0f651%7C0cac17481f47b4ccb7bf7724a3f8ebdffd0cefa79b165b6baae07000a4a62413; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_ses_props.3997967461=%7B%22ts%22%3A1659620603218%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fdxp%22%2C%22ubv%22%3A%22103.0.5060.134%22%2C%22upv%22%3A%2214.0.0%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%227443871534123329%22%2C%22pageviewId%22%3A%225543246976770971%22%2C%22sessionId%22%3A%227890077216968051%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..zcSZAoBd_J4DbQ8a.fu8s1B0ookqFul2v-80nrdSg6Z492-IgRU0wvbqghiB81sO2TpZANYe0sdA0tPh1o6jDmNeLkdZTli9dKDWpmrL5Rfz0Etty3us-tYajhh2MsWQAlpK7vkp6YjaiEFgCU-OGda09pU4fB3yHBiR4E2r4YEg6we6mEnKKGiMrskXKESKweACTk7iPLfEuImnSWCn5537YgW9bwuGnDKxse8KaGh4DLvnt.0R-cl4MOQ3vGkueBgwSAHg'
  // },
  // {
  //   usernameOrAddress: 'Dragon55',
  //   cookie: '__Host-next-auth.csrf-token=13a166fe91d6d14f24590d472d9ce6ab65f19e8a5b8f8377f86d5921cc5de06c%7Cbde8998f632236b2482b0ce54a4c907bd72cd764051b9a5f8255192c133d1c1c; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_ses_props.3997967461=%7B%22ts%22%3A1659620606080%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fdxp%22%2C%22ubv%22%3A%22103.0.5060.134%22%2C%22upv%22%3A%2214.0.0%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%227168217127586343%22%2C%22pageviewId%22%3A%224149183785118807%22%2C%22sessionId%22%3A%225208400433166593%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0.._0SLKBVgCUW1epdS.SS3FmozRJZA127Uq_cpXucvwOhXC9c9XXOpLccx_edaviY81cXSYWEZfirF6jJLsfWf2lYBWblfC7sTFdndVdqjDoSKisOBWcUfEx1V3N8uM6Qr6mqLDh0jgMPjFLi5cVh7C2LZauliXjmD6pivQYB1Oa57YLX2QI6-TXUFiHTISJPaciVk9Ud5gmB6TfVRF2bexNnPiPUkLdqFa3agzp-ffqhl9EDKG.RlncNVyNbou4GyWoM8FHTg'
  // },
  // {
  //   usernameOrAddress: 'giveme',
  //   cookie: '__Host-next-auth.csrf-token=5ba3626cbde4d7ff7d438dc662a5c2ebb54c034b67d3cb719d678cc0eaef14c3%7Cfc1b5a77acbc213463389506e019acd14f3bdb8a34a9935b77b2903bad68e6a5; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_ses_props.3997967461=%7B%22ts%22%3A1659620541920%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fdxp%22%2C%22ubv%22%3A%22103.0.5060.134%22%2C%22upv%22%3A%2214.0.0%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%224345641330196707%22%2C%22pageviewId%22%3A%224738362969714528%22%2C%22sessionId%22%3A%221489663619572408%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..BQw0jyiJKnn3aHQt.urNrsks27wxgs_iJgP39oR8ysozFy4UD00nj1AEVTipODOChL1eW-ZOVeZ2M4FCh94iqkPLtI2s9uDcTpGkT1fxR_kVffHe9Y57LiTARRofPRTt_z9rX6p3XH2ICqtMToAjhgxQdNUcHRei2gDfQkmCi9tzmypBz98B7-YB610lCuvhW5In0_5aM3mpjvc6fxvSkhyZyNPCK2NNkovor2vmQzHwHI_DS.EdSHCWyLWOZNyek2hVVqcA'
  // },
]

// const decaList = [
//   {
//     cookie: '__Host-next-auth.csrf-token=97cb6757e162b7f67e510388299680a5b4677b4cd9ee3bacce3e8620ca76665d%7C5e0399240e438709386981ed45b5eae8073ca99f315bb62c4df14ed6be5fff82; botd-request-id=01G9MXDYMT6DMPH0AG30YWD2W7; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art%2Fdecagon%2Fdxp; _hp2_id.3997967461=%7B%22userId%22%3A%225749130737098346%22%2C%22pageviewId%22%3A%222122109095216357%22%2C%22sessionId%22%3A%226110455925615662%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; _hp2_ses_props.3997967461=%7B%22ts%22%3A1659720773586%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2FBornosor%2Fleftclickbought%22%2C%22ubv%22%3A%22103.0.5060.134%22%2C%22upv%22%3A%2214.0.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..qmI1iyLSgZRduBm1.x8fA7SvYXFCeThATBwEKMVjq5c3BzC2wyM2B7TMiN3yGJHjMviYb0Vl_aSmXhJ_CZYIQJTmd6HPCEcur7af6Ric-3-ceX9qJC7D12YAdEFwNai722zQacbT7dj9eSlKSwTDvgG0_Qi13bypdUt0nRGzaVhGN36Ps9YKzG1u1wFClOh5mWaax-nanuYH5uyFcLxOnjq-1Zq29XnsLtGK0ERMzHJq99jiLIQ.z2Rd4CpuZEzrNJS9XBYGwA',
//     usernameOrAddress: 'fundk'
//   },
//   {
//     cookie: '__Host-next-auth.csrf-token=72732f843bd85931b52b9cd9bc8430b0db6ac1ed64e87cb14fedc43a2e085b73%7C357554624a5bbcdefc6af23766f0cfa41f07eef32cddb0f73682ef514c6c7269; botd-request-id=01G9Q0T80ZD6CXHFFDC7359BC8; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art%2Fdecagon%2Fdxp; _hp2_ses_props.3997967461=%7B%22ts%22%3A1659719661305%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fmint%22%2C%22ubv%22%3A%22103.0.5060.134%22%2C%22upv%22%3A%2214.0.0%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%223528607480445500%22%2C%22pageviewId%22%3A%22630847168236291%22%2C%22sessionId%22%3A%222268092471414685%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..jLjWWL3RrIbWbOGk.JM67lzK6RVYOOJqWV20MK85C4aCxeTLmnGGwTAEf2mnqxui0tyo3mCpyAedZ8fWVcCYbrGty2S2UMOcUhMvmB6MdnBKs5YVk6nAdPPm5UP7KzIj0zxAXxG37Rx9UFoTwqA615tVinAPsI3qgv0zIPzyRJsDleQhO_EIx1r-tm4HHK9ombs8JxO4HMgKQ929GVAm__E9hSGMA099whV4PZzFCW3z58pW6.uTQwVdQJvZAZIVxL77kLxw',
//     usernameOrAddress: 'asodg'
//   },
//   {
//     cookie: '__Host-next-auth.csrf-token=a8aed9f6d5b9ad342c8d9f88ff28489cc5ec792020d5508b745041c6dff0a2f9%7C7eb2bd13b16b3ad93ade7ecad08235e6601d6cb86d78460a3c3ec42a47b09ea7; botd-request-id=01G9Q0YA50Z737KW5N5XG0KKX9; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art%2Fdecagon%2Fdxp; _hp2_ses_props.3997967461=%7B%22ts%22%3A1659719673282%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fmint%22%2C%22ubv%22%3A%22103.0.5060.134%22%2C%22upv%22%3A%2214.0.0%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%222981800907394549%22%2C%22pageviewId%22%3A%226407729220147499%22%2C%22sessionId%22%3A%222457222520968068%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..J9FqvlZ5Yp5zHuEM.KE-2yTg4FZpXEbuXLMrouDgfjVIn5XBHdPAFjbin7Yfd3EcX0jTORXZx63dK784tc2I-sOtlEtScjCeVPj-OtCTVigJ8N8p2rN0j37Xhz-_xSe0K0n2IUhvcnCgE1Sjtac8TA7eV9hzx58lukdpVkPhyqxlowJagybCC763z9Em3IX4UDPubbl8JBIGllWDaLW_ABGpd8EJ5iJdJeoL7yno7okZ3Mk7d.RoTjgdmguht1NOXEd_1Dfg',
//     usernameOrAddress: 'sadg1'
//   },
//   {
//     cookie: '__Host-next-auth.csrf-token=a1db13a0dc2ce0789bca3acad5371b3a7e78bad1ee09d3022c0dcb173e3249fc%7Ce44f36c75f538b23fd422611fc05ee98598b76704a912c281177190b0a139567; botd-request-id=01G9Q14B5G5HXVMFQ2D40M95HP; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art%2Fdecagon%2Fdxp; _hp2_ses_props.3997967461=%7B%22ts%22%3A1659719685900%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fmint%22%2C%22ubv%22%3A%22103.0.5060.134%22%2C%22upv%22%3A%2214.0.0%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%227797763644709224%22%2C%22pageviewId%22%3A%226323788225611985%22%2C%22sessionId%22%3A%224032588881011289%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..k3lDHS-Jij-yxn3U.Z6tvlULalC7NNSq-zNPMCqOytW5L_ZS1lH6xW1a4oT8qsGXNuLxosRwntl3dplicJJdPeee4nFBBP4UP4oQNys550HyL9ADq_sXXgxqVBwK02VTFLQmEmALkWwT6Ahp4FKm4YAbOKWGptnoFDl88LVFQNDjtIl2BPGfD_kMNUzQspRC-7bCo2o73txZdo5Suusz8XSPqxtXaFqkj20qRVpZgh5AZuAjp.SQ6lVtL_CTt56oIVGKGojQ',
//     usernameOrAddress: 'dsfhf'
//   },
//   {
//     cookie: '__Host-next-auth.csrf-token=69ad89f787a6afbcb30b8df9973a384f623619cf3cc243a0cb9882c5ff3afe29%7C4cd6000c49cc9d90da16bd0f24f90eb64e08408c4eced96a35483c5db37b2955; botd-request-id=01G9Q5DA5KHV5JP9FFDZ2GVZSD; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art%2Fdecagon%2Fdxp; _hp2_ses_props.3997967461=%7B%22ts%22%3A1659719699246%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fmint%22%2C%22ubv%22%3A%22103.0.5060.134%22%2C%22upv%22%3A%2214.0.0%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%225474951157724108%22%2C%22pageviewId%22%3A%227964911893339525%22%2C%22sessionId%22%3A%221870058788249372%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..93SUFcDfSAaJpf1Y.xT2cBd0_ZPRkbJTo6VIBOjdZ9fWVA84BSurg47FGDYChVlOdnJOU7J9U3blC6l1iDBhRoUOFI7LDUYZ8bwJ2kUYu4PksW92oUC51knjd9acX4bg6E3H0GPQiAA3c3VKfghykvCA68GNg_NrJbENdHu3d_ULoktfaas7jle8xH3FfJ8Ow1W-1VeHiZF3sChdEd7pSpyl-mbYRg85cJh_dMPpCS5QVJdPX.yY4fqLmc6jhTx03JCbLiPw',
//     usernameOrAddress: 'jap77'
//   },
//   {
//     cookie: '__Host-next-auth.csrf-token=53f43d9e63ad6276f89dcd049c1d6056fb717f1470678c0f5a07843070df742d%7Cc5e94734d6fadcd559bd24693ba1ec7ebfb73378c146bb08968832916dd54df6; botd-request-id=01G9Q7SP6H5RVG0XWCBKNEF8CP; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art%2Fdecagon%2Fdxp; _hp2_ses_props.3997967461=%7B%22ts%22%3A1659719715015%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fmint%22%2C%22ubv%22%3A%22103.0.5060.134%22%2C%22upv%22%3A%2214.0.0%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%221238562232447199%22%2C%22pageviewId%22%3A%226957604326827538%22%2C%22sessionId%22%3A%227593689870153896%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..Yb3Vxx6PZ0FpT2a6.3e78W42IaFngmaIMXbaTEIz8G_dajIzX2n84rnjH2uikzzVXDkEoyYH1ShNecZaHi_GtpKsbS7vMDP_298tfrPOL-PjdIHcSQTkeSHroYTJmtQn9pLoutDG48YUS-MRFvU1Xtl424uv-PDWawDyUfpK7SkRRxR1eET0lVi2TAT68paB1HOotNN8HA7_dV41Qfsi7H7x8aprdqWkJVrBVe5cGGVNWzaIQ2w.drAc7UEfSEp7xc7XUlhTCg',
//     usernameOrAddress: 'qpiu11'
//   },
//   {
//     cookie: '__Host-next-auth.csrf-token=acf03d1707b736a2c5c335bcabeac257f9be76bcdf1cc7386a0edb39cd23577b%7C2efaf9bfa4caa595d59c235837893bb3b5ed45b1cbc28ce089c13f6fc5f57a77; botd-request-id=01G9Q87JX8YDAN8WPZW3AB04VF; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art%2Fdecagon%2Fdxp; _hp2_ses_props.3997967461=%7B%22ts%22%3A1659719727570%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fmint%22%2C%22ubv%22%3A%22103.0.5060.134%22%2C%22upv%22%3A%2214.0.0%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%228152506278884986%22%2C%22pageviewId%22%3A%225208425561846461%22%2C%22sessionId%22%3A%222240769195294279%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..WVQBchNGeKFbmsQH.qGCgzSHZZT3YxYNOWXsUwtpPpxODTyKDqlVIdnVZnJuzqKXK27NMd26jG2OTJC2GVNEQlkY7tXMnSxLFd6d_CYJ-jSoPXlf4OQaDKYmAtgfrpEnK8gcGzwyj7C2FZH7LiCZeIkhid0_4uWiu0SC1vDZbFKn_wmTjS2kkZ6gxe_8tlYxJUjPz1sH70up7eVkZUpOCd7YfFyzVY_y9DzpT2ARSvQElsCwW.xRGx_b1Mdj8saEcjkdhgZA',
//     usernameOrAddress: 'kjasd96'
//   },
//   {
//     cookie: '__Host-next-auth.csrf-token=fc8bcf08c6f18e1d7457430bd69a21584514c0f07a08764d2619e4ee83c98e99%7C68b56a0b4a47c62431b144587840dad8041f2e7bee5a4587cb359eba83dde913; botd-request-id=01G9Q93E6FD8MW2PMZK4NV9JE0; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art%2Fdecagon%2Fupgrade; _hp2_ses_props.3997967461=%7B%22ts%22%3A1659719740862%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fmint%22%2C%22ubv%22%3A%22103.0.5060.134%22%2C%22upv%22%3A%2214.0.0%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%224864877018598754%22%2C%22pageviewId%22%3A%228414041840792627%22%2C%22sessionId%22%3A%225770605248446014%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..cao--9o7evdtI_er.YJzd8vtujkowG38mmDjARoApZ3uU8E5PA0e4fu0MnQTzP26OLe95f2mwV_XyfrDS8lVoFpeBD7AFIUZcSqlgVvOOAJMkPbthEpfzZwuRwi3fnfDJBEn1yMI6_74Yu615-PG3WlmoCZU_8jv25uFt4ta8O6adM6RpJSWLqJMB7ozkfAq0IhHtd5wAic7B4mrKdtVbtLp1HvKMRlElIktLEzJIV2YA1CAt.qqMKdKRc9ho_KCi7Tt0MVA',
//     usernameOrAddress: 'ouiu98'
//   },
//   {
//     cookie: '__Host-next-auth.csrf-token=0abd9357328431216129b2a29ed28f8a56bc12a53199a5f7d1cc7c52b2a1545f%7C2e5502fa285bb66ce3b7dffbbd77ac027a02019a382cd59483b4c35d653e2e40; botd-request-id=01G9Q6RQ6N8BKW493QP6RV8N4M; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art%2Fdecagon%2Fdxp; _hp2_ses_props.3997967461=%7B%22ts%22%3A1659719753493%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fmint%22%2C%22ubv%22%3A%22103.0.5060.134%22%2C%22upv%22%3A%2214.0.0%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%227607875081232328%22%2C%22pageviewId%22%3A%224822602583893608%22%2C%22sessionId%22%3A%2246011135825664%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..dme-ijdBfKd21me-.LRtKKTQ6J1IkKfFhJ3eVf48juAboVANELu3l5xtrFq9cU2XIGyoAzXJcK5Ca9gXkyt_9Eh0-oD4dodTHQjgfe6Rpg2vT5s-86yc3TbCpQPrnS8g7kagEmRZW8hNd7nLLmN1NDHT5r7gK6pztBQ0LsCROuDB-dGJIQgFgU-KwkbgeV99tdHv1jhnGSezUB_-QwNOaKyL_y0P8Sbf84of9TxivFYx4dpXj.pmplhDe58V-Y5Pk_oQ3FZQ',
//     usernameOrAddress: 'ggg965'
//   },
//   {
//     cookie: '__Host-next-auth.csrf-token=32e5b2121fdb76b614c4bc133cbb63deebb87c6c8ce5bb2cf0c41a7e6eff283c%7C378c29d1d0b280075e94cf4811e74c3f3b6bb736a532a82c5765b014cd78bfcb; botd-request-id=01G9Q6ZZHK2XK29J92KTX3P7E6; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art%2Fdecagon%2Fdxp; _hp2_ses_props.3997967461=%7B%22ts%22%3A1659719766127%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fmint%22%2C%22ubv%22%3A%22103.0.5060.134%22%2C%22upv%22%3A%2214.0.0%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%221280582952570400%22%2C%22pageviewId%22%3A%224626013512287410%22%2C%22sessionId%22%3A%226754622660405858%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..vouB4FR8ly2Wj0Pk.i4K3FMLNWv5cv3Lm2SO91ecSaV2-7Iwtr-eedJntF2n8b6C85vniGahIJbvNaiWlV0x6pNQc3NuVMsTRPC142uRW3C26yfjm7uWAyi63IZrrSLqcSZHOI5xz54HndJGUmeEWEpCdrjMGrXzUcdqbmhg_pPGWbV3hzhvsEDfbXg-erFNtMzir2C_1v76S6cqbGqVLdJ_5rXlVovm8bRnaTL4IDpv2ivE3.Kqq8byWQ2BNnJ3G9ng5LtQ',
//     usernameOrAddress: 'oopiu'
//   },
//   {
//     cookie: '__Host-next-auth.csrf-token=7ec73c700ebc966ccefabacab5728c729c00f50cfd7689e2a366ddd918b593ce%7C51d7f418104cd1131cbee0d862663d855e5f28a30f7dc87b02a449c6d3137cb2; botd-request-id=01G9Q76HC3A3608TXVWHA575TH; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art%2Fdecagon%2Fdxp; _hp2_ses_props.3997967461=%7B%22ts%22%3A1659719779381%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fmint%22%2C%22ubv%22%3A%22103.0.5060.134%22%2C%22upv%22%3A%2214.0.0%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%227826887259792762%22%2C%22pageviewId%22%3A%222391371296779040%22%2C%22sessionId%22%3A%222686689469124841%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..frIu9yZSgjJ2lnO9.mouxIAdOIOF9j1aX3CJp34ZirCXVED9tDd4Yp8myUTUQdR4bwEZmTHwoAsOXOh5FHI_qPQaar9F8KfLpb8nd1__vzNqrOSnM8DN0y7O8xxxkVbvQkGnlR7nn_OCeVrNkLAn5fXkJ_mOy9CGd4Hkx1W5kqZc_rqANy3O3qnzhnohuEnGhW2YXXsa9iTDed0MjXV1HE6-suyyYq5gtiGS4cZzFGX5QWnmj.sfzMbqMr8x6bd_lwPxwNpg',
//     usernameOrAddress: 'gasd1'
//   },
//   {
//     cookie: '__Host-next-auth.csrf-token=3b1692f7ddec4339aa7672dd1adc8c99747d631636dfa62d364f11fb8736a984%7C9179a049fd02fc16277e64a7d0203725c87b2a93c4efcb8460c1d04cecf9b574; botd-request-id=01G9Q7EK7Z6FG91TYS3E2PVYMY; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art%2Fdecagon%2Fdxp; _hp2_ses_props.3997967461=%7B%22ts%22%3A1659719792399%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fmint%22%2C%22ubv%22%3A%22103.0.5060.134%22%2C%22upv%22%3A%2214.0.0%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%227489245249028113%22%2C%22pageviewId%22%3A%224840387987199346%22%2C%22sessionId%22%3A%222118427503853647%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..rcqZg0whHrFPqna7.47HJODKkv1QGfQfWMosMQ2_jUGQqunNUXYC2djrJEgJrhGVm8CYsp3fignsGTXdoCICHU-TmfY5U9OvS3BJnNqPeR_WE8pLBtR3KMg8AuKU-HigN3Y6GP4BDC-mQBc3yaBGfRJWL2wEpqmEwnkHOZnUZSDyWbVvMpJW_t6yzXuTn_-7u3yUeOU2DwtUWo7_OhNvYX62qd_wr1nBOhVEVEUkyeuFYNhxI.-lf03BDNk7Y18rl6sPTxBg',
//     usernameOrAddress: 'ui897'
//   },
//   {
//     cookie: '__Host-next-auth.csrf-token=d3a6daa1563d4bc740eedc59065cf61f5f06a6c0657516399f9b15eac2061b14%7C1df4e91a27dc01614a2ff403102d3b3a49437f3e25a215d1e1bad8474e4549a9; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_ses_props.3997967461=%7B%22ts%22%3A1659719805348%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fmint%22%2C%22ubv%22%3A%22103.0.5060.134%22%2C%22upv%22%3A%2214.0.0%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%228871221788711427%22%2C%22pageviewId%22%3A%225248178579243576%22%2C%22sessionId%22%3A%226969744387912966%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..b0UbIFgMufXHwxER.88RJu4-ySCZNqYDVYtTShCxElxpSpoJKdsvdx1_5mru7souGh17E6A5UZVKTeXsDdTXIy2HGthMPSyHHeV9uHtJbWsi7yxTKB7O23OFgOuziiI5XbiwbCZyZqD6ZD8WXQ8R_k5nTI0W0sIl_FxeWYfGqDNVDxJlV4YoYstFrUl6bZ2C7rRGujZ30EmQgyldhzc4sENXkoAOQwL3QDOihdxeGTUEILhBg.mkrgX3H3VjSVFs8AtAo8Mg',
//     usernameOrAddress: 'ghggsa'
//   },
//   {
//     cookie: '__Host-next-auth.csrf-token=3bea7a74ab0a226e16b11017799738a7209a95e1974021cec87a90f9ece78285%7C2851b4875019f54d9fb7f7c46eecf45c1a0cffbb45b2e97f961d4c6385c1a5f8; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_ses_props.3997967461=%7B%22ts%22%3A1659719829916%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fmint%22%2C%22ubv%22%3A%22103.0.5060.134%22%2C%22upv%22%3A%2214.0.0%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%224906548456598294%22%2C%22pageviewId%22%3A%2274238723015423%22%2C%22sessionId%22%3A%222048336149775172%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..q_y2TqYZsCPDjJpf.SlBkGKRf0Aizaw32Ix2Y9yK2iITrM2Vq-eS2kBlWF3BHfS7GkkWXOvEHMinh34C9SFDo_x3h3KxvLZPnNisQzUESrQFWtS53w1c-q8e0GutcyQBDlrY-3Y-1jcI5kShd1-q4Lsz8GasxdifwAxTHAEY8k2xv6zxur84PQfk4MISV8UB8Yyx6whFHP9q5N217qZZE39kC_5B7Eb6jxSgbKz1KCkx-0HNW.oge36DaOcfbUHhYsjGDCgg',
//     usernameOrAddress: 'g1asd'
//   },
//   {
//     cookie: '__Host-next-auth.csrf-token=981a7bb69a2628891a6fb84413def38e4202e2e9671cce6c3c8007c9dea03dc9%7Cb73c1240225f5ce6d688b9391724588d7c6ced9cf07fb07b671baa574d2eceb6; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_id.3997967461=%7B%22userId%22%3A%227201872537901074%22%2C%22pageviewId%22%3A%223784268858908902%22%2C%22sessionId%22%3A%225721377519188395%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; _hp2_ses_props.3997967461=%7B%22ts%22%3A1659719850562%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fmint%22%2C%22ubv%22%3A%22103.0.5060.134%22%2C%22upv%22%3A%2214.0.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0.._SXjf6KiPjLCmGTZ.59wiWGEPvZbJu0ZP0rlszCtnh-cGXcqkG2ULW6fK8_lTfPa_eZRhyjShqTtMqNv7e0nqXYPzTgM-DHdHl5krKOPipvnJFrGQcO28FPW9xqKY02NHthzwFmoZPsfKLKGasOa7QJRy1kR74RhpuTKvA2aia7fmpVnjp1hB9sCb60mQFPexMtHRak7MR5D9PZNApXglkS-hD_IX-hUxLWjmz_YN5Wjt7i73.kCMsvxWgRP2er5TveuMq4w',
//     usernameOrAddress: 'opit158'
//   },
//   {
//     cookie: '__Host-next-auth.csrf-token=aa1aee82beb2bbf3ffcabfd7fd2a2a8bfc31a857c901f14a03d900a078118c52%7Ccda3b539a4acf47578c4640fdbeb92991c5331fe752b923ebf259a2c9e564678; botd-request-id=01G9Q9GVZCBDKCVREGVMFJE93M; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art%2Fapp; _hp2_ses_props.3997967461=%7B%22r%22%3A%22https%3A%2F%2Fdeca.art%2F%22%2C%22ts%22%3A1659719872932%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fmint%22%2C%22ubv%22%3A%22103.0.5060.134%22%2C%22upv%22%3A%2214.0.0%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%223127555998962757%22%2C%22pageviewId%22%3A%223832169470923976%22%2C%22sessionId%22%3A%225156431791912201%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..nw46YlJQfV9xlcAK.p9TyaPoxhA2VAUYFF645FFG6LZiqZzhjjtx3oZBeMUz7GmOG9QaN2YQiDNov43QX9j4MRdEXYrokHTVG7F3N-58MMa9pS1yziu7ViPzt1J03LmPK0yum_oSUZdgnVRmrVjIoPQFjVRsDLk41TiKLIajapVSR9jtGofGWSgTOAig.XIMBApeZAbhaAFP7Y2E8oQ',
//     usernameOrAddress: 'lsdog'
//   },
//   {
//     cookie: '__Host-next-auth.csrf-token=5bc9868968f52c627681a5b4bc85b2df55d505d6423ce20be41b047a526d254a%7Cf8e90f5c070627a68d733c44d4b2809fbc477e934a9d44f4bf9370fcf15ce8dd; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_ses_props.3997967461=%7B%22ts%22%3A1659719886176%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fmint%22%2C%22ubv%22%3A%22103.0.5060.134%22%2C%22upv%22%3A%2214.0.0%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%22903987641803002%22%2C%22pageviewId%22%3A%228207617972495753%22%2C%22sessionId%22%3A%227612701322117518%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..VVX-sW25CB2cmPQW.DJKXtDlwMydMcskdJX6-JmvXzdENDeEytTImI-Exz6pKCgaPiPB73MZOzCRqiv0CuLZcD5jGClk0jIL_NqJBaO3q3vKB6Fkjd1898O6Dn1n9mh9FW_dszWReAw2JiWBkd6FM2Oa4OkKtF_kYv96eDIITovwsVgyuTvL6FsNO6Fi6DPEHfTX_C5ZENB7BZnXEjmwpepD4SycJL_9xfDbR6AxD0u7gp2Tm.7MyNkEGgdlVOda1hUVocrw',
//     usernameOrAddress: 'fgafg'
//   },
// ]

const galleryCount = 60;

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
              endColumn: 22,
              endRow: 23,
              id: sectionId,//
              sectionId: sectionId,//
              startColumn: 1,
              startRow: 1
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
            const firstNftInfo = nfts.data.data.searchNfts[0]
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
