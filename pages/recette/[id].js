import { withApollo } from 'hoc/withApollo.jsx';
import AppLayout from 'containers/layouts/AppLayout';

const RecipeById = () => {
  return (
    <AppLayout>
      RecipeById
    </AppLayout>
  );
};

export default withApollo()(RecipeById);
