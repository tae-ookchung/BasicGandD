import { useState } from 'react'
import './App.css'
import { useQuery, useMutation, gql } from '@apollo/client';

const GET_USERS = gql`#graphql
  query GetUsers {
    getUsers {
      id
      name
      age
      isweeb
    }
  }
`;

const GET_USER_BY_ID = gql`#graphql
  query GetUserById($id: ID!) {
    getUserById(id: $id) {
      id
      name
      age
      isweeb
    }
  }
`;

const CREATE_USER = gql`#graphql
  mutation CreateUser($name: String!, $age: Int!, $isweeb: Boolean!) {
    createUser(name: $name, age: $age, isweeb: $isweeb) {
      id
      name
      age
      isweeb
    }
  }
`;

type NewUser = {
  name: string;
  age: string;
  isweeb: boolean;
};

function App() {
  const [newUser, setNewUser] = useState<NewUser>({ name: '', age: '', isweeb: false });
  const { data: getUsersData, error: getUsersError, loading: getUsersLoading } = useQuery(GET_USERS);
  const {
    data: getUserByIdData,
    error: getUserByIdError,
    loading: getUserByIdLoading
  } = useQuery(GET_USER_BY_ID, {
    variables: {
      id: "1",
    }
  });

  const [createUser] = useMutation(CREATE_USER);

  if (getUsersLoading) return <p>Loading...</p>;
  if (getUsersError) return <p>Error: {getUsersError.message}</p>;

  const handleCreateUser = async () => {
    if (!newUser.name || !newUser.age || isNaN(Number(newUser.age))) {
      alert("Please enter a valid name and age.");
      return;
    }
    createUser({
      variables: {
        name: newUser.name,
        age: Number(newUser.age),
        isweeb: newUser.isweeb || false,
      },
    }).then((response) => {
      console.log("User created:", response.data.createUser);
      setNewUser({ name: '', age: '', isweeb: false });
    }).catch((error) => {
      console.error("Error creating user:", error);
      alert("Failed to create user. Please try again.");
    });
  }

  return (
    <>

      <div>
        <input
          placeholder="Name..."
          onChange={
            (e) => setNewUser((prev) => (
              {
                ...prev,
                name: e.target.value
              }))
          }
        />
        <input placeholder="Age..." type="number" onChange={(e) => setNewUser((prev) => ({ ...prev, age: e.target.value }))} />
        <label> Weeb? </label>
        <input
          type="checkbox"
          onChange={(e) => setNewUser((prev) => ({ ...prev, isweeb: e.target.checked }))}
        />
        <button onClick={handleCreateUser}> Create User </button>
      </div>

      <h1> Users </h1>

      <div>
        <h2> Chosen User</h2>
      </div>

      <div>
        {getUsersData.getUsers.map((user: any) => (
          <div>
            <p> Name: {user.name} </p>
            <p> Age: {user.age} </p>
            <p> Weeb: {user.isweeb ? "Yes" : "No"} </p>
          </div>
        ))}

        {""}

        {getUserByIdLoading && <p>Loading user by ID...</p>}
        {getUserByIdError && <p>Error: {getUserByIdError.message}</p>}
        {getUserByIdData && (
          <div>
            <h2>User by ID</h2>
            <p>ID: {getUserByIdData.getUserById.id}</p>
            <p>Name: {getUserByIdData.getUserById.name}</p>
            <p>Age: {getUserByIdData.getUserById.age}</p>
            <p>Weeb: {getUserByIdData.getUserById.isweeb ? "Yes" : "No"}</p>
          </div>
        )}
      </div>
    </>
  )
}

export default App
