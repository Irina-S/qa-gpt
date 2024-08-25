import { defineStore } from 'pinia';
<<<<<<< aede35408dd1833778a386b9bdf9b844452c15a3
=======
import { Client } from '@stomp/stompjs';
>>>>>>> 8616d4c7f71176cc138679e85c1c6ef1a9bbc5d3

import type { WsStoreConnectParams, WsStoreState } from './types';

import { Client } from '@stomp/stompjs';

export const useWebSocketStore = defineStore('websocket', {
  state: (): WsStoreState => ({
    stompClient: null,
    isConnected: false
  }),
  actions: {
    connect({ onError }: WsStoreConnectParams) {
      const apiUrl = import.meta.env.VITE_API_BASE_URL as string;
      const wsUrl = apiUrl.replace(/^http(s?)/, 'ws') + '/ws';
<<<<<<< aede35408dd1833778a386b9bdf9b844452c15a3

=======
>>>>>>> 8616d4c7f71176cc138679e85c1c6ef1a9bbc5d3
      this.stompClient = new Client({
        brokerURL: wsUrl
      });

<<<<<<< aede35408dd1833778a386b9bdf9b844452c15a3
      this.stompClient.onConnect = () => {
=======
      this.stompClient.onConnect = (frame) => {
>>>>>>> 8616d4c7f71176cc138679e85c1c6ef1a9bbc5d3
        this.isConnected = true;
      };

      this.stompClient.onWebSocketError = (error) => {
        onError?.(error);
      };

      this.stompClient.onStompError = (frame) => {
        onError?.(frame.headers['message']);
      };

      this.stompClient.activate();
    },
    // @@TODO: избавиться от any
    subscribeToMessages(topicId: string, receiveCb: (...args: any[]) => void) {
      this.stompClient?.subscribe(`/topic/messages/${topicId}`, (messageData) =>
        receiveCb(JSON.parse(messageData.body))
      );
    },
    sendMessage(topicId: string, message: string) {
      this.stompClient?.publish({
        destination: `/app/${topicId}/createMessage`,
        body: message
      });
    },
    async disconnect() {
      await this.stompClient?.deactivate();
      this.isConnected = true;
    }
  }
});
