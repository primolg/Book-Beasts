import React from 'react';

const BookView3 = React.forwardRef(({page}, ref) => {
    return ( page ? (
        <div ref={ref} className="view-page-outer-div bookview3-outer-div">
                <div className="view-small-image-page">
                    {page.page.image ? (<img className="view-page-image" src={page.page.image}/>) : <div className="filler-image"></div>}
                </div>
                <div className="view-small-text-page" id="view-pageText">
                    <p>{page.page.content}</p>
                </div>
        </div>
        ) : (<div className="demoPage filler-page"></div>)
    );
});

export default BookView3;