import React,{useState,useEffect} from 'react';
import { List,Modal,Grid,Header,Form ,Button,Segment,Image,Message, Divider,Popup} from "semantic-ui-react";
import { Link } from 'react-router-dom';
import {SEND_CHANGE_PSSWD_EMAIL} from '../../Queries/authQueries';
import { useMutation } from '@apollo/react-hooks';
import config from './../../config.json';

import {useSessionDispatch} from "../../count-context";
import {validateEmail} from '../../Utils/utils';

const SendResetPasswordEmail = () => {

    const [loadingState, setLoadingState] = useState(false);
    const [formValues, setFormValue] = useState({persistentConnection:false});
    const [formControlMessage, setFormControlMessage] = useState([]);
    const [buttonDisabledInd, setButtonDisbledInd] = useState(true);
    const [buttonHovered, setButtonHoveredInd] = useState(false);

    const [sendEmail, {loading, error, data }] = useMutation(
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
        sendEmail();
    };

    useEffect(() => {
        let bool = 0; // if one of the field tests is KO, bool will be 0
        let controlMessages = [];


        // email is not empty and email is valid
        if(!formValues.email) {
            controlMessages.push({field:'email', message:"L'email n'est pas renseigné"});
        }      

        // email is not empty and email is valid
        if(formValues.email && !validateEmail(formValues.email)) {
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

    useEffect(() => {
        if(data && data.sendResetPswdEmail) {
            setLoadingState(false);
        }
    },[data])


    return (
    
            <Grid relaxed='very' stackable textAlign='center' verticalAlign='middle'>
                
                <Grid.Column style={{ maxWidth: 400 }}>
                    <br />
                    <Header as='h4' color='teal' textAlign='center'>
                        Réinitialiser mon mot de passe
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
                                error={ buttonDisabledInd && buttonHovered && formControlMessage.find(e => e.field == "email") != null ? true:false}
                            />
                            <Popup 
                                trigger = {     
                                    <div 
                                        style={{display: 'inline-block'}}
                                        onMouseOver={() => setButtonHoveredInd(true)}
                                        onMouseLeave={() => setButtonHoveredInd(false)}
                                        >                 
                                            <Button 
                                                color='teal' 
                                                size='large' 
                                                loading={loadingState}
                                                content="M'envoyer un email de réinitialisation"
                                                disabled={buttonDisabledInd}
                                            />
                                    </div>   
                                }
                                disabled={!buttonDisabledInd}
                                // basic
                                wide
                            >
                                <List bulleted>
                                    {formControlMessage.map((item) => {
                                        return (<List.Item>{item.message}</List.Item>)
                                    })}
                                </List>
                            </Popup>
                            {!loadingState && !error && data ? 
                                (                    
                                    <Message 
                                        info
                                        content={`Si l'adresse email ${formValues.email} correspond à un compte utilisateur, un email de réinitialisation a été envoyé.`}
                                    />
                                )
                                :
                                null
                            }
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

export default SendResetPasswordEmail;