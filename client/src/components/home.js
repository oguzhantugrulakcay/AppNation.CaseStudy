import React, { useState } from 'react';
import logo from '../logo.svg';
import '../assets/Home.css';
import Swal from 'sweetalert2';

function Home() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = () => {
      const data = {
        UserName: username,
        Password: password
      };
      fetch('/home', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(result => {
          if(result.status){
            window.location.href='/users'
          }else{
            Swal.fire({
              title:'Hata!',
              text:result.msg,
              icon:'error'
            })
          }
        })
        .catch(error => {
          console.log(error)
        });
    };
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <div className='card '>
              <div className='card-body'>
                <div className='row mt-2'>
                  <div className='col-sm-12 form-group'>
                    <label>Kullanıcı Adı</label>
                    <input
                      type='text'
                      className='form-control'
                      value={username}
                      onChange={(e) => setUsername(e.target.value)} />
                  </div>
                </div>
                <div className='row mt-2'>
                  <div className='col-sm-12 form-group'>
                    <label>Şifre</label>
                    <input
                      type='password'
                      className='form-control'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} />
                  </div>
                </div>
                <div className='row mt-2'>
                  <div className='col-sm-12 form-group'>
                    <button type='submit' className='btn btn-primary' onClick={handleSubmit}>Giriş</button>
                  </div>
                </div>
              </div>
            </div>
          </header>
        </div>
      );
    }
    
    export default Home