
const PatchData = async (url, action, data) => {
  
    try {
      const response = await fetch(url, {
        method: action,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include"
      });
      const resJson = await response.json()

      return [response, resJson]
    } catch (error) {
      console.log(error);
    }
  };
  
  export default PatchData;
  