import React from 'react';

const BookView2 = React.forwardRef(({page}, ref) => {
    return ( page ? (
        <div ref={ref} className="demoPage view-page-outer-div bookview3-outer-div">
                <div>
                    <img src={page.page.image} className="view-single-image"/>
                </div>
        </div>
        ) : (<div className="demoPage filler-page"></div>)
    );
});

export default BookView2;