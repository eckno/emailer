const regform = document.getElementById("regform");
regform.addEventListener("submit", (e) => {
    e.preventDefault();
    $("#btnSub").html("loading...");
    //
    if(regform['auth'].value != regform['authv'].value){
        $("#btnSub").html("Sign Up");
        return;
    }
    const data = {
        email: regform['email'].value,
        name: regform['fname'].value,
        password: regform['auth'].value
    }
    //
    $.ajax({
        type: "POST",
        url: "/create_account",
        dataType: "JSON",
        data: data,
        success: function(resp){
            alert(resp.data['message']);
            regform.reset();
            $("#btnSub").html("Sign Up");
            //
            location.href ="/";
        },
        error: function(err){
            $("#btnSub").html("Sign Up");
            console.log(err);
        }
    })
})