import React,{useState,useEffect} from 'react';
import { Modal,Grid,Header,Form ,Button,Segment,Image,Message, Divider, Icon} from "semantic-ui-react";
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import {SIGNUP} from './../../Queries/authQueries';

import {
    CountProvider,
    useCountState,
    useCountDispatch
  } from "./../../count-context";

const Signup = () => {

    const [loadingState, setLoadingState] = useState(false);
    const [formValues, setFormValue] = useState({});

    // const state = useCountState();
    const stateDispatch = useCountDispatch();

    const [signup, {loading, error, data }] = useMutation(
            SIGNUP,
            { variables: { 
                email: formValues.email, 
                password:formValues.password1,
                surname:formValues.surname,
                lastname:formValues.lastname,
                phone:formValues.phone,
            } 
        });

    const formChangeHandler = e => {
        const { name, value } = e.target;
        setFormValue({ ...formValues, [name]: value });
    };

    const submitHandler = () => {
        setLoadingState(true);
        signup();
    }

    useEffect(() => {
        if(data && data.register) {
            console.log(data.register);
            setLoadingState(false);
            // userAuth.login();
            stateDispatch({
                type:'login',
                payload:data.register
            })
        }
    },[data])

    return (

        <>
            <br />
            <Header as='h4' color='teal' textAlign='center'>
                Veuillez renseigner vos informations pour la création de votre compte
            </Header>
            <Form 
                // size='huge' 
                onSubmit={submitHandler}
                >
                <Segment>
                    <Form.Group>
                       
                        <Form.Field width={8}>
                            <label>Prénom</label>
                            <input
                                placeholder="Prénom"
                                name="surname"
                                onChange={formChangeHandler}
                                value={formValues.surname}
                            />
                        </Form.Field>
                        <Form.Field width={8}>
                            <label>Nom</label>
                            <input
                                placeholder="Nom"
                                name="lastname"
                                onChange={formChangeHandler}
                                value={formValues.lastname}
                            />
                        </Form.Field>
                        
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Form.Field width={8}>
                                <label>Email</label>
                                <input
                                    placeholder="Email"
                                    name="email"
                                    onChange={formChangeHandler}
                                    value={formValues.email}
                                />
                        </Form.Field>
                        <Form.Field width={8}>
                                <label>Numéro de téléphone</label>
                                <input
                                    placeholder="Numéro de téléphone"
                                    name="phone"
                                    onChange={formChangeHandler}
                                    value={formValues.phone}
                                />
                        </Form.Field>
                    </Form.Group>
                    <br />
                    <Form.Group>
                        <Form.Field width={8}>
                                <label>Mot de passe</label>
                                <input
                                    placeholder="Mot de passe"
                                    name="password1"
                                    type='password'
                                    onChange={formChangeHandler}
                                    value={formValues.password1}
                                />
                        </Form.Field>
                        <Form.Field width={8}>
                                <label>Confirmation du mot de passe</label>
                                <input
                                    placeholder="Mot de passe"
                                    name="password2"
                                    type='password'
                                    onChange={formChangeHandler}
                                    value={formValues.password2}
                                />
                        </Form.Field>
                    </Form.Group>
                    <br />
                    <Grid>
                        <Grid.Column textAlign="center">
                            <Button 
                                    color='teal' 
                                    loading
                                    size='large' 
                                    loading={loadingState}
                                    content='submit'
                                >
                                Créer un compte
                            </Button>
                        </Grid.Column>
                    </Grid>
                </Segment>
            </Form>
            <Message attached='bottom' info>
                <Icon name='help' size='large' color='teal'/>
                Vous avez déjà un compte ?&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Link to='/login'>Se connecter</Link>&nbsp;.
            </Message>
        </>

    )

}

export default Signup;