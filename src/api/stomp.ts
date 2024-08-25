import { Client } from '@stomp/stompjs';

const apiUrl = import.meta.env.VITE_API_BASE_URL as string;
const wsUrl = apiUrl.replace(/^http(s?)/, 'ws') + '/ws';

export const stompClient = new Client({
  brokerURL: wsUrl
});
