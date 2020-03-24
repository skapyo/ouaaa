import React,{useState,useEffect} from 'react';
import { Modal,Grid,Header,Form ,Button,Segment,Image,Message, Divider,Popup} from "semantic-ui-react";
import { Link } from 'react-router-dom';
import {LOGIN} from './../../Queries/authQueries';
import { useMutation } from '@apollo/react-hooks';
import config from './../../config.json';

import {useSessionDispatch} from "./../../count-context";
import {validateEmail} from './../../Utils/utils';

const Login = () => {

    const [loadingState, setLoadingState] = useState(false);
    const [formValues, setFormValue] = useState({persistentConnection:false});
    const [formControlMessage, setFormControlMessage] = useState([]);
    const [buttonDisabledInd, setButtonDisbledInd] = useState(true);

    const stateDispatch = useSessionDispatch();

    const [login, {loading, error, data }] = useMutation(
        LOGIN,
        { variables: { 
            email: formValues.email, 
            password:formValues.password
        } 
    });

    const formChangeHandler = e => {
        const { name, value } = e.target;
        setFormValue({ ...formValues, [name]: value });
    };

    const checkBoxChangeHandler = (e,value) => {
        setFormValue({ ...formValues, persistentConnection: value.checked });
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
        // lastname is not empty
        if(!formValues.password || (formValues.password && formValues.password.trim().length <= 0)) {
            controlMessages.push({field:'password', message:"Le mot de passe n'est pas renseigné"});
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

    useEffect(() => {
        if(data && data.login) {
            console.log(data.login);
            localStorage.setItem(config.SESSION_STORAGE.REFRESH_TOKEN,data.login.refreshToken);
            localStorage.setItem(config.SESSION_STORAGE.SUB,data.login.sub);
            localStorage.setItem(config.SESSION_STORAGE.AUTH_TOKEN,data.login.token);
            localStorage.setItem(config.SESSION_STORAGE.ROLE,data.login.role);
            localStorage.setItem(config.SESSION_STORAGE.PERSISTENT_CO,formValues.persistentConnection);
            stateDispatch({
                type:'login',
                payload:data.login
            });
            setLoadingState(false);
        }
    },[data]);

    return (
    
            <Grid relaxed='very' stackable textAlign='center' verticalAlign='middle'>
                
                <Grid.Column style={{ maxWidth: 400 }}>
                    <br />
                    <Header as='h4' color='teal' textAlign='center'>
                        Veuillez vous connecter à votre compte
                    </Header>
                    <Form
                        error={error?true:false}
                        size='large'
                        onSubmit={submitHandler}
                        >
                        <Segment>
                            <Form.Input
                                fluid 
                                icon='user' 
                                iconPosition='left' 
                                placeholder='Adresse email' 
                                name='email'
                                onChange={formChangeHandler}
                            />
                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                                name='password'
                                onChange={formChangeHandler}
                            />
                            <Form.Checkbox
                                name = 'persistentConnection'
                                label='Rester connecté'
                                onChange={checkBoxChangeHandler}
                                checked={formValues.persistentConnection}
                            />

                            <Button 
                                color='teal' 
                                fluid 
                                size='large' 
                                loading={loadingState}
                                content='submit'
                                disabled={buttonDisabledInd}
                                >
                                Se connecter
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
                        Vous avez oublié votre mot de passe
                        <br/>
                        <Link to='/resetPassword'>Réinitialiser son mot de passe</Link>
                        <br/>
                        <br/>
                        Vous n'avez pas encore de compte 
                        <br/>
                        <Link to='/signup'>Créer un compte</Link>
                    </Message>
                </Grid.Column>
            </Grid>

        // </Segment>
    )

};

export default Login;