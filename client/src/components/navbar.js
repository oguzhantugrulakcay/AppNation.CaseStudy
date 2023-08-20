import React,{useEffect,useState} from 'react'
import Cookies from 'js-cookie'
function NavBar() {
    const [roleData, setRoledata] = useState("member")
    
    useEffect(() => {
        fetch("/home",{
            method:"PATCH",
            headers:{
                'x-api-key':Cookies.get('APP_AUTH')
            }
        }).then(
            response => response.text()
        ).then(
            role => {
                setRoledata(role)
            }
        )
      },[]);

    const logOut=()=>{
        Cookies.remove("APP_AUTH")
        window.location.href='/'
    }

    return (
        <div className="bg-primary">
        <nav className="navbar navbar-expand-lg navbar-dark mx-3">
            <a className="navbar-brand" href="#">Navbar</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <a className="nav-item nav-link" href="/users">Kullanıcı Listesi<span className="sr-only"></span></a>
                    {roleData==='admin'&&<a className="nav-item nav-link" href="/users/add">Yeni Kullanıcı</a>}
                    <a className="nav-item nav-link" href="#" onClick={logOut}>Çıkış</a>
                </div>
            </div>
        </nav>
        </div>
    )
}
export default NavBar