import React        from 'react';
import { Link }     from 'react-router';
import Dispatcher   from '../framework/default';
import { ACTIONS }  from '../constants';
import ServerList   from '../components/serverSelect/serverList';
import * as Session  from '../util/sessionStorage';

import Styles       from '../../styles/pages/characterSelectPage.sass';

export default class CharacterSelectPage extends React.Component {

  constructor() {
    super();
  }

  render() {
    console.log('Current User: ');
    console.log(Session.currentUser());
    return (
      <div>
        <h3>Character Select Page</h3>
      </div>
    );
  }

}