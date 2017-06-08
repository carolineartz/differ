import React, { Component } from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';

import ReactJson from 'react-json-view';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Button from 'grommet/components/Button';
import Anchor from 'grommet/components/Anchor';
import AddCircleIcon from 'grommet/components/icons/base/AddCircle';
import SubtractCircleIcon from 'grommet/components/icons/base/SubtractCircle';
import InspectIcon from 'grommet/components/icons/base/Inspect';
import ViewIcon from 'grommet/components/icons/base/View';

class ResultSet extends Component {
  constructor(props) {
    super(props)
    this.handleClickToggleCollapse = this.handleClickToggleCollapse.bind(this);
    this.state = {collapsed: true}
  }

  handleClickToggleCollapse() {
    this.setState({collapsed: !this.state.collapsed})
  }

  renderExpandCollapseToggle() {
    return (
      <Button className="expand-all-toggle" icon={<ViewIcon />}
        label='Toggle Expand All'
        onClick={this.handleClickToggleCollapse}
        plain={true}
      />
    )
  }

  render() {
    const { icon, label, resultData, rootLabel } = this.props;
    console.log(this.reactJsonView && this.reactJsonView.state.collapsed);
    return(
      <Box direction="row" basis="full" separator="bottom">
        <Heading tag="h3">
          <div className="result-set-heading">
            {icon}
            {label}
          </div>
        </Heading>
        <Box direction='column' justify='center' pad={{horizontal: "medium", vertical: "small"}}>
          <ReactJson
            displayDataTypes={false}
            src={resultData}
            displayObjectSize={false}
            indentWidth={3}
            name={`${_.camelCase(rootLabel)}`}
            collapsed={this.state.collapsed}
          />
        </Box>
        <Box direction='column' justify='start'>
        {
          this.renderExpandCollapseToggle()
        }
        </Box>
      </Box>
    )
  }
}

// const ResultSet = ({label, icon, resultData, rootLabel = label}) => (

// )

ResultSet.propTypes = {
  label: PropTypes.string.isRequired,
  resultData: PropTypes.object.isRequired,
  icon: PropTypes.element
}

export default ResultSet;
