let counter = 1;
let lock    = false;

let error = (err) => {
  console && console.error && console.error(err);
};

export default new class {
  constructor() {
    this.listeners = {};
  }

  register(cb) {
    this.listeners[counter] = cb;
    return counter++;
  }

  unregister(id) {
    delete this.listeners[id];
  }

  runTransaction(cb) {
    lock = true;
    cb();
    if(this.onTransaction) {
      try { this.onTransaction() }
      catch(e) { error(e) }
    }
    lock = false;
  }

  transaction(cb) {
    lock
      ? setTimeout(() => this.runTransaction(cb))
      : this.runTransaction(cb);
  }

  dispatchTo(id, evt, body, sync) {
    ((fn) => {
      sync ? fn() : this.transaction(fn);
    }(() => {
      if(this.listeners[id]) {
        try { this.listeners[id](evt, body) }
        catch(e) { error(e) }
      }
    }));
  }

  dispatch(evt, body) {
    this.transaction(() => {
      for(let id in this.listeners)
        this.dispatchTo(id, evt, body, true);
    });
  }
};