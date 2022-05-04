import React, {
  useContext,
  createContext,
} from "react";
import { useImmerReducer } from "use-immer";
import formatCantos from "./cantoIndex";
// import { Context } from "./ContextState";


export const cantosReducer = (draft, action) => {
  switch (action.type) {
    case "cantos_text": {
      const cantoStore = formatCantos(action.payload.text, action.payload.input).sortCantosSections()
        draft.cantosText = action.payload.text
        draft.cantoStore = formatCantos(action.payload.text, action.payload.input).sortCantosSections(); 
        draft.cantosSorted = cantoStore.secondRun
        draft.cantosLineValues = cantoStore.lineValues
        draft.cantosIndexes = cantoStore.indexes
        draft.cantosSectionText = cantoStore.sectionTextArr
        return;
      }
    case "resize_canto": {
      draft.output = formatCantos(action.payload.text, action.payload.input).sortCantosSections().output;
      return;
    }
    default: {
      return;
    }
  }
};

export const DispatchContext = createContext(null);
export const useDispatchContext = () => useContext(DispatchContext);
export const StateContext = createContext(null);
export const useStateContext = () => useContext(StateContext);
export const CantoContext = ({ children }) => {
  let initialState = {
    cantosText: "",
    cantosIndex: "",
    cantosSorted: "",
    cantosLineValues: "",
    cantoStore:"",
    output: "",
    cantosIndexes: "",
    cantosSectionText: "",
   
    
  };
  const [state, dispatch] = useImmerReducer(cantosReducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
