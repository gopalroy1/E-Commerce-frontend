import React,{useState} from 'react'
import { useSearch } from '../UseContext/SearchContext';
import  toast  from 'react-hot-toast';
import BaseUrl from '../../Axios/BaseUrl';
import { useNavigate} from 'react-router-dom';
const Search = () => {
    const [searchList,setSearchList] = useSearch();
    const navigate = useNavigate();
    async function handleSearch(){
        try {
            if(!searchList.searchVal){
                toast.error("Please search something");
                return;
            }
            const urlNew = `${process.env.REACT_APP_API}/products/search/${searchList.searchVal}`
            const res = await BaseUrl.get(urlNew);
            setSearchList({...searchList,searchedList:res.data.productList});
            navigate("/products");
            
            
        } catch (error) {
            console.log(error.response.data)
        }

    }
  
  return (
    <li className="search-container">
          <input value={searchList.searchVal} onChange={(e)=>{setSearchList({...searchList,searchVal:e.target.value})}} placeholder="search"></input>
          <button onClick={handleSearch}>Search</button>
        </li>
  )
}

export default Search;