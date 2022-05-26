import "./App.css";
import React, { useEffect, useContext, useState, useRef } from "react";
import { DispatchContext, StateContext } from "./context/cantosReducer";
import { Context } from "./context/ContextState";
import TextareaAutosize from 'react-textarea-autosize';


function CantosText() {
  const { text } = useContext(Context);
  const state = useContext(StateContext);
  const { cantoStore } = state;
  const { indexes, sectionTextArr } = cantoStore;
  const dispatch = useContext(DispatchContext);
  // const [cantos, setCantos] = useState();
  const [input, setInput] = useState();
  const [isClear, setIsClear] = useState(true);
  // const [displayText, setDisplayText] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [placeHolderValue, setPlaceHolderValue] = useState()

  const inputRef = useRef(null);
 
  
  
  const onClear = () => {
    setInput("");
    setIsClear(true);
  };

  const alertMsg = (type) => { 
    switch (type) {
      case 'low': {
        onClear()
        return window.alert(
          'Please enter a number larger than 0.'
          )
      }   
      case 'high': {
         onClear()
         return window.alert(
           'The maximum amount is 1000. Please enter a number between 1 and 1000.'
           )
      }
      default: {
        onClear()
        return window.alert(
          'There was an error.  Please reset and try again'
          )
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
    // setIsSubmitted(false)
    const strNumber = e.target.value.replace(/^0+/, "");
    setInput(e.target.value ? Number(strNumber) : strNumber);
    setIsClear(false);
  };

  
 
  const onClick = () => {
   
    // setPlaceHolderValue(input)

    if (input <= 0) {
      
      setTimeout(alertMsg('low'), 200)
    }
    if (input > 1000) {
      setTimeout(alertMsg('high'), 200)
    }
    if (input > 0 && input <= 1000){   
      setIsSubmitted(true);
      dispatch({ 
        type: "cantos_text", 
        payload: { text: text, input: input } 
      });
      setIsClear(true)
  };
  inputRef.current.focus();
}

  useEffect(() => {
    if (isClear) {
      inputRef.current.focus();
      setInput("")
    } 
    if (isSubmitted) {  
      setPlaceHolderValue(input)
    }
  }, [isClear, isSubmitted])

  // useEffect(() => {
  //   if (cantoStore && input > 0) {
  //     setDisplayText(cantoStore.output);
  //   }
  // }, [cantoStore]);

  return (
    <div className="App outerContainer center">
        <div className="tableContainer  ">
      {/* <div className="innerContainer">
        <div className="imageContainer"> 
          <img   alt="pic2" src="https://images-na.ssl-images-amazon.com/images/I/41S5Q3AE70L.jpg"/>
          </div>
          <div className="textstuff">
        <div className="center">
              <div className="info" >
                <div className="author">
                <i>The Totality Cantos</i><br/>
                  Brian Ang<br/>
                  Atelos, 2021<br/>
                    <br/>
                    <a href="#0">pdf</a> <a href="#0">print</a><br/>
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
            </div>
          </div>
        </div> */}
        <text className="textstuff">
          The Totality Cantos Generator
        </text>
          <div className="buttons">
              <div className="buttonContainer">
                  <text style={{marginRight: 5}} className="textstuff">Number of sections (1-1000)</text>
                    <input
                      placeholder={placeHolderValue}
                      ref={inputRef}
                      type="number"
                      id="number"
                      min="1"
                      onClick={(e) => { 
                        isSubmitted 
                        ? onClear(e) 
                        : setPlaceHolderValue("")
                      }}
                      value={input && Math.max(1, input)}
                      onChange={(e) => onChange(e)}
                      onKeyPress={(e) => preventMinus(e)}
                      onPaste={(e) => preventPasteNegative(e)}
                      style={{marginRight:5}}
                      />
                    <button onClick={() => onClick()}>
                      Generate{" "}
                    </button>
                </div>
            </div>
        <div className="textOutput center">
          {isSubmitted && (
            indexes.map((cantoIndex, index) => 
            <div className="list" key={index}>
              <input className="indexList" disabled={true} value={cantoIndex}/>
              <TextareaAutosize 
                spellCheck="false" 
                disabled={true} 
                maxRows={10} 
                className="textinput" 
                value={sectionTextArr[index]}
              />
            </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default CantosText;
