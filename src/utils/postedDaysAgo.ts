export const postedDaysAgo = (createdAt: string) => {
  const now = Date.now()
  const postDate = new Date(createdAt).getTime()

  const nowM = ~~(now / 1000 / 60)
  const nowH = ~~(nowM / 60)
  const nowD = ~~(nowH / 24)
  const nowY = ~~(nowD / 365)

  const postM = ~~(postDate / 1000 / 60)
  const postH = ~~(postM / 60)
  const postD = ~~(postH / 24)
  const postY = ~~(postD / 365)

  if (nowY !== postY) {
    return createdAt.slice(0, 10)
  }
  if (nowD - postD > 31) {
    return `${~~((nowD - postD) / 31)}ヶ月前`
  }
  if (nowD !== postD) {
    return `${nowD - postD}日前`
  }
  if (nowH !== postH) {
    return `${nowH - postH}時間前`
  }
  return `${nowM - postM}分前`
}
