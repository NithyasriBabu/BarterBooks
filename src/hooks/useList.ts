import { useState } from "react"

const useList = (initialList: []) => {
  const [ list, setList ] = useState([...initialList]);

  const addToList = (newItem) => {
    setList({...list, newItem});
  };

  return { list };
}

export default useList;