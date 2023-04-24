import { FileContext } from './/FileContext';
import { useState } from 'react'
import App from './App'

const ContextWrapper = () =>{
   const [activeCrossword, setActiveCrossword] = useState(null);
   const [activeSolution, setActiveSolution] = useState(null);
   const [activeCrosswordInfo, setActiveCrosswordInfo] = useState(null);
   const [self, setSelf] = useState(null);
   const [friendsList, setFriendsList] = useState(null);

   return (
      <FileContext.Provider value={{ activeCrosswordInfo, setActiveCrosswordInfo, friendsList, setFriendsList, self, setSelf, activeCrossword, activeSolution, setActiveCrossword, setActiveSolution }}>
      <App/>
      </FileContext.Provider>
   )
}

export default ContextWrapper;