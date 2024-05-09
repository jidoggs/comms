export const messageHandler = async (
  type: 'success' | 'error' | 'loading',
  info: string
) => {
  const { default: message } = await import('antd/es/message');
  if (type === 'success') return message.success(info);
  if (type === 'error') return message.error(info);
  return message.loading(info);
};