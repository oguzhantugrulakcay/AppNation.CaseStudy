import React, { useEffect, useState } from 'react'
import NavBar from './navbar'
import { Loader } from './loader'
import Cookies from 'js-cookie'
function Users() {
    const [usersData, setUsersData] = useState([{}])
    
    useEffect(() => {
        fetch("/users",
        {
            method:'PATCH',
            headers:{
                'x-api-key':Cookies.get('APP_AUTH')
            }
        }).then(
            response => response.json()
        ).then(
            data => {
                setUsersData(data);
            }
        )
    },[])
    return (
        <>
            {(typeof usersData.val === 'undefined') ? (
                <Loader />
            ) : (
                <>
                    <NavBar />
                    <div className='row'>
                        <div className='offset-1 col-sm-10'>
                            <table className='table table-striped'>
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Kullanıcı Adı</th>
                                        <th scope="col">Adı</th>
                                        <th scope="col">Soyadı</th>
                                        <th scope="col">Rol</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usersData.val.map((user, i) => (
                                        <tr key={user.user_id}>
                                            <th scope="row">{i + 1}</th>
                                            <td>
                                                <a href={`/users/${user.user_id}/detail`} data-userid={user.user_id}>{user.user_name}</a>
                                            </td>
                                            <td>{user.first_name}</td>
                                            <td>{user.last_name}</td>
                                            <td>{(user.is_admin) ? ('Admin') : ('Üye')}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )
            }
        </>
    )
}

export default Users