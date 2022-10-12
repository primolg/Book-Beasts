// utility functions for testing
function getOrderedLinkedList(allPages) {
    const firstPage = allPages.find(page => page.isFirstPage);
    const orderedPages = [firstPage];

    for (let i = 0; i < allPages.length; i++) {
        // console.log(`Iteration ${i} | nextPage id: ${orderedPages[i]}`);
        const nextPage = allPages.find(page => page.id == orderedPages[i].nextPage);
        if (nextPage) orderedPages.push(nextPage);
    }
    return orderedPages.map(itm => itm.id);
}

module.exports = { getOrderedLinkedList };
