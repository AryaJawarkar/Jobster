import React, { useEffect } from "react";
import { FormRow ,FormRowSelect} from "../../components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { handleChange,clearValues,createJob } from "../../features/job/jobSlice";
import { editJob } from "../../features/job/jobSlice";
const AddJob = () => {
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    isEditing,
    editJobId
  } = useSelector((store) => store.job);
  const {user} = useSelector(store => store.user)
const dispatch = useDispatch()


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      toast.error("please fillout all fields");
      return;
    }
    if (isEditing) {
      dispatch(editJob({jobId:editJobId,job:{position,company,jobLocation,status,jobType}}))
      return
    }
    dispatch(createJob({position,company,jobLocation,jobType,status}))
  };

  const handleJobInput = (e) => {
    const { name, value } = e.target;
    dispatch(handleChange({name,value}));
  };

useEffect(()=>{
  if(!isEditing){
    dispatch(handleChange({
      name:'jobLocation' , value:user.location
    }))  
  }
})

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "edit job" : "add job"}</h3>
        <div className="form-center">
          <FormRow
            type="text"
            name="position"
            value={position}
            handleChange={handleJobInput}
          />
          <FormRow
            type="text"
            name="company"
            value={company}
            handleChange={handleJobInput}
          />
          <FormRow
            type="text"
            labelText='job location'
            name="jobLocation"
            value={jobLocation}
            handleChange={handleJobInput}
          />
          <FormRowSelect 
            name='status'
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          />
          <FormRowSelect 
            labelText='job type'
            name='jobType'
            value={jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions}
          />
          <div className="btn-container">
            <button type="button" className="btn btn-block submit-btn" onClick={handleSubmit}
            disabled = {isLoading}
            >Submit</button>
            <button type="button" className="btn btn-block clear-btn" onClick={()=>dispatch(clearValues())}
            >clear</button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
