import { ACTIONS, CONNECT_SERVER_HOST, CONNECT_SERVER_PORT, CLIENT_VERSION, ERRORS }  from '../constants';
import Dispatcher    from '../framework/default';
import io            from 'socket.io-client';
import Router        from '../router';
import * as Session  from '../util/sessionStorage';

let connOptions = {
  transports: ['websocket']
};

let GS       = null;
let socket   = null;
let loggedIn = Session.isLoggedIn();

let events = {

  [ACTIONS.AUTH.LOGIN_ATTEMPT]: (data) => {
    let input = [];
    input.push({name: 'username', value: data.username});
    input.push({name: 'password', value: data.password});

    console.log(input);
    socket.emit('login_attempt', input);
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

  bindGS() {
    GS = Session.getCurrentServer();
    socket = io.connect(`http://${GS.host}:${GS.port}`, connOptions);
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
  },

  unBindGS() {
    socket.destroy();
  }

});