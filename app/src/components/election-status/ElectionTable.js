import React from 'react';
import './ElectionTable.css';
import {Link} from 'react-router-dom';
import Status from './Status';
import ElectionFields from '../utils/ElectionFields';

/**
 * 
 * @param {*} props : array of Elections
 * @returns a table where each line corresponds to an election with its name and status
 */
const ElectionTable = (props) => { 

    const renderTableHeader = () => {
        return Object.keys(props.value[0]).map((key,index) => {
            if(key === 'Title' || key=== 'Status'){
                return <th key={index}>{key.toUpperCase()}</th>
            }
        })
    }

    const renderTitle = () => {    
        return <th colSpan='2'>ELECTIONS ({props.value.length})</th>
    }

    const renderLine = (obj) => {
        let {title,candidates,id,status,pubKey,result, setStatus} = ElectionFields(obj);
        return (<span>
                <td><Link className='election-link' to={{pathname:`/elections/${id}`,
                    data: id}}>{title}</Link></td>
                <td><Status status={status} electionID={id} candidates={candidates} setStatus={setStatus}/></td>
            </span> )
    }

    const renderTableData = () =>{
        return props.value.map((obj) => {
            return <tr>{renderLine(obj)}</tr>;
        })
    };
    
    return(
        <div>
            <table className='table-elections'>
                <tbody>
                    <tr>{renderTitle()}</tr>
                    <tr className='table-header'>{renderTableHeader()}</tr>
                    {renderTableData()}
                </tbody>
            </table>
        </div>
    );
}
 
export default ElectionTable;