import React, {useEffect} from 'react'
import {useSessionDispatch} from 'context/session/session';
import gql from 'graphql-tag'


const ISLOGGED = gql`
  query isLogged {
    isLogged {
          id,
          role
      }
  }
`

const withAuthSync = (WrappedComponent) => {

  const FuncComponent = ({children, user, ...props}) => {
    
    const stateDispatch = useSessionDispatch()

    useEffect(() => {
      if(user) 
        stateDispatch({
          type:'login',
          payload:user
        });
    },[])

    return (<WrappedComponent {...props}>{children}</WrappedComponent>);
  }

  FuncComponent.getInitialProps = async (ctx) => {

    const props = WrappedComponent.getInitialProps && await WrappedComponent.getInitialProps(ctx);

    if(typeof window === 'undefined') {
      const {initOnContext} = await import('hoc/withApollo')
      initOnContext(ctx)
      const result = await ctx.apolloClient.query({query:ISLOGGED})
      if(result.data?.isLogged?.id) 
        return ({user : result.data.isLogged, ...props})
    }

    return ({...props})

  }
  return FuncComponent;
}

// const _withAuth = (WrappedComponent) => {
  
//   const FuncComponent = ({ children, ...props }) => {
//     const { user, setUser } = useGlobalState(); 

//     useEffect(() => {
//       if (!user && props.user && props.account) 
//         setUser(props.user, props.account);
//     });

//     return (<WrappedComponent {...props}>{children}</WrappedComponent>);
//   };

//   FuncComponent.getInitialProps = async (ctx) => {
//     // If Page/Component has a `getInitialProps`, we should call it.
//     const props = WrappedComponent.getInitialProps && await WrappedComponent.getInitialProps(ctx);

//     if (ctx && ctx.req) {
//       let cookies = new Cookies(ctx.req?.headers?.cookie);
//       if (cookies.get('secret_token')) {
//         const res = await getStatus(ctx.req.headers.cookie);
//         if (res.success) {
//           const account = await getAccount(ctx.req.headers.cookie);
//           return { ...props, user: res.user, account: account };
//         }
//       }
//     }
//     return { ...props, user: null };
//   }

//   return FuncComponent;
// }

export default withAuthSync;