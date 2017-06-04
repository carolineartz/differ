import React, { Component } from 'react';
import './App.css';

import App from 'grommet/components/App';
import SelectFiles from './components/SelectFiles';

export default class extends Component {
  render() {
    return (
      <div className='App'>
        <App>
          <SelectFiles />
        </App>
      </div>
    )
  }
}
