import { withApollo } from 'hoc/withApollo.jsx';
import AppLayout from 'containers/layouts/AppLayout';
import AddArticleForm from 'containers/forms/AddArticleForm';
import { useRouter } from 'next/router';

const AddArticle = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <AppLayout>
      <AddArticleForm actorId={id} />
    </AppLayout>
  );
};

export default withApollo()(AddArticle);
