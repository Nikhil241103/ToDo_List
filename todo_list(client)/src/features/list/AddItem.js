import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from "@fortawesome/free-solid-svg-icons"
import { useState, useEffect } from "react"
import { useAddNewItemMutation } from './listApiSlice'

const AddItem = () => {
  const [addNewItem, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useAddNewItemMutation()

  const [title, setTitle] = useState('')
  const canSave = title && !isLoading

  useEffect(() => {
    setTitle('')
  }, [isSuccess])


  const handleSubmit = async (e) => {
    e.preventDefault()
    if (canSave) {
      await addNewItem({ title })
    }
  }

  return (
    <form className='add-form' onSubmit={handleSubmit}>
      <label htmlFor="addItem"></label>
      <input
        autoFocus
        id="addItem"
        type="text"
        placeholder="Add Item"
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        type="submit"
        aria-label="Add Item"
        disabled={!canSave}
      >
        <FontAwesomeIcon icon={faUpload} />
      </button>
    </form>
  )
}

export default AddItem
