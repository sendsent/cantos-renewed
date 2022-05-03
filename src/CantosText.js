import "./App.css";
import React, { useEffect, useContext, useState, useRef } from "react";
import { DispatchContext, StateContext } from "./context/cantosReducer";
import { Context } from "./context/ContextState";
import TextareaAutosize from 'react-textarea-autosize';


function CantosText() {
  const { text, index } = useContext(Context);
  const state = useContext(StateContext);
  const { cantosText, cantosIndex, cantoStore } = state;
  const { indexes, sectionTextArr } = cantoStore;
  const dispatch = useContext(DispatchContext);
  const [cantos, setCantos] = useState();
  const [input, setInput] = useState();
  const [isClear, setIsClear] = useState(true);
  const [displayText, setDisplayText] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const inputRef = useRef(null);
 
  
  
  const onClear = () => {
    setInput("");
    setDisplayText("");
    setIsClear(true);
    setIsSubmitted(false);
  };

  const alertMsg = (type) => { 
    switch (type) {
      case 'low': {
        onClear()
     return window.alert('Please enter a number larger than 0.')
      }   
      case 'high': {
         onClear()
        return window.alert('The maximum amount is 1000. Please enter a number between 1 and 1000.')
      }
      default: {
        onClear()
        return window.alert('There was an error.  Please reset and try again')
      }
  }
}
 
  const preventMinus = (e) => {
    const invalidChars = [
      "-",
      "+",
      ".",
      "e",
    ];
    
    if (invalidChars.includes(e.key)) {
        e.preventDefault();
      }
    
    if (e.code === 'Minus' ) {
        e.preventDefault();
    }
  
    
};
const preventPasteNegative = (e) => {
  const clipboardData = e.clipboardData || window.clipboardData;
  const pastedData = parseFloat(clipboardData.getData('text'));

  if (pastedData < 0 || pastedData > 1000) {
      e.preventDefault();
  }
};

  const onChange = (e) => {
    const strNumber = e.target.value.replace(/^0+/, "");
    setInput(e.target.value ? Number(strNumber) : strNumber);
    setIsClear(false);
  };

  
 
  const onClick = () => {
    setIsSubmitted(true);
    if (input <= 0) {
      
      setTimeout(alertMsg('low'), 200)
    }
    if (input > 1000) {
      setTimeout(alertMsg('high'), 200)
    }
    if (input > 0 && input <= 1000){   
    dispatch({ type: "cantos_text", payload: { text: text, input: input } });
  };
  inputRef.current.focus();
}

  useEffect(() => {
      inputRef.current.focus();
  }, []);

  // useEffect(() => {
  //   if (cantoStore && input > 0) {
  //     setDisplayText(cantoStore.output);
  //   }
  // }, [cantoStore]);

  return (
    <div className="App outerContainer">
      <div className="innerContainer">
        <div className="tableContainer">
        <div className="imageContainer"> 
          <img   src="https://images-na.ssl-images-amazon.com/images/I/41S5Q3AE70L.jpg"/>
          </div>
        <table className="center">
          <div className="textstuff">
            <tr>
              <td colspan={2}>
              <div className="info" >
                <div className="author">
                <i>The Totality Cantos</i><br/>
                  Brian Ang<br/>
                  Atelos, 2021<br/>
                    <br/>
                    <a href="">pdf</a> <a href="">print</a><br/>
                    <br/>
                </div>
                <div className="intro">
                      The 2008 economic crisis and global backdrop of struggles by 2011 renewed possibilities for thinking totality, materializing it for apprehension. I wrote <i>The Totality Cantos</i> from the desire to be interested in everything, sampling from discourses of history, philosophy, religion, science, and the humanities, knowledges of what constitute totality. Assemblage poetics, constructive verse, writing adequate to apprehending totality.<br/>
                    <br/>
                    <br/>
                      <i>The Totality Cantos</i> is Brian Ang’s first book. totalitycantos@gmail.com<br/>
                  <i>The Totality Cantos</i> generator randomizes assemblages of the poem’s one thousand sections. Programming by Alif Aleph Sajan & Franz Fernando.<br/>
                </div>
                </div>
              </td>
            </tr>
          </div>
        </table>
        </div>
          <div  className="buttons">
            <tr>
              <td colspan={2}>
                <p>
                  <p className="textstuff">Generate random number of sections in range (1-1000)</p>
                  <div className="buttonContainer">
                    <button   onClick={() => onClick()}>
                      Generate{" "}
                    </button>
                    <input
                      placeholder="0"
                      ref={inputRef}
                      type="number"
                      id="number"
                      min="1"
                      value={input && Math.max(1, input)}
                      onChange={(e) => onChange(e)}
                      onKeyPress={(e) => preventMinus(e)}
                      onPaste={(e) => preventPasteNegative(e)}
                      />
                  </div>
                </p>
            </td>
          </tr>
        </div>
    <div className="textOutput">
       {displayText && (
         indexes.map((cantoIndex, index) => 
         <div className="list" key={index}>
           <input className="indexList" disabled={true} value={cantoIndex}/>
           <TextareaAutosize spellCheck="false" maxRows={10} className="textinput" value={sectionTextArr[index]}/>
           </div>)
         )}
         </div>
        </div>
    </div>
  );
}

export default CantosText;
