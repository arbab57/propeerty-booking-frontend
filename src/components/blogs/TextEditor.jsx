
const TextEditor = ({content, setContent, onClose}) => {
  return (
    <div className="fixed top-0 left-0 bg-black bg-opacity-45 flex justify-center items-center w-screen h-screen z-40">
      <div className="bg-white w-[90%] h-[90%] rounded-md flex flex-col justify-between gap-2 p-5">
        <textarea onChange={(e) => setContent(e.target.value)} value={content} className="h-full w-full border border-gray-500 p-4" name="" id=""></textarea>
        <div className="flex items-center gap-1 justify-end">
          <button
            onClick={onClose}
            className="cursor-pointer rounded-md bg-red-500  text-white px-4 py-1"
          >
            Cancel
          </button>
          <button onClick={onClose} className="cursor-pointer rounded-md bg-blue-500  text-white px-4 py-1">
            Update
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default TextEditor;
