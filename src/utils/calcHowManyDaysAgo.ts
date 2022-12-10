export const calcHowManyDaysAgo = (date: string) => {
  const now = Date.now()
  const targetDate = new Date(date)
  const targetTime = targetDate.getTime()

  const nowM = ~~(now / 1000 / 60)
  const nowH = ~~(nowM / 60)
  const nowD = ~~(nowH / 24)
  const nowY = ~~(nowD / 365)

  const targetM = ~~(targetTime / 1000 / 60)
  const targetH = ~~(targetM / 60)
  const targetD = ~~(targetH / 24)
  const targetY = ~~(targetD / 365)

  if (nowY !== targetY) {
    return targetDate.toLocaleDateString().replace(/\//g, '-')
  }
  if (nowD - targetD > 31) {
    return `${~~((nowD - targetD) / 31)}ヶ月前`
  }
  if (nowD !== targetD) {
    return `${nowD - targetD}日前`
  }
  if (nowH !== targetH) {
    return `${nowH - targetH}時間前`
  }
  return `${nowM - targetM}分前`
}
