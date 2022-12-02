import React,{useEffect, useState} from 'react'
import {CircularProgress} from '@material-ui/core'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { facultyLogin } from '../redux/actions/facultyAction'
import { studentLogin } from '../redux/actions/studentAction'

import {useAlert} from 'react-alert'

const Container = styled.div` 
width:100vw;
height:100vh;
background:linear-gradient(35deg,Orange 50%,Yellow 50%);
display:flex;
align-items: center;
justify-content: center;
`

const Wrapper = styled.div` 
width: 80%;
height: 70%;
display: flex;
background-color:white;
border-radius:30px;
color:white;
`
const Left = styled.div` 
flex:0.6;
display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left:10px;
  background:linear-gradient(-15deg,tomato 50%,aqua 50%)
`

const Logo = styled.h3`
font-size: 50px;
font-weight: 800;
color: White;
margin-bottom: 10px;
`

const Desc = styled.span` 
font-size:24px; 
`

const Right = styled.div`
  flex: 0.4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right:10px;
  background:linear-gradient(-15deg,tomato 50%,aqua 50%)
`

const LoginBox = styled.form` 
height:300px;
padding:20px;
border-radius: 10px;
display: flex;
flex-direction: column;
justify-content: space-between;
`
const LoginInput = styled.input`
height: 50px;
border-radius: 10px;
border: 1px solid green;
font-size: 18px;
padding-left: 20px;
:focus{
    outline: 1px solid green;
}`

const LoginButton = styled.button`
height:50px;
border-radius:10px;
border:none;
background-color: #DC4C64;
color: white;
    font-size: 20px;
    font-weight: 500;
    cursor: pointer;
`

const LoginInfo = styled.p`
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    >a{
        text-decoration:none;
        color:blue;
    }
`



const FacultyStudentLogin = () => {
    const dispatch = useDispatch();
    const store = useSelector((state) => state)
    const alert = useAlert();
    const {isAuthenticated} = useSelector((state) => state.student);
    const {isAuthenticated:facultyAuthenticated} = useSelector((state) => state.faculty)

    
    const [facultyRegNum, setFacultyRegNum] = useState('')
    const [facultyPassword, setFacultyPassword] = useState('')
    const [studentRegNum, setStudentRegNum] = useState('')
    const [studentPassword, setStudentPassword] = useState('')
    const [errors, setErrors] = useState({})
    const [errorsHelper, setErrorsHelper] = useState({})
    const [isFacultyLoading, setIsFacultyLoading] = useState(false)
    const [isStudentLoading, setIsStudentLoading] = useState(false)
    const [isStudentLogin,setIsStudentLogin] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        if(facultyAuthenticated)
        {
            navigate('/faculty')
            
        }
    },[facultyAuthenticated])

    useEffect(() => {
        if(isAuthenticated)
        {
            navigate('/home')
           
        }
    },[isAuthenticated])

    useEffect(() => {
        if(store.error)
        {
            setErrors(store.error)
        }
    },[store.error])

    useEffect(() => {
        if (store.errorHelper) {
            setErrorsHelper(store.errorHelper)
        }
    }, [store.errorHelper])

    const studentLoginHandler = (e) => {
        e.preventDefault();
        setIsStudentLoading(true);
        dispatch(studentLogin({registrationNumber:studentRegNum,password:studentPassword}))
    }

    const facultyLoginHandler = (e) => {
        e.preventDefault();
        setIsFacultyLoading(true);
        dispatch(facultyLogin({registrationNumber:facultyRegNum,password:facultyPassword}))
    }

    useEffect(() => {
        if(store.error || facultyAuthenticated){
            setIsFacultyLoading(false)
        }
        else{
            setIsFacultyLoading(true)
        }

    },[store.error,facultyAuthenticated])

    useEffect(() => {
        if(store.errorHelper || isAuthenticated)
        {
            setIsStudentLoading(false);
        }
        else{
            setIsStudentLoading(true);
        }

    },[store.errorHelper,isAuthenticated])

    const handleToggle = (e) => {
        e.preventDefault();
        setIsStudentLogin(prev => !prev);
    }
   

  return (
    <Container>
        <Wrapper>
            <Left>
                <Logo>University ERP</Logo>
                <Desc>Student/Faculty Login</Desc>
            </Left>
            <Right>
                {
                   isStudentLogin? (
                       <LoginBox>
                           <LoginInput placeholder="Student Registered Number" type="text" onChange={(e) => setStudentRegNum(e.target.value)} required/>
                           <LoginInput placeholder="Password" type="password" onChange={(e) => setStudentPassword(e.target.value)} required/>
                           <LoginButton type="submit" onClick={studentLoginHandler}>
                               Log In
                           </LoginButton>
                       <LoginInfo onClick={handleToggle}>
                           Login as Faculty?
                       </LoginInfo>
                       <LoginInfo>
                          <Link to="/forgotPassword/student">
                           Forgot Password?
                           </Link>
                       </LoginInfo>
                       </LoginBox>
                   ):(
                      <LoginBox>
                           <LoginInput placeholder="Faculty Registered Number" onChange={(e) => setFacultyRegNum(e.target.value)} type="text" required/>
                           <LoginInput placeholder="Password" onChange={(e) => setFacultyPassword(e.target.value)} type="password" required/>
                           <LoginButton type="submit" onClick={facultyLoginHandler}>
                               Log In
                           </LoginButton>
                       <LoginInfo onClick={handleToggle}>
                           Login as Student?
                       </LoginInfo>
                       <LoginInfo>
                           <Link to="/forgotPassword/user">
                           Forgot Password?
                           </Link>
                       </LoginInfo>
                      </LoginBox>
                   )
                }
            </Right>
        </Wrapper>
    </Container>
  )
}

export default FacultyStudentLogin
