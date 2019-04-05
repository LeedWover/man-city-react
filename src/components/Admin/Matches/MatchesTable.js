import React from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper
} from "@material-ui/core";

const TableMatches = props => {
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Match</TableCell>
            <TableCell align="center">Result</TableCell>
            <TableCell align="center">Final</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            props.matches ? props.matches.map((match, index) => (
              <TableRow key={index}>
                <TableCell align="center">
                  {match.date}
                </TableCell>
                <TableCell align="center">
                  <Link style={{ color: '#3366BB'}} to={`/admin_matches/edit_match/${match.id}`}>
                    {match.away} <strong>-</strong> {match.local}
                  </Link>
                </TableCell>
                <TableCell align="center">
                  {match.final === 'Yes' ? <div>{match.resultAway} <strong>-</strong> {match.resultLocal}</div> : <strong>-</strong>}
                </TableCell>
                <TableCell align="center">
                {match.final === 'Yes' ? <span className="matches_tag_red">Final</span> : <span className="matches_tag_green">Not played yet</span>}
                </TableCell>
              </TableRow>
            )) : null
          }
        </TableBody>
      </Table>
    </Paper>
  );
};

export default TableMatches;
