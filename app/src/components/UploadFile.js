import {React, useState} from 'react';

import '../App.css';

function UploadFile() {


    const [file, setFile] = useState(null);

    const uploadJSON = e => {
        alert('hello');

        /*TO DO : NEED TO CHECK THE FILE IS CORRECT */
    }


  return(

    <div className="form-content-right">
      Choose your file from your computer:

      <input type="file" className ='input-file'
        multiple={false}
        accept='.json'
        onChange = {(e) => setFile(e.target.files[0])}  
        />

        <input type="button" className = 'upload-json-btn' value="Upload" onClick={uploadJSON} />



    </div>
    );


  }
 
export default UploadFile;