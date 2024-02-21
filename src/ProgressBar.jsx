import { useEffect,useState } from "react"
function ProgressBar({maxTimer}){
    const [timer,setTimer]=useState(maxTimer)

useEffect(()=>{
  const interval=setInterval((()=>{

    setTimer((timer)=>{
      return timer-10
    })
    }),10)
    return ()=>{
clearInterval(interval)
    }
},[])
return    <progress max={maxTimer} value={timer}/>
}
export default ProgressBar