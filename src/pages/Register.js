import React, { useEffect, useState } from "react";
import { Logo, FormRow } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};
const Register = () => {
  const [values, setValues] = useState(initialState);
  const {user,isLoading} =useSelector(store=> store.user)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    const {name,email,password}= values
    if (!email || !password || (!values.isMember && !name)) {
      toast.warning('Please fill out the fields')
      return
    }
    if (values.isMember) {
      dispatch(loginUser({email:email,password:password}))
      return
    }
    dispatch(registerUser({name,email,password}))
  };
  const handleChange = (e) => {
    const {name,value} = e.target;
    setValues({...values,[name]:value});
  };
  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };
useEffect(()=>{
  if (user) {
    setTimeout(()=>{
      navigate('/')
    },2000)
  }
},[user])
  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={handleSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}

        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
         {isLoading ? 'Loading': 'Submit'}
        </button>
        <button type="button" className="btn btn-block" disabled={isLoading} onClick={()=>dispatch(loginUser({email:'testUser@test.com',password:'secret'}))}>
         {isLoading ? 'Loading': 'Demo User'}
        </button>
        <p>
         {values.isMember? 'Not a member yet' : 'Already a member'}
          <button type="button" onClick={toggleMember} className='member-btn'>
            {values.isMember?'Register':'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
