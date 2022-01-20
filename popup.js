buttons = document.getElementsByClassName('button')

colors = ['#000000', '#808080', '#008d00', '#03afa0', '#5e04ff', '#b800ab', '#ff8a00', '#fd090a', '#8B0000', 'gray']

function draw_level() {
    chrome.storage.sync.get(['level'], function (result) {
        let BLOCK = result.level
        if (BLOCK == null)
            BLOCK = 0
        BLOCK = Number(BLOCK)
        draw_level(BLOCK)
        for (let i = 0; i < buttons.length; ++i) {
            buttons[i].style = 'background-color:default'
        }
        document.getElementById(BLOCK).style = 'background-color:' + colors[BLOCK + 1]
    })
}

draw_level()

chrome.storage.onChanged.addListener(function(changes, namespace) {
    draw_level()
});

for (let i = 0; i < buttons.length; ++i) {
    buttons[i].onclick = function () {
        let id = Number(buttons[i].getAttribute('id'))

        chrome.storage.sync.set({'level': id}, function() {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    chrome.tabs.reload(tabs[0].id);

                    setTimeout(() => {  window.close(); }, 250);
                });
            });
        });

    }
}

