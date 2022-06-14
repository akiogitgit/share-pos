export const isEmptyObj = (obj: Record<any, any>) => {
  return Object.entries(obj).length === 0
}
