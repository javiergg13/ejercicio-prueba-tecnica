import { type User } from '../interfaces/interfaces'

interface Props {
  users: User[]
  colorRows: boolean
}

export function UserList ({ users, colorRows }: Props) {
  return (
    <table width='100%'>
        <thead>
          <tr>
            <th>Foto</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>País</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {users?.map((user, index) => (
            <tr key={user.login.uuid} style={index % 2 === 0 ? { backgroundColor: colorRows ? '#333' : 'transparent' } : { backgroundColor: colorRows ? '#555' : 'transparent' }}>
              <td><img src={user.picture.medium}></img></td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.location.country}</td>
              <td> <button>Borrar</button></td>
            </tr>)
          )}
        </tbody>
      </table>
  )
}
