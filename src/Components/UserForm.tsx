import { useRef, type ChangeEvent, type FormEvent } from 'react'
import { Button, Form } from 'react-bootstrap'
import { type User, type UserDto } from '../types.d'

export function UserForm({
  editedUser,
  addNewUser,
  onCancel,
  onChange,
  editUser
}: {
  editedUser: User
  addNewUser: (user: UserDto) => void
  onCancel: () => void
  onChange: (user: User) => void
  editUser: (user: User) => void
}) {
  const formRef = useRef<HTMLFormElement>(null)
  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!formRef || !formRef?.current) return
    const form = formRef.current
    const data = new FormData(form)
    const name = data.get('name') as string
    const country = data.get('country') as string

    if (editedUser?.id) {
      editUser(editedUser)
      form.reset()
      return
    }
    addNewUser({ name, country })
    form.reset()
  }

  const hadleOnChange = (value: string, type: 'name' | 'country') => {
    const edditedUser: User = { ...editedUser }

    if (type === 'name') {
      edditedUser.name = value
    } else if (type === 'country') {
      edditedUser.country = value
    }
    onChange(edditedUser)
  }

  return (
    <Form onSubmit={handleOnSubmit} ref={formRef}>
      <Form.Group className='mb-3' controlId='name'>
        <Form.Label>Name</Form.Label>
        <Form.Control
          value={editedUser?.name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            hadleOnChange(e.currentTarget.value, 'name')
          }
          name='name'
          type='text'
          placeholder='Enter your name'
        />
      </Form.Group>
      <Form.Group className='mb-3' controlId='country'>
        <Form.Label>Country</Form.Label>
        <Form.Control
          value={editedUser?.country}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            hadleOnChange(e.currentTarget.value, 'country')
          }
          name='country'
          type='text'
          placeholder='Enter your country'
        />
      </Form.Group>

      <Button type='submit' className='me-2 mb-5' variant='primary'>
        Save
      </Button>
      <Button
        type='button'
        className='mb-5'
        variant='secondary'
        onClick={() => onCancel()}
      >
        Cancel
      </Button>
    </Form>
  )
}
