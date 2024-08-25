import { Client } from '@stomp/stompjs';

export interface WsStoreState {
  stompClient: Client | null;
  isConnected: boolean;
}

export interface WsStoreConnectParams {
  onError?: (message: string) => void;
}
