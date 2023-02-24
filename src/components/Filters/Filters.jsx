import { useSearchParams } from 'react-router-dom'
import { FilterItem } from '../FilterItem/FilterItem'
import './Filters.css'

const FILTERS = ['Цена', 'Скидка', 'Новое']

export function Filters() {
  const [searchParams, setSearchParams] = useSearchParams()
  const clickFilterHandler = (filterName) => {
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      filterName,
    })
  }
  return (
    <div className="filters">
      Отфильтровать по:
      {FILTERS.map((filterName) => (
        <FilterItem
          key={filterName}
          clickFilterHandler={clickFilterHandler}
          filterName={filterName}
        />
      ))}
    </div>
  )
}
