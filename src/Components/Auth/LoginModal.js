import React,{useState, useEffect} from 'react';
import { Modal,Grid,Header,Form ,Button,Segment,Image,Message} from "semantic-ui-react";
import {LOGIN} from './../../Queries/authQueries';
import { useMutation } from '@apollo/react-hooks';

const headerStyle = {
    "font-family": "Pacifico, cursive",
    "font-size": "24px",
    // 'font-style': 'normal',
    "font-weight": "lighter",
    color: "#009C95"
  };

const LoginModal = ({open, onCloseHandler,userAuth}) => {

    const [loadingState, setLoadingState] = useState(false);

    const [formValues, setFormValue] = useState({});

    const [login, {loading, error, data }] = useMutation(LOGIN,{ variables: { email: formValues.email, password:formValues.password} });

    const formChangeHandler = e => {
        const { name, value } = e.target;
        setFormValue({ ...formValues, [name]: value });
      };

    console.log(formValues);

    const submitHandler = () => {
        setLoadingState(true);
        login();
    }

    useEffect(() => {
        if(data && data.login) {
            console.log(data.login);
            setLoadingState(false);
            userAuth.login();
        }
    },[data])

  
    return (
        <Modal open={open} size='mini' dimmer='blurring' onClose={onCloseHandler}>
            <Modal.Content>
                <Grid textAlign='center' verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                    <span style={headerStyle}>
                        L'atelier d'Elisabeth
                    </span>
                    <br/>
                    <Header as='h4' color='teal' textAlign='center'>
                        Veuillez vous connecter à votre compte
                    </Header>
                    <Form size='large' onSubmit={submitHandler}>
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
                        <a href='#'>Créer un compte</a>
                    </Message>
                    </Grid.Column>
                </Grid> 
            </Modal.Content>
        </Modal>
    )
}

export default LoginModal;