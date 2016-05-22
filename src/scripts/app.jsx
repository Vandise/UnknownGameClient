import { RouteHandler }     from 'react-router';
import Dispatcher           from './framework/default';
import React                from 'react';
import { ServerSelectPage } from './pages';              

import Styles from '../styles/main.sass';

export default class GameApplication extends React.Component {

  render() {
    return (
      <div className='game-container'>
        <RouteHandler {...this.props} />
      </div>
    );
  }
  
};