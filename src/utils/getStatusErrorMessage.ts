const statusErrorMessages = {
  '400': '不正な入力です。入力を確認して再度実行して下さい。',
  '401': '認証エラーです。ログインして再度試してください。',
  '403': 'アクセスが拒否されました。管理者に問い合わせてください。',
  '404': '該当のページは存在しません。',
  default:
    '処理中にエラーが発生しました。しばらく時間をおいてから再度お試しください。',
}

type CustomizeMessages = Partial<typeof statusErrorMessages>

// mergedMessages[status] が文字列であることが保証される
type MergedMessages = Required<CustomizeMessages> & { [key: string]: string }

export const getStatusErrorMessage = (
  status: number,
  customizeMessages?: CustomizeMessages,
): string => {
  const mergedMessages: MergedMessages = {
    ...statusErrorMessages,
    ...customizeMessages,
  }

  return mergedMessages[status] || mergedMessages['default']
}
