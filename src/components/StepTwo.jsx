import React, { useEffect, useRef ,useState} from 'react'
import { iconArcade,iconAdvanced,iconPro } from './Images'
export default function StepTwo({handleClickNext,handleClickPrev,handlerFunction,phoneSize}) {
  const [selected, setSelected] = useState(0)
  const [error, setError] = useState(false)
  const [checked, setChecked] = useState(false)
  const plans =[
    {
      id: 1,
      img: iconArcade,
      name: "Arcade",
      priceM: 9,
      priceY: 90,
      info: "2 months free"
    },
    {
      id: 2,
      img: iconAdvanced,
      name: "Advanced",
      priceM: 12,
      priceY: 120,
      info: "2 months free"
    },
    {
      id: 3,
      img: iconPro,
      name: "Pro",
      priceM: 15,
      priceY: 150,
      info: "2 months free"
    }
  ]

  const toggleYearOrMonth = ()=>{
    return(
      <>
        <p className={!checked?'active':""}>Monthly</p>
            <label className="switch">
              <input type="checkbox" onClick={()=> setChecked(!checked)} id="check"/>
              <span className="slider round"></span>
            </label>
          <p className={checked?'active':""}>Yearly</p>
      </>
    )
  }

  const stepTwoData = async()=>{
    if(selected != 0){

      const selectedPlan = plans[selected-1]
      await handlerFunction(prevState => {
        return { ...prevState,
          plan: selectedPlan.name,
          price: checked?selectedPlan.priceY : selectedPlan.priceM,
          type: checked?"Yearly" : "Monthly"
        }
      })
    }
    handleClickNext()
  }

  const showPlans = ()=>{
    return plans.map(item=>
       (
        <div key={item.id} className={item.id == selected ?'container__right__mid__allCards__card active':'container__right__mid__allCards__card'} onClick={()=> setSelected(item.id)}>
          <div>
            <img src={item.img} alt="icon" />
          </div>

          <div>
            <h3>{item.name}</h3>
            <p>${checked?item.priceY+"/yr":item.priceM + "/mo"}</p>
            {checked&& <p className='info'>{item.info}</p>}
          </div>
       </div>
      )
    )
  }

  const handleErrors= ()=>{
    if(selected == 0){
      setError(true)
    }else{
      stepTwoData()
    }
  }
  
  return (
    <>
      <div className='container__right__top'>
          <h1>Select your plan</h1>
          <p>You have the option of mounthly or {phoneSize&&<br/>} yearly billing.</p>
        </div>
        
      <div className='container__right__mid'>
         <div className='container__right__mid__allCards'>
            {showPlans()}

         </div>

         <div className="container__right__mid__toggle">
             {toggleYearOrMonth()}
         </div>

         {error&& <p className='errorP'>You must select a plan</p>}
       </div>

      <div className='container__right__bottom'>
           <p onClick={handleClickPrev}>Go Back</p>
           <button onClick={()=>handleErrors()}>Next Step</button>
       </div>    
    </>
  )
}
