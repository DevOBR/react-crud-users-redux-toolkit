import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container, Row, Col } from 'react-bootstrap'
import { UserTable } from './Components/UserTable'
import { UserForm } from './Components/UserForm'
import { useUserStore } from './hooks/useUserStore'
import { useState } from 'react'
import type { User } from './types.d'

const initialEditedUser: User = { id: '', name: '', country: '' }

function App() {
  const [EditedUser, setEditedUser] = useState(initialEditedUser)
  const { users, deleteUser, addUser, editExistingUser } = useUserStore()

  const handleOnEdit = (user: User) => {
    setEditedUser(user)
  }

  const handleOnCancel = () => {
    setEditedUser(initialEditedUser)
  }

  const handleEditUser = (user: User) => {
    editExistingUser(user)
  }

  return (
    <Container>
      <Row>
        <Col>
          <h1>Form</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <UserTable
            onEdit={handleOnEdit}
            users={users}
            deleteUserById={deleteUser}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <UserForm
            onChange={handleOnEdit}
            editedUser={EditedUser}
            addNewUser={addUser}
            onCancel={handleOnCancel}
            editUser={handleEditUser}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default App
