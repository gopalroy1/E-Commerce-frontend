import React,{useState} from 'react'
import { useSearch } from '../UseContext/SearchContext';
import  toast  from 'react-hot-toast';
import BaseUrl from '../../Axios/BaseUrl';
import { useNavigate} from 'react-router-dom';
import { useList } from '../UseContext/originalSearchList';
const Search = () => {
    const [searchList,setSearchList] = useSearch();
    const navigate = useNavigate();
    const [originalList,setOriginalList] = useList();
    async function handleSearch(){
        try {
            if(!searchList.searchVal){
                toast.error("Please search something");
                return;
            }
            const urlNew = `${process.env.REACT_APP_API}/products/search/${searchList.searchVal}`
            const res = await BaseUrl.get(urlNew);
            let arr = res.data.productList;
            setSearchList({...searchList,searchedList:arr});
            setOriginalList(arr);
            console.log(arr);
            navigate("/products");
            
            
        } catch (error) {
            console.log(error.response.data)
        }

    }
  
  return (
    <li className="search-container">
          <input value={searchList.searchVal} onChange={(e)=>{setSearchList({...searchList,searchVal:e.target.value})}} placeholder="Search for products and more"></input>
          <button onClick={handleSearch}>Search</button>
        </li>
  )
}

export default Search;