import React, { useState, useEffect } from 'react';
import MyButton from "../Components/MyButton";
import Fly_Now from "../Pictures/Fly_Now.png";
import DetailsPopover from "../Components/popOver.tsx";
import { Tickets } from "../Components/TicketGenerator.js"


export function Home(){

  const [data, setData] = useState()
  const [tracking, setTracking] = useState(0)
  const [hold, setHold] = useState([])
  const [noResult, setnoResult] = useState(false)
  const [obj, setObj] = useState(new Tickets)
  const [item, setItem] = useState([])
  const [chkPageProg, setChkPageProg] = useState(false)
  const [chkPrevProg, setChkPrevProg] = useState(false)

  useEffect(() => {
    fetch('data/test2.json').then(
        response => {
          if(response.ok){
            console.log(response);
            return response.json();
          }
          else{
            console.log("not ok");
          }
      }
    ).then(
        data => {
          setData(data);
          var temp = data.result;
          setHold(temp);
        },
    )
  }, []);


    const [showButton, setShowButton] = useState(true);
    const toggleButton = () => {
        setShowButton(!showButton);
    };

    var testing = 0;

    const a = (obj) => {
      var needthis = (parseInt(tracking) + 5)
      console.log(hold.length + " CHECK " + needthis)
      if(needthis >= hold.length && tracking !== 0){
        setChkPageProg(false)
        testing = hold.length - tracking;
        setTracking(testing);
        console.log(hold.length + " in home " + tracking);
      } 
      else if((needthis < hold.length)){
        setTracking(needthis);
        setChkPageProg(true)
        console.log(hold.length + " in THIRD " + tracking + " " + needthis);
      }
      else if(parseInt(tracking) === hold.length && hold.length !== 0){
        setTracking(tracking);
        console.log(hold.length + " in home THIRD " + tracking);
        setChkPageProg(false)
      }
      else{
        console.log("end")
        return
      }
    }

{useEffect(() => {
  console.log("no result ")
}, [noResult])}

  var tomany = []

    return(
      <div>
        <div>
          <img alt="" className="Top-Banner" src={Fly_Now}/>
        </div>
        <div className="Second-Row">
          <div className="LeftComponent">
            {showButton && <button className="Settings-Button" onClick={toggleButton}>Settings</button>}
            {!showButton && 
            <div>      
              <MyButton to=""/>
              <MyButton to="signout" />
            </div>    
            } 
          </div>
          <div className='Second-Row-Ticket-Background'>
            <h1>Hello  </h1>
            {console.log("..... ")}
            {/*{(parseInt(tracking) < hold.length) && (parseInt(tracking) !== hold.length) ? chkPageProg && <a href='#' style={{position: 'fixed', bottom: 0, flexDirection: 'column'}} onClick={() => {a(obj); setnoResult(true); }}>show more</a>: () => {console.log('nothing')}} {/* CREATES SHOW MORE BUTTON, NEED TO ADD CHKPROGPAGE AND ADD ANOTHER OPTION IN a(obj)*/}
            {/*{parseInt(tracking) > 5 ? <a href='#' style={{position: 'fixed', bottom: 0, flexDirection: 'column', left: '185px'}} onClick={() => {a(obj); setnoResult(true); console.log('SHOW LESS')}}>show less</a>: () => {console.log('nothing')}}  CREATES SHOW LESS BUTTON, NEED TO ADD CHKPREVPAGE AND ADD ANOTHER OPTION IN a(obj)*/}
            <a href='#' style={{position: 'fixed', bottom: 0, flexDirection: 'column'}} onClick={() => {a(obj); setnoResult(true); }}>show more</a>
            {item !== undefined ? obj.getTickets(hold,parseInt(tracking), item): () => {console.log('nothing')}}
            {noResult ? () => {setChkPageProg(true); setnoResult(false); setTracking(parseInt(tracking) + 5); }: () => {console.log('nothing')}} {/**/}
            {console.log("?????????????")}
          </div>
        </div>
      </div>
    )


}



