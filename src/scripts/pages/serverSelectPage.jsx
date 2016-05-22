import React        from 'react';
import { Link }     from 'react-router';
import Dispatcher   from '../framework/default';
import { ACTIONS }  from '../constants';
import MessageModal from '../components/shared/messageModal';
import CsStore  from '../stores/csStore';
import ServerList   from '../components/serverSelect/serverList';

import Styles       from '../../styles/pages/serverSelectPage.sass';

export default class ServerSelectPage extends React.Component {

  constructor() {
    super();
    CsStore.reset();
    this.cid = CsStore.register(this);
  }

  componentWillMount() {
    Dispatcher.dispatch(ACTIONS.CS.CONNECT, {});
  }

  componentWillUnmount() {
    CsStore.unregister(this.cid);
  }

  render() {
    let servers = CsStore.getActiveServers();
    let error   = CsStore.getConnectError();

    if (Object.keys(servers).length > 0) {
      return (
        <div>
          <ServerList servers={servers} />
          <MessageModal error={error} />
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