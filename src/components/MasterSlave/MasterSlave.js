import axios from "axios";
import React, { useEffect, useRef } from "react";

import ListItem from "../ListItem/ListItem";

import "./MasterSlave.css";

function MasterSlave({
  items,
  selectHandler,
  listRef,
  currentId,
  bookmarkHandler,
  read,
}) {
  const bodyRef = useRef(null);

  useEffect(() => {
    if (currentId) {
      axios
        .get(`https://flipkart-email-mock.vercel.app/?id=${currentId}`)
        .then((res) => res.data)
        .then((data) => {
          bodyRef.current.innerHTML = data.body;
        });
    }
  }, [currentId]);

  return (
    <article className="masterSlave">
      <section ref={listRef} className="listPart">
        {items &&
          items.map((item) => (
            <ListItem
              from={item.from}
              id={item.id}
              short_description={item.short_description}
              subject={item.subject}
              date={item.date}
              key={item.id}
              selectHandler={selectHandler}
              read={read}
            />
          ))}
      </section>
      <section className="emailBodyWrapper">
        <div className="buttonBox">
          <button onClick={() => bookmarkHandler(currentId)}>Bookmark</button>
        </div>
        <div ref={bodyRef} className="emailBody"></div>
      </section>
    </article>
  );
}

export default MasterSlave;
