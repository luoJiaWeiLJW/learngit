
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Router, Route,hashHistory,IndexRedirect } from 'react-router';
// import {message} from 'antd';
import Affairs from './pages/Affairs';
import NotificationList from './pages/Affairs/NotificationList';
import Todo from './pages/Affairs/Todo';
import WarehousingRevenue from './pages/WarehousingRevenue';
import SalesRevenue from './pages/SalesRevenue';
import Spending from './pages/Spending';
import Financial from './pages/Financial';
import Setup from './pages/Setup';
import axios from 'axios';

//'/api'用于转发到gateway
axios.defaults.baseURL = '/';

 ReactDOM.render(
     (
    <Router history={hashHistory}>
          <Route path="/" component={App} key="23" >
              <IndexRedirect to="/Affairs/NotificationList"/>
              <Route path="Affairs" component={Affairs} >
                  <Route path="NotificationList" component={NotificationList}></Route>
                  <Route path="ToDo" component={Todo}></Route>
              </Route>
              <Route path="SalesRevenue" component={SalesRevenue}></Route>
              <Route path="WarehousingRevenue" component={WarehousingRevenue}></Route>
              <Route path="Spending" component={Spending}></Route>
              <Route path="Financial" component={Financial}></Route>
              <Route path="Setup" component={Setup}></Route>
          </Route>
      </Router>
)
, document.getElementById('root'));