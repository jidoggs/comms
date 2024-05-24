export const EVENTS = {
  JOIN_CREATE_ROOM: (cid: string, Uid: string) =>
    `correspondence-${cid}-user-${Uid}`,
  QUEUE_CORRS: (uid: string) => `minute-queue-${uid}`,
  ONGOING_CORRS: (cid: string, uid: string) =>
    `correspondence-${cid}-user-${uid}`,
};
