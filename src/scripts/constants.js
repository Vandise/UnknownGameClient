import Dispatcher from './framework/default';

export default {

  CLIENT_VERSION: '0.0.1',
  CONNECT_SERVER_HOST: 'localhost',
  CONNECT_SERVER_PORT: 44500,

  ACTIONS: {

    CS: Dispatcher.Actions([
      'CONNECT',
      'CONNECT_FAILED',
      'GET_ACTIVE_SERVERS',
      'SET_ACTIVE_SERVERS',
    ]),

  },

  ERRORS: {
    CS_OFFLINE: {
      code:    1.1,
      message: 'Unable to retrieve a list of available servers',
      sendReport: false,
    },
  },

};