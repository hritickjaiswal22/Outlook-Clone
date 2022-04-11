import React from "react";

import "./ListItem.css";

function ListItem({
  from,
  id,
  short_description,
  subject,
  date,
  selectHandler,
  read,
}) {
  read = read ? read : [];
  const set = new Set(read);
  const className = set.has(Number(id)) ? "listItem readListItem" : "listItem";

  return (
    <div
      onClick={() => selectHandler(id)}
      data-identifier={id}
      className={className}
    >
      <div className="leftBox"></div>
      <div className="rightBox">
        <p className="from">
          From : <span className="bold">{from.email}</span>
        </p>
        <p className="subject">
          Subject : <span className="bold">{subject}</span>
        </p>
        <p className="description">{short_description}...</p>
      </div>
    </div>
  );
}

export default ListItem;
