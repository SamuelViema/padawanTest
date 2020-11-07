$(function () {
    init()
    function init() {
        $("#msgSuccess").hide();
        $("#msgFail").hide();
        $('#addBook').click(insertBook);

        getBooks()
    }

    function insertBook() {
        let isbn = $("#isbn").val();
        let title = $("#title").val();
        let author = $("#author").val();
        let release_date = $("#release_date").val();
        let token = sessionStorage.getItem('token');
        $.ajax({
            type: "POST",
            url: 'http://localhost:3900/books',
            data: {
                'isbn': isbn,
                'title': title,
                'author': author,
                'release_date': release_date,
                'token': token,
            },
            dataType: "json",
            success: function (response) {
                if (response.status) {
                    $("#msgSuccess").show();
                    setTimeout(() => {
                        $("#msgSuccess").hide();
                    }, 3000)
                }
            },
            error: function (XHR, textStatus, errorThrown) {
                $("#msgFail").show();
                setTimeout(() => {
                    $("#msgFail").hide();
                }, 3000)
            }
        })
    }

    function deleteBook() {
        let id = $(this).attr("data-book")
        let token = sessionStorage.getItem('token');
        $.ajax({
            type: "DELETE",
            url: 'http://localhost:3900/books/' + id,
            data: {
                'token': token,
            },
            dataType: "json",
            success: function (response) {
                if (response.status) {
                    getBooks()
                }
            },
            error: function (XHR, textStatus, errorThrown) {
                console.log(XHR, textStatus, errorThrown);
            }
        })
    }

    function getBooks() {
        $.ajax({
            type: "GET",
            url: 'http://localhost:3900/books',
            dataType: "json",
            success: function (response) {
                let books = response.books
                let divMain = $("#booksList")
                divMain.html('')
                for (let i = 0; i < books.length; i++) {
                    let libro = $(`
                    <div class="card">
                        <div class="row no-gutters">
                            <div class="col-md-4">
                                <img src="http://data.ecasals.net/img/04/g/9788498258097_04_g.jpg"
                                    class="card-img img-fluid">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body d-flex flex-column">
                                    <div>
                                        <p class="card-text">
                                            <small class="text-muted">${books[i].isbn}</small>
                                        </p>
                                        <h1>${books[i].title}</h1>
                                        <h6><strong>Autor:</strong>${books[i].author}</h6>
                                    </div>
                                    <div class="d-flex bd-highlight mb-3 mt-auto">
                                        <div class="p-2 bd-highlight">
                                            <p class="card-text">
                                                <small class="text-muted"><strong>Fecha de
                                                        publicación:</strong>${books[i].release_date}</small>
                                            </p>
                                            <p class="card-text">
                                                <small class="text-muted"><strong>Creador: </strong>${books[i].name}</small>
                                            </p>
                                        </div>
                                        <div class="ml-auto p-2 bd-highlight">
                                            <a data-book="${books[i].id}" class="btn btn-danger deleteBook" href="#">Borrar</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br>
                    `);
                    divMain.append(libro.clone());
                }
                $('.deleteBook').click(deleteBook);
                //console.log(libro);
            },
            error: function (XHR, textStatus, errorThrown) {
                console.log(XHR, textStatus, errorThrown);
            }
        })
    }
});