import React, {useState, useEffect} from "react";
import ImageThumb from './imagethumb';
import axios from 'axios';


function FileUpload() {

  const initialState = null;
  const [file, setFile] = useState(initialState);

  function handleUpload(event) {
    console.log(event.target.files);
    setFile(event.target.files[0]);
    
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();

   data.append('file', file);

   axios.post('/auth/upload', data)
       .then((e) => {
        //  axios.post('/auth/sendFile', data)
        //  {
        //    if(res) window.alert('Task Submitted. File Sent');
        //    else window.alert('Error');
        //  }
        window.alert("Task submitted");
         console.log('success', e);
       })
       .catch(
         console.error('Error', e)
       )
  };

  return (
    <form method='post'>
    <div id="upload-box">
      <input type="file" onChange={handleUpload} />
      {file && <ImageThumb image={file} />}
      <p></p>
      <input type="submit" value="Submit" id="button" onClick={onSubmit} />
    </div>
    </form>
  );
}

/**
 * Component to display thumbnail of image.
 */

  export default FileUpload;