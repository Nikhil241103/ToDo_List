import { useState } from "react"
import { useGetListQuery, selectAllItems } from "./listApiSlice"
import ListItem from "./ListItem"
import SearchItems from "./SearchItems"
import AddItem from "./AddItem"
import Dropdown from "./Dropdown"
import { PulseLoader } from "react-spinners"
import { useSelector } from "react-redux"

const ListPage = () => {
  const {
    data: list,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetListQuery(undefined, {
    pollingInterval: 1000 * 60 * 15,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  })

  const listItems = useSelector(state => selectAllItems(state, list?.ids));
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('Select...')

  const handleSort = (listItems) => {
    let updatedList
    if (sort === 'completed') {
      updatedList = listItems.filter(item => item.completed)
    } else if (sort === 'pending') {
      updatedList = listItems.filter(item => !item.completed)
    } else if (sort === 'ascending') {
      updatedList = listItems.sort((a, b) => new Date(b.start) - new Date(a.start))
    } else if (sort === 'descending') {
      updatedList = listItems.sort((a, b) => new Date(a.start) - new Date(b.start))
    } else return listItems
    return updatedList
  }

  let content
  if (isLoading) content = <PulseLoader color="aqua" />
  if (isError) content = <p>{error?.data?.message}</p>
  if (isSuccess) {
    const sortedList = handleSort(listItems)
    const items = sortedList.map(item => <ListItem key={item.id} item={item} search={search} />)

    content = (
      <div className="box">
        <header><h1>To-Do List</h1></header>
        <main className="todo-content">
          <AddItem />
          <SearchItems search={search} setSearch={setSearch} />
          <Dropdown sort={sort} setSort={setSort} />
          <ul className="list">
            {items}
          </ul>
        </main>
      </div>
    )
  }

  return content
}

export default ListPage