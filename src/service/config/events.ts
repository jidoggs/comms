export const EVENTS = {
  JOIN_CREATE_ROOM: (cid: string, uid: string) =>
    `correspondence-${cid}-user-${uid}`,
  QUEUE_CORRS: (uid: string) => `minute-queue-${uid}`,
  ONGOING_CORRS: (uid: string) => `minute-ongoing-${uid}`,
};
