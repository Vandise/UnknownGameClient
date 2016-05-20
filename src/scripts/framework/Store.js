import Dispatcher from './Dispatcher';

let notifyQueue = [];
let events      = {};
let lCount      = 1;

let indexOf = (array, el) => {
  if(array.indexOf) return array.indexOf(el);
  let len = array.length;
  if(len === 0) return -1;
  for(let i = 0; i < len; i++) {
    if(array[i] === el) return i;
  }
  return -1;
};

Dispatcher.onTransaction = () => {
  let ranCache = [];
  while(notifyQueue.length) {
    let listener = notifyQueue.shift();
    if(indexOf(ranCache, listener[0]) === -1) {
      ranCache.push(listener[0]);
      listener[0]();
    }
  }
};

let registerFn = (sid, fn) => {
  events[sid].push([fn, lCount]);
  return lCount++;
};

let registerComponent = (sid, comp) => {
  let origUnmount = comp.componentWillUnmount;
  let origMount   = comp.componentDidMount;
  let lid         = lCount;

  comp.componentDidMount = () => {
    events[sid].push([() => {
      if(!comp.shouldComponentUpdate || comp.shouldComponentUpdate())
        comp.forceUpdate();
    }, lid]);
    origMount && origMount.call(comp);
  };

  comp.componentWillUnmount = () => {
    origUnmount && origUnmount.call(comp);
    let i = events[sid].length;
    let index;
    while(i--) {
      if(events[sid][i][1] === lid) {
        index = i;
        break;
      }
    }
    events[sid].splice(index, 1);
  };

  return lCount++;
};

let createRegisterFn = (sid) => {
  return function(listener) {
    if(!events[sid]) events[sid] = [];
    return typeof(listener) === 'function'
           ? registerFn(sid, listener)
           : registerComponent(sid, listener);
  };
};

let createUnregisterFn = (sid) => {
  return function(lid) {
    let i = events[sid] ? events[sid].length : 0;
    let index;
    while(i--) {
      if(events[sid][i][1] === lid) {
        index = i;
        break;
      }
    }
    if(typeof(index) !== 'undefined')
      events[sid].splice(index, 1);
  };
};

let notify = (sid) => {
  notifyQueue = notifyQueue.concat(events[sid] || []);
  return true;
};

let createStore = (events, api, notifyCheck) => {
  let checkVal  = notifyCheck && notifyCheck();
  let check     = !!notifyCheck;
  let evts      = events;

  api.sid = Dispatcher.register((e, body) => {
    if(evts[e]) {
      if(check) {
        let oldVal  = checkVal;
        checkVal    = notifyCheck();
        if(checkVal !== oldVal) notify(api.sid);
      } else { notify(api.sid) }
      evts[e](body);
    }
  });

  api.unregister  = createUnregisterFn(api.sid);
  api.register    = createRegisterFn(api.sid);

  return api;
};

export default function(events, api, notifyCheck) {
  return createStore(events || {}, api || {}, notifyCheck);
};