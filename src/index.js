import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './componenets/Dashboard/Dashboard';
import ProductManagement from './componenets/ProductManagement/ProductManagement';
import OrderManagement from './componenets/OrderManagement/OrderManagement';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/products" component={ProductManagement} />
        <Route path="/orders" component={OrderManagement} />
      </Switch>
    </Router>
  );
};

export default App;


ReactDOM.render(<App />, document.getElementById('root'));
