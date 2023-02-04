import { useState, useEffect } from 'react'
import './Search.css'
import { useDispatch } from 'react-redux'
import { changeSearchFilter } from '../../redux/slices/filterSlice'
import { useDebounce } from '../../hooks/useDebounce'

export function Search() {
  const [search, setSearch] = useState('')

  const dispatch = useDispatch()

  const debouncedSearchValue = useDebounce(search)

  const changeSearchHandler = (e) => {
    const newSearchValue = e.target.value
    setSearch(newSearchValue)
  }

  useEffect(() => {
    dispatch(changeSearchFilter(debouncedSearchValue))
  }, [debouncedSearchValue, dispatch])

  return (
    <div className="header__container-search">
      <input className="search-input" type="search" placeholder="Поиск" value={search} onChange={changeSearchHandler} />
    </div>
  )
}
