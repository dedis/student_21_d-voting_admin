import {React, useState, useContext} from 'react';

import './UploadFile.css';
import {Translations} from '../language/Translations';
import {LanguageContext} from '../language/LanguageContext';

function UploadFile({setShowModal, setTextModal}) {
    const [context, ] = useContext(LanguageContext);
    const createEndPoint = '/evoting/create';

    const [file, setFile] = useState(null);
    const [fileExt, setFileExt] = useState(null);
    const [errors, setErrors] = useState({});
    const [name, setName] = useState('');
    

    /*TODO: add fields AdminID, Token and PublicKey from sessionStorage */
    const validateJSONFields = () => {
        
        var data = JSON.parse(file);
        if(data.Title == ""){

          return false;
        }

        if(!Array.isArray(data.Candidates)){
          return false;
        } else {
          /*check if the elements of the array are numbers*/
          for(var i = 0; i < data.Candidates.length; i++){
            if(typeof data.Candidates[i] !== "string"){
              return false;
            }
          }
        }
        return true;
    }

    const sendElection = async(data) => {
      console.log(JSON.stringify(data));
      console.log(typeof JSON.stringify(data));
      try{
        const response = await fetch(createEndPoint, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    /* Need to deal with the response : saving id, key,...!!!!!!!*/
        if(response.ok){
        const data = await response.json();
        console.log(data);
        return data.ElectionID;
        } else{
            return (-1);
        }


    } catch(e) {
        
        return e;
    }
    }


    /*Check that the filename has indeed the extension .json
    Important: User can bypass this test by renaming the extension
     -> backend needs to perform other verification! */
    const validateFileExtension = () =>{
      let errors = {};
      if(fileExt === null){
        console.log("no file")
        errors['nothing'] = Translations[context].noFile;
        setErrors(errors);
        return false;
      } else {
        let fileName = fileExt.name;
        if(fileName.substring(fileName.length-5,fileName.length)!=='.json'){
          errors['extension'] = Translations[context].notJson;
          setErrors(errors);
          return false;
        }
        return validateJSONFields();
      }    
    }
    /* Append the id of a created election to others in the localStorage */
    const storeIdNewElection = (id) => {
      var idsStored = localStorage.getItem('electionIDs');
      if(!idsStored){
          localStorage.setItem('electionIDs', id);
      } else {
          if(Array.isArray(idsStored)){
              localStorage.setItem('electionIDs', idsStored.concat(id));
          } else {
              idsStored = [idsStored];
              localStorage.setItem('electionIDs',idsStored.concat(id));
          }
      }
  }


    const uploadJSON = async() => {
        console.log(fileExt);
        if(validateFileExtension()){
          
          try{
            const response =  await sendElection(JSON.parse(file));
            if(response === -1){
                 setTextModal(Translations[context].electionFail);
            } else{
                 setTextModal(Translations[context].electionSuccess);
                 storeIdNewElection(response);
                 setName('');
            }
            setShowModal(true);
          } catch (e){
            alert(Translations[context].electionFail);
          }
        }
          
    }

    const handleChange = (event) => {
      setFileExt(event.target.files[0]);
      var file1 = event.target.files[0];
      setName(event.target.value);
      var reader = new FileReader();
      reader.onload = function(event) {
        // The file's text will be printed here

        setFile(event.target.result);
      };

     reader.readAsText(file1);
     
    }

  return(

    <div className="form-content-right">
      <div className='option'>Option 2</div>
      {Translations[context].upload}

      <input type="file" className ='input-file'
        value = {name}
        multiple={false}
        accept='.json'
        onChange = {handleChange}  
        />
        <span className='error'>{errors.nothing}</span>
        <span className='error'>{errors.extension}</span>
        <input type="button" className = 'upload-json-btn' value={Translations[context].createElec} onClick={uploadJSON} />



    </div>
    );


  }
 
export default UploadFile;