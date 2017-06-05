import React, { Component } from 'react';
import './App.css';

import App from 'grommet/components/App';
import Files from './components/Files';

export default class extends Component {
  render() {
    return (
      <div className='App'>
        <App>
          <Files />
        </App>
      </div>
    )
  }
}
