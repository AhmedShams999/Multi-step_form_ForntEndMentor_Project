import React,{useState} from 'react'
import Confirm from './Confirm'

export default function StepFour({handleClickNext,handleClickPrev,handlerChange,allData}) {
  const [confirm, setConfirm] = useState(false)

  const {price,plan,type,addOnsSelected,allPrice} = allData
  
  const showAddOnsInSummary = ()=>{
    return addOnsSelected.map(item=>{
      return <div key={item.id} className='container__right__mid__summary__section'>
              <h5>{item.name}</h5>
              <p className='container__right__mid__summary__section__random'>+${item.price}{type == "Monthly"?"/mo":"/yr"}</p>
          </div>
    })
  }

  return (
    <>
    {confirm?
      <Confirm />
    :
    <>
      <div className='container__right__top'>
        <h1>Finishing up</h1>
        <p>Double-check everything looks OK before confirming</p>
      </div>

      <div className='container__right__mid'>
        <div className='container__right__mid__summary'>
            <div className='container__right__mid__summary__section'>
              <div>
                <h3>{plan}({type})</h3>
                <p onClick={handlerChange}>Change</p>
              </div>
              <p className='container__right__mid__summary__section__uniqe'>${price}{type == "Monthly"?"/mo":"/yr"}</p>
            </div>

            <hr />
            {showAddOnsInSummary()}
        </div>

        <div className='container__right__mid__Overall'>
            <h5>Total(per month)</h5>
            <p>+${allPrice}{type == "Monthly"?"/mo":"/yr"}</p>
        </div>
      </div>

  <div className='container__right__bottom'>
          <p onClick={handleClickPrev}>Go Back</p>
          <button onClick={()=>setConfirm(true)} className='confirm'>Confirm</button>
        </div>      
    </>
    }
  </>
  )
}
