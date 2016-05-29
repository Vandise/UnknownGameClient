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
      'VALIDATE_CLIENT_ATTEMPT',
      'VALIDATE_CLIENT_SUCCESS',
      'CLIENT_SERVER_MISMATCH'
    ]),

    AUTH: Dispatcher.Actions([
      'LOGIN_ATTEMPT',
      'LOGIN_SUCCESS',
      'LOGIN_FAILED'
    ]),

    MESSAGE: Dispatcher.Actions([
      'ADD_MESSAGE',
      'CLEAR_MESSAGE'
    ]),

  },

  ERRORS: {
    CS_OFFLINE: {
      code:    1.1,
      message: 'Unable to retrieve a list of available servers. Please try again later.',
      sendReport: false,
    },
    GS_OFFLINE: {
      code:    2.1,
      message: 'You have been disconnected from the server.',
      sendReport: false
    }
  },

};