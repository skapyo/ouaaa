import React,{useState,useEffect} from 'react';
import { Modal,Grid,Header,Form ,Button,Segment,Image,Message, Divider,Popup} from "semantic-ui-react";
import { Link } from 'react-router-dom';
import {SEND_CHANGE_PSSWD_EMAIL} from '../../Queries/authQueries';
import { useMutation } from '@apollo/react-hooks';
import config from './../../config.json';

import {useSessionDispatch} from "../../count-context";
import {validateEmail} from '../../Utils/utils';

const ChangePassword = () => {

    const [loadingState, setLoadingState] = useState(false);
    const [formValues, setFormValue] = useState({persistentConnection:false});
    const [formControlMessage, setFormControlMessage] = useState([]);
    const [buttonDisabledInd, setButtonDisbledInd] = useState(true);

    const [login, {loading, error, data }] = useMutation(
        SEND_CHANGE_PSSWD_EMAIL,
        { variables: { 
            email: formValues.email
        } 
    });

    const formChangeHandler = e => {
        const { name, value } = e.target;
        setFormValue({ ...formValues, [name]: value });
    };

    const submitHandler = () => {
        setLoadingState(true);
        login();
    };

    useEffect(() => {
        let bool = 0; // if one of the field tests is KO, bool will be 0
        let controlMessages = [];

        // email is not empty and email is valid
        if(!formValues.email || (formValues.email && !validateEmail(formValues.email))) {
            controlMessages.push({field:'email', message:"Le format de l'email n'est pas valide"});
        }       

        if(controlMessages.length == 0) {
            bool = 1;
        }
        setFormControlMessage(controlMessages);

        if(bool == 1) 
            setButtonDisbledInd(false);
        else {
            setButtonDisbledInd(true);
        }
    },[formValues])

    useEffect(() => {
        if(error) 
            setLoadingState(false);
    },[error])


    return (
    
            <Grid relaxed='very' stackable textAlign='center' verticalAlign='middle'>
                
                <Grid.Column style={{ maxWidth: 400 }}>
                    <br />
                    <Header as='h4' color='teal' textAlign='center'>
                        Modifier son mot de passe
                    </Header>
                    <Form  
                        error={error?true:false}
                        size='large' 
                        onSubmit={submitHandler}
                        >
                        <Segment>
                            <Form.Input 
                                fluid 
                                placeholder='Adresse email' 
                                name='email'
                                onChange={formChangeHandler}
                            />
                            <Button 
                                color='teal' 
                                fluid 
                                size='large' 
                                loading={loadingState}
                                content='submit'
                                disabled={buttonDisabledInd}
                                >
                                M'envoyer un lien par email
                            </Button>
                            <Message
                                error
                                content={error && error.graphQLErrors[0] && error.graphQLErrors[0].message ? error.graphQLErrors[0].message:'Il y a eu une erreur pendant la création de votre compte, veuillez rééssayer'}
                            />
                            {error && error.graphQLErrors[0] && error.graphQLErrors[0].statusCode=='1105'?
                            (
                                <>
                                    <Link to={`/sendValidationEmail/${formValues.email}`}>Je veux recevoir à nouveau l'email de validation</Link>
                                </>
                            )
                            :
                            null}
                        </Segment>
                    </Form>
                    <Message>
                        Vous n'avez pas encore de compte 
                        <br/>
                        <Link to='/signup'>Créer un compte</Link>
                    </Message>
                </Grid.Column>
            </Grid>

        // </Segment>
    )

};

export default ChangePassword;