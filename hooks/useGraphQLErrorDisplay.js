import {useEffect} from "react"
import {useSnackbar} from "notistack"

const useGraphQLErrorDisplay = (error) => {

    const scnackbar = useSnackbar()

    useEffect(() => {
        if(error) {
            error.graphQLErrors.map((err) => {
                scnackbar.enqueueSnackbar(err.message, {
                    variant : 'error'
                });
            })
        }
    },[error,scnackbar])
} 

export default useGraphQLErrorDisplay