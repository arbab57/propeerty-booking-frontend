const Sorting = ({ setSort }) => {
  return (
    <div className="flex justify-end my-3 h-9">
      <select
        onChange={(e) => setSort(e.target.value)}
        className="border border-black rounded-sm"
        name=""
        id=""
      >
        <option value="asc">New First</option>
        <option value="desc">Old First</option>
      </select>
    </div>
  );
};

export default Sorting;
