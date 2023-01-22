const Dropdown = ({ sort, setSort }) => {
  return (
    <form className="sort-form">
      <h3>{new Date().toISOString().slice(0, 10)}</h3>
      <label className="offscreen" htmlFor="sort">Sort</label>
      <select name="sort" id="sort" onChange={(e) => setSort(e.target.value)}>
        <option value="select...">select...</option>
        <option value="completed">completed</option>
        <option value="pending">pending</option>
        <option value="ascending">ascending</option>
        <option value="descending">descending</option>
      </select>
    </form>
  )
}

export default Dropdown