import { createContext, useState } from "react";

export let CounterContext = createContext();

export function CounterContextProvider(props) {
  const [userName, setUserName] = useState("");
  const [counter, setCounter] = useState(0);

  function increaseCounter() {
    setCounter(counter + 1);
  }
  function deacreaseCounter() {
    setCounter(counter - 1);
  }

  return (
    <CounterContext.Provider
      value={{ userName, counter, increaseCounter, deacreaseCounter }}
    >
      {props.children}
    </CounterContext.Provider>
  );
}
