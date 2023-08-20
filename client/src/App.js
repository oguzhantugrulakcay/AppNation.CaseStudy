import Home from './components/home';
import Users from "./components/users";
import UserDetail from './components/userDetail';
import {Routes,Route} from 'react-router-dom'
import UserAdd from './components/userAdd';

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/users' element={<Users/>}/>
      <Route path='/users/:id/detail' element={<UserDetail/>}/>
      <Route path='/users/add' element={<UserAdd/>}/>
    </Routes>
    </>
  );
}

export default App