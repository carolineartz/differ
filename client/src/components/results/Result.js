import React, { Component } from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';

import ReactJson from 'react-json-view';
import Heading from 'grommet/components/Heading';
import Button from 'grommet/components/Button';
import ViewIcon from 'grommet/components/icons/base/View';
import { Row, Col } from './../layout';

class Result extends Component {
  constructor(props) {
    super(props)
    this.handleClickToggleCollapse = this.handleClickToggleCollapse.bind(this);
    this.state = {collapsed: true}
  }

  handleClickToggleCollapse() {
    this.setState({collapsed: !this.state.collapsed})
  }

  render() {
    const { icon, label, resultData, rootLabel } = this.props;

    return (
      <Row>
        <Col defs='col-xs-12 col-sm'>
          <Row>
            <Col defs='col-xs-12'>
              <Heading style={{display: "inline-block"}} tag="h3">
                <div className="result-set-heading">
                  {icon}
                  {label}
                </div>
              </Heading>
              <Button style={{display: "inline-block"}} className="expand-all-toggle" icon={<ViewIcon />}
                label='Toggle All'
                onClick={this.handleClickToggleCollapse}
                plain={true}
              />
            </Col>
          </Row>
        </Col>
        <Col defs='col-xs-12'>
          <ReactJson
            displayDataTypes={false}
            src={resultData}
            displayObjectSize={false}
            indentWidth={3}
            name={`${_.camelCase(rootLabel || label)}`}
            collapsed={this.state.collapsed}
          />
        </Col>
      </Row>
    )
  }
}

Result.propTypes = {
  label: PropTypes.string.isRequired,
  resultData: PropTypes.object.isRequired,
  icon: PropTypes.element,
  rootLabel: PropTypes.string
}

export default Result;
