function display_error(errors, redirect_url = ""){
    Swal.fire({
        title: '<div class="error_s"><strong>ERROR !!</strong></div>',
        html: errors,
        showCloseButton: false,
        showCancelButton: false,
        focusConfirm: false
    })
    .then(() => {
        if(redirect_url !== ""){
            window.location.href = redirect_url;
        }
    })

}

function display_success(msg, redirect_url = ""){
    Swal.fire({
        title: '<div class="success_"><strong>SUCCESS <i class="fa fa-check"></i></strong></div>',
        html: `<div class='error_block'>${msg}</div>`,
        showCloseButton: false,
        showCancelButton: false,
        focusConfirm: false,
        confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> Great!',
        confirmButtonAriaLabel: 'Thumbs up, great!',
    })
    .then(() => {
        if(redirect_url !== ""){
            window.location.href = redirect_url;
        }
    })

}


function do_form_submit(target_form_id, action, callback_function) {
    var submit_url = $('#' + target_form_id).attr("action");
    var form_data = $('#' + target_form_id).serializeArray();

    // if (!_.isUndefined(action) && !_.isEmpty(action)) {
    //     form_data.push({
    //         name: 'action',
    //         value: action
    //     });
    // }
    $('#' + target_form_id).waitMe({
        effect : 'bounce',
        text : '',
        color : "#000",
        maxSize : '',
        waitTime : -1,
        textPos : 'vertical',
        fontSize : '',
        source : '',
    })

    $.ajax({
        type: "POST",
        url: submit_url,
        dataType: "JSON",
        data: form_data,
        success: function (res) {

            $('#' + target_form_id).waitMe("hide");

            $(`#${target_form_id}`).trigger('reset');

                let redirect_url = "", msg = "";
                
                if (typeof res.data !== "undefined") {
                    redirect_url = (res.data.redirect_url  && typeof res.data.redirect_url === "string") ? res.data.redirect_url : "";
                    msg = res.data.msg ? res.data.msg : "";
                }

                display_success(msg, redirect_url);
        },
        error: function (responseError) {
            $('#' + target_form_id).waitMe("hide");

            let redirect_url = "", error = "";
                
                if (responseError.hasOwnProperty('responseJSON') && responseError.responseJSON.hasOwnProperty('errors')) {
                    redirect_url = (responseError.responseJSON && responseError.responseJSON.errors.redirect_url) ? responseError.responseJSON.errors.redirect_url : "";
                    let errors = (responseError.responseJSON && responseError.responseJSON.errors) ? responseError.responseJSON.errors : "";
                    if(errors !== "" && typeof(errors) == 'object'){
                        let error_mock = "";
                        for(var error_ in errors){
                            if(error_ === 'redirect_url'){ continue; }
                            const error_temp = `<div class='error_list'><i class="fa fa-info-circle" style='color:red; padding-right:5px;'></i>${errors[error_]}</div>`;

                            error_mock += error_temp;
                        }
                        error = error_mock;
                    }
                    else{
                        error = `<div class='error_list'><i class="fa fa-info-circle" style='color:red; padding-right:5px;'></i>${(responseError.responseJSON && responseError.responseJSON.errors) ? responseError.responseJSON.errors : ""}</div>`;
                    }
                }

                display_error(error, redirect_url);
        }
    });
}