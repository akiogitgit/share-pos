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
export const toCamelCaseObj = (_obj: Record<any, any>) => {
  const obj = { ..._obj } as Record<string, any>
  const result: Record<string, Record<string, any> | []> = {}

  for (const key in obj) {
    if (typeof obj[key] !== 'object') {
      result[toCamelCase(key)] = obj[key]
      continue
    }
    if (Array.isArray(obj[key])) {
      result[toCamelCase(key)] = obj[key].map((v: object) => toCamelCaseObj(v))
      continue
    }
    result[toCamelCase(key)] = toCamelCaseObj(obj[key] as object)
  }

  return result
}
