// utility functions for testing
function logLinkedList(allPages, bookId, status) {
    const firstPage = allPages.find(page => page.isFirstPage);
    const orderedPages = [firstPage];

    for (let i = 0; i < allPages.length; i++) {
        // console.log(i);
        const nextPage = allPages.find(page => page.id == orderedPages[i]?.nextPage);
        if (nextPage) orderedPages.push(nextPage);
    }
    if (bookId) console.log(`Book ${bookId}:${status?` (${status} methods)`:""}`);
    console.log(orderedPages.map(itm => itm.id));
}

function sleep(ms) {
    return new Promise((res) => setTimeout(res, ms));
}

module.exports = { logLinkedList, sleep };
