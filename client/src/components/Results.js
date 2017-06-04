import React from 'react';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Status from 'grommet/components/icons/Status';


const Results = ({resultObject}) => {
  if (!resultObject.summary) {
    return (
      <Status value='unknown' />
    )
  }
}

export default Results;
