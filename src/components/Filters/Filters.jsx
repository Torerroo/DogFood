import { useSearchParams } from 'react-router-dom'
import {
  DATA_FILTER, FILTER_QUERY_NAME, PRICE_FILTER, SALES_FILTER,
} from './constants'
import { FilterItem } from './FilterItem/FilterItem'
import './Filters.css'

const FILTERS = [PRICE_FILTER, SALES_FILTER, DATA_FILTER]

export function Filters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const clickFilterHandler = (filterType, isActive) => {
    if (!isActive) searchParams.delete(FILTER_QUERY_NAME)
    else searchParams.set(FILTER_QUERY_NAME, filterType)
    setSearchParams(searchParams)
  }

  return (
    <div className="d-flex justify-content-center filters">
      <h3 className="filters__title">Сортировка:</h3>
      {FILTERS.map((filter) => (
        <FilterItem
          key={filter.name}
          {...filter}
          clickFilterHandler={clickFilterHandler}
        />
      ))}
    </div>
  )
}
