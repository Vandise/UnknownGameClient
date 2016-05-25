import React        from 'react';
import { Link }     from 'react-router';
import Dispatcher   from '../framework/default';

import Styles from '../../styles/pages/login.sass';

export default class LoginPage extends React.Component {

  constructor() {
    super();
  }

  componentWillMount() {
    console.log('Mounting login page');
    console.log(this.props.params);
  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div>
        <div className='login-form'>
          <header>
            <h3>Server Login</h3>
          </header>
          <div className='input-container'>
            <label for='account'>
              <div className='label-text'>Account</div>
              <input type='text' name='account' rel='account' />
            </label>
          </div>
          <div className='input-container'>
            <label for='password'>
              <div className='label-text'>Password</div>
              <input type='password' name='password' rel='password' />
            </label>
          </div>
          <div className='user-actions'>
            <a className='button red'>Ok</a>
            <a className='button red'>Cancel</a>
          </div>
        </div>
      </div>
    );
  }

}