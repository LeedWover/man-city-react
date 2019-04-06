import React from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper
} from '@material-ui/core';

const PlayersTable = props => {
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">First Name</TableCell>
            <TableCell align="center">Last Name</TableCell>
            <TableCell align="center">Number</TableCell>
            <TableCell align="center">Position</TableCell>
            <TableCell align="center">Edit Player</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            props.players ? props.players.map((player, index) => (
              <TableRow key={index}>
                <TableCell align="center">
                  {player.name}
                </TableCell>
                <TableCell align="center">
                  {player.lastname}
                </TableCell>
                <TableCell align="center">
                  {player.number}
                </TableCell>
                <TableCell align="center">
                  {player.position}
                </TableCell>
                <TableCell align="center">
                  <Link style={{ color: '#3366BB'}} to={`/admin_players/add_player/${player.id}`}>Edit</Link>
                </TableCell>
              </TableRow>
            )) : null
          }
        </TableBody>
      </Table>
    </Paper>
  )
}

export default PlayersTable;