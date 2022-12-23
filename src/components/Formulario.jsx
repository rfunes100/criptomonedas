 import { useEffect, useState } from 'react'


 import styled from '@emotion/styled'
import  useSelectMonedas  from '../hooks/useSelectMonedas'
import { monedas } from '../data/monedas'
import  Error  from './Error'


 const Inputsbumit = styled.input`
 background-color: #9497ff;
 border: none ;
 width: 100% ;
 padding: 10px;
 color: #fff;
 font-weight: 700;
 text-transform: uppercase;
 font-size: 20px;
 border-radius:  5px ;
 margin-top: 30px;
 
  transition: background-color .3s ease ;
 &:hover{
     background-color: #7a7dfe ;
     cursor: pointer;


 }

`


 
 const Formulario
= ( {setmonedas} ) => {

   const [criptos, setCriptos] = useState([])
   const [error, setError] = useState(false)


  useEffect(() => {
    
    const consultarapi = async () => {
      const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'

      const respuesta = await fetch(url)
      const resultado = await respuesta.json()
      
      const arraycrptos = resultado.Data.map( cripto => {

        const objeto = {
          id: cripto.CoinInfo.Name,
          nombre: cripto.CoinInfo.FullName
        }
          return objeto 
         

      })
      
        setCriptos(arraycrptos)
    }
  
    consultarapi()

    return () => {
      
    consultarapi()

      
    }
  }, [])
   


 const [ moneda,  SelectMonedas ] = useSelectMonedas('elige tu  moneda', monedas)
 
 
 const [ criptomoneda,  SelectcriptoMonedas ] = useSelectMonedas('elige tu cripto moneda', criptos)
 
const handlesubmit = e => {
  e.preventDefault()


  console.log('enviando form', moneda , criptomoneda)

  if([moneda, criptomoneda].includes(''))
  {
   
    setError(true)
    return 

  }
  setError(false)
  setmonedas({
    moneda,
    criptomoneda


  })


}



   return (

    <>
    
        { error && <Error>Todos los campos son requeridos</Error> }
        <form
          onSubmit={handlesubmit}
        >


    <SelectMonedas>

    </SelectMonedas>


    <SelectcriptoMonedas>

    </SelectcriptoMonedas>


            <Inputsbumit type="submit" 
            value='cotizar'
            />




        </form>

     </>

   )
 }
 

 export default Formulario