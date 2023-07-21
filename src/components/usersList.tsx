import { SortBy, type User } from '../types.d'

interface Props {
  users: User[]
  colorRows: boolean
  deleteUser: (uuid: string) => void
  changeSorting: (sort: SortBy) => void
}

export function UserList ({ users, colorRows, deleteUser, changeSorting }: Props) {
  return (
    <table width='100%'>
      <thead>
        <tr>
          <th>Foto</th>
          <th className='pointer' onClick={() => { changeSorting(SortBy.NAME) }}>Nombre</th>
          <th className='pointer' onClick={() => { changeSorting(SortBy.LAST) }}>Apellido</th>
          <th className='pointer' onClick={() => { changeSorting(SortBy.COUNTRY) }}>País</th>
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
            <td>
              <button onClick={() => { deleteUser(user.login.uuid) }}>
                Borrar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
