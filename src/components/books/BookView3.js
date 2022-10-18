import React from 'react';

const BookView3 = React.forwardRef(({page}, ref) => {
    return (
        <div ref={ref} className="demoPage view-page-outer-div bookview3-outer-div">
            <div>
                <div className="view-small-image-page">
                    <img className="view-page-image" src={page.page.image}/>
                </div>
                <div className="view-small-text-page" id="view-pageText">
                    <p>{page.page.content}</p>
                </div>
            </div>
            <div className="view-page-number">Page {page.pageNumber}</div>
        </div>
    );
});

export default BookView3;