
comments = document.getElementsByClassName('comment-table')
ranks = [
    'rated-user user-black',     // 0
    'rated-user user-gray',    // 1
    'rated-user user-green',     // 2
    'rated-user user-cyan',    // 3
    'rated-user user-blue',     // 4
    'rated-user user-violet',   // 5
    'rated-user user-orange',   // 6
    'rated-user user-red',      // 7
    'rated-user user-legendary',// 8
    'rated-user user-admin'     // 9
]
chrome.storage.sync.get(['level'], function(result) {
    BLOCK = result.level
    if (BLOCK == null)
        BLOCK = 0
    BLOCK = Number(BLOCK)

    for (let i = 0; i < comments.length; ++i) {
        let htmlElement = comments[i];
        let user = htmlElement.children[0].children[0].children[0].children[1].children[1].children[0].getAttribute('class');
        let have = true
        for (let lev = 0; lev < ranks.length; ++lev) {
            if (user === ranks[lev]) {
                if (lev < BLOCK + 1) {
                    have = false
                    break;
                } 
            }
        }
        if (!have)
            htmlElement.innerHTML = ''
        
    }

})
