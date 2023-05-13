import { withApollo } from 'hoc/withApollo.jsx';
import AppLayout from 'containers/layouts/AppLayout';
import AddRecipeForm from 'containers/forms/AddRecipeForm';

const NewRecipe = () => {
  return (
    <AppLayout>
      <AddRecipeForm />
    </AppLayout>
  );
};

export default withApollo()(NewRecipe);
