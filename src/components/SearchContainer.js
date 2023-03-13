import React, { useState , useMemo} from "react";
import { FormRow, FormRowSelect } from ".";
import Wrapper from "../assets/wrappers/SearchContainer";
import { useSelector, useDispatch } from "react-redux";
import { handleChange,clearFilters } from "../features/allJobs/allJobsSlice";

const SearchContainer = () => {
  const [localSearch,setLocalSearch] = useState('')
  const { isLoading, search, searchStatus, searchType, sort, sortOptions } =
    useSelector((store) => store.allJobs);
  const { jobTypeOptions,statusOptions } =
    useSelector((store) => store.job);
  const dispatch = useDispatch();
  const handleSearch = (e) => {
   dispatch(handleChange({name:e.target.name, value:e.target.value}))
   console.log({name:e.target.name, values:e.target.value})
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalSearch('')
    dispatch(clearFilters())
  };

const debounce= ()=>{
  let timeOutID ;
  return (e)=>{
    setLocalSearch(e.target.value)
    clearTimeout(timeOutID)
    timeOutID = setTimeout(()=>{
      dispatch(handleChange({name:e.target.name, value:e.target.value}))
    },1000)
  }
}
const optimizedDebounce = useMemo(()=> debounce(),[])

  return (
    <Wrapper>
      <form className="form">
        <h4>Search Job</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="search"
            value={localSearch}
            handleChange={debounce()}
          />
          <FormRowSelect
            labelText='status'
            name='searchStatus'
            value={searchStatus}
            handleChange={handleSearch}
            list={['all',...statusOptions]}
          />
          <FormRowSelect
            labelText='type'
            name='searchType'
            value={searchType}
            handleChange={handleSearch}
            list={['all',...jobTypeOptions]}
          />
          <FormRowSelect
            name='sort'
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />
          <button className="btn btn-block btn-danger" disabled={isLoading} onClick={handleSubmit}>
clear filter
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
