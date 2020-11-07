$(function() {
    init()
    function init() {
        $("#msgSuccess").hide();
        $("#msgFail").hide();
        $("#msgFailLogin").hide();
        $('#login').click(logIn);
        $('#signin').click(signIn);
    }

    function logIn() {
        let email = $("#email").val();
        let password = $("#password").val();
        $.ajax({
            type: "POST",
            url: 'http://localhost:3900/auth/login',
            data: {
                'email' : email,
                'password' : password
            }, 
            dataType: "json",
            success: function (response) {
                console.log(response);
                sessionStorage.setItem('token', response.token);
                window.open('books.html' , '_self')
            },
            error: function ( XHR, textStatus, errorThrown) {
                $("#msgFailLogin").show();
            }
        })
    }

    function signIn() {
        let email = $("#emailSign").val();
        let password = $("#passwordSign").val();
        let name = $("#name").val();
        $.ajax({
            type: "POST",
            url: 'http://localhost:3900/auth/register',
            data: {
                'email' : email,
                'password' : password,
                'name' : name
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
            error: function ( XHR, textStatus, errorThrown) {
                $("#msgFail").show();
                setTimeout(() => {
                    $("#msgFail").hide();
                }, 3000)
            }
        })
    }
});