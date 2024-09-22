import { useEffect, useState } from "react";

const clock = () => {
  const [date, setDate] = useState(null);

  const formatDate = () => {
    const dateString = Date.now();
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString).toLocaleDateString("en-US", options);
    const time = new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    setDate(`${date}, ${time}`);
  };
  useEffect(() => {
    formatDate();
    setInterval(formatDate, 60000);
  }, []);

  return (
    <p className=" text-gray-500 text-md font-semibold cursor-pointer sm:block hidden">
      {date}
    </p>
  );
};

export default clock;
