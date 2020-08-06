import React, {useState} from 'react';
import axios from 'axios'

function App() {
  const [fileData, setFileData] = useState('')
  const [link, setLink] = useState('')

  const uploadFile = async() => {
    try {
      const res = await axios.put('http://localhost:3300/file/upload', fileData);
      setLink(res.data.link);
    } catch (error) {
      console.log(error.message)
    }
  }
  
  const getDataFromFile = async(event) => {
    const data = new FormData();
    data.append('file', event.target.files[0]);
    setFileData(data);
  }

  return (
    <div>
      <input type="file" onChange={getDataFromFile} />
      <button onClick={uploadFile}>Enviar</button>
      {link &&
        <div>
          <img src={link} alt="Image sent by input" />
        </div>
      }
    </div>
  );
}

export default App;
