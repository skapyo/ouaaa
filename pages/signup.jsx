import { withApollo } from 'hoc/withApollo.jsx';
import AppLayout from 'containers/layouts/AppLayout';
import { useSessionState } from 'context/session/session';
import FallbackAlreadyConnected from 'containers/fallbacks/FallbackAlreadyConnected';
import SignupForm from 'containers/forms/SignupForm';

const SignUp = () => {

  const user = useSessionState()

  if (user) return <FallbackAlreadyConnected />

  return (
    <AppLayout>
      <SignupForm />      
    </AppLayout>
  )
}

export default withApollo()(SignUp)
