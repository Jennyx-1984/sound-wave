import { useState } from "react";
import helpCrud from "./helpCrud";


const useCrud = (url) => {
  const [db, setDB] = useState([]);
  const [error, setError] = useState(null);
  const api = helpCrud();
  const generateId = () => Math.floor(Math.random() * 1000000).toString();

  const createData = async (data) => {
  data.id = generateId();
  const res = await api.post(url, { body: data, headers: { "content-type": "application/json" } });
  if (!res.err) {
    setDB([...db, res]);
  } else {
    setError(res);
  }
  return res;
};


  return {createData};
}

export default useCrud;