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
        <div class="card m-2 border">
            <div class="card-header text-right p-1">
            <button onClick="deleteChirp(${
                chirp.id
            })" class="btn btn-sm btn-primary text-right p-0 px-1" id="deleteChirp">X</button>
            </div>
            <div class="card-body pt-1">
                <div class="card-title">
                    <h3>${chirp.user}</h3>
                </div>
                <div class="card-text ml-3">${chirp.text}</div>
            </div>
            <div class="card-footer text-right">
                ${chirp.id}
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#chirpModal${
                    chirp.id
                }">
                Edit
                </button>
            </div>
        </div>

        <div class="modal" id="chirpModal${
            chirp.id
        }" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${chirp.user} & ${chirp.id}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span> 
                        </button>
                    </div>
                <div class="modal-body">
                    <input type="text" value="${chirp.user}" id="editChirpUser${
            chirp.id
        }">
                    <input type="text" value="${chirp.text}" id="editChirpText${
            chirp.id
        }">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button onClick="editChirp(${
                        chirp.id
                    })" type="button" class="btn btn-primary" data-dismiss="modal">Save changes</button>
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
});
