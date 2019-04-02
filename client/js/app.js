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
        <div class="card m-3 p-3 border">
            <div class="postBody">
            <div class="text-right p-1">
            <button onClick="deleteChirp(${
                chirp.id
            })" class="btn btn-sm btn-outline-light text-right py-0 px-1" id="x-button">X</button>
            </div>
            <div class="card-body p-2 m-4">
                <div class="card-title">
                    <h3>${chirp.user}</h3>
                </div>
                <div class="card-text ml-3">
                    <h4>${chirp.text}</h4>
                </div>
            </div>
            <div class="text-right p-2">
                <button type="button" class="btn py-0 btn-outline-light" data-toggle="modal" data-target="#chirpModal${
                    chirp.id
                }">
                Edit
                </button>
            </div>
            </div>
        </div>

        <div class="modal" id="chirpModal${
            chirp.id
        }" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
            <div class="modal-div p-3">
                <div class="modal-content p-2">
                    <div class="m-1 pl-2 pb-2">
                        
                        <button type="button" class="close py-0 px-1" data-dismiss="modal" id="x-button" aria-label="Close">
                        <span aria-hidden="true">&times;</span> 
                        </button>
                    </div>
                <div class="modal-body">
                    <input type="text" size="75" value="${chirp.user}" id="editChirpUser${chirp.id}">
                    <br>
                    <input type="text" size="75" value="${chirp.text}" id="editChirpText${chirp.id}">
                </div>
                <div class="text-right pt-3 pl-3">
                    <button type="button" class="btn btn-outline-light" data-dismiss="modal">Close</button>
                    <button onClick="editChirp(${
                        chirp.id
                    })" type="button" class="btn btn-outline-light" data-dismiss="modal">Save changes</button>
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
});
