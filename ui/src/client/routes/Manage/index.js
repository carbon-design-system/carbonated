/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { DataTable } from 'carbon-components-react';
import { Content } from 'carbon-components-react/lib/components/UIShell';
import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';
import { FormattedMessage } from 'react-intl';

const {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} = DataTable;

const USERS_QUERY = gql`
  {
    users {
      name
      createdAt
      updatedAt
    }
  }
`;

const headers = [
  {
    key: 'name',
    header: 'Name',
  },
  {
    key: 'createdAt',
    header: 'Created at',
  },
  {
    key: 'updatedAt',
    header: 'Updated at',
  },
];

export default function Manage() {
  return (
    <Content id="main-content">
      <h1>
        <FormattedMessage id="manage.greeting" defaultMessage="Manage" />
      </h1>
      <h2>Users</h2>
      <div>
        <Query query={USERS_QUERY}>
          {({ loading, error, data }) => {
            if (loading) {
              return 'Loading...';
            }

            if (error) {
              console.error(error);
              return 'Whoops! Something went wrong.';
            }

            const rows = data.users.map(user => ({
              ...user,
              id: user.name,
            }));

            return (
              <DataTable headers={headers} rows={rows}>
                {({ headers, rows }) => (
                  <Table>
                    <TableHead>
                      <TableRow>
                        {headers.map(header => (
                          <TableHeader key={header.key}>
                            {header.header}
                          </TableHeader>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map(row => (
                        <TableRow key={row.id}>
                          {row.cells.map(cell => (
                            <TableCell key={cell.id}>{cell.value}</TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </DataTable>
            );
          }}
        </Query>
      </div>
    </Content>
  );
}
