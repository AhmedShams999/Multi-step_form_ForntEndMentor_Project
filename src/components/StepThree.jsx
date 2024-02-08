import React, {useState} from 'react'

export default function StepThree({handleClickNext,handleClickPrev,handlerFunction,plansType}) {
  const [addOns, setAddOns] = useState([
    {
      id: 1,
      toggled: false,
      name: "Online Service",
      priceM: 1,
      priceY: 10,
      info: "Access to multiplayer games"
    },
    {
      id: 2,
      toggled: false,
      name: "Larger Storage",
      priceM: 2,
      priceY: 20,
      info: "Extra 1TB of cloud save"
    },
    {
      id: 3,
      toggled: false,
      name: "Customizable profile",
      priceM: 2,
      priceY: 20,
      info: "Custom theme osn your profile"
    },
  ])

  const [toggle,setToggled] = useState(false)

  const toggleFunction = (id)=>{
    setAddOns(prevState => prevState.map(item=>{
        return  item.id == id? {...item,
          toggled: !item.toggled  
        }
        :
        {...item}
      
    }))
    // setToggled(!toggle)
  }

  const handleChange = () => {
    setToggled(current => !current);
  };
  
  const stepThreeData = async ()=>{
    let count = 0

   await handlerFunction(prevState => {
      const newState = []

      for(let i=0;i<addOns.length;i++){
        const {name,toggled,priceM,priceY} = addOns[i]
        if(toggled == true){
          count += plansType=="Monthly"?priceM:priceY
          newState.push({
            id: Math.ceil(Math.random()*1000),
            name: name,
            price: plansType=="Monthly"?priceM:priceY
            })
         }
        }

      return {...prevState,
        addOnsSelected: newState,
        allPrice: count+prevState.price
      }
    })
   await handleClickNext()
  }

  const showAddOns= ()=>{
    return addOns.map(item=>(
      <div key={item.id} className={item.toggled?'container__right__mid__allSelections__selection active':'container__right__mid__allSelections__selection'} onClick={()=>toggleFunction(item.id)}>
        <input 
          type="checkbox" 
          name="checkbox" 
          checked={item.toggled}
          onChange={()=> handleChange()}
          />     
        <div>
          <h3>{item.name}</h3>
          <p>{item.info}</p>
        </div>
        <p>+${plansType=="Monthly"?item.priceM + "/mo":item.priceY + "/yr"}</p>
     </div>
    ))
  }

  return (
    <>
    <div className='container__right__top'>
       <h1>Pick add-ons</h1>
       <p>Add-ons help enhance your gaming experience</p>
     </div>

    <div className='container__right__mid'>
        <div className='container__right__mid__allSelections'>
          {showAddOns()}
        </div>
     </div>

     <div className='container__right__bottom'>
        <p onClick={handleClickPrev}>Go Back</p>
        <button onClick={stepThreeData}>Next Step</button>
      </div>      
 </>
  )
}
