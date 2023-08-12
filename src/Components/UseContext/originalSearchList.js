import React,{useState,useContext,createContext, useEffect} from 'react'

const ListContext= createContext();
const ListProvider = ({children}) => {
    const [originalList,setOriginalList] = useState([])
  return (
   <ListContext.Provider value={[originalList,setOriginalList]}>
    {children}
   </ListContext.Provider>
  )
}

const useList=()=>useContext(ListContext);

export {useList,ListProvider};