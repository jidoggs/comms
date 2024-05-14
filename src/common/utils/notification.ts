import type { MessageInstance } from 'antd/es/message/interface';

export const messageHandler = async (
  type: 'success' | 'error' | 'loading' | 'warn',
  info: string
) => {
  const { default: antdMessage } = await import('antd/es/message');
  let message: MessageInstance = antdMessage;
  if (type === 'success') return message.success(info);
  if (type === 'error') return message.error(info);
  if (type === 'warn') return message.warning(info);
  return message.loading(info);
};
