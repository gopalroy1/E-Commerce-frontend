import React,{useState,useContext,createContext, useEffect} from 'react'

const SearchContext= createContext();
const SearchProvider = ({children}) => {
    const [searchList,setSearchList] = useState({
        searchVal:"",
        searchedList:[]
    })
  return (
   <SearchContext.Provider value={[searchList,setSearchList]}>
    {children}
   </SearchContext.Provider>
  )
}

const useSearch=()=>useContext(SearchContext);

export {useSearch,SearchProvider};