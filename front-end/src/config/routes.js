import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage.js';
import SinglePostPage from '../pages/SinglePostPage.js';

export default (
  <Switch>
    <Route exact path='/' component={ HomePage }/>
    <Route path='/posts/:post_id' component={ SinglePostPage }/>
  </Switch>
  )