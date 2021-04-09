import React from 'react';
import './ElectionTable.css';
import {Link} from 'react-router-dom';
import StatusSuccess from './StatusSuccess';




const ElectionTable = (props) => {

    const renderTableHeader = () => {
        return Object.keys(props.value).map((key,index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
        
    }

    const renderTitle = () => {
        /* TO DO: instead of 1, it should calculate the length of props*/ 
        
        return <th colSpan='2'>ELECTIONS (1)</th>
    }

    const renderTableData = () =>{

        return Object.entries(props.value).map(([k, val])=>{
            if(k === 'status')
            return <td><StatusSuccess stat={props.value.status} /></td>
            return (
                <td>
                    <Link className='election-link' to={{pathname:`/elections/${val}`,
                data: props}}>{val}</Link>
                {/*<span className='election-name-pointer' data-toggle='tooltip' title = 'Show details' onClick={()=> props.handleClick()}>{val}</span>
                <span className='tooltiptext'></span>*/}
            </td>)
    })};
  
    
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