import React from 'react';
import _ from 'lodash';

import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';

// I found a bug in the UI lib where errors throw if the number of header cols
// don't match the row cols, so I can't use colspan='2' for the field name headers
const Header = ({fields}) => (
  <thead>
    <tr>
      <th>Row</th>
      {
        fields.map(hf =>
          [
           <th key={`${hf}-header`}>{hf}</th>,
           <th />
          ]
        )
      }
    </tr>
  </thead>
)

const EmptyCell = () => <td colSpan="2" />;
const BeforeCell = ({val}) => <td className="update-table-before"><div><del>{val}</del></div></td>
const AfterCell = ({val}) => <td className="update-table-after"><div>{val}</div></td>

const Row = ({update, headerFields}) => (
  <TableRow>
    <td key={`${update.id}-id`} className="update-table-id"><div>{update.id}</div></td>
    {
      headerFields.map(field => {
        if (!update.fields[field]) return <EmptyCell key={`${update.id}-${field}`} />
        const [before, after] = update.fields[field];
        return [
          <BeforeCell val={before} key={`${update.id}-${field}-before`} />,
          <AfterCell val={after} key={`${update.id}-${field}-after`} />
        ]
      })
    }
  </TableRow>
)

// TODO: EXTRACT THIS DATA EXTRACT LOGIC!!!!!!!!!
const UpdateTable = ({updates, keyFields}) => {
  const allChangedFields = _
    .chain(updates.map(up => Object.keys(up.fields)))
    .flatten()
    .uniq()
    .difference(keyFields)
    .value();

  return (
    <Table className="update-table">
      <Header fields={allChangedFields} />
      <tbody>
        {
          updates.map(update =>
            <Row update={update} key={`${update.id}-row`} headerFields={allChangedFields} />)
        }
      </tbody>
    </Table>
  )
}

// TODO
// UpdateTable.propTypes = {

// }

export default UpdateTable;
