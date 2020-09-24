import {useCallback} from "react"
import {useCookies} from 'react-cookie'
import {useRouter} from "next/router"


const useCookieRedirection = (options) => {

    const cookieKey = options?.cookieKey || 'redirect_url'

    const router = useRouter()

    const [cookies, setCookie, removeCookie] = useCookies();

    const redirect = useCallback(() => {
        if(cookies?.[cookieKey] && cookies?.[cookieKey] != router.asPath) {
            router.push(cookies?.[cookieKey])  
            removeCookie(cookieKey,{ path: '/' })
          }
          else {
            router.push('/')
            removeCookie(cookieKey,{ path: '/' })
          }
            
    },[cookies,cookieKey,removeCookie,router])

    return redirect

}

export default useCookieRedirection