const displayChirps = data => {
    $(`.getChirps`).empty();
    let chirps = Object.keys(data).map(key => {
        return {
            id: key,
            user: data[key].user,
            text: data[key].text
        };
    });
    console.log(chirps);
    chirps.pop();
    chirps.reverse();
    chirps.forEach(chirp => {
        $(`.getChirps`).append(`
        <div class="card m-2">
            <div class="card-body">
                <button onClick="deleteChirp(${chirp.id})" id="deleteChirp">X</button>
            </div>
        </div>    
        `)
    });
};

$('.btn').click(e => {
    e.preventDefault();

    let body = {
        name: $('[name="name"]').val(),
        filmTitle: $('[name="filmTitle"]').val()
    };

    $.ajax({
        method: 'POST',
        url: '/filmList',
        data: body
    }).then(() => {
        $('[name="name"]').val('');
        $('[name="filmTitle"]').val('');

        getFilms();
    });
    //     .catch((err) => {
    //     console.log(err);
    // });
});
