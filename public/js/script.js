$(document).ready(function() {
    $('#cart_icon').popover();

    $('#calendar').fullCalendar({
        header: {
            left: 'month, agendaWeek, agendaDay',
            center: 'title',
            right: 'today prev,next'

        },
        theme: true
    });

    


});

function toastInfo(string) {
    toastr.info(string);
};

function toastWarning(string) {
    toastr.warning(string);
};

function toastSuccess(string) {
    toastr.success(string);
};

function toastError(string) {
    toastr.error(string);
};

function addToCart(item_id) {
    	console.log(item_id);
        $.post("/", {
            itemId: item_id, addToCart: 'true'
        }, function(result) {
            console.log('result');
        });
    };
