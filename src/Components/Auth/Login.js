import React,{useState,useEffect} from 'react';
import { Modal,Grid,Header,Form ,Button,Segment,Image,Message, Divider} from "semantic-ui-react";
import { Link } from 'react-router-dom';
import {LOGIN} from './../../Queries/authQueries';
import { useMutation } from '@apollo/react-hooks';


import {
    CountProvider,
    useCountState,
    useCountDispatch
  } from "./../../count-context";

const Login = () => {

    const [loadingState, setLoadingState] = useState(false);
    const [formValues, setFormValue] = useState({});

    // const state = useCountState();
    const stateDispatch = useCountDispatch();

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

    console.log(formValues);

    const submitHandler = () => {
        setLoadingState(true);
        login();
    };

    useEffect(() => {
        if(data && data.login) {
            console.log(data.login);
            setLoadingState(false);
            // userAuth.login();
            stateDispatch({
                type:'login',
                payload:data.login
            })
        }
    },[data]);

    return (
    
            <Grid columns={2} relaxed='very' stackable textAlign='center' verticalAlign='middle'>
                
                <Grid.Column style={{ maxWidth: 450 }}>
                    <br />
                    <Header as='h4' color='teal' textAlign='center'>
                        Veuillez vous connecter à votre compte
                    </Header>
                    <Form 
                        size='large' 
                        onSubmit={submitHandler}
                        >
                        <Segment>
                            <Form.Input 
                                fluid 
                                icon='user' 
                                iconPosition='left' 
                                placeholder='E-mail address' 
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

                            <Button 
                                color='teal' 
                                fluid 
                                size='large' 
                                loading={loadingState}
                                content='submit'
                                >
                                Se connecter
                            </Button>
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

export default Login;