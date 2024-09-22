import Properties from "../../pages/Properties";

const SelectProperty = ({ setProperty, onClose }) => {
  return (
    <div className="fixed top-0 left-0 bg-black bg-opacity-45 flex justify-center items-center w-screen h-screen z-40">
      <div className="bg-white w-[92%] h-[92%] rounded-md flex flex-col justify-between sm:p-5 p-3 overflow-auto">
        <Properties select={true} setProperty={setProperty} onClose={onClose} />
      </div>
    </div>
  );
};

export default SelectProperty;
