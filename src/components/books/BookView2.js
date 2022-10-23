import React from 'react';

const BookView2 = React.forwardRef(({page}, ref) => {
    return ( page ? (
        <div ref={ref} className="demoPage view-page-outer-div bookview3-outer-div">
                <div className="view-single-image">
                    <img src={page.page.image}/>
                </div>
        </div>
        ) : (<div className="demoPage filler-page"></div>)
    );
});

export default BookView2;