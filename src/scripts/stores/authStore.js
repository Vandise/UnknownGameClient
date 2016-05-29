import { ACTIONS, CONNECT_SERVER_HOST, CONNECT_SERVER_PORT, CLIENT_VERSION, ERRORS }  from '../constants';
import Dispatcher    from '../framework/default';
import io            from 'socket.io-client';
import Router        from '../router';
import * as Session  from '../util/sessionStorage';

let connOptions = {
  transports: ['websocket']
};

let GS       = Session.getCurrentServer();
let socket   = io.connect(`http://${GS.host}:${GS.port}`, connOptions);
let loggedIn = Session.isLoggedIn();

socket.on('disconnect', () => {
  let message = ERRORS.GS_OFFLINE;
  message.options = [
    {
      text: 'Ok', 
      onclick: () => {
        Dispatcher.dispatch(ACTIONS.MESSAGE.CLEAR_MESSAGE, {});
      }
    }
  ];
  Dispatcher.dispatch(ACTIONS.MESSAGE.ADD_MESSAGE, message);
});

let events = {

  [ACTIONS.AUTH.LOGIN_ATTEMPT]: (data) => {
    console.log(data);
  },

  [ACTIONS.AUTH.LOGIN_SUCCESS]: (data) => {

  },

  [ACTIONS.AUTH.LOGIN_FAILED]: (e) => {

  }
};

export default Dispatcher.Store(events, {

  isLoggedIn() {
    return loggedIn;
  },

});