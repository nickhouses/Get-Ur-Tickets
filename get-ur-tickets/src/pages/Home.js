import React, { useState, useEffect } from 'react';
import MyButton from "../Components/MyButton";
import Fly_Now from "../Pictures/Fly_Now.png";
import DetailsPopover from "../Components/popOver.tsx";
import { Tickets, chkMore, chkLess } from "../Components/TicketGenerator.js"
import { Authenticator } from '@aws-amplify/ui-react';
import { Contact } from './Contact';
import { Prev } from 'react-bootstrap/esm/PageItem';

const UserBanner = () => {
  return (
      <Authenticator>
          {({ user }) => (
              <div className="Nav-Banner">
                  <h1 className="Word-Color">Welcome, {user.username}!</h1>
              </div>
          )}
      </Authenticator>
  );
};

export default UserBanner;



export function Home(){

  const [data, setData] = useState()
  const [tracking, setTracking] = useState(0)
  const [hold, setHold] = useState([])
  const [noResult, setnoResult] = useState(false)
  const [obj, setObj] = useState(new Tickets)
  const [item, setItem] = useState([])
  const [chkPageProg, setChkPageProg] = useState(false)
  const [chkPrevProg, setChkPrevProg] = useState(false)

  const [MoreOrLess, setMoreOrLess] = useState(1)  //using 1 to show more and 2 to show less. anything else is an error

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



    const a = (obj, pageChangeChk) => {
      var testing = 0;
      console.log('inside a')
      if(pageChangeChk === 1){
        console.log('inside see more')
        var needthis = (parseInt(tracking) + 5)
        console.log(hold.length + " CHECK " + needthis )
        if(needthis >= hold.length && tracking !== 0){
          testing = hold.length - tracking;
          setTracking(hold.length - tracking);
          console.log(hold.length + " in home " + tracking);
          setMoreOrLess(1);
        } 
        else if((needthis < hold.length)){
          setTracking(a =>(a + 5));
          console.log(hold.length + " in THIRD " + tracking + " " + needthis);
          setMoreOrLess(1);
        }
        else if(parseInt(tracking) === hold.length && hold.length !== 0){
          setTracking(tracking);
          console.log(hold.length + " in home fourth " + tracking);
          setMoreOrLess(1);
        }
        else{
          console.log("end")
          return
        }
      }
      else if(pageChangeChk === 2){
        console.log('inside see less')
        var needthis = (parseInt(tracking) - 5)
        if(needthis > 5){
          console.log("less than, tracking > 5")
          setTracking(a => a - 5 );
          setMoreOrLess(2);
        } 
        else if(needthis <= 5){
          console.log("less than, tracking < 5 " + tracking)
          let test = 5
          setTracking(5);
          setMoreOrLess(2);
        }
        else{
          console.log("error")
          return
        }
      }
      else{
        console.log("no more pages or less pages true")
      }
      return
    }

    const [MenuButton, setMenuButton] = useState(true);
    const toggleMenu = () => {
        setMenuButton(!MenuButton);
    };
    return(
      <div className='banner-container'>
        <img alt="" className="Top-Banner" src={Fly_Now}/>
          
        <div className='button-overlay'>
          
        {<button className="Top-Banner-2" onClick={toggleButton}>Settings</button>}
            {!showButton &&  (
            <div className='button-group'>      
              <MyButton to="signout" />
            </div>    
            )} 
          <UserBanner/>
          
        </div>
        <div className="Second-Row">
        {<button className="Search-Button" onClick={toggleMenu}>Menu</button>}
            {!MenuButton &&  (
            <div className='button-group'>      
              <MyButton to="Restart Search" />
              <MyButton to="Contact" />
            </div>    
            )} 
          <div className='Second-Row-Ticket-Background'>
            {console.log("..... ")}
            {item !== undefined ? obj.getTickets(hold,tracking, MoreOrLess) : () => {console.log('nothing')}}
            {item !== undefined && chkMore === true ? <a href='#' style={{flexDirection: 'column', marginRight: '10px'}} onClick={() => { a(obj, 1);}}>show more</a> : () => {console.log('nothing')}}
            {item !== undefined && chkLess === true ? <a href='#' style={{flexDirection: 'column'}} onClick={() => {a(obj, 2);}}>show less</a> : () => {console.log('nothing')}}
            {console.log (chkMore + "    tesssssssssssssssssssssssst    " + chkLess)}
          </div>
        </div>
      </div>
    )


}



