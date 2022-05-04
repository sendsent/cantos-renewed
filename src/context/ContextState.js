import React,  { useEffect, useState, createContext } from 'react';
import textFile from  '../assets/cantos.txt'
import formatCantos from "./cantoIndex"

export const Context = createContext()

const ContextState = ({children}) => {
    // const [randomCantos, setRandomCantos] = useState()
    const [index, setIndex] = useState()
    const [text, setText] = useState();

  
    useEffect(() => {
      fetch(textFile)
        .then((response) => response.text())
        .then((textContent) => {
          let formattedCantos = formatCantos(textContent)
          setText(textContent);
          setIndex(formattedCantos.cantoIndex)
        })
    }, []);
  
    return  (
        <Context.Provider value={{text, index}}>
            {children}
        </Context.Provider>
    )
  }

  export default ContextState
  

   


