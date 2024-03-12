import MainContainer from './components/MainContainer/MainContainer'
import {Route,Routes} from 'react-router-dom'
import Auth from './components/Auth/Auth'
import Topbar from './components/Topbar/Topbar'
import Onboarding from './components/onboarding/Onboarding'
import ChatForm from './components/ChatForm/ChatForm'

const App = () => {
  return (
    <div>
      <div className=''>
        <Topbar />
      </div>
      <Routes>
       <Route exact element={<MainContainer />} path='/' />
        <Route excat element={<ChatForm />} path='/chat/:id' />
         <Route exact element={<Auth />} path='/auth' />
         <Route excat element={<Onboarding />} path='/onboarding/:id' />
      </Routes>
    </div>
  )
}

export default App