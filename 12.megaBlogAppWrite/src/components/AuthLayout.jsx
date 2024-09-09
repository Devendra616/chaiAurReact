import {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function Protected({children, authentication = "true"}) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.authStatus)

    useEffect(() => {

       /*  if(authStatus === true){
            navigate("/")
        } else{
            navigate("/login")
        } */

        if(authentication && authStatus !== authentication) {
            navigate("/login")
        } else if (!authentication && authStatus !== authentication){
            navigate("/")
        }
        setLoader(false)
    },[authStatus, authentication, navigate])
    
  return loader ? <p>Loading...</p> : <>{children}</>
}

export default Protected