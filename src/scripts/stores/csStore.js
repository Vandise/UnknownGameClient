import { ACTIONS, CONNECT_SERVER_HOST, CONNECT_SERVER_PORT, CLIENT_VERSION, ERRORS }  from '../constants';
import Dispatcher from '../framework/default';
import io         from 'socket.io-client';
import Router     from '../router';

let connectError   = null;
let connectTimer   = null;
let connectAttempt = 0;

let serverId      = null;
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

socket.on('authenticate_client', (response) => {
  if (response.status === 1) {
    Dispatcher.dispatch(ACTIONS.CS.VALIDATE_CLIENT_SUCCESS, {id: serverId});
  } else {
    Dispatcher.dispatch(ACTIONS.CS.CONNECT_FAILED, response);
  }
});

socket.on('server_error', (error) => {
  Dispatcher.dispatch(ACTIONS.CS.CLIENT_SERVER_MISMATCH, error);
});

let events = {

  [ACTIONS.CS.CONNECT]: (e) => {
    connectTimer = setInterval(() => {
      if (socket.connected) {
        clearInterval(connectTimer);
        return;
      }
      if (!socket.connected) {
        socket.connect();
        if (connectAttempt >= 5) {
          Dispatcher.dispatch(ACTIONS.CS.CONNECT_FAILED, ERRORS.CS_OFFLINE);
          clearInterval(connectTimer);
          return;
        } else {
          connectAttempt++;
        }
      }
      return;
    }, 1500);

    socket.on('connect', () => {
      Dispatcher.dispatch(ACTIONS.CS.GET_ACTIVE_SERVERS, {});
    });

  },

  [ACTIONS.CS.CONNECT_FAILED]: (error) => {
    socket.disconnect();
    Dispatcher.dispatch(ACTIONS.MESSAGE.ADD_MESSAGE, error);
  },

  [ACTIONS.CS.CLIENT_SERVER_MISMATCH]: (error) => {
    let message = error;
    message.options = [
      {
        text: 'Ok', 
        onclick: () => {
          Dispatcher.dispatch(ACTIONS.MESSAGE.CLEAR_MESSAGE, {});
        }
      }
    ];
    Dispatcher.dispatch(ACTIONS.MESSAGE.ADD_MESSAGE, error);
  },

  [ACTIONS.CS.GET_ACTIVE_SERVERS]: (options) => {
    socket.emit('get_active_servers', options);
  },

  [ACTIONS.CS.SET_ACTIVE_SERVERS]: (servers) => {
    activeServers = servers;
  },

  [ACTIONS.CS.VALIDATE_CLIENT_ATTEMPT]: (data) => {
    let gsData = {
      host: data.ip,
      port: data.port,
      version: CLIENT_VERSION
    };
    serverId = data.id;
    socket.emit('authenticate_client', gsData);
  },

  [ACTIONS.CS.VALIDATE_CLIENT_SUCCESS]: (server) => {
    Router.transitionTo('login', server);
    socket.disconnect();
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