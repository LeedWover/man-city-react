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
            <TableCell>Date</TableCell>
            <TableCell>Match</TableCell>
            <TableCell>Result</TableCell>
            <TableCell>Final</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            props.matches ? props.matches.map((match, index) => (
              <TableRow key={index}>
                <TableCell>
                  {match.date}
                </TableCell>
                <TableCell>
                  <Link style={{ color: '#3366BB'}} to={`/admin_matches/edit_match/${match.id}`}>
                    {match.away} <strong>-</strong> {match.local}
                  </Link>
                </TableCell>
                <TableCell>
                  {match.final === 'Yes' ? <div>{match.resultAway} <strong>-</strong> {match.resultLocal}</div> : <strong>-</strong>}
                </TableCell>
                <TableCell>
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
