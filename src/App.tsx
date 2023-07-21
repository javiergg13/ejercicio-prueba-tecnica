import { useEffect, useState } from 'react'
import './App.css'
import { type User } from './types.d'
import { UserList } from './components/usersList'

function App () {
  const [users, setUsers] = useState<User[]>([])
  const [colorRows, setColorRows] = useState<boolean>(false)
  const [orderByCountry, setOrderByCountry] = useState<boolean>(false)

  const handleColorRows = () => {
    setColorRows(!colorRows)
  }

  const handleOrderByCountry = () => {
    setOrderByCountry(!orderByCountry)
  }

  const sortedUsers = orderByCountry ? users.toSorted((a: User, b: User) => { return a.location.country.localeCompare(b.location.country) }) : users

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then(async res => await res.json())
      .then(res => {
        setUsers(res.results)
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
          <button>
            Resetear estado
          </button>
          <input type="text" placeholder="Filtra por país" />
        </div>
      </header>
      <UserList users={sortedUsers} colorRows={colorRows} />
    </>
  )
}

export default App
