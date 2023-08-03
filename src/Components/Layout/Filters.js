import React, { useState, useEffect } from "react";
import BaseUrl from "../../Axios/BaseUrl";
import { useSearch } from '../../Components/UseContext/SearchContext';
import { useAuth } from "../UseContext/authContext";
import toast from "react-hot-toast";

const Filters = () => {
  const [searchList,setSearchList] = useSearch();
  const [originalList,setOriginalList] = useState([]);
  const [auth] = useAuth();
  const [category, setCategory] = useState([]);
  
  const [filters,setFilters] = useState({
    filterOn:false,
    filterCategory:false,
    categoryFilterArray:[],
    filter500:false,
    filter1000:false,
    filter1500:false,
    filter2000:false,
    filter2500:false,
    filter3000:false,
    
  });




  //Use effect for filtering 

  useEffect(()=>{
    console.log(filters);
    if(filters.filterOn===false){
      return;
    }

    let min =0 ;
    let max =999999 ;

    if(filters.filter500){
       min=0;
        max=500;
        console.log("500 me aaya",filters)
    }
    if(filters.filter1000){
      if(filters.filter500){
          min=0;
        }
        else{
          min =500;
        }
        max=1000;
    }
    if(filters.filter1500){
    if(filters.filter500){
          min=0;
        }
        else if(filters.filter1000){
          min = 500;
        }
        else{
          min= 1000;
        }
        max=1500
    }
    if(filters.filter2000){
      if(filters.filter500){
          min=0;
        }
        else if(filters.filter1000){
          min = 500;
        }
        else if(filters.filter1500){
          min= 1000;
        }
        else{
          min = 1500;
        }
        max=2000;
    }
    if(filters.filter2500){
     if(filters.filter500){
          min=0;
        }
        else if(filters.filter1000){
          min = 500;
        }
        else if(filters.filter1500){
          min= 1000;
        }
        else if(filters.filter2000){
          min = 1500;
        }
        else{
          min=2000;
        }
        max=2500;
    }
    if(filters.filter3000){
        if(filters.filter500){
          min=0;
        }
        else if(filters.filter1000){
          min = 500;
        }
        else if(filters.filter1500){
          min= 1000;
        }
        else if(filters.filter2000){
          min = 1500;
        }
        else if(filters.filter2500){
          min=2000;
        }
        else{
          min=3000;
        }
        max=9999999;
    }

    ///
    const arr = [...originalList];

    const newArr = arr.filter((element)=>{
      console.log(element.category)
      // if( filters.categoryFilterArray.length>0){
        //We have to pass category id in the category array remeber ilt
      //   if(){
      //     console.log(element)
      //   }
      // }
      
      if(( filters.categoryFilterArray.includes(element.category) || filters.categoryFilterArray.length===0) && element.price>=min && element.price<=max){
          return element;
        }
      
    })
    if(!filters.filterCategory && !filters.filter500 && !filters.filter1000 && !filters.filter1500 && !filters.filter2000 && !filters.filter2500 && !filters.filter3000 ){
      console.log("andar sb false",originalList);
      setSearchList({...searchList,searchedList:originalList})
    }
    else{

      setSearchList({...searchList,searchedList:newArr});
    }
    console.log(searchList);
  },[filters])


  useEffect(() => {
    async function callApi() {
      try {
        const url = `${process.env.REACT_APP_API}/category/getall`;
        const { data } = await BaseUrl.get(url, {
          headers: {
            Authorization: auth.token,
          },
        });
        if (data.status) {
          const arr = data.categories;
          setCategory(...category, arr);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong while fetching the categories");
      }
    }
    callApi();
    if(searchList?.searchedList)
    setOriginalList(searchList.searchedList);
  }, []);
  return (
    <div className="Filter">
      <h4 class="display-6">Filter By Category</h4>

      {category &&
        category?.map((element, i) => {
          return (
            <div class="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                value={element._id}
                onClick={(e)=>{
                  if(e.target.checked){
                    const arr = [...filters.categoryFilterArray];
                    arr.push(element._id);
                    setFilters({...filters,categoryFilterArray:arr,filterOn:true,filterCategory:true});
                  }
                  else{
                    const arr = [...filters.categoryFilterArray];
                    const index = arr.indexOf(element._id);
                    arr.splice(index,1);
                    setFilters({...filters,categoryFilterArray:arr});
      
                  }
                }}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                {element.name}
              </label>
            </div>
          );
        })}
        <h1 class="display-6">Filter by Price</h1>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          defaultValue
          id="flexCheckDefault"
          value={500}
          onClick={(e)=>{
            if(e.target.checked){
              setFilters({...filters,filterOn:true,filter500:true});
            }
            else{
              setFilters({...filters,filter500:false});

            }
          }}
        />
        <label className="form-check-label" htmlFor="flexCheckDefault">
          Below 500
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          defaultValue
          id="flexCheckDefault"
          value={1000}
          onClick={(e)=>{
            if(e.target.checked){
              setFilters({...filters,filterOn:true,filter1000:true});
            }
            else{
              setFilters({...filters,filter1000:false});

            }
          }}
        />
        <label className="form-check-label" htmlFor="flexCheckDefault">
          500-1000
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          defaultValue
          id="flexCheckDefault"
          value={500}
          onClick={(e)=>{
            if(e.target.checked){
              setFilters({...filters,filterOn:true,filter1500:true});
            }
            else{
              setFilters({...filters,filter1500:false});

            }
          }}
        />
        <label className="form-check-label" htmlFor="flexCheckDefault">
          1000-1500
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          defaultValue
          id="flexCheckDefault"
          value={500}
          onClick={(e)=>{
            if(e.target.checked){
              setFilters({...filters,filterOn:true,filter2000:true});
            }
            else{
              setFilters({...filters,filter2000:false});

            }
          }}
        />
        <label className="form-check-label" htmlFor="flexCheckDefault">
          1500-2000
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          defaultValue
          id="flexCheckDefault"
          value={500}
          onClick={(e)=>{
            if(e.target.checked){
              setFilters({...filters,filterOn:true,filter2500:true});
            }
            else{
              setFilters({...filters,filter2500:false});

            }
          }}
        />
        <label className="form-check-label" htmlFor="flexCheckDefault">
          2000-2500
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          defaultValue
          id="flexCheckDefault"
          value={500}
          onClick={(e)=>{
            if(e.target.checked){
              setFilters({...filters,filterOn:true,filter3000:true});
            }
            else{
              setFilters({...filters,filter3000:false});
            }
          }}
        />
        <label className="form-check-label" htmlFor="flexCheckDefault">
          3000+
        </label>
      </div>
      <button onClick={()=>{
        setSearchList({...searchList,searchedList:originalList});

      }} type="btn" className="btn btn-danger">Reset</button>
    </div>
  );
};

export default Filters;
