import React, { useEffect, useRef, useState } from "react";

import MasterSlave from "../MasterSlave/MasterSlave";
import ListItem from "../ListItem/ListItem";

import "./List.css";

function List({ items }) {
  const [isActive, setIsActive] = useState(false);
  const listRef = useRef(null);
  const prevSelected = useRef(null);
  const [currentId, setCurrentId] = useState(null);
  const [read, setRead] = useState([]);
  const [displayItems, setDisplayItems] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    setDisplayItems(items);
  }, [items]);

  const bookmarkHandler = (id) => {
    if (bookmarks) {
      const temp = [...bookmarks, Number(id)];
      const tempSet = new Set(temp);
      const arr = [...tempSet];
      setBookmarks(arr);
    }
  };

  const showBookmarks = () => {
    const temp = bookmarks.map((id) => items[id - 1]);
    setDisplayItems(temp);
  };

  const readHandler = () => {
    const temp = read.map((id) => items[id - 1]);
    setDisplayItems(temp);
  };

  const selectHandler = (id) => {
    if (Number(id)) {
      setIsActive(true);
      setCurrentId(Number(id));

      if (read) {
        const temp = [...read, Number(id)];
        const tempSet = new Set(temp);
        const arr = [...tempSet];
        setRead(arr);
      }

      if (prevSelected.current !== null) {
        listRef.current.children[Number(prevSelected.current)].classList.remove(
          "selected"
        );
      }

      prevSelected.current = Number(id) - 1;
      const selectedDiv = listRef.current.children[Number(id) - 1];
      selectedDiv.classList.add("selected");
    }
  };

  return (
    <section className="wrapper">
      <div className="buttonContainer">
        Filter by :{" "}
        <button onClick={() => setDisplayItems(items)}>All Emails</button>
        <button onClick={readHandler}>Read</button>
        <button onClick={showBookmarks}>Bookmarks</button>
      </div>
      <article className="list">
        {isActive ? (
          <MasterSlave
            listRef={listRef}
            selectHandler={selectHandler}
            items={displayItems}
            currentId={currentId}
            bookmarkHandler={bookmarkHandler}
            read={read}
          />
        ) : (
          items &&
          items.map((item) => (
            <ListItem
              from={item.from}
              id={item.id}
              short_description={item.short_description}
              subject={item.subject}
              date={item.date}
              key={item.id}
              selectHandler={selectHandler}
            />
          ))
        )}
      </article>
    </section>
  );
}

export default List;
