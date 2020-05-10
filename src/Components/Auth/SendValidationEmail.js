import React,{useState,useEffect} from 'react';
import {useParams,Link} from "react-router-dom";
import { Grid,Header,Segment,Message } from 'semantic-ui-react';
import Loader from './../Loader/Loader'
import { useMutation } from '@apollo/react-hooks';
import {SEND_VALIDATION_EMAIL} from './../../Queries/authQueries';

const SendValidationEmail = () => {

    const [globalLoading,setLoadingInd] = useState(true);

    const {email} = useParams();

    const [sendValidationEmail, { data, loading,error}] = useMutation(SEND_VALIDATION_EMAIL);

    useEffect(() => {
        if(email) sendValidationEmail({variables:{email:email}});
    },[]);

    useEffect(() => {
        if(data) {
            setLoadingInd(false);
        }
    },[data]);

    useEffect(() => {
        if(error) {
            setLoadingInd(false);
        }
    },[error]);

    return (

        <Grid relaxed='very' stackable textAlign='center' verticalAlign='middle'>     
            <Grid.Column style={{ maxWidth: 400 }}>
                <br />
                    <Header as='h4' color='teal' textAlign='center'>
                        Envoi d'un nouvel email de validation
                    </Header>
                    <Segment>
                        {globalLoading ? 
                            (
                                <>
                                    <br />
                                    <br />
                                    <br />
                                    <Loader />
                                    <br />
                                    <br />
                                    <br />
                                </>
                            )
                            : null 
                        }
                        {!globalLoading && !error ? 
                            (
                                <>
                                    <br />
                                    Un email de validation a été envoyé à l'adresse ci-dessous:
                                    <br />
                                    <Header as='h5' color='teal' textAlign='center'>
                                        {email}
                                    </Header>
                                    <br />
                                    <Link to='/'>Aller à la page d'acceuil</Link>
                                </>
                            )
                            :
                            null
                        }
                        {!globalLoading && error ? 
                            (    
                                <>
                                    <br />
                                    <Message error>
                                        {error.graphQLErrors[0].message}
                                    </Message>
                                    <br />
                                    <Link to='/'>Aller à la page d'acceuil</Link>
                                </>
                            )
                            :
                            null
                        }   
                    </Segment>
            </Grid.Column>
        </Grid>
    )
}

export default SendValidationEmail;