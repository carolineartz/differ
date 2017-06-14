import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

import _ from 'lodash';

import Heading from 'grommet/components/Heading';
import Button from 'grommet/components/Button';
import CircleQuestionIcon from 'grommet/components/icons/base/CircleQuestion';
import Tip from 'grommet/components/Tip';
import { Row, Col } from './layout'

import { compareFiles } from '../actions/Api';
import OptionSet from './options/OptionSet';

class Options extends Component {
  constructor(props) {
    super(props);
    this.handleClickCompare = this.handleClickCompare.bind(this);

    this.state = {
      rowUniqueIdDisplayed: false,
      ignoreFieldsDisplayed: false,
      resultSets: props.resultSets,
      fileData: undefined,
      dataSets: [],
      multi: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.dataSets.length && nextProps.dataSets.length) {
      this.setState({
        fileData: nextProps.fileData,
        multi: nextProps.multi,
        dataSets: nextProps.dataSets
      })
    }
  }

  handleClickCompare() {
    const { dataSets, options, dispatch } = this.props;
    compareFiles(dataSets, options, dispatch);
  }

  toggleTip(el, text) {
    const id = el.currentTarget.id;
    if (this.state[id]) this.setState({[id]: false})
    else this.setState({[id]: true})
  }

  render() {
    const uniqueFieldsText = 'Combination of fields that together create a unique key';
    const ignoreFieldsText = 'Fields that will not contribute to diff results';
    const optionsClassNames = cx({
      'outline-a2': true,
      options: true,
      active: this.props.active
    });

    const tipButtonClassNames = cx({
      disabled: !this.props.active
    });

    const selectDisplay = this.state.dataSets.map((ds, i) =>
      <OptionSet
        key={`${ds.name || 'csv'}-${i}`}
        id={ds.id}
        name={ds.name}
        fields={ds.data1.data[0]}
        dataSet={ds}
      />
    )

    return (
      <Row className={optionsClassNames}>
        <Col defs='col-xs-12'>
          <Row>
            <Col defs='col-xs'>
              <Heading tag="h2">Select Column Options</Heading>
                {
                  !!this.props.allHaveKeys &&
                    <div>
                      <Button
                        label='Compare'
                        accent
                        onClick={this.handleClickCompare}
                        type="submit" />
                    </div>
                }
            </Col>
            <Col defs='col-xs'>
              <Heading tag='h4' align='center'>
                Row Unique Identifiers
                <Button id="rowUniqueIdDisplayed" className={tipButtonClassNames} icon={<CircleQuestionIcon size="xsmall" />} onClick={(e) => { this.props.active && this.toggleTip(e, uniqueFieldsText) }} />
              </Heading>
            </Col>
            <Col defs='col-xs'>
              <Heading tag='h4' align='center'>
                Ignore Fields
                <Button id="ignoreFieldsDisplayed" className={tipButtonClassNames} icon={<CircleQuestionIcon size="xsmall" />} onClick={(e) => { this.props.active && this.toggleTip(e, ignoreFieldsText) }} />
              </Heading>
            </Col>
          </Row>
          { this.state.fileData && selectDisplay }
          { this.state.rowUniqueIdDisplayed &&
            <Tip target='rowUniqueIdDisplayed' onClose={() => true}>
              {uniqueFieldsText}
            </Tip>
          }
          { this.state.ignoreFieldsDisplayed &&
            <Tip target='ignoreFieldsDisplayed' onClose={() => true}>
              {ignoreFieldsText}
            </Tip>
          }
        </Col>
      </Row>
    )
  }
}

let select = (state, props) => {
  const { resultSets, fileData, dataSets } = state.api;
  const keys = _.map(state.options, (opt => opt.keys));
  const allHaveKeys = dataSets.length &&
                      dataSets.length === keys.length &&
                      keys.every(k => k.length)
  const anyHaveKeys = !!_.flatten(keys).length

  return {
    mode: state.files.mode,
    active: state.files.full,
    resultSets,
    fileData,
    dataSets,
    allHaveKeys, // for later support of select options are the same for all sets
    anyHaveKeys, // for later support of select options are the same for all sets
    options: state.options,
    multi: dataSets > 1
  }
}

export default connect(select)(Options);

