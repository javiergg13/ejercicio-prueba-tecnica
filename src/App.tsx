import { useEffect, useRef, useState } from 'react'
import './App.css'
import { type User } from './types.d'
import { UserList } from './components/usersList'

function App () {
  const [users, setUsers] = useState<User[]>([])
  const [colorRows, setColorRows] = useState<boolean>(false)
  const [orderByCountry, setOrderByCountry] = useState<boolean>(false)
  const originalUsers = useRef<User[]>([])

  const handleColorRows = () => {
    setColorRows(!colorRows)
  }

  const handleOrderByCountry = () => {
    setOrderByCountry(!orderByCountry)
  }

  const handleDelete = (uuid: string) => {
    const filteredUsers = users.filter(user => user.login.uuid !== uuid)
    setUsers(filteredUsers)
  }

  const handleResetState = () => {
    setUsers(originalUsers.current)
    setColorRows(false)
    setOrderByCountry(false)
  }

  const sortedUsers = orderByCountry ? users.toSorted((a: User, b: User) => a.location.country.localeCompare(b.location.country)) : users

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then(async res => await res.json())
      .then(res => {
        setUsers(res.results)
        originalUsers.current = res.results
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  return (
    <>
      <header>
        <h1>Prueba técnica</h1>
        <div className='header-buttons'>
          <button onClick={handleColorRows}>
            Colorear filas
          </button>
          <button onClick={handleOrderByCountry}>
            {orderByCountry ? 'No Ordenar por país' : 'Ordenar por país'}
          </button>
          <button onClick={handleResetState}>
            Resetear estado
          </button>
          <input type="text" placeholder="Filtra por país" />
        </div>
      </header>
      <UserList users={sortedUsers} colorRows={colorRows} deleteUser={handleDelete} />
    </>
  )
}

export default App
