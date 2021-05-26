import {React, useState, useContext} from 'react';

import './UploadFile.css';
import {Translations} from '../language/Translations';
import {LanguageContext} from '../language/LanguageContext';
import {CREATE_ENDPOINT} from '../utils/Endpoints';
import usePostCall from '../utils/usePostCall';

function UploadFile({setShowModal, setTextModal}) {
    const [context, ] = useContext(LanguageContext);
    const [file, setFile] = useState(null);
    const [fileExt, setFileExt] = useState(null);
    const [errors, setErrors] = useState({});
    const [name, setName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [postError, setPostError] = useState(null);
    const {postData} = usePostCall(setPostError);
    

    /*TODO: add fields AdminID, Token and PublicKey from sessionStorage */
    const validateJSONFields = () => {
        
        var data = JSON.parse(file);
        if(data.Title == ""){
          return false;
        }

        if(!Array.isArray(data.Candidates)){
          return false;
        } else {
          /*check if the elements of the array are string*/
          for(var i = 0; i < data.Candidates.length; i++){
            if(typeof data.Candidates[i] !== "string"){
              return false;
            }
          }
        }
        return true;
    }

    const sendElection = async(data) => {
      let postRequest = {
        method: 'POST',
        body: JSON.stringify(data)
    }
    setPostError(null);
    postData(CREATE_ENDPOINT, postRequest, setIsSubmitting);
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

    const uploadJSON = async() => {
        console.log(fileExt);
        if(validateFileExtension()){
          
          try{
            const response =  await sendElection(JSON.parse(file));
            if(response === -1){
                 setTextModal(Translations[context].electionFail);
            } else{
                 setTextModal(Translations[context].electionSuccess);
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
      var newUpload = event.target.files[0];
      setName(event.target.value);
      var reader = new FileReader();
      reader.onload = function(event) {
        setFile(event.target.result);
      };
     reader.readAsText(newUpload);
     
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