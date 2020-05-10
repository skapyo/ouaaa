import React,{useState,useEffect} from 'react';
import {Input, Modal,Grid,Header,Form ,Button,Segment,Image,Message, Divider, Icon, Popup, List} from "semantic-ui-react";
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import {SIGNUP} from './../../Queries/authQueries';
import {useSessionDispatch} from "../../Context/Session/session";
import {validateEmail} from './../../Utils/utils';


const Signup = () => {

    const [loadingState, setLoadingState] = useState(false);
    const [formValues, setFormValue] = useState({});
    const [formControlMessage, setFormControlMessage] = useState([]);
    const [buttonDisabledInd, setButtonDisbledInd] = useState(true);
    const [buttonHovered, setButtonHoveredInd] = useState(false);

    const stateDispatch = useSessionDispatch();

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


    const formChangeHandler = (e,data) => {
        setFormValue({ ...formValues, [data.name]: data.value });
    };

    useEffect(() => {
        let bool = 0; // if one of the field tests is KO, bool will be 0
        let controlMessages = [];

        // email is not empty and email is valid
        if(!formValues.email || (formValues.email && !validateEmail(formValues.email))) {
            controlMessages.push({field:'email', message:"Le format de l'email n'est pas valide"});
        }       
        // lastname is not empty
        if(!formValues.lastname || (formValues.lastname && formValues.lastname.trim().length <= 0)) {
            controlMessages.push({field:'lastname', message:"Le champ nom n'est pas renseigné"});
        }  
        // surname is not empty
        if(!formValues.surname || (formValues.surname && formValues.surname.trim().length <= 0)) {
            controlMessages.push({field:'surname', message:"Le champ prénom n'est pas renseigné"});         
        }   
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


    // const [surnameControl, setSurnameControl] = useState();

    const submitHandler = () => {
        setLoadingState(true);
        signup();
    }


    useEffect(() => {
        if(data && data.register) {
            setLoadingState(false);
            // stateDispatch({
            //     type:'login',
            //     payload:data.register
            // })
        }
    },[data])

    return (

        <>
            <br />
            <Header as='h4' color='teal' textAlign='center'>
                Veuillez renseigner vos informations pour la création de votre compte
            </Header>
            <Form 
                error={error?true:false}
                onSubmit={submitHandler}
                >
                <Segment>
                    <Form.Group>
                        <Form.Field width={8} 
                            required
                            control={Input}
                            label='Prénom'
                            placeholder="Prénom"
                            name="surname"
                            onChange={formChangeHandler}
                            value={formValues.surname}
                            error={ buttonDisabledInd && buttonHovered && formControlMessage.find(e => e.field == "surname") != null ? true:false}
                        /> 
                        <Form.Field width={8}
                            required
                            control={Input}
                            label='Nom'
                            placeholder="Nom"
                            name="lastname"
                            onChange={formChangeHandler}
                            value={formValues.lastname}
                            error={ buttonDisabledInd && buttonHovered && formControlMessage.find(e => e.field == "lastname") != null ? true:false}
                        />
                        
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Form.Field width={8}
                            required
                            control={Input}
                            label='Email'
                            placeholder="Email"
                            name="email"
                            onChange={formChangeHandler}
                            value={formValues.email}
                            error={ buttonDisabledInd && buttonHovered && formControlMessage.find(e => e.field == "email") != null ? true:false}
                        />
                        <Form.Field width={8}
                             required
                            control={Input}
                            label='Numéro de téléphone'
                            placeholder="Numéro de téléphone"
                            name="phone"
                            onChange={formChangeHandler}
                            value={formValues.phone}
                        />
                    </Form.Group>
                    <br />
                    <Form.Group>
                        <Form.Field width={8} 
                            required
                            control={Input}
                            label='Mot de passe'
                            type='password'
                            placeholder="Mot de passe"
                            name="password1"
                            onChange={formChangeHandler}
                            value={formValues.password1}
                            error={ buttonDisabledInd && buttonHovered && formControlMessage.find(e => e.field == "password1" || e.field == "passwords" ?true:false) != null ? true:false}
                        />
                        <Form.Field width={8} 
                            required
                            control={Input}
                            label='Confirmation du mot de passe'
                            type='password'
                            placeholder="Mot de passe"
                            name="password2"
                            onChange={formChangeHandler}
                            value={formValues.password2}
                            error={ buttonDisabledInd && buttonHovered && formControlMessage.find(e => e.field == "password2" || e.field == "passwords" ?true:false) != null ? true:false}
                        />
                    </Form.Group>
                    <br />
                    <Grid>
                        <Grid.Column textAlign="center">
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
                                                content='Créer un compte'
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
                        </Grid.Column>
                    </Grid>
                    <Message
                        error
                        content={error && error.graphQLErrors[0] && error.graphQLErrors[0].message ? error.graphQLErrors[0].message:'Il y a eu une erreur pendant la création de votre compte, veuillez rééssayer'}
                    />
                    {!loadingState && !error && data && data.register ? 
                        (                    
                            <Message 
                                info
                                content={`Un email de validation a été envoyé à ${formValues.email}`}
                            />
                        )
                        :
                        null
                    }
                </Segment>
            </Form>
            <Message attached='bottom'>
                Vous avez déjà un compte ?&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Link to='/login'>Se connecter</Link>&nbsp;.
                {/* <br/>
                Vous avez perdu votre mot de passe?&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Link to='/login'>Réinitialiser son mot de passe</Link>&nbsp;. */}
            </Message>
        </>

    )

}

export default Signup;