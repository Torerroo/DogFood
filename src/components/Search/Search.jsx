import { useState } from 'react'
import './Search.css'
import { useDispatch } from 'react-redux'
import { changeSearchFilter } from '../../redux/slices/filterSlice'

export function Search() {
  const [search, setSearch] = useState('')

  const dispatch = useDispatch()

  const changeSearchHandler = (e) => {
    const newSearchValue = e.target.value
    setSearch(newSearchValue)
    dispatch(changeSearchFilter(newSearchValue))
  }

  return (
    <div className="header__container-search">
      <input className="search-input" type="search" placeholder="Поиск" value={search} onChange={changeSearchHandler} />
    </div>
  )
}
