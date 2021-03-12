import { render } from '@testing-library/react';
import React from 'react';
import '../App.css';


class ElectionForm extends React.Component{

    constructor(props){
        super(props);
        this.state = {title:'', choices: [], text : ''};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        
    }

    
    render(){
        return(
        <div className="form-content-left">

            <form className = 'form-choices' onSubmit={this.handleSubmit}>
                
                <label htmlFor="new-choice"
                className='form-label'>
                    Enter a possible choice
                </label>
                <input
                    id='new-choice'
                    onChange={this.handleChange}
                    value={this.state.text}      
                    className = 'form-choice'  
                    placeholder = 'add a candidate'           
                />
                <button className='submit-choice'>
                    Add
                </button>
                
                <Choices onDelete={this.handleDelete}  value={this.state.choices} />
            </form>
        </div>
        );
    }
    handleSubmit(e) {
        e.preventDefault();
        if (this.state.text.length === 0){
            return;
        }
        const newItem = {
            text:this.state.text,
            id: Date.now()
        };
        this.setState(state=> ({
            choices: state.choices.concat(newItem),
            text:''
        }))
    }

    handleChange(e) {
        this.setState({text: e.target.value});
    }

    handleDelete = choiceId => {
        
        const choices = this.state.choices.filter(choice => choice.id !== choiceId);
        this.setState({choices: choices});
    }
}

function Choices(props){
    const value = props.value;
      return (
        <ul className='choices-saved'>
          {value.map(choice => (
            <div className='ch'>
                    <Choice 
                    id = {choice.id}
                    value = {choice.text}                   
                    onDelete ={props.onDelete} />
            </div>
          ))}
        </ul>
      );   
}

function Choice({id, value, onDelete}){
        return(
            <div>
                <li>
                {value}
                <button className='delete-btn' onClick={() => onDelete(id)}>
                    Delete
                </button>
                </li>
            </div>
        )
}



/*function SelectQuestion(){
        const [values, setValues] = useState({
            object: '',
            choices: []
        });

        const handleChange = e => {
            const {object, value} = e.target
            setValues({
                ...values,
                object: value
            })
        };

        const handleSubmit = e => {
            e.preventdefault();
        }

        return(
        <div>
           <form className='form' onSubmit={this.handleSubmit}> 
            <div className='form-inputs'>
                <label htmlFor="objectName"
                className='form-label'>
                    Object: 
                </label>
                <input
                    id='object'
                    type='text'
                    name='object'
                    className='form-input'
                    placeholder='Enter the object of the question'
                    onChange = {handleChange}
                />
            </div>
            
            <div className='form-inputs'>
                <label htmlFor="choices"
                className='form-label'>
                   Choices: 
                </label>
                <input
                    id='choices'
                    type='text'
                    name='choices'
                    className='form-input'
                    placeholder='Enter the possible choices'
                />
                
            </div>
            </form>
        </div>
            
        );
    };
*/

export default ElectionForm;
