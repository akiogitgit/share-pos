// 文字列をスネークケースからキャメルケースに変換する関数
export const toCamelCase = (str: string) => {
  return str
    .split('_')
    .map((segment, i) =>
      i === 0
        ? segment.toLowerCase()
        : segment[0].toUpperCase() + segment.slice(1).toLowerCase(),
    )
    .join('')
}

// objectのプロパティをスネークケースからキャメルケースに変換する関数
export const toCamelCaseObj = (_obj: object) => {
  const obj = { ..._obj } as Record<string, any>
  const result: Record<string, Record<string, any> | []> = {}

  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] !== 'object') {
      result[toCamelCase(key)] = obj[key]
      return
    }

    Array.isArray(obj[key])
      ? (result[toCamelCase(key)] = obj[key].map((v: object) =>
          toCamelCaseObj(v),
        ))
      : (result[toCamelCase(key)] = toCamelCaseObj(obj[key]))
  })

  return result
}
