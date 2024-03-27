import MainContainer from './components/MainContainer/MainContainer'
import {Route,Routes} from 'react-router-dom'
import Auth from './components/Auth/Auth'
import Onboarding from './components/onboarding/Onboarding'
import ChatMessages from './components/ChatForm/ChatMessages'
import { useMediaQuery } from '@mui/material'
import GroupPage from './components/MainContainer/groupCreation/GroupPage'
import GroupMessages from './components/ChatGroup/GroupMessages'
import SearchPage from './components/Search/SearchPage'
import MainProfile from './components/ChatGroup/GroupProfile/MainProfile'
import MainChtProfile from './components/ChatForm/ChatProfile/MainChtProfile'

const App = () => {
  const matches = useMediaQuery('(min-width:800px)');

  return (
    <div>
      <div className=''>
      <Routes>
         <Route exact element={<MainContainer />} path='/' />

         <Route exact element={<Auth />} path='/auth' />
         <Route excat element={<Onboarding />} path='/onboarding/:id' />
         <Route exact element={<Onboarding />} path='/onbaording/update' />

         <Route exact element={ matches ? <MainContainer /> : <ChatMessages />} path='/chat/:id' />
         <Route exact element={matches ? <MainContainer /> : <GroupMessages />} path='/group/:id' />

         <Route excat element={<SearchPage />} path='/search' />
         <Route exact element={matches ? <SearchPage /> : <GroupPage />} path='/page' />

         <Route exact element={<MainProfile />} path='/groupProfile/:groupId' />
         <Route exact element={matches ? <MainProfile /> : <MainChtProfile />  } path='/chatProfile/:userId' />
      </Routes>
      </div>
    </div>
  )
}

export default App