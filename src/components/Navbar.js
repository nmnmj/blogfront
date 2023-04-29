import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUserloginMutation, useUserregisterMutation } from '../services/post'
import { useDispatch } from 'react-redux'
import { searchblog } from '../services/blogSlice'
import { getToken, storeToken } from '../services/token'


const Navbar = () => {
    let token = getToken()
    // console.log( token==null )
    let dispatch = useDispatch()
    let[sinput, setSinput] = useState('')
    let[userregister, regresponse] = useUserregisterMutation()
    let[userlogin, logresponse] = useUserloginMutation()
    let navigate = useNavigate()
  
    useEffect(()=>{
        if(regresponse.isSuccess){
            // console.log(regresponse)
        }
        // if(logresponse.isSuccess){
        //     navigate("/home", {state: logresponse.data})
        // }
      
    },[regresponse, logresponse])

    if(regresponse.isLoading) return <div>
        Registering...
    </div>
    if(logresponse.isLoading) return <div>
        LoggingIn...
    </div>

  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">BlogsPoint</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to="/allblogs">AllBlogs</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/home">Home</Link>
                    </li>
                   
                    <h3 className='text-light ms-5'>
                        {
                            localStorage.getItem("name") && token && 
                            <div>
                                Welcome {localStorage.getItem("name").charAt(0).toUpperCase().concat(localStorage.getItem("name").substring(1)) }
                            </div>
                        }
                    </h3>
                   
                </ul>
                <div className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={sinput} onChange={(e)=>{
                            setSinput(e.target.value)
                        }}  />
                        <button className="btn btn-outline-success" onClick={()=>{
                            let payload = {
                                blogs:logresponse.data,
                                input:sinput
                            }
                            dispatch(searchblog(payload))
                        }}>Search</button>
                    {
                       token==null &&
                       <>
                        <button type="button" className="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#exampleModal1">
                        Login
                        </button>
                        <button type="button" className="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Register
                        </button>
                        
                        </>
                    }
                </div>
                </div>
            </div>
        </nav>
            
           

            {/* login */}
            <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel1" aria-hidden="true">
            <div className="modal-dialog">
                <form onSubmit={
                     async (e)=>{
                        e.preventDefault()
                        let dataa = new FormData(e.currentTarget)
                        let adata = {
                            name:dataa.get("name"),
                            password:dataa.get("password"),
                        }
                        await userlogin(adata)
                        // console.log(logresponse)
                        if(await logresponse.data.status==='success'){
                            storeToken(logresponse.data.token)
                            localStorage.setItem("name", logresponse.data.name)
                            navigate("/home", {state:logresponse.data})
                            
                        }
                        else if(await logresponse.data.status==='failed'){
                            alert(logresponse.data.user)
                        }
                    }
                }>
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel1">Login Form</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <input type="text" name="name" placeholder='name*' required />
                    <input type="password" name="password" placeholder='password*' required />
                </div>
                <div className="modal-footer">
                    <button type="submit" data-bs-dismiss="modal" className="btn btn-primary">Login</button>
                </div>
                </div>
                </form>
            </div>
            </div>
            {/* register */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <form onSubmit={
                    async (e)=>{
                        e.preventDefault()
                        let dataa = new FormData(e.currentTarget)
                        let adata = {
                            name:dataa.get("name"),
                            email:dataa.get("email"),
                            password:dataa.get("password"),
                        }
                        await userregister(adata)
                    }
                }>
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Register Form</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <input type="text" name="name" placeholder='name*' required />
                    <input type="email" name="email" placeholder='email*' required />
                    <input type="password" name="password" placeholder='password*' required />
                </div>
                <div className="modal-footer">
                    <button data-bs-dismiss="modal" type="submit" className="btn btn-primary">Register</button>
                </div>
                </div>
                </form>
            </div>
            </div>
    </div>
  )
}

export default Navbar