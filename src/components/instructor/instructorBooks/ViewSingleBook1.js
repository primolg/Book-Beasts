import React from 'react';

const ViewSingleBook1 = React.forwardRef(({page}, ref) => {
    return ( page ? (
        <div ref={ref} className="view-page-outer-div bookview3-outer-div">
                <div className="view-content-div">
                    {page.page.content}
                </div>
                <div className="view-page-number">Page {page.pageNumber}</div>
        </div>
        ) : (<div className="demoPage filler-page"></div>)
    );
});

export default ViewSingleBook1;