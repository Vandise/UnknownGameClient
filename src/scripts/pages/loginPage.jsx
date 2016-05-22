import React        from 'react';
import { Link }     from 'react-router';
import Dispatcher   from '../framework/default';

export default class LoginPage extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div>
        <h1>Login page</h1>
      </div>
    );
  }

}