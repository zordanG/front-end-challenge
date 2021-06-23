import React from 'react';
import PropTypes from 'prop-types';
import { Table as ReactstrapTable } from 'reactstrap';
import { noop } from '@babel/types';

// Expected data structure example

// const header = [
//     {
//         title: "Id",
//         column: "id",
//     },
//     {
//         title: "Description",
//         column: "description",
// ]

// const rows = [
//     {
//         id: 1,
//         description: "Xablau",
//         onClick: () => { console.log(1) },
//     },
// ]

const Table = ({ header, rows }) => {
    return (
        <ReactstrapTable hover>
            <thead>
                <tr>
                    {header.map(h => <th key={`header-${h.title}`}>{h.title}</th>)}
                </tr>
            </thead>
            <tbody>
                {rows.map(row => (
                    <tr key={`row-${row.id}`} onClick={row.onClick || noop }>
                        {header.map(h =>
                            <td key={`data-${row[h.column]}`}>
                                {row[h.column]}
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </ReactstrapTable>
    );
}

Table.propTypes = {
    rows: PropTypes.array.isRequired,
    header: PropTypes.array.isRequired,
}

export default Table;