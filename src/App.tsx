import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { SortBy, type User } from './types.d'
import { UserList } from './components/usersList'

function App () {
  const [users, setUsers] = useState<User[]>([])
  const [colorRows, setColorRows] = useState<boolean>(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  const originalUsers = useRef<User[]>([])

  const handleColorRows = () => {
    setColorRows(!colorRows)
  }

  const handleOrderByCountry = () => {
    const newSorting = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSorting)
  }

  const handleDelete = (uuid: string) => {
    const filteredUsers = users.filter(user => user.login.uuid !== uuid)
    setUsers(filteredUsers)
  }

  const handleResetState = () => {
    setUsers(originalUsers.current)
    setColorRows(false)
    setSorting(SortBy.NONE)
  }

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
  }

  const filteredUsers = useMemo(() => {
    return filterCountry != null && filterCountry.length > 0
      ? users.filter(user => user.location.country.toLocaleLowerCase().includes(filterCountry.toLocaleLowerCase()))
      : users
  }, [users, filterCountry])

  const sortedUsers = useMemo(() => {
    if (sorting === SortBy.NONE) return filteredUsers

    const compareProperties: Record<string, (user: User) => any> = {
      [SortBy.COUNTRY]: user => user.location.country,
      [SortBy.NAME]: user => user.name.first,
      [SortBy.LAST]: user => user.name.last
    }

    return filteredUsers.toSorted((a, b) => {
      const extractProperty = compareProperties[sorting]
      return extractProperty(a).localeCompare(extractProperty(b))
    })
  }, [sorting, filteredUsers])

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
            {sorting === SortBy.COUNTRY ? 'No Ordenar por país' : 'Ordenar por país'}
          </button>
          <button onClick={handleResetState}>
            Resetear estado
          </button>
          <input type="text" placeholder="Filtra por país" onChange={(e) => {
            setFilterCountry(e.target.value)
          }}/>
        </div>
      </header>
      <UserList users={sortedUsers} colorRows={colorRows} deleteUser={handleDelete} changeSorting={handleChangeSort} />
    </>
  )
}

export default App
