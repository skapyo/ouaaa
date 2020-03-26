import React, { useEffect,useCallback } from 'react';
import gql from "graphql-tag";
import {useQuery, useMutation} from '@apollo/react-hooks';
import {Table, Segment,Header, Dropdown,Button} from "semantic-ui-react";
import {default as useObjectListStateManager} from './../../../../Hooks/useDnDStateManager';
import {omitTypename} from './../../../../Utils/utils';

const GET_USERS_LIST = gql`
  query getUsers {
    usersQuery {
      id,
      surname,
      lastname,
      email,
      phone,
      role,
      isvalid
    }
  }
`;

const SAVE_USERS = gql`
  mutation updateUsersMutation($users:[InputModifyUserType]) {
    updateUsersMutation(users:$users) {
      id,
      surname,
      lastname,
      email,
      phone,
      role,
      isvalid
    }
  }
`;

const roleOptions = [
    { key: 've', value: 've', text: 'viewer' },
    { key: 'ad', value: 'ad', text: 'admin' }
];

const validOptions = [
    { key: 'va', value: true, text: 'valid' },
    { key: 'nv', value: false, text: 'not valid' }
];


const getInitialRoleOption = (dbRole) => {
    return roleOptions.find(o => o.text == dbRole).value;
};


const UsersAdmin = () => {


    const {objectsList,initState,isModified,updateKeyIndicator} = useObjectListStateManager();
    const {data,loading,error} = useQuery(GET_USERS_LIST);
    const [save,{data:newData, loading:newDataLoading, error:newDataError}] = useMutation(SAVE_USERS);

    useEffect(() => {
        if(data) {
            initState(omitTypename(data.usersQuery));
        }
    },[data,initState]);

    useEffect(() => {
        if(newData) {
            initState(omitTypename(newData.updateUsersMutation));
        }
    },[newData,initState]);

    const saveButtonClickHandler = useCallback(() => {
        const users = objectsList.map((user) => {
          return {
              id:user.id, 
              role:user.role,
              isvalid:user.isvalid
            };
        });
        save({variables:{users:users}});
    },[objectsList,save]);

    console.log(objectsList);

    const roleSelectChangeHandler = useCallback((id,value) => {
        updateKeyIndicator(id,'role',roleOptions.find(o => o.value == value).text);
    },[updateKeyIndicator]);

    const validSelectChangeHandler = useCallback((id,value) => {
        updateKeyIndicator(id,'isvalid',value);
    },[updateKeyIndicator]);

    if(error)
        return 'error';

    if(loading || !objectsList)
        return 'loading';

    return (
        <Segment>
            <Header>Gestion des utilisateurs</Header>
            <br />
            <Button 
              circular 
              icon='save' 
              content='sauvegarder' 
              disabled={!isModified}
              loading={newDataLoading}
              onClick={saveButtonClickHandler}
            />
            <Table celled >
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>id</Table.HeaderCell>
                        <Table.HeaderCell>Prénom</Table.HeaderCell>
                        <Table.HeaderCell>Nom</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell>Téléphone</Table.HeaderCell>
                        <Table.HeaderCell>Rôle</Table.HeaderCell>
                        <Table.HeaderCell>Validité</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {objectsList.map((user) => (
                        <Table.Row>
                            <Table.Cell>{user.id}</Table.Cell>
                            <Table.Cell>{user.surname}</Table.Cell>
                            <Table.Cell>{user.lastname}</Table.Cell>
                            <Table.Cell>{user.email}</Table.Cell>
                            <Table.Cell>{user.phone}</Table.Cell>
                            <Table.Cell>                            
                                <Dropdown 
                                    options={roleOptions}
                                    defaultValue={getInitialRoleOption(user.role)}
                                    onChange={(e,{value}) => roleSelectChangeHandler(user.id,value)}
                                />
                            </Table.Cell>
                            <Table.Cell>
                                <Dropdown 
                                    options={validOptions}
                                    defaultValue={user.isvalid}
                                    onChange={(e,{value}) => validSelectChangeHandler(user.id,value)}
                                />
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </Segment>

    );
};

export default UsersAdmin;