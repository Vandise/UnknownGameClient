import { ACTIONS, CONNECT_SERVER_HOST, CONNECT_SERVER_PORT, CLIENT_VERSION, ERRORS }  from '../constants';
import Dispatcher from '../framework/default';
import io         from 'socket.io-client';

let connectError   = null;
let connectTimer   = null;
let connectAttempt = 0;

let serverHost    = null;
let serverPort    = null;
let activeServers = [];

let connOptions = {
  transports: ['websocket']
};

let socket = io.connect(`${CONNECT_SERVER_HOST}:${CONNECT_SERVER_PORT}`, connOptions);

socket.on('get_active_servers', (serverList) => {
  Dispatcher.dispatch(ACTIONS.CS.SET_ACTIVE_SERVERS, serverList);
});

let events = {

  [ACTIONS.CS.CONNECT]: (e) => {
    connectTimer = setInterval(() => {
      if (!socket.connected) {
        if (connectAttempt >= 5) {
          Dispatcher.dispatch(ACTIONS.CS.CONNECT_FAILED, ERRORS.CS_OFFLINE);
          clearInterval(connectTimer);
        } else {
          connectAttempt++;
        }
      }
    }, 1500);

    socket.on('connect', () => {
      Dispatcher.dispatch(ACTIONS.CS.GET_ACTIVE_SERVERS, {});
    });

  },

  [ACTIONS.CS.CONNECT_FAILED]: (error) => {
    socket.disconnect();
    connectError = error;
  },

  [ACTIONS.CS.GET_ACTIVE_SERVERS]: (options) => {
    socket.emit('get_active_servers', options);
  },

  [ACTIONS.CS.SET_ACTIVE_SERVERS]: (servers) => {
    console.log(servers);
    activeServers = servers;
  },

};

export default Dispatcher.Store(events, {

  getActiveServers() {
    return activeServers;
  },

  getConnectError() {
    return connectError;    
  },

  getServerHost() {
    return serverHost;
  },

  getServerPort() {
    return serverPort;
  },

  reset() {
    activeServers = [];
    connectError  = null;
    serverHost    = null;
    serverPort    = null;
  },

});