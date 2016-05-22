import Router, { Route }  from 'react-router';
import React              from 'react';
import App                from './app';
import Pages              from './pages';

global.React = React;

let routes = (
  <Route handler={App}>

    <Route
      name='serverSelect'
      handler={Pages.ServerSelectPage}
      path='/'
    />

    <Route
      name='login'
      handler={Pages.LoginPage}
      path='/login'
    />

  </Route>  
)

export default Router.run(routes, function(Handler, state) {
  console.log(state);
  React.render(<Handler {...state} />, document.body);
});