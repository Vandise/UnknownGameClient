import { ACTIONS }  from '../constants';
import Dispatcher   from '../framework/default';

let message   = null;
let errorCode = null;
let options   = [];

let events = {

  [ACTIONS.MESSAGE.ADD_MESSAGE]: (data) => {
    console.log('Adding message');
    console.log(data);
    message   = data.message;
    errorCode = data.code;
    options   = data.options || [];
  },

  [ACTIONS.MESSAGE.CLEAR_MESSAGE]: (data) => {
    message   = null;
    errorCode = null;
    options   = [];
  }

};

export default Dispatcher.Store(events, {

  getMessage() {
    return message;
  },

  getErrorCode() {
    return errorCode;
  },

  getOptions() {
    return options;
  }

});