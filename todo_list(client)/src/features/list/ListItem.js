import { useEffect } from "react"
import {
  useUpdateItemMutation,
  useDeleteItemMutation
} from "./listApiSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from "@fortawesome/free-solid-svg-icons"

const ListItems = ({ item, search }) => {
  const [updateItem, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useUpdateItemMutation()

  const [deleteItem, {
    isSuccess: isDelSuccess,
    isError: isDelError,
    error: delerror
  }] = useDeleteItemMutation()

  const onCheckClicked = async () => {
    await updateItem({ ...item, completed: !item.completed })
  }

  const onDeleteClicked = async () => {
    await deleteItem({ id: item.id })
  }

  let flag = 0
  useEffect(() => {
    const checkCompleted = async () => {
      if (item.completed) {
        let diff = new Date().getTime() - new Date(item.end).getTime()
        diff = diff / (1000 * 60 * 60 * 24)
        if (diff >= 1) {
          await deleteItem({ id: item.id })
          flag = 1
        }
      }
    }
    checkCompleted()
  }, [item.completed])

  if (item && flag === 0) {
    return (
      <>
        {(item.title)?.toLowerCase().includes(search.toLowerCase()) &&
          <li className={`item ${item.completed ? 'completed' : ''}`}>
            <input
              type="checkbox"
              checked={item.completed}
              onChange={onCheckClicked}
            />
            <label
              onDoubleClick={onCheckClicked}
            >{item.title}</label>
            <button
              title="Delete"
              onClick={onDeleteClicked}
              aria-label={`Delete ${item.title}`}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </li>}
      </>
    )
  } else return null
}

export default ListItems
