import React,{useContext} from 'react'
import {assets} from '../../assets/assets.js'
import "./Main.css"
import { Context } from '../../context/Context.jsx'


export default function Main() {

    const{onSent,recentPrompt,showResult,loading,resultData,setInput,input,newChat,theme,toggleTheme} = useContext(Context)

  return (
    <div className='main'>
        <div className="nav">
            <p onClick={newChat}>Gemini</p>
            <div className="nav-right" style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
                {/* The Toggle Button! */}
                <button 
                    onClick={toggleTheme} 
                    style={{
                        background: 'transparent', 
                        border: 'none', 
                        fontSize: '24px', 
                        cursor: 'pointer',
                        color: theme === 'light' ? '#333' : '#fff' 
                    }}> 
                    {theme === 'light' ? <i className="fa-solid fa-moon"></i> : <i className="fa-solid fa-sun"></i>} 
                </button>
                <img src={assets.user_icon} alt="" className="user-icon" />
            </div>
        </div>
        <div className="main-container">
            {showResult===false?
            <>
            <div className="greet">
                <p><span>Hello, Dev.</span></p>
                <p>How can i help you today?</p>
            </div>
            <div className="cards">
                <div className="card">
                    <p>Suggest beautiful places to see on an upcoming road trip</p>
                    <img src={assets.compass_icon} alt="" />
                </div>
                <div className="card">
                    <p>Suggest beautiful places to see on an upcoming road trip</p>
                    <img src={assets.bulb_icon} alt="" />
                </div>
                <div className="card">
                    <p>Suggest beautiful places to see on an upcoming road trip</p>
                    <img src={assets.message_icon} alt="" />
                </div>
                <div className="card">
                    <p>Suggest beautiful places to see on an upcoming road trip</p>
                    <img src={assets.code_icon} alt="" />
                </div>
            </div>
            </>
            :
            <div className='result'>
                <div className="result-title">
                    <img src={assets.user_icon} alt="" />
                    {/* jo currently input diya in gemini wo loading hora asa show hoga */}
                    <p>{recentPrompt}</p>
                </div>
                <div className="result-data">
                    <img src={assets.gemini_icon} alt="" />
                    {loading==true?
                    <div className="loader">
                        <hr />
                        <hr />
                        <hr />
                    </div>
                    : 
                    <>
                    {/* React normally blocks HTML tags for security.dangerouslySetInnerHTML forces React to read the <b> and <br> tags inside our Gemini response so the text is actually formatted nicely. without this <b> and <br> tags will be printed as plain text without any logic*/}
                    <p dangerouslySetInnerHTML={{__html:resultData}}></p>
                    </>
                    }
                    
                </div>
            </div>
            }
            <div className="main-bottom">
                <div className="search-box">
                    <input onChange={(event) => setInput(event.target.value)} value={input} type="text" placeholder='Enter a prompt here'/>
                    <div>
                        <img src={assets.gallery_icon} alt="" />
                        <img src={assets.mic_icon} alt="" />
                        {input!=""?
                        <img onClick={() => onSent()} src={assets.send_icon} alt="" />
                        :null
                        }
                        
                    </div>
                </div>
                <p className="bottom-info">
                    This Gemini clone is made with love by Kshitiz & can make mistakes. 
                </p>
            </div>
        </div>
    </div>
  )
}
