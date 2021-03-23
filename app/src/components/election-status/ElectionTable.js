import React from 'react';
import '../../App.css';


const ElectionTable = (props) => {

    const renderTableHeader = () => {
        return Object.keys(props.props).map((key,index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
        
    }

    const renderTitle = () => {
        /* TO DO: instead of 1, it should calculate the length of props*/ 
        return <th colspan='2' type='header' className='oh'>ELECTIONS (1)</th>
    }

    const renderTableData = () =>{
        Object.values(props).map((election,index) => {
            console.log(election.name);
           });
           
        return Object.values(props).map((election,index) => {
            return (
                <tr key={election.name}>
                    <td>{election.name}</td>
                    <td>{election.status}</td>
                </tr>
            )
            
        })
        
    }
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