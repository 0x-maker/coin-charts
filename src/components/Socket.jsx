import { API_URL_SOCKET } from 'constants.js';

const pricesWs = new WebSocket(`${API_URL_SOCKET}/prices?assets=ALL`)

const subscribeToSocketPrices = (callback) => pricesWs.onmessage = function (msg) {
  callback(msg.data);
}

export { subscribeToSocketPrices };
