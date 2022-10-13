import React from "react";
import HTMLFlipBook from 'react-pageflip';

const BookWindow = React.forwardRef((props, ref) => {
    return (
      <div className="demoPage" ref={ref}> /* ref required */
        <h1>Page Header</h1>
        <p>{props.children}</p>
        <p>Page number: {props.number}</p>
      </div>
    );
  });

export default BookWindow;