import {useState, useEffect} from 'react'
import {baseUrl} from '../common/baseUrl';
import axios from 'axios'

export const useLista = () => {
    const [lista, setLista] = useState([]);

  useEffect(()=>{
    axios
      .get(`${baseUrl}/trips`)
      .then(response=>{
        setLista(response.data.trips)
      })
      .catch(error=>alert("Erro ao pegar lista de viagens"))
  }, setLista)

  return lista;
}