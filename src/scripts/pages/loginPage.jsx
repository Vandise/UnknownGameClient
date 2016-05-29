import React        from 'react';
import { Link }     from 'react-router';
import { ACTIONS }  from '../constants';
import Dispatcher   from '../framework/default';
import MessageModal from '../components/shared/messageModal';
import AuthStore    from '../stores/authStore';

import Styles from '../../styles/pages/login.sass';

export default class LoginPage extends React.Component {

  constructor() {
    super();
    this.cid = AuthStore.register(this);
    AuthStore.bindGS();
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentWillMount() {
    console.log('Mounting login page');
    console.log(this.props.params);
  }

  componentWillUnmount() {
    AuthStore.unregister(this.cid);
    AuthStore.unBindGS();
  }

  handleLogin() {
    let un = this.refs.account.getDOMNode().value;
    let pw = this.refs.password.getDOMNode().value;
    Dispatcher.dispatch(ACTIONS.AUTH.LOGIN_ATTEMPT, {
      username: un,
      password: pw
    });
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
              <input type='text' name='account' ref='account' />
            </label>
          </div>
          <div className='input-container'>
            <label for='password'>
              <div className='label-text'>Password</div>
              <input type='password' name='password' ref='password' />
            </label>
          </div>
          <div className='user-actions'>
            <a className='button red' onClick={this.handleLogin}>Ok</a>
            <Link to="/" className='button red'>Cancel</Link>
          </div>
        </div>
      </div>
    );
  }

}