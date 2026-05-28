import React,{useContext, useState} from 'react'
import "./Sidebar.css"
import {assets} from "../../assets/assets.js"
import { Context } from '../../context/Context.jsx';

export default function Sidebar() {
    const [extended,setExtended] = useState(false);
    const {onSent, prevPrompts, setRecentPrompt, newChat} = useContext(Context);

    function toggleextended(){
        console.log("value toggled");
        setExtended(!extended);
    }
    //onClick={() => loadPrompt(item)} -> You are telling the browser: "When the user clicks this specific text in sidebar, grab the question text (item) and hand it directly to the loadPrompt function."
    async function loadPrompt (prompt){
        setRecentPrompt(prompt); //now recent prompt value ith the text i clicked in sidebar
        await onSent(prompt); //now this clicked question sent to gemini to answere again
    }


  return (
    <div className='sidebar'>
        <div className="top">
            <img onClick={() => toggleextended()} className='menu' src={assets.menu_icon} alt="" />
            <div onClick={() => newChat()} className="new-chat">
                <img src={assets.plus_icon} alt="" />
                {extended==true?<p>New Chat</p>:null}
            </div>
            {extended==true?
            <div className="recent">
                <p className='recent-title'>Recent</p>
                {prevPrompts.map((item,index)=>{
                    return (
                        <div onClick={() => loadPrompt(item)} key={index} className="recent-entry">
                            <img src={assets.message_icon} alt="" />
                            <p>{item.slice(0,15)}...</p>
                        </div>
                    )
                })}   
            </div>
            :null}
            
        </div>
        <div className="bottom">
            <div className="bottom-item recent-entry">
                <img src={assets.question_icon} alt="" />
                {extended==true?<p>Help</p>:null}
            </div>
            <div className="bottom-item recent-entry">
                <img src={assets.history_icon} alt="" />
                {extended==true?<p>Activity</p>:null}
            </div>
            <div className="bottom-item recent-entry">
                <img src={assets.setting_icon} alt="" />
                {extended==true?<p>Settings</p>:null}
            </div>
        </div>
    </div>
  )
}
