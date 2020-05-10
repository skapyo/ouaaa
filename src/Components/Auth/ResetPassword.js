import React,{useState,useEffect} from 'react';
import {useParams} from "react-router-dom";
import { List,Modal,Grid,Header,Form ,Button,Segment,Image,Message, Divider,Popup} from "semantic-ui-react";
import { useMutation } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import {validateEmail} from '../../Utils/utils';
import {CHANGE_PASSWORD} from '../../Queries/authQueries';

const ResetPassword = () => {
    
    const {email,token} = useParams();
    const [loadingState, setLoadingState] = useState(false);
    const [formValues, setFormValue] = useState({persistentConnection:false});
    const [formControlMessage, setFormControlMessage] = useState([]);
    const [buttonDisabledInd, setButtonDisbledInd] = useState(true);
    const [buttonHovered, setButtonHoveredInd] = useState(false);


    const [changePassword, {loading, error, data }] = useMutation(
        CHANGE_PASSWORD,
        { variables: { 
            email : email,
            token : token,
            password : formValues.password1
        } 
    });

    const formChangeHandler = e => {
        const { name, value } = e.target;
        setFormValue({ ...formValues, [name]: value });
    };

    const submitHandler = () => {
        setLoadingState(true);
        changePassword();
    };

    useEffect(() => {
        let bool = 0; // if one of the field tests is KO, bool will be 0
        let controlMessages = [];

        // password1 is not empty
        if(!formValues.password1 || (formValues.password1 && formValues.password1.trim().length <= 0)) {
            controlMessages.push({field:'password1', message:"Le champ mot de passe n°1 n'est pas renseigné"});         
        }   
        // password2 is not empty
        if(!formValues.password2 || (formValues.password2 && formValues.password2.trim().length <= 0)) {
            controlMessages.push({field:'password2', message:"Le champ mot de passe n°2 n'est pas renseigné"});         
        }   
        // passwords are equals
        if(formValues.password1 && formValues.password2 && formValues.password1 !== formValues.password2) {
            controlMessages.push({field:'passwords', message:"Les mots de passe ne sont pas les mêmes"});
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
        if(data && data.resetPassword) {
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
                                placeholder='Mot de passe' 
                                name='password1'
                                type='password'
                                onChange={formChangeHandler}
                                error={ buttonDisabledInd && buttonHovered && formControlMessage.find(e => e.field == "password1" || e.field == "passwords" ?true:false) != null ? true:false}
                            />
                            <Form.Input 
                                fluid 
                                placeholder='Confirmation du mot de passe'
                                name='password2'
                                type='password'
                                onChange={formChangeHandler}
                                error={ buttonDisabledInd && buttonHovered && formControlMessage.find(e => e.field == "password2" || e.field == "passwords" ?true:false) != null ? true:false}
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
                                                fluid
                                                size='large' 
                                                loading={loadingState}
                                                content='Réinitialiser mon mot de passe'
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
                            <Message
                                error
                                content={error && error.graphQLErrors[0] && error.graphQLErrors[0].message ? error.graphQLErrors[0].message:'Il y a eu une erreur pendant la création de votre compte, veuillez rééssayer'}
                            />
                            {!loadingState && !error && data && data.resetPassword ? 
                                (                    
                                    <Message 
                                        info
                                        content={`Votre mot de passe a bien été réinitialisé.`}
                                    />
                                )
                                :
                                null
                            }
                        </Segment>
                    </Form>
                    {/* <Message>
                        Vous n'avez pas encore de compte 
                        <br/>
                        <Link to='/signup'>Créer un compte</Link>
                    </Message> */}
                </Grid.Column>
            </Grid>

        // </Segment>
    )

}

export default ResetPassword;