import Dispatcher from './Dispatcher';
import Actions    from './Actions';
import Store      from './Store';

export default {
  Actions:   Actions,
  Store:     Store,

  dispatch(evt, body) {
    Dispatcher.dispatch(evt, body)
  },

  delayDispatch(evt, body) {
    setTimeout(Dispatcher.dispatch(evt, body),0);
  },

  bindDispatch(evt, body) {
    return (function() {
      return Dispatcher.dispatch(evt, body);
    });
  }
};