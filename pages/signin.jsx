import { withApollo } from 'hoc/withApollo.jsx';
import AppLayout from 'containers/layouts/AppLayout';
import { useSessionState } from 'context/session/session';
import FallbackAlreadyConnected from 'containers/fallbacks/FallbackAlreadyConnected';
import SigninForm from 'containers/forms/SigninForm';

const SignIn = () => {
  const user = useSessionState();

  if (user) return <FallbackAlreadyConnected />;

  return (
    <AppLayout>
      <SigninForm />
    </AppLayout>
  );
};

export default withApollo()(SignIn);
