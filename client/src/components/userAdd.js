import React, { useState } from 'react'
import NavBar from './navbar'
import Swal from 'sweetalert2'
import Cookies from 'js-cookie'

export default function UserAdd() {
    const [username, setUsername] = useState('')
    const [password, setPasword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [firsname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')

    const handlerCreate = () => {
        var data = {
            UserName: username,
            Password: password,
            RePassword: rePassword,
            FirstName: firsname,
            LastName: lastname,
            Email: email,
            IsAdmin:role
        }
        fetch("/users", {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key':Cookies.get('APP_AUTH')
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
            .then(result => {
                if (result.status) {
                    Swal.fire({
                        title: "İşlem Başarılı",
                        text: result.msg,
                        icon: 'success'
                    }).then(() => {
                        window.location.href = `/users/${result.val}/detail`
                    })
                } else {
                    Swal.fire({
                        title: "Hata",
                        text: result.msg,
                        icon: 'error'
                    })
                }
            }).catch(err => {

            })
    }
    return (
        <>
            <NavBar />
            <div className='m-3'>
                <div className='row mr-5'>
                    <div className='col-sm-12'>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href='/users'>Kullanıcı Listesi</a></li>
                                <li className="breadcrumb-item active" aria-current="page"><a href='/users/add'>Yeni Kullanıcı</a></li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <div className='card'>
                    <div className='card-header'>
                        <h3>Yeni Kullanıcı</h3>
                    </div>
                    <div className='card-body'>
                        <div className='row'>
                            <h5 className='card-title'>Hesap Tanımlamaları</h5>
                        </div>
                        <div className='row mt-2'>
                            <div className='col-md-3  col-sm-12 form-group'>
                                <label>Kullanıcı Adı</label>
                                <input
                                    className='form-control'
                                    onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className='col-md-3  col-sm-12 form-group'>
                                <label>Şifre</label>
                                <input
                                    type='password'
                                    className='form-control'
                                    onChange={(e) => setPasword(e.target.value)} />
                            </div>
                            <div className='col-md-3 col-sm-12 form-group'>
                                <label>Şifre (Tekrar)</label>
                                <input
                                    type='password'
                                    className='form-control'
                                    onChange={(e) => setRePassword(e.target.value)} />
                            </div>
                            <div className='col-md-3  col-sm-12 form-group'>
                                <label>Rolü</label>
                                <select className='form-control'
                                onChange={(e)=>setRole(e.target.value)}
                                >
                                    <option>Seçiniz</option>
                                    <option value={false}>Üye</option>
                                    <option value={true}>Admin</option>
                                </select>
                            </div>
                        </div>
                        <hr></hr>
                        <div className='row mt-2'>
                            <h5 className='card-title'>Kullanıcı Bilgileri</h5>
                        </div>
                        <div className='row mt-2'>
                            <div className='col-md-4 col-sm-12 form-group'>
                                <label>Adı</label>
                                <input
                                    className='form-control'
                                    onChange={(e) => setFirstname(e.target.value)} />
                            </div>
                            <div className='col-md-4 col-sm-12 form-group'>
                                <label>Soyadı</label>
                                <input
                                    className='form-control'
                                    onChange={(e) => setLastname(e.target.value)} />
                            </div>
                            <div className='col-md-4 col-sm-12 form-group'>
                                <label>Email</label>
                                <input
                                    type='email'
                                    className='form-control'
                                    onChange={(e) => setEmail(e.target.value)} />
                            </div>
                        </div>

                    </div>
                    <div className='card-footer'>
                        <div className='row mt-2 d-flex flex-row-reverse'>
                            <button className='col-md-1 col-sm-12 btn btn-primary' type='submit' onClick={handlerCreate}>Oluştur</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
