const displayChirps = data => {
    $(`#postChirps`).empty();
    let chirps = Object.keys(data).map(key => {
        return {
            id: key,
            user: data[key].user,
            text: data[key].text
        };
    });

    chirps.pop();
    chirps.reverse();
    chirps.forEach(chirp => {
        $(`#postChirps`).append(`
        <div class="card border m-3 p-3">
            <div class="color-pea">
                <div class="p-1 text-right">
                    <h5>Delete<span>
                    <button class="btn btn-sm btn-outline-light py-0 px-1 text-right peach" onClick="deleteChirp(${chirp.id})" >X</button>
                    </span>
                    </h5>
                    </div>
                <div class="p-2 m-4 color-white">
                    <div class="card-title">
                        <h3>${chirp.user}</h3>
                    </div>
                <div class="card-text">
                    <h4>${chirp.text}</h4>
                </div>
            </div>
            <div class="p-2 text-right">
                <button class="btn btn-outline-light py-0" data-toggle="modal" data-target="#chirpModal${chirp.id}">
                Edit Chirp
                </button>
            </div>
            </div>
        </div>

        <div class="modal" id="chirpModal${chirp.id}" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="p-3 color-white">
                    <div class="modal-content p-2 color-pea">
                        <div class="m-1 pl-2 pb-2">
                            <button class="close py-0 px-1" data-dismiss="modal" id="x-button" aria-label="Close">
                                <span aria-hidden="true">&times;</span> 
                            </button>
                            <h3>Edit Chirp</h3>
                        </div>
                        <div class="modal-body">
                            <input class="input-border p-2" type="text" size="48" value="${chirp.user}" id="editChirpUser${chirp.id}" style="color:darkgray; font-size: 1.5em">
                            <br>
                            <input class="input-border p-2" type="text" size="48" value="${chirp.text}" id="editChirpText${chirp.id}" style="color:darkgray; font-size: 1.5em">
                        </div>
                        <div class="text-right pt-3 pl-3">
                            <button type="button" class="btn btn-outline-light" data-dismiss="modal">Close</button>
                            <button onClick="editChirp(${chirp.id})" type="button" class="btn btn-outline-light" data-dismiss="modal">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `);
    });
};

const deleteChirp = id => {
    $.ajax({
        type: 'DELETE',
        url: `/api/chirps/${id}`
    }).then(data => displayChirps(data));
};

const editChirp = id => {
    let editChirpUser = $(`#editChirpUser${id}`).val();

    let editChirpText = $(`#editChirpText${id}`).val();

    let data = {
        user: `${editChirpUser}`,
        text: `${editChirpText}`
    };

    $.ajax({
        type: 'PUT',
        url: `/api/chirps/${id}`,
        data
    }).then(data => displayChirps(data));
};

$.ajax({
    type: 'GET',
    url: '/api/chirps'
}).then(data => displayChirps(data));

$(`#submitChirp`).click(e => {
    e.preventDefault();
    let data = {
        user: $('[name="user"]').val(),
        text: $('[name="text"]').val()
    };
    $.ajax({
        method: 'POST',
        url: '/api/chirps',
        data
    }).then(data => displayChirps(data));
    $(`#userInput`).val('');
    $(`#userText`).val('')
});
