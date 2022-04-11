import axios from "axios";
import React, { useEffect, useState } from "react";

import List from "../components/List/List";

function ListContainer() {
  const [emailList, setEmailList] = useState([]);

  useEffect(() => {
    axios
      .get("https://flipkart-email-mock.vercel.app/")
      .then((res) => res.data)
      .then((data) => setEmailList(data.list));
  }, []);

  return (
    <main>
      <List items={emailList} />
    </main>
  );
}

export default ListContainer;
