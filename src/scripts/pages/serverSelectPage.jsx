import React        from 'react';
import { Link }     from 'react-router';
import Dispatcher   from '../framework/default';
import { ACTIONS }  from '../constants';
import MessageModal from '../components/shared/messageModal';
import ServerStore  from '../stores/serverStore';

import Styles       from '../../styles/pages/serverSelectPage.sass';

export default class ServerSelectPage extends React.Component {

  constructor() {
    super();
    ServerStore.reset();
    this.cid = ServerStore.register(this);
  }

  componentWillMount() {
    Dispatcher.dispatch(ACTIONS.CS.CONNECT, {});
  }

  componentWillUnmount() {
    ServerStore.unregister(this.cid);
  }

  render() {
    let servers = ServerStore.getActiveServers();
    let error   = ServerStore.getConnectError();

    if (Object.keys(servers).length > 0) {
      return (
        <div>
          <h2>This is the server select page with servers</h2>
          <MessageModal message={error} />
        </div>
      );
    } else {
      return (
        <div>
          <div className='serverMessage'>
            <p>Retrieving available servers. Please wait.</p>
          </div>
          <MessageModal error={error} />
        </div>
      );
    }
  }

}