import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import NavBar from './navbar';
import { Loader } from './loader';
import Swal from 'sweetalert2'
import Cookies from 'js-cookie';

function UserDetail() {
    const { id } = useParams();
    const [userData, setUserData] = useState([{}])
    const [username, setUsername] = useState(userData.user_name);
    const [firstname, setFirstName] = useState(userData.first_name);
    const [lastname, setLastName] = useState(userData.last_name);
    const [email, setEmail] = useState(userData.email);
    useEffect(() => {
        fetch("/users/" + id + "/detail",{
            method: 'PATCH',
            headers: {
                'x-api-key':Cookies.get('APP_AUTH')
            }
        }).then(
            response => response.json()
        ).then(
            result => {
                if(result.status){
                    setUserData(result.val.user_name)
                    setFirstName(result.val.first_name)
                    setEmail(result.val.email)
                    setLastName(result.val.last_name)
                    setUsername(result.val.user_name)
                }else{
                    Swal.fire({
                        title:'Hata!',
                        text:result.msg,
                        icon:'error'
                    }).then( ()=>{
                        window.location.href='/users'
                    } 
                    )
                }
                
            }
        )
    },[])
    const handlerUpdate = () => {
        const data = {
            UserName:username,
            FirstName:firstname,
            LastName:lastname,
            Email:email
        };
        console.info(data)
        fetch("/users/"+id+"/detail", {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key':Cookies.get('APP_AUTH')
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(
            result=>{
                if(result.status){
                    Swal.fire({
                        title:"İşlem balaşarılı",
                        text:result.msg,
                        icon:"success"
                    }
                    )
                }else{
                    Swal.fire({
                        title:"Hata",
                        text:result.msg,
                        icon:"error"
                    }
                    )
                }
            }
        ).catch()
    };
    const handlerDelete=()=>{
        Swal.fire({
            title:'Dikkat!',
            text:"Kullanıcı kalıcı olarak silinecektir. Onaylıyor musunuz?",
            icon:'warning',
            showCancelButton:true,
            cancelButtonText:'Hayır',
            confirmButtonText:'Evet'
        }).then((value)=>{
            if(value){
                fetch("/users/"+id+"/detail", {
                    method: 'Delete',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key':Cookies.get('APP_AUTH')
                    }
                }).then(response => response.json())
                .then(result=>{
                    if(result.status){
                        Swal.fire({
                            title:"İşlem balaşarılı",
                            text:result.msg,
                            icon:"success"
                        })
                        .then(
                            window.location.href='/users'
                        )
                    }else{
                        Swal.fire({
                            title:"Hata",
                            text:result.msg,
                            icon:"error"
                        })
                    }
                })
            }
        })
    }
    return (
        <>
            {(userData === "undefined") ? (
                <Loader />
            ) : (
                <>
                    <NavBar />
                    <div className='m-3'>
                        <div className='row mr-5'>
                            <div className='col-sm-12'>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href='/users'>Kullanıcı Listesi</a></li>
                                        <li className="breadcrumb-item active" aria-current="page"><a href={`/users/${id}/detail`}>Kullanıcı Detayı</a></li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                        <div className='card'>
                            <div className='card-header'>
                                <h4>Kullanıcı Detayı</h4>
                            </div>
                            <div className='card-body'>
                                <div className='row'>
                                    <div className='col-lg-3 col-md-6 col-sm-12 form-group'>
                                        <label>Kullanıcı Adı</label>
                                        <input
                                            type='text'
                                            className='form-control'
                                            value={username??""}
                                            onChange={(e) => setUsername(e.target.value)}
                                        ></input>
                                    </div>
                                    <div className='col-lg-3 col-md-6 col-sm-12 form-group'>
                                        <label>Adı</label>
                                        <input
                                            type='text'
                                            className='form-control'
                                            value={firstname??""}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        ></input>
                                    </div>
                                    <div className='col-lg-3 col-md-6 col-sm-12 form-group'>
                                        <label>Soyadı</label>
                                        <input
                                            type='text'
                                            className='form-control'
                                            value={lastname??""}
                                            onChange={(e) => setLastName(e.target.value)}
                                        ></input>
                                    </div>
                                    <div className='col-lg-3 col-md-6 col-sm-12 form-group'>
                                        <label>Email</label>
                                        <input 
                                            type='email' 
                                            className='form-control' 
                                            value={email??""}
                                            onChange={(e)=>setEmail(e.target.value)}
                                            ></input>
                                    </div>
                                </div >
                                <div className='row'>
                                    <button type='submit' className='offset-md-10 col-md-1 col-sm-12 mt-3 pr-2 btn btn-primary' onClick={handlerUpdate}>Kaydet</button>
                                    <button type='submit' className='col-md-1 col-sm-12 mt-3 btn btn-danger' onClick={handlerDelete}>Sil</button>
                                </div>
                            </div>
                        </div>
                    </div >
                </>
            )
            }

        </>
    )
}
export default UserDetail