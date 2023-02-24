import { useSearchParams } from 'react-router-dom'
import './FilterItem.css'

export function FilterItem({ filterName, clickFilterHandler }) {
  const [searchParams] = useSearchParams()

  const currentFilterName = searchParams.get('filterName')

  return (
    <button type="button" className={filterName === currentFilterName ? 'filterItemActive filterItem' : 'filterItem'} onClick={() => clickFilterHandler(filterName)}>
      {filterName}
    </button>
  )
}
