import {React, useState, useContext} from 'react';

import './UploadFile.css';
import {Translations} from '../language/Translations';
import {LanguageContext} from '../language/LanguageContext';

function UploadFile() {
    const [context, ] = useContext(LanguageContext);

    const [file, setFile] = useState(null);
    const [errors, setErrors] = useState({});


    /*Check that the filename has indeed the extension .json
    Important: User can bypass this test by renaming the extension
     -> backend needs to perform other verification! */
    const validateFileExtension = () =>{
      let errors = {};
      if(file === null){
        console.log("no file")
        errors['nothing'] = Translations[context].noFile;
        setErrors(errors);
        return false;
      } else {
        let fileName = file.name;
        if(fileName.substring(fileName.length-5,fileName.length)!=='.json'){
          errors['extension'] = Translations[context].notJson;
          setErrors(errors);
          return false;
        }
        return true;
      }    
    }

    const uploadJSON = e => {

        
        if(validateFileExtension()){
          setFile('');
          /*TODO : send file to backend*/ 
        }
    }


  return(

    <div className="form-content-right">
      <div className='option'>Option 2</div>
      {Translations[context].upload}

      <input type="file" className ='input-file'
        multiple={false}
        accept='.json'
        onChange = {(e) => setFile(e.target.files[0])}  
        />
        <span className='error'>{errors.nothing}</span>
        <span className='error'>{errors.extension}</span>
        <input type="button" className = 'upload-json-btn' value={Translations[context].createElec} onClick={uploadJSON} />



    </div>
    );


  }
 
export default UploadFile;