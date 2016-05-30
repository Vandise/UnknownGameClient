import { ACTIONS, LOGIN_ATTEMPT_MAX, ERRORS }  from '../constants';
import Dispatcher    from '../framework/default';
import io            from 'socket.io-client';
import Router        from '../router';
import * as Session  from '../util/sessionStorage';

let connOptions = {
  transports: ['websocket']
};

let GS       = null;
let socket   = null;
let attempt  = 0;
let loggedIn = Session.isLoggedIn();

let events = {

  [ACTIONS.AUTH.LOGIN_ATTEMPT]: (data) => {
    let input = [];
    input.push({name: 'username', value: data.username});
    input.push({name: 'password', value: data.password});
    socket.emit('login_attempt', input);
  },

  [ACTIONS.AUTH.LOGIN_SUCCESS]: (data) => {
    Session.login(data.user);
    Router.transitionTo('characterSelect', {});
  },

  [ACTIONS.AUTH.LOGIN_FAILED]: (status) => {
    attempt++;
    if (attempt === LOGIN_ATTEMPT_MAX) {
      attempt = 0;
      socket.disconnect(true);
      Router.transitionTo('serverSelect', {});
      return false;
    }
    let message = {
      code:    status.code,
      message: `${status.status} Attempt ${attempt}/${LOGIN_ATTEMPT_MAX}`,
      options: [
        {
          text: 'Ok', 
          onclick: () => {
            Dispatcher.dispatch(ACTIONS.MESSAGE.CLEAR_MESSAGE, {});
          }
        }
      ]
    };
    Dispatcher.dispatch(ACTIONS.MESSAGE.ADD_MESSAGE, message);
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

    socket.on('login_attempt', (response) => {
      if (response.code === 1) {
        Dispatcher.dispatch(ACTIONS.AUTH.LOGIN_SUCCESS, response);
      } else {
        Dispatcher.dispatch(ACTIONS.AUTH.LOGIN_FAILED, response);
      }
    });
  },

  unBindGS() {
    socket.destroy();
  }

});