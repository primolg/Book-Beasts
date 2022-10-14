import React, {useState, useEffect} from "react";

const BookTest = () => {
    return (
        <div>
            <form>
                <div>
                    <textarea
                        placeholder="Tell your story..."
                        type="text"
                        autoFocus={true}
                    />
                </div>
            </form>
        </div>
    );
}


export default BookTest;
