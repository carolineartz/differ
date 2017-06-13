import React from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';

import UpdateIcon from 'grommet/components/icons/base/Update';
import CutIcon from 'grommet/components/icons/base/Cut';
import LoginIcon from 'grommet/components/icons/base/Login';

import { Row } from './../layout';

import Result from './Result';

const iconClassName = "icon-color-orange status-icon";
const ResultSet = ({updates, adds, deletes}) => (
  <Row>
    {
      !_.isEmpty(updates) &&
        <Result
          label="Updated"
          rootLabel="updates"
          icon={<UpdateIcon className={iconClassName} />}
          resultData={updates}
        />
    }
    {
      !_.isEmpty(adds) &&
        <Result
          label="New"
          rootLabel="adds"
          icon={<LoginIcon className={iconClassName} />}
          resultData={adds}
        />
    }
    {
      !_.isEmpty(deletes) &&
        <Result
          label="Removed"
          rootLabel="deletes"
          icon={<CutIcon className={iconClassName} />}
          resultData={deletes}
        />
    }
  </Row>
);

ResultSet.propTypes = {
  updates: PropTypes.object,
  adds: PropTypes.object,
  deletes: PropTypes.object
}

export default ResultSet;
