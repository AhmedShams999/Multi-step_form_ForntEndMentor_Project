import React,{ useEffect, useRef, useState } from 'react'

export default function StepOne({handleClickNext,handlerFunction,allData}){
  const [error, setError] = useState(false)
  const inputRef = useRef(null)
  const {name,email,phoNum} = allData

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  useEffect(()=>{
    inputRef.current.onkeydown= (e)=>{
      if(isNaN(e.key) && e.key !== 'Backspace') {
        e.preventDefault();
        
      }
    }
  },[])

  const stepOneData = (e)=>{
    const {name,value} = e.target
    handlerFunction(prevState => {
      return { ...prevState,
        [name]:value.trim()
      }
    })
  }

  const handleErrors= ()=>{
    if(name== "" || email == "" || phoNum == ""){
      setError(true)
    }else if (!validateEmail(email)){
      setError(true)
    }else{
      handleClickNext()
    }
  }
  
  return (
    <>
       <div className='container__right__top'>
          <h1>Personal info</h1>
          <p>Please provide your name, email address, and phone number</p>
        </div>

       <div className='container__right__mid'>
             <div className='container__right__mid__input'>
                {name==""&&error&&<p>This field is required</p>}
                <label htmlFor="name">Name</label>
                <input type="text" name="name" className={name==""&&error?'name error':'name'} placeholder='e.g.Stephen King' onChange={stepOneData} />  
              </div>
            
              <div className='container__right__mid__input'>
                {email==""&&error&&<p>This field is required</p>}
                {!validateEmail(email)&&error&&!email==""&&<p>This field is invaild</p>}

                <label htmlFor="email">Email Address</label>
                <input type='email' name="email" className={email==""&&error||!validateEmail(email)&&error&&!email==""?'email error':'email'} placeholder='e.g. stephenking@loram.com' onChange={stepOneData} />
              </div>
            
            <div className='container__right__mid__input'>
                {phoNum==""&&error&&<p>This field is required</p>}
                <label htmlFor="phoNum">Phone Number</label>
                <input 
                  ref={inputRef}
                  type="tel" 
                  name="phoNum" 
                  className={phoNum==""&&error?'phonNum error':'phonNum'}
                  placeholder='e.g. 1234 567 890' 
                  onChange={stepOneData} 
                 />
              </div>
        </div>

        <div className='container__right__bottom'>
           <button onClick={handleErrors}>Next Step</button>
         </div>      
    </>
  )
}
