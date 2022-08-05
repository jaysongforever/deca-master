const axios = require('axios')

const decaList = [
  {
    usernameOrAddress: 'giveme',
    cookie: '__Host-next-auth.csrf-token=5ba3626cbde4d7ff7d438dc662a5c2ebb54c034b67d3cb719d678cc0eaef14c3%7Cfc1b5a77acbc213463389506e019acd14f3bdb8a34a9935b77b2903bad68e6a5; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_ses_props.3997967461=%7B%22ts%22%3A1659620541920%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fdxp%22%2C%22ubv%22%3A%22103.0.5060.134%22%2C%22upv%22%3A%2214.0.0%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%224345641330196707%22%2C%22pageviewId%22%3A%224738362969714528%22%2C%22sessionId%22%3A%221489663619572408%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..BQw0jyiJKnn3aHQt.urNrsks27wxgs_iJgP39oR8ysozFy4UD00nj1AEVTipODOChL1eW-ZOVeZ2M4FCh94iqkPLtI2s9uDcTpGkT1fxR_kVffHe9Y57LiTARRofPRTt_z9rX6p3XH2ICqtMToAjhgxQdNUcHRei2gDfQkmCi9tzmypBz98B7-YB610lCuvhW5In0_5aM3mpjvc6fxvSkhyZyNPCK2NNkovor2vmQzHwHI_DS.EdSHCWyLWOZNyek2hVVqcA'
  },
  {
    usernameOrAddress: 'sushiswap',
    cookie: '_hp2_ses_props.3997967461=%7B%22ts%22%3A1659620600838%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fdxp%22%2C%22ubv%22%3A%22103.0.5060.134%22%2C%22upv%22%3A%2214.0.0%22%7D; __Host-next-auth.csrf-token=a789c46a09fe18ea4405f4e410386f3db6c44961dcf90075517fa1dd1b867c25%7C25eda41b8d23c3ddffc426e4c49e0f9845781eb3ed366257025e7ece5eaa03b0; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_id.3997967461=%7B%22userId%22%3A%225554369726775283%22%2C%22pageviewId%22%3A%224183882912829044%22%2C%22sessionId%22%3A%227279793359064381%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..SHAXTJRbe2WJQmAs.C43IPtvfHFVBlz9PdViZWZdGQQIJd4eAD0E_TWuhaolcYe5WuPEJepaCCjFIaxdQBdQbaETI-MjhCJTE1FcPa8TDlBKkf_MyJjxOJA8DweG_7ySSsOE4S9_sLyY2R94zIKjAelhF6nViQ9F8RpyrKDi3ysFfHqWRQxeEsOHXvEvxjXA5bqV81yUi2nr3CLvTJDmazOHQHAsgpTb4-92D8yygtat4oDp2.iy1MsaEpFGAMifuP4aAsHA'
  },
  {
    usernameOrAddress: 'spots',
    cookie: '__Host-next-auth.csrf-token=f0bd8f87648006f79ca74bb47fc6786579aa50f953acd9f22275f07d98f0f651%7C0cac17481f47b4ccb7bf7724a3f8ebdffd0cefa79b165b6baae07000a4a62413; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_ses_props.3997967461=%7B%22ts%22%3A1659620603218%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fdxp%22%2C%22ubv%22%3A%22103.0.5060.134%22%2C%22upv%22%3A%2214.0.0%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%227443871534123329%22%2C%22pageviewId%22%3A%225543246976770971%22%2C%22sessionId%22%3A%227890077216968051%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..zcSZAoBd_J4DbQ8a.fu8s1B0ookqFul2v-80nrdSg6Z492-IgRU0wvbqghiB81sO2TpZANYe0sdA0tPh1o6jDmNeLkdZTli9dKDWpmrL5Rfz0Etty3us-tYajhh2MsWQAlpK7vkp6YjaiEFgCU-OGda09pU4fB3yHBiR4E2r4YEg6we6mEnKKGiMrskXKESKweACTk7iPLfEuImnSWCn5537YgW9bwuGnDKxse8KaGh4DLvnt.0R-cl4MOQ3vGkueBgwSAHg'
  },
  {
    usernameOrAddress: 'Dragon55',
    cookie: '__Host-next-auth.csrf-token=13a166fe91d6d14f24590d472d9ce6ab65f19e8a5b8f8377f86d5921cc5de06c%7Cbde8998f632236b2482b0ce54a4c907bd72cd764051b9a5f8255192c133d1c1c; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_ses_props.3997967461=%7B%22ts%22%3A1659620606080%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fdxp%22%2C%22ubv%22%3A%22103.0.5060.134%22%2C%22upv%22%3A%2214.0.0%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%227168217127586343%22%2C%22pageviewId%22%3A%224149183785118807%22%2C%22sessionId%22%3A%225208400433166593%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0.._0SLKBVgCUW1epdS.SS3FmozRJZA127Uq_cpXucvwOhXC9c9XXOpLccx_edaviY81cXSYWEZfirF6jJLsfWf2lYBWblfC7sTFdndVdqjDoSKisOBWcUfEx1V3N8uM6Qr6mqLDh0jgMPjFLi5cVh7C2LZauliXjmD6pivQYB1Oa57YLX2QI6-TXUFiHTISJPaciVk9Ud5gmB6TfVRF2bexNnPiPUkLdqFa3agzp-ffqhl9EDKG.RlncNVyNbou4GyWoM8FHTg'
  },
  {
    usernameOrAddress: 'pppost',
    cookie: '__Host-next-auth.csrf-token=79ba86cc8c63056e70dce1a0417829b0a27c7624879b40401099ac7d1d4c73ad%7C6b642f3585ec88c418c88e0492545e20c01f9e6f94848f3b84b4079f3ade03aa; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_ses_props.3997967461=%7B%22ts%22%3A1659620608126%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fdxp%22%2C%22ubv%22%3A%22103.0.5060.134%22%2C%22upv%22%3A%2214.0.0%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%227483410050653078%22%2C%22pageviewId%22%3A%221369462546496524%22%2C%22sessionId%22%3A%224478763855462996%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..ckBMo5ATMzRqykJ5.ec9RzOZojKIhPfg3pW6BWtcJ_Ii9vjx3gENY_z3YMpkxv2wGtfdTTpiZmNl8ySI4tBFpCqWuxdiwCyx-zOkySGa_MpDCN6YxqcsXdDIpFJ80PlUYDCR63xjeIvDQvXSRX12rcuy_nHQGSAawtigEMcAxKoEeV1jHKo5ubUUVS0rueNOSxCvVkvUeQ6_mg9AfzUKl6RBkKnCMym9ncG-nMuG0F573NF19.XCycUgihnhXpl_xZN-aKGQ'
  },
  {
    usernameOrAddress: 'trable',
    cookie: '__Host-next-auth.csrf-token=7d5fc7bebb797cbda0079d05243ddd4d134dcdc2c742de75c2f4a623e5f2cec9%7Caebcecb31f68e251ffc11a9b0e8cdef479da84dd85101041c04cc56713d92374; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_ses_props.3997967461=%7B%22ts%22%3A1659620610687%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fdxp%22%2C%22ubv%22%3A%22103.0.5060.134%22%2C%22upv%22%3A%2214.0.0%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%228127818524524228%22%2C%22pageviewId%22%3A%224502676938713891%22%2C%22sessionId%22%3A%223457212410722657%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..9_aIHcYKYI2ZL8rA.-ed6z6mQQPF7ITr27YpH_FfVs5V8krXrN2iZTja3gXrL22853JEPSblZuFrYrCpbUthdqR1qwzvtrgxV9SJSnEeUSjvfCyabpsKJhGn4TfdGfViF31QJOtYSVhuNosBuWQancUTIiHYf5HskbqMMsYLJnKju0xdvmwnBVY8iNH7fE_EjHY8udPZulpq_KUgfEesui6GhSkt2c55yEK08qjpLTWot-lIp.u2aitJjJqRV3jFOquvIN3g'
  },
  {
    usernameOrAddress: 'monkeyboy',
    cookie: '__Host-next-auth.csrf-token=af5783eaf9bd5a2703b095bb8dd9d57f9fa190acb1cfd420ab82599d1bba6916%7Cb6b33d2aba9147b623824dd52f5e0d394511efd019b7514848fa96ab42959dd9; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_ses_props.3997967461=%7B%22ts%22%3A1659620612868%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fdxp%22%2C%22ubv%22%3A%22103.0.5060.134%22%2C%22upv%22%3A%2214.0.0%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%221320394680254514%22%2C%22pageviewId%22%3A%227402917125367744%22%2C%22sessionId%22%3A%225718690737045983%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..nOhqGzNBw7XZqom4.UeYOWGP3f4H-rvtXECGwHTYYl08IskgIRgebbi9J1LcfNkTkZJ1l5m22hid8vI8R30uEgwDy7ltvYh5XzHcWH-KwTGLuWZIKiQEUQ5N9K3pVf74LbwSfD3Z3aD-QapF5esRAzMod0ylf6ixvNFh-TKxq6vNM9X1GEUWQDaYSh3BJNHsMsbYweEhyRQoG4LKExuWWYCd6n8vJvrcfCUZGtJvj0oQt8wCz.eoliA4lirOfPbyPgy2qoMg'
  },
  {
    usernameOrAddress: 'cakecake',
    cookie: '__Host-next-auth.csrf-token=5782f3d64d49d8f6ffc45934e730c9fe6271a72587983704fb42252e8fb4f139%7C0ae506f3f4e17ae5c6e5610ab95c99a79c303a29b582edcc15309014ca0d2754; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_ses_props.3997967461=%7B%22ts%22%3A1659620615433%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fdxp%22%2C%22ubv%22%3A%22103.0.5060.134%22%2C%22upv%22%3A%2214.0.0%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%228911226311949396%22%2C%22pageviewId%22%3A%222994311521525455%22%2C%22sessionId%22%3A%223605286705754869%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..MOcwpzgBm0IKIZUL.exQEQg1uanhGaSLZlFajQWQr2-E_pOEAz57Rg_l1oYWQS5APx1D-BKdy0UGMh-C6Gbz4YeUzuFKqbqs0RKTSxj9kWhigr4BsZZSw267YPvdwMy6B1VoQR0zLnPEwHij9fslSdraliaYJnXttlM5Xj8PzPvo3wVcG_9Y9gdSwS27GGSJFxNrHLcihpJPx0jaSaYAwJxXTkEBgLcPQOkIEZMZS8AudjoeK.jZv9AKUYOgfPG3OkUUTB-g'
  },
  {
    usernameOrAddress: 'object',
    cookie: '__Host-next-auth.csrf-token=686fb7265a2c43c3c6288987eba176be8bf39a0e62f141c4fb318254a8e52723%7C13c260b11fc1a6d29f8e862a6083d568a5d5c98dda482fdb2026a7ff8b14d203; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_ses_props.3997967461=%7B%22ts%22%3A1659620617949%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fdxp%22%2C%22ubv%22%3A%22103.0.5060.134%22%2C%22upv%22%3A%2214.0.0%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%224310684043550752%22%2C%22pageviewId%22%3A%22401124879076731%22%2C%22sessionId%22%3A%224926219207748375%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..s4IfzCKRU3aj4RaK.npXvxT1zlhfFGHfFyPrqAX07A8svRl93b3fPUvEsKgflSOStATuKnIcSCjTYz4fIbm0lLgDmTf5b0D9aYsiKBlvm26YxnduHNVbrypYzuN66zHVW47BCmfJjJ_ombsKDdP8nlxQzJQNSFeAc7k4DX82S3lBLtv9_KSPF0rc1NgKW2WuJIh8hVyQ1_f5GGrKuGZnwB8-_P07VOPjvQbIcuFpwDLc-m4bP.v_ltGM4QTw0OUkhNeTRcvQ'
  },
  {
    usernameOrAddress: 'human',
    cookie: '__Host-next-auth.csrf-token=c54cd449e34137044c4f5eca890335f14e02b0e73946f0c7d4d1f7c4f46448fc%7Cdfff1af75e7a2145477c38b2c131abd046a0f673c20a652b47125d5939553ef1; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_ses_props.3997967461=%7B%22ts%22%3A1659620620368%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fdxp%22%2C%22ubv%22%3A%22103.0.5060.134%22%2C%22upv%22%3A%2214.0.0%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%225761194858392707%22%2C%22pageviewId%22%3A%226077733398079884%22%2C%22sessionId%22%3A%222086826632559099%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..V0lPGWDSs-XJpQPJ.NVvjnpD1B-7J0F5KAxvHlkqsr7AwcKwVvPUTPH-31QQNOOJdWU7mTLGaCClq6YftVyXwmOVIZv_uXH1EMIYOZFnNIoZmVqdECNY_KQUvoHm5_0YeZpqdqnHsEFxJ9Y7yNLEQvGLaDhGEwa0niPgOBm85yYUcpNhVJDstPGCZWeNhAz6m83meGjfxlIsIVnDc8XXzXekjAX8lUXs_8_BF4R6QEfzLYNMy.ewuxSi4bEHBPVc8kRXmV-g'
  },
  {
    usernameOrAddress: 'a16za',
    cookie: '__Host-next-auth.csrf-token=e9efad2bf4dedb32b58f223a802609c25be45fcf82a627d140504aa96dcec1de%7C2399f73c7eec23e9948993d5159605712910634ac1af44c936aa411200182c3f; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_ses_props.3997967461=%7B%22ts%22%3A1659620622912%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fdxp%22%2C%22ubv%22%3A%22103.0.5060.134%22%2C%22upv%22%3A%2214.0.0%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%222496264982485921%22%2C%22pageviewId%22%3A%222259140529729365%22%2C%22sessionId%22%3A%22269236160335310%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..MBXZQa4949PLJ2E9.OOQUwfENSeLoSQtcxjjByPT8lO25vLWMygfTx9zA6d-cWcfSrgmtZx1YSN5B5ywhXTom3XKvMlI9zgXPTTukEyghzfGKGTfsugTyXgruLa_VLWlEDZWhxJrAYlKgjf77_HGQIhSWZgefVo07jmTpSfF26g3brhYYHOxIJp-CXaRaz2cstNW0EPQ_jMxH_EUa8Xjqq-9vRIejv4E8kpYQV4FxcoXygzld.3BszS4oVAbNIyL0eNJI5pQ'
  },
  {
    usernameOrAddress: 'camera',
    cookie: '__Host-next-auth.csrf-token=5d690a97dcaef952fa5ffb20d233d79e89d0914f7fcac578f8f256d9c5721239%7Ca7cd70179b54a5ad22601b1d33085e7166eb71fcd7b21e632f213b870a6f97f8; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_ses_props.3997967461=%7B%22ts%22%3A1659620624687%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fdxp%22%2C%22ubv%22%3A%22103.0.5060.134%22%2C%22upv%22%3A%2214.0.0%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%223878790825908765%22%2C%22pageviewId%22%3A%226721043930598190%22%2C%22sessionId%22%3A%226697250807126389%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..uT0hWizdR51zEGxy.ae0mSz4i_oR2H71vjZtt3cOID31WRLdRV0Am7pLgquM58yqZoqC--mlt5n1M_IB7-lkaN-3c4k1_a2ouA_tAc25QMhk4GKOlbs8ZzzUFJN6CH6t07IUfKrnv1WdI9RNAKs0yWnSRi2is6WPiLgjvfEvjmFYTVEzacxKmlxxncOA.5POXLMSFOvw_KXKKGAv6Gw'
  },
  {
    usernameOrAddress: 'Funny',
    cookie: '_hp2_ses_props.3997967461=%7B%22ts%22%3A1659620627788%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fdecagon%2Fdxp%22%2C%22ubv%22%3A%22103.0.5060.134%22%2C%22upv%22%3A%2214.0.0%22%7D; __Host-next-auth.csrf-token=4be152d3576b3e2029e2c86300647702004cafb1b41c877cfb727f01a73ae670%7C3c58ee5584fa7de0c7ea4cffd7934f542456bfc5afc547e65871c149def757ea; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_id.3997967461=%7B%22userId%22%3A%222063711366323619%22%2C%22pageviewId%22%3A%228552577292222118%22%2C%22sessionId%22%3A%227974561684493460%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..sfTT34iNh7JWgCfR.ihqAPAazPi94VmMV4_38krsky8g2sQqKWNAUNexMfX6buNfnvSvmMJAAbCnyqa6CUO_jxnzcAxPgQ2ss3PIglzp7Fp1Qgui1nnr8KtiRBYhtlXVpXhymA_y8E_GqHQgAwJ28SVNcPuVDQAU4gSV7JoRBsVwLwgY69U8eMVpAlshRFXCtZXIzWzA4Eyxz5fmTFvMUsKPqksxoq_i-RIOEN2-YY2SOx3OJWw.pAzSyHsZI0ui0Ku6iTb24g'
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

  for(let d = 0; d < decaList.length; d++) {
    const galleryInfo = await getGalleries(decaList[d].usernameOrAddress, decaList[d].cookie).catch(err => {})
    if (galleryInfo && galleryInfo.data) {
      const info = galleryInfo.data
      const galleries = info.data.galleries
      for (let i = 0; i < galleries.length; i++) {
        const res = await deleteGallery(galleries[i].id, decaList[d].cookie)
        if (res.data && res.data.data.deleteGallery) {
          console.log(`🚀 ~ 已删除第 ${i + 1} 个`)
        }
      }
    }
  }
})()

