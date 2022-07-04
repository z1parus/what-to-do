const darkBlock = document.querySelector(".dark-block")
const newHintBlock = document.querySelector(".new-hint-block")
const newHintBtn = document.querySelector("#newHintBtn")
const settingsBlockBtn = document.querySelector("#settingsBtn")


// BLOCKS TO SHOW AND HIDE

function CloseNewHint() {
    $(' .dark-block ').hide(500, () => {
        darkBlock.classList.add("disabled-block");
    });
    
    $(' .new-hint-block ').hide(500, () => {
        newHintBlock.classList.add("disabled-block");
    });
    
}

function NewHint() {

    $(' .dark-block ').show(500, () => {
        darkBlock.classList.remove("disabled-block");
    });

    $(' .new-hint-block ').show(500, () => {
        newHintBlock.classList.remove("disabled-block");
    });

    darkBlock.addEventListener("click", () => {
        CloseNewHint()
    })
}

function CloseSettings () {
    $(' .dark-block ').hide(500, () => {
        // darkBlock.classList.add("disabled-block");
    });
    
    $(' .settings-block ').hide(500, () => {
        // newHintBlock.classList.add("disabled-block");
    });
}

function OpenSettings() {

        $(' .dark-block ').show(500, () => {
            // darkBlock.classList.remove("disabled-block");
        });
    
        $(' .settings-block ').show(500, () => {
            // newHintBlock.classList.remove("disabled-block");
        });
    
        darkBlock.addEventListener("click", () => {
            CloseSettings()
        })
}


newHintBtn.addEventListener("click", () => {
    NewHint()
})

settingsBlockBtn.addEventListener("click", () => {
    OpenSettings()
})


// REQUESTS TO UPDATE AND CREATE HINTS

const hintTitle = document.querySelector('.new-hint-title-input');
const hintDateTo = document.querySelector('.new-hint-date-to-input');
const hintCB1 = document.querySelector('#cb1');
const hintCB2 = document.querySelector('#cb2');
const hintCB3 = document.querySelector('#cb3');
const hintCB4 = document.querySelector('#cb4');
const hintCB5 = document.querySelector('#cb5');
const createHintBtn = document.querySelector('.new-hint-button-go');

const requestURL = '/createnewhint/';

$.(' #createBtn ').click( () => {
    console.log('wtf');
    let titleVal = hintTitle.value;
    let dateTo = hintDateTo.value;
    let cb1 = hintCB1.value;
    let cb2 = hintCB2.value;
    let cb3 = hintCB3.value;
    let cb4 = hintCB4.value;
    let cb5 = hintCB5.value;
    let csrftoken = $('input[name=csrfmiddlewaretoken]').val();


    $.ajax({
        headers: {"X-CSRFToken": csrftoken},

        type: "POST",
        url: requestURL,
        data: {
            'title': titleVal,
            'date_to': dateTo,
            'cb1': cb1,
            'cb2': cb2,
            'cb3': cb3,
            'cb4': cb4,
            'cb5': cb5
        }
    });

    console.log(titleVal, dateTo, cb1, cb2, cb3, cb4, cb5);
});
);