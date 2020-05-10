import React, {useState,useEffect} from 'react';
import {useParams,Link} from "react-router-dom";
import { Grid,Header,Segment, Message } from 'semantic-ui-react';
import Loader from './../Loader/Loader'
import { useMutation } from '@apollo/react-hooks';
import {VALIDATE_EMAIL} from './../../Queries/authQueries';

const EmailValidation = () => {

    const [globalLoading,setLoadingInd] = useState(true);

    const {email,token} = useParams();

    const [validateEmail, { data, loading,error}] = useMutation(VALIDATE_EMAIL);

    useEffect(() => {
        if(email && token) validateEmail({variables:{email:email,token:token}});
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
                        Validation de l'adresse email
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
                                    {"L'email ci-dessous a été validé:"}
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

export default EmailValidation;
