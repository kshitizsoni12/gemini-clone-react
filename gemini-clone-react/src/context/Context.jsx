//Normally in React, if a "Grandparent" component has some data and wants to give it to a "Grandchild" component, it has to pass it down manually through the "Parent" component first. This is called prop drilling, and if your app is big, it gets really annoying.
//Context is like a global group chat for your app. Instead of passing data down a long chain, you just put the data into the Context. Then, any component in your app (Sidebar, Main chat, etc.) can just "log in" to the group chat and grab exactly what it needs instantly.

import { createContext, useState } from "react";
import runChat from "../config/gemini";

// This line creates the empty group chat (the teleporter). We export it so other files in your app can connect to it later.
export const Context = createContext();

// This is a special component. Its only job is to be the manager of the data. It holds all the functions (like sending a message to Gemini) and all the variables, and decides what is allowed to be shared with the rest of the app.
export default function ContextProvider (props){

    //to take prompt input from the user
    const[input,setInput] = useState("");
    const[recentPrompt,setRecentPrompt] = useState("");
    const[prevPrompts,setPrevPrompts] = useState([]);
    const[showResult,setShowResult] = useState(false);
    const[loading,setLoading] = useState(false);
    const[resultData,setResultData] = useState("");
    //light & dark mode feature
    const [theme, setTheme] = useState("dark");

    const toggleTheme = () => {
        setTheme((prevTheme) => {
            return prevTheme === "light" ? "dark" : "light"
        });
    };

    // Typing effect for gemini's response
    //setTimeout is a built-in JavaScript feature that tells the browser, "Wait this many milliseconds before running the code inside."
    const delayPara = (index,nextword) => {
        setTimeout(function() {
            setResultData(prev => prev+nextword+" ");   //you are strictly telling React: "Look at whatever is on the screen at this exact millisecond, and just glue this new word to the end of it."
        },75*index)
    }
    //Word 0 ("I"): Waits 75 * 0 = 0 milliseconds  ->   Word 1 ("love"): Waits 75 * 1 = 75 milliseconds.   ->   Word 2 ("React"): Waits 75 * 2 = 150 milliseconds.

    
    function newChat(){ //when clicked we reach to home page
        setLoading(false)
        setShowResult(false)
    }


    const onSent = async (prompt) => {

        console.log("SENDING EXACTLY ONE REQUEST TO GOOGLE!");

        setResultData("");
        setLoading(true);
        setShowResult(true);

        //our input(either by tping or by clicking in sidebar history) will go as a prompt for gemini, and the response returned by gemini will be stored in this variable "response"
        let response;
        if(prompt != undefined){ //when we clicked prev question in sidebar history, the loadPrompt(prompt) function in sidebar.jsx takes that question and send it to gemini using onSent(prompt), therefore prompt is undefined as it already has a text like ("what is HTML").
            setRecentPrompt(prompt);
            response = await runChat(prompt);
        }else{              //The user typed a new question, -> user just clicks the normal "Send" button at the bottom of the screen, they didn't pass a prompt. The prompt is empty (undefined) ,text which is passed is input so step-0-> prompt=undefined , input = "what is html", step2->it comes to this else block, step3-> here then we do (prompt = input) ,asa krte dikh nhi rha bcoz jha prompt pass krhe the wha ab directly input pass krdere
            setRecentPrompt(input);
            setPrevPrompts((prev) => [...prev,input]);
            response = await runChat(input)
        }

        //response.split("**") -> this acts like ex:"I **love** react so **much**." -> ["I","love","react so","much."] -> see all normal texts are at even indices 0/2/4.. and texts inside ** are in odd indices like **.
        let responseArray = response.split("**");
        let newResponse = ""; // a string variable
        for(let i=0; i<responseArray.length; i++){
            if(i%2==0){
                newResponse += responseArray[i];
            }else{
                newResponse += "<b>"+responseArray[i]+"</b>";
            }
        }
        //this for loop array converts our response("I **love** react so **much**.") to-> newresponse("I <b>love</b> react so <b>much.</b>")

        let newResponse2 = newResponse.split("*").join("</br>")

        // setResultData(newResponse2); -> directly shows result but we want tping effect see how below
        let newResponseArray = newResponse2.split(" "); //If the AI said, "I love React", this line turns it into a list: ["I", "love", "React"].
        for(let i=0; i<newResponseArray.length; i++){
            const nextWord = newResponseArray[i];
            delayPara(i,nextWord); //call function ex: delayPara(1,"love")
        }
        

        setLoading(false);
        setInput("");
    }

    // This is the package of data you are sharing with the rest of the app. Right now it is completely empty! Later we will put variables and functions in here so the Sidebar and Main components can use them.
    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        resultData,
        recentPrompt,
        showResult,
        loading,
        input,
        setInput,
        newChat,
        theme,
        toggleTheme,
    }

    // This is the manager saying, "Okay, any component that sits inside of me (props.children) is allowed to have access to the contextValue package.
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}