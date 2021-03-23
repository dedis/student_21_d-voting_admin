import React from 'react';
import '../../App.css';




const ElectionTable = (props) => {

    const handleClose = () => {
        props.setStatus('2');
    }

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
            return <td>{props.getStatus(val)}</td>
            return (
                <td>
                <span className='election-name-pointer' data-toggle='tooltip' title = 'Show details' onClick={()=> props.handleClick()}>{val}</span>
                <span className='tooltiptext'></span>
            </td>)
    })};
/*
        return Object.values(props.value).map((election,index) => {
            return (
                <tr key={election.name}>
                    <td>{election.name}</td>
                    <td>{election.status}</td>
                </tr>
            )
            
        })
*/
        
    
    return(
        <div>
            <table className='table-elections' variant='dark'>
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