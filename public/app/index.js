$("#login-form").off('submit').on('submit', (e) => {
    e.preventDefault();
    do_form_submit("login-form");
});

$("#smtp-add-form").off('submit').on('submit', (e) => {
    e.preventDefault();
    do_form_submit("smtp-add-form");
});