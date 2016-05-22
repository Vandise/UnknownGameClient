import React  from 'react';
import Dispatcher   from '../../framework/default';
import { ACTIONS }  from '../../constants';

import Styles from '../../../styles/components/serverList.sass';

export default class ServerList extends React.Component {

  render() {
    let servers = this.props.servers;
    return (
      <div className='server-list-container'>
        <ul className='server-list'>
          {Object.keys(servers).map((host) => {
            return (
              <li className='host-name'>{host}
                <ul>
                  {(servers[host]).map((server) => {
                    return (
                      <li>
                        <a className='sub-server'
                            onClick={() => Dispatcher.dispatch(ACTIONS.CS.VALIDATE_CLIENT_ATTEMPT, server)}
                          >
                          <span className='server-name'>{server.name}</span>
                          <span className='server-stats'>{server.connections} / {server.max_connections}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
 
}