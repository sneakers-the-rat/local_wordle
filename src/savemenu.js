document.getElementById("save-close").addEventListener("click", (function(a) {
    let s = document.querySelector('#save');
    s.classList.toggle('hidden');

}));

function n(e, a, s) {
    return a in e ? Object.defineProperty(e, a, {
            value: s,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[a] = s, e
}

const default_stats = {
            currentStreak: 0,
            maxStreak: 0,
            guesses: n({
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
                6: 0
            }, 'fail', 0),
            winPercentage: 0,
            gamesPlayed: 0,
            gamesWon: 0,
            averageGuesses: 0
        };


document.getElementById("saveButton").addEventListener("click", (function(a) {
    let s = document.querySelector('#saveButton');
    console.log('save-button')
    s.classList.add('flash');
    setTimeout(() => 
    s.classList.remove('flash'), 200);

    // get statistics from local storage!
    let stats = window.localStorage.getItem('statistics') || JSON.stringify(default_stats);

    let file = new Blob([stats], {type: 'text/json'});
    let filename = `wordle_stats_${new Date().toISOString().substring(0,10)}.json`
    let link = document.createElement("a"),
        url = URL.createObjectURL(file);
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
    setTimeout(function() {
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);  
        }, 0); 

}))
document.getElementById("inputload").addEventListener("change", (function(a) {
    let s = document.querySelector('#inputload');

    new Response(s.files[0]).json().then(json => {
        window.localStorage.setItem('statistics', JSON.stringify(json));
        console.debug('loaded stats! refreshing', json);
        window.location.reload();
      }, err => {
        console.log('could not load data!', err, json);
      })


}))