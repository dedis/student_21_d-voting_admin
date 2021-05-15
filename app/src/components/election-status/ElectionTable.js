import React from 'react';
import './ElectionTable.css';
import {Link} from 'react-router-dom';
import Status from './Status';

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
        return Object.entries(obj).map(([k, val])=>{
                if(k === 'Status'){
                    console.log(obj.ElectionID);
                    return <td><Status status={val} electionID={obj.ElectionID} candidates={obj.Candidates} /></td>}
                if(k=== 'Title')
                return (
                    <td>
                        <Link className='election-link' to={{pathname:`/elections/${obj.ElectionID}`,
                    data: obj.ElectionID}}>{val}</Link>
                    {/*<span className='election-name-pointer' data-toggle='tooltip' title = 'Show details' onClick={()=> props.handleClick()}>{val}</span>
                    <span className='tooltiptext'></span>*/}
                </td>)
            }) 
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