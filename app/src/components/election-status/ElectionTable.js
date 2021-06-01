import React, {useState, useContext} from 'react';
import './ElectionTable.css';
import {Link} from 'react-router-dom';
import Status from './Status';
import ElectionFields from '../utils/ElectionFields';
import {Translations} from '../language/Translations';
import {LanguageContext} from '../language/LanguageContext';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import { withStyles} from '@material-ui/core/styles';

/**
 * 
 * @param {*} props : array of Elections
 * @returns a table where each line corresponds to an election with its name and status
 */
const ElectionTable = ({elections}) => { 
    const [context, ] = useContext(LanguageContext);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const columns = [
        {id: 'title', label : Translations[context].title, minWidth: 170, align: 'left'},
        {id: 'status', label : Translations[context].status, minWidth: 170, align: 'left'},
    ]

    const StyledTableRow = withStyles((theme) => ({
        root: {
          '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
          },
        },
      }))(TableRow);

    const createData = (title, status, key) => {
        return {title, status, key};
    }
    const constructRows = () => {
        let rows = []
        elections.map((elec) => {
            let {title,candidates,id,status,pubKey,result, setStatus} = ElectionFields(elec);
            let link = <Link className='election-link' to={{pathname:`/elections/${id}`,
            data: id}}>{title}</Link>;
            let stat = <Status status={status} electionID={id} candidates={candidates} setStatus={setStatus}/>
            rows.push(createData(link, stat,id));
        })
        return rows;
    }
    const rows = constructRows();

    const renderTH = () => {
        return (
              
            <TableRow className='row-head'>
                {columns.map((col) => {
                   return(<TableCell style={{ width: 800 }} key = {col.id} align={col.align}>
                        {col.label}
                    </TableCell>)
                })}               
            </TableRow>)
    }

   const handleChangePage = (event, newPage) => {
    setPage(newPage);
   }

   const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
   }
    
    return(
        <div>
            <Paper>
                <TableContainer>
                    <Table>
                        <TableHead className = 'table-header'>    
                            {renderTH()}
                        </TableHead>
                        <TableBody>
                            {rows.slice(page*rowsPerPage, page*rowsPerPage + rowsPerPage).map((row) => {
                                return (
                                    <StyledTableRow key={row.id}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {value}
                                                </TableCell>
                                            )
                                        })}
                                    </StyledTableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
        </Paper>
        </div>
    );
}
 
export default ElectionTable;