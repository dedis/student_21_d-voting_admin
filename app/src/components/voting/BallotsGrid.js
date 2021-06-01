import {React, useContext} from 'react';
import {Translations} from '../language/Translations';
import {LanguageContext} from '../language/LanguageContext';
import useFetchCall from '../utils/useFetchCall';
import {OPEN} from '../utils/StatusNumber';
import {Link} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import './BallotsGrid.css';

function BallotsGrid(){
    const [context, ] = useContext(LanguageContext);
    //const [openBallot, setOpenBallot] = useState(false);

    const token = sessionStorage.getItem('token');
    const fetchRequest = {
        method: 'POST',
        body: JSON.stringify({'Token': token})
    }
    const getAllElectionsEndpoint = "/evoting/all";
    const [data, loading, ] = useFetchCall(getAllElectionsEndpoint, fetchRequest);
    
   const ballotsToDisplay = (elections) => {
       let dataToDisplay = [];
       elections.map((elec) => {
           if(elec.Status === OPEN){
               dataToDisplay.push([elec.Title, elec.ElectionID]);
           }
       })
       return dataToDisplay;
   }

   const displayBallotTable = (data) => {
        if(data.length > 0){
            return (
                <div>
                 <div className='vote-allowed'>{Translations[context].voteAllowed}</div>   
                <Paper>
                    <TableContainer>
                        <Table stickyHeader aria-label = "sticky table">
                            <TableHead className = 'table-header'>
                                <TableRow className='row-head'>
                                    <TableCell key = {'Title'}>
                                        {Translations[context].elecName}
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((row) => {
                                    return(
                                        <TableRow key={row}>
                                            <TableCell key = {row[1]}>
                                                <Link className='election-link' to={{pathname:`/vote/${row[1]}`,
                                                data: row[1]}}>{row[0]}</Link>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </div>);
        } else {
            return <div>{Translations[context].noVote}</div>;
        }
   }
    const showBallots = (elections) => {
        return (
            displayBallotTable(ballotsToDisplay(elections))
            /*
            <div>
                <Modal showModal={showModal} setShowModal={setShowModal} textModal = {modalText} buttonRight={Translations[context].close} />
                {elections.map((elec) => {
                    if(elec.Status === 1){
                        if(openBallot === false){
                            setOpenBallot(true);
                        }
                        return <div className='ballot'>{displayBallot(elec)}</div>;
                    }
                })}
                {!openBallot? <div>{Translations[context].noVote}</div> :null}
            </div>
            */
        )}

    return (
        <div className = 'cast-ballot'>
            {/*openBallot?<div className='ballot-indication'>{Translations[context].voteAllowed}</div>:null*/}
            {loading? <p className='loading'>{Translations[context].loading}</p>:<p></p>}
            {!loading && data.AllElectionsInfo.length > 0?  showBallots(data.AllElectionsInfo) : <p>{Translations[context].noVote}</p>}       
        </div>
    )
}

export default BallotsGrid;