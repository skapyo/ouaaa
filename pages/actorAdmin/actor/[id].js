import { withApollo } from "hoc/withApollo.jsx"
import { useRouter } from "next/router";
import AddActorPageLayout from "containers/layouts/addActorPage/AddActorPageLayout"
import EditActorForm from "containers/forms/EditActorForm"


const EditActor = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <AddActorPageLayout>
      <EditActorForm id={id}/>
    </AddActorPageLayout>
  )

}

export default withApollo()(EditActor)