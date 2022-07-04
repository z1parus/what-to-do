const darkBlock = document.querySelector(".dark-block")
const newHintBlock = document.querySelector(".new-hint-block")
const newHintBtn = document.querySelector("#newHintBtn")
const settingsBlockBtn = document.querySelector("#settingsBtn")


const mainSpace = document.querySelector('.main-space')
const logo = document.querySelector('.logo')


window.onscroll = () =>{
    let body = window.pageYOffset
    console.log(body) 
    console.log(Window.getComputedStyle) 
    console.log(mainSpace.offsetTop) 
    
    if (body >= mainSpace.offsetTop) {
        console.log('SHIT') 
        logo.style.display = 'none'
    }else if (body < mainSpace.offsetTop) {
        logo.style.display = 'flex'
    }   
}

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


// REQUEST TO LOAD USER'S HINTS FROM DATABASE



// Здесь я вешаю на кнопку настроек событие клика для теста получения jsonResponse от сервера;



window.onload = () => {

    

    let requestURLtoLoadHints = '/loadhints/'

    $.get(requestURLtoLoadHints, (data) => { 
        
        let markBtnsDict = []
        console.log(data);
    
        // Мы получили список всех заметок пользователя и теперь нам нужно пройтись по полученному списку и
        // вывести каждый элемент на страницу кабинета пользователя;
        function AddHintsToScreen(data) {
            // let testVar = Object.keys(data)[1];
            // console.log(testVar)
            // console.log(data[testVar]["date_to"]);


            for (let g = (Object.keys(data).length - 1 ); g != -1; g--) {

       
                
                let dataObj = Object.keys(data)[g];


                let titleVal = data[dataObj]["hint_title"];
                let dateTo = data[dataObj]["date_to"];
                let cb1 = data[dataObj]["cb1"];
                let cb2 = data[dataObj]["cb2"];
                let cb3 = data[dataObj]["cb3"];
                let cb4 = data[dataObj]["cb4"];
                let cb5 = data[dataObj]["cb5"];
                let hintDateCreate = data[dataObj]["create_date"];
                let hintIsMarked = data[dataObj]["is_marked"];
                let hintID = data[dataObj]["id"];
                let hintIsArchived = data[dataObj]["is_archived"];
    
   
                let neededDate = 0
                function CheckHintsDate() {
    
                    let dayTitleBlocks = document.querySelectorAll(".day-title-p");
     
        
                    // Сверяем дату в каждом .day-title с текущей датой и берем подходящий;
                    
                    for (let t = (dayTitleBlocks.length - 1 ); t > -1 || t != -1 ; t--) {
      
                        if (dayTitleBlocks[t].textContent == hintDateCreate) {
              
                            neededDate = dayTitleBlocks[t];
               
                            break
                        }else{
      
                            neededDate = 2;
                        };  
                    };
                }
    
                CheckHintsDate();

    
                let neededDateParent = 0;
                    if ( neededDate != 2 && neededDate != 0) {
                    neededDateParent = neededDate.parentNode;

                    neededDateParent = neededDateParent.parentNode;
  
                }
                if ( hintIsArchived == 1 ) {
                    continue;
                }
                // Добавляем в нужный блок с классом each-day заметку(использую JQuery);
    
                if ( neededDate != 2) {
    
                
                    if (hintIsMarked == 0) {
                        let newFixedHintHtml = ('<div class="hint">\r\n<p class="hint-title">' + titleVal + '</p>\r\n<p class="date-complete">До: <span class="hint-date">' + dateTo + '</span></p>\r\n<div class="hint-buttons">\r\n<img src="/static/img/archive-blue.png" alt="" class="btn-hint archiveBtn" id="archiveBtn'+ g +'">\r\n<img src="/static/img/dump-blue.png" alt="" class="btn-hint dumpBtn" id="dumpBtn'+ g +'">\r\n<img src="/static/img/star-blue.png" alt="" class="btn-hint markBtn" id="markBtn'+ g +'">\r\n<img src="/static/img/pencil-blue.png" alt="" class="btn-hint editBtn" id="editBtn'+ g +'">\r\n</div>\r\n<div class="checkboxes">\r\n<ul>\r\n<li class="checkbox">'+cb1+'</li>\r\n<li class="checkbox">'+cb2+'</li>\r\n<li class="checkbox">'+cb3+'</li>\r\n<li class="checkbox">'+cb4+'</li>\r\n<li class="checkbox">'+cb5+'</li>\r\n</ul>\r\n</div>\r\n</div>\r\n \r\n');
                    $(newFixedHintHtml).appendTo(neededDateParent);
                    }

                    if (hintIsMarked == 1) {
                        let newFixedHintHtml = ('<div class="hint marked">\r\n<p class="hint-title">' + titleVal + '</p>\r\n<p class="date-complete">До: <span class="hint-date">' + dateTo + '</span></p>\r\n<div class="hint-buttons">\r\n<img src="/static/img/archive-color.png" alt="" class="btn-hint archiveBtn" id="archiveBtn'+ g +'">\r\n<img src="/static/img/dump-color.png" alt="" class="btn-hint dumpBtn" id="dumpBtn'+ g +'">\r\n<img src="/static/img/star-yellow.png" alt="" class="btn-hint markBtn" id="markBtn'+ g +'">\r\n<img src="/static/img/pencil-color.png" alt="" class="btn-hint editBtn" id="editBtn'+ g +'">\r\n</div>\r\n<div class="checkboxes">\r\n<ul>\r\n<li class="checkbox">'+cb1+'</li>\r\n<li class="checkbox">'+cb2+'</li>\r\n<li class="checkbox">'+cb3+'</li>\r\n<li class="checkbox">'+cb4+'</li>\r\n<li class="checkbox">'+cb5+'</li>\r\n</ul>\r\n</div>\r\n</div>\r\n \r\n');
                    $(newFixedHintHtml).appendTo(neededDateParent);
                    }
                    
    
                };
    
                // Если нужной даты не находится, то добавляем новый блок each-day блок с новой заметкой;
    
                if ( neededDate == 2 ||  neededDate == 0 ) {

                    if (hintIsMarked == 0){
                        let allHintsBlock = document.querySelector('.hints');
                        let newEachDayBlock = ('<div class="each-day">\r\n \r\n<div class="day-title">\r\n<p class="day-title-p" >' + hintDateCreate + '</p>\r\n</div>\r\n \r\n<div class="hint">\r\n<p class="hint-title">' + titleVal + '</p>\r\n<p class="date-complete">До: <span class="hint-date">' + dateTo + '</span></p>\r\n<div class="hint-buttons">\r\n<img src="/static/img/archive-blue.png" alt="" class="btn-hint archiveBtn" id="archiveBtn'+ g +'">\r\n<img src="/static/img/dump-blue.png" alt="" class="btn-hint dumpBtn" id="dumpBtn'+ g +'">\r\n<img src="/static/img/star-blue.png" alt="" class="btn-hint markBtn" id="markBtn'+ g +'">\r\n<img src="/static/img/pencil-blue.png" alt="" class="btn-hint editBtn" id="editBtn'+ g +'">\r\n</div>\r\n<div class="checkboxes">\r\n<ul>\r\n<li class="checkbox">'+cb1+'</li>\r\n<li class="checkbox">'+cb2+'</li>\r\n<li class="checkbox">'+cb3+'</li>\r\n<li class="checkbox">'+cb4+'</li>\r\n<li class="checkbox">'+cb5+'</li>\r\n</ul>\r\n</div>\r\n</div>\r\n \r\n</div>');
                    
                        $(newEachDayBlock).appendTo(allHintsBlock);
                    }

                    if (hintIsMarked == 1) {
                        let allHintsBlock = document.querySelector('.hints');
                        let newEachDayBlock = ('<div class="each-day">\r\n \r\n<div class="day-title">\r\n<p class="day-title-p" >' + hintDateCreate + '</p>\r\n</div>\r\n \r\n<div class="hint marked">\r\n<p class="hint-title">' + titleVal + '</p>\r\n<p class="date-complete">До: <span class="hint-date">' + dateTo + '</span></p>\r\n<div class="hint-buttons">\r\n<img src="/static/img/archive-color.png" alt="" class="btn-hint archiveBtn" id="archiveBtn'+ g +'">\r\n<img src="/static/img/dump-color.png" alt="" class="btn-hint dumpBtn" id="dumpBtn'+ g +'">\r\n<img src="/static/img/star-yellow.png" alt="" class="btn-hint markBtn" id="markBtn'+ g +'">\r\n<img src="/static/img/pencil-color.png" alt="" class="btn-hint editBtn" id="editBtn'+ g +'">\r\n</div>\r\n<div class="checkboxes">\r\n<ul>\r\n<li class="checkbox">'+cb1+'</li>\r\n<li class="checkbox">'+cb2+'</li>\r\n<li class="checkbox">'+cb3+'</li>\r\n<li class="checkbox">'+cb4+'</li>\r\n<li class="checkbox">'+cb5+'</li>\r\n</ul>\r\n</div>\r\n</div>\r\n \r\n</div>');
                    
                        $(newEachDayBlock).appendTo(allHintsBlock);
                    }
    
                    
    
                };

                

                // SETTINGS SYSTEM

                // Change Email

                let changeEmailInput = document.querySelector('.change-email-input')
                let changeEmailBtn = document.querySelector('.change-email-btn')
                let settingsBtn = document.querySelector('#settingsBtn');
                let requestURLtoGetUserEmail = '/getemailurl/'
                let requestURLtoChangeEmail = '/changeemail/'
                let useremail = ''
                let csrftoken = $('input[name=csrfmiddlewaretoken]').val();

                settingsBtn.addEventListener('click', () => {
                    $.get(requestURLtoGetUserEmail, (data) => {
                        useremail = data;
                        changeEmailInput.value = useremail;
                    });

                    
                })

                changeEmailBtn.addEventListener('click', () => {
                    $.ajax({
                        headers: {"X-CSRFToken": csrftoken},
            
                        type: "POST",
                        url: requestURLtoChangeEmail,
                        data: {
                            'email': changeEmailInput.value
                        }
                    });
                    window.location.reload();
                })

                // Change Password

                let passwordEditInput1 = document.querySelector('.change-password-input')
                let passwordEditInput2 = document.querySelector('.change-password-input2')
                let changePassBtn = document.querySelector('.change-password-btn')
                let requestURLtoChangePass = '/changepass/'

                changePassBtn.addEventListener('click', () => {
                    if (passwordEditInput1.value == passwordEditInput2.value) {
                        $.ajax({
                            headers: {"X-CSRFToken": csrftoken},
                
                            type: "POST",
                            url: requestURLtoChangePass,
                            data: {
                                'password': passwordEditInput1.value
                            }
                        });
                        window.location.reload();
                    }else{
                        alert('Пароли должны быть одинаковы!')
                    }
                })

                // SYSTEM TO EDIT THE HINT

                let editBtn = document.querySelector("#editBtn"+g)
                // let requestURLtoArchiveHint = '/archivehint/'
                // let requestURLtoUnArchiveHint = '/unarchivehint/'

                editBtn.addEventListener('click', () => {
                    let editHintBlock = document.querySelector(".edit-hint-block")
                    let neededHintBtnsBlock = ((editBtn.parentNode).parentNode).querySelector(".hint-buttons")
                    let neededHintBtnArchive = neededHintBtnsBlock.querySelector(".archiveBtn")
                    let neededHintBtnDump = neededHintBtnsBlock.querySelector(".dumpBtn")
                    let neededHintBtnMark = neededHintBtnsBlock.querySelector(".markBtn")
                    let neededHintBtnEdit = neededHintBtnsBlock.querySelector(".editBtn")
                    let neededHintBlock = ((editBtn.parentNode).parentNode)
                    let neededHintTitle = ((editBtn.parentNode).parentNode).querySelector(".hint-title").textContent
                    let neededHintCreateDate = ((editBtn.parentNode).parentNode).querySelector(".hint-date").textContent
                    let neededEachBlock = ((editBtn.parentNode).parentNode).parentNode
                    let csrftoken = $('input[name=csrfmiddlewaretoken]').val();
                    let requestURLtoEditHint = '/edithint/'

                    // Поля формы изменения заметки с подставленными значениями

                    let titleEditInput = document.querySelector('.edit-hint-title-input')
                    let dateToEditInput = document.querySelector('.edit-hint-date-to-input')
                    let cb1Edit = document.querySelector('#editcb1')
                    let cb2Edit = document.querySelector('#editcb2')
                    let cb3Edit = document.querySelector('#editcb3')
                    let cb4Edit = document.querySelector('#editcb4')
                    let cb5Edit = document.querySelector('#editcb5')

                    titleEditInput.value = neededHintTitle
                    dateToEditInput.value = neededHintTitle
                    // cb1Edit.value = neededHintCreateDate
                    // cb2Edit.value = neededHintTitle
                    // cb3Edit.value = neededHintTitle
                    // cb4Edit.value = neededHintTitle
                    // cb5Edit.value = neededHintTitle

                    // Вывод окна редактирования

                    $('.dark-block ').show(500, () => {
                        darkBlock.classList.remove("disabled-block");
                    });
                
                    $('.edit-hint-block ').show(500, () => {
                        editHintBlock.classList.remove("disabled-block");
                    });
                
                    darkBlock.addEventListener("click", () => {
                        $('.dark-block ').hide(500, () => {
                            darkBlock.classList.add("disabled-block");
                        });
                        
                        $('.edit-hint-block ').hide(500, () => {
                            editHintBlock.classList.add("disabled-block");
                        });
                    })

                    // Отправка данных с формы для изменения данных заметки на сервер

                    editGoBtn = document.querySelector('#editHintBtn')

                    editGoBtn.addEventListener('click', () => {

                    if (titleEditInput.value == null || titleEditInput.value == '' || dateToEditInput.value == null || dateToEditInput.value == '') {
                        alert('Заполните название заметки и дату окончания!' )

                    }else if ((titleEditInput.value).length > 64 || (cb1Edit.value).length > 64 || (cb2Edit.value).length > 64 || (cb3Edit.value).length > 64 || (cb4Edit.value).length > 64 || (cb5Edit.value).length > 64) {

                        alert('В названии заметки и подзадач не должно быть больше 64 символов!')
                        
                    }else{
                        let hintEditedTitle = titleEditInput.value
                        let hintEditedDateTo = dateToEditInput.value
                        let hintEditedCB1 = cb1Edit.value
                        let hintEditedCB2 = cb2Edit.value
                        let hintEditedCB3 = cb3Edit.value
                        let hintEditedCB4 = cb4Edit.value
                        let hintEditedCB5 = cb5Edit.value

                        $.ajax({
                            headers: {"X-CSRFToken": csrftoken},
                
                            type: "POST",
                            url: requestURLtoEditHint,
                            data: {
                                'title': hintEditedTitle,
                                'date_to': hintEditedDateTo,
                                'cb1': hintEditedCB1,
                                'cb2': hintEditedCB2,
                                'cb3': hintEditedCB3,
                                'cb4': hintEditedCB4,
                                'cb5': hintEditedCB5,
                                'hint_id': hintID,
                            }
                        });
                        window.location.reload();
                    }
                })
            })     
                        
                    
                

                // SYSTEM TO ARCHIVE THE HINT

                let archiveBtn = document.querySelector("#archiveBtn"+g)
                let requestURLtoArchiveHint = '/archivehint/'
                let requestURLtoUnArchiveHint = '/unarchivehint/'

                archiveBtn.addEventListener('click', () => {
                    let neededHintBtnsBlock = ((archiveBtn.parentNode).parentNode).querySelector(".hint-buttons")
                    let neededHintBtnArchive = neededHintBtnsBlock.querySelector(".archiveBtn")
                    let neededHintBtnDump = neededHintBtnsBlock.querySelector(".dumpBtn")
                    let neededHintBtnMark = neededHintBtnsBlock.querySelector(".markBtn")
                    let neededHintBtnEdit = neededHintBtnsBlock.querySelector(".editBtn")
                    let neededHintBlock = ((archiveBtn.parentNode).parentNode)
                    let neededHintTitle = ((archiveBtn.parentNode).parentNode).querySelector(".hint-title").textContent
                    let neededHintCreateDate = ((archiveBtn.parentNode).parentNode).querySelector(".hint-date").textContent
                    let neededEachBlock = ((archiveBtn.parentNode).parentNode).parentNode
                    let csrftoken = $('input[name=csrfmiddlewaretoken]').val();

                    $.get(requestURLtoUnArchiveHint,data={'title': neededHintTitle, 'date_to': neededHintCreateDate}, (data) => {

                        if (data == 0 ) {

                            if (neededEachBlock.querySelectorAll(".hint").length == 1) {
                                console.log(neededEachBlock)
                                neededEachBlock.remove();
                                
                                $.ajax({
                                    headers: {"X-CSRFToken": csrftoken},
                        
                                    type: "POST",
                                    url: requestURLtoArchiveHint,
                                    data: {
                                        'title': neededHintTitle,
                                        'date_to': neededHintCreateDate,
                                    }
                                });
                            }
                            if (neededEachBlock.querySelectorAll(".hint").length > 1) {
                                neededHintBlock.remove(); 

                                $.ajax({
                                    headers: {"X-CSRFToken": csrftoken},
                        
                                    type: "POST",
                                    url: requestURLtoArchiveHint,
                                    data: {
                                        'title': neededHintTitle,
                                        'date_to': neededHintCreateDate,
                                    }
                                });
                             };
                        }

                        if (data == 1 ) {

                            $.ajax({
                                headers: {"X-CSRFToken": csrftoken},
                    
                                type: "POST",
                                url: requestURLtoUnArchiveHint,
                                data: {
                                    'title': neededHintTitle,
                                    'date_to': neededHintCreateDate,
                                }
                            });  

                        }
                        }, 'json');    
                })    
                
                // SHOWING HIDEN CHECKBOXES
                let dumpBtnForCheckboxes = document.querySelector("#dumpBtn"+g)
                let neededHintBlock = ((dumpBtnForCheckboxes.parentNode).parentNode)
                let openedCheckboxBlock = 0

                neededHintBlock.addEventListener('click', () => {
                    let neededHintBtnsBlock = ((dumpBtn.parentNode).parentNode).querySelector(".hint-buttons")
                    let neededHintBtnArchive = neededHintBtnsBlock.querySelector(".archiveBtn")
                    let neededHintBtnDump = neededHintBtnsBlock.querySelector(".dumpBtn")
                    let neededHintBtnMark = neededHintBtnsBlock.querySelector(".markBtn")
                    let neededHintBtnEdit = neededHintBtnsBlock.querySelector(".editBtn")
                    let neededHintTitle = ((dumpBtn.parentNode).parentNode).querySelector(".hint-title").textContent
                    let neededHintCreateDate = ((dumpBtn.parentNode).parentNode).querySelector(".hint-date").textContent
                    let neededEachBlock = ((dumpBtn.parentNode).parentNode).parentNode
                    let CheckboxBlock = neededHintBlock.querySelector('.checkboxes')
                    


                
                    if (openedCheckboxBlock == 0) {
                        
                        CheckboxBlock.style.display = 'block'
                        openedCheckboxBlock++ 
                        
                    }else {
                        CheckboxBlock.style.display = 'none'
                        openedCheckboxBlock-- 
                    }


                })

                // SYSTEM TO DELETE THE HINT

                let requestURLtoRemoveHint = '/removehint/'
                let dumpBtn = document.querySelector("#dumpBtn"+g)

                dumpBtn.addEventListener('click', () => {
                    let neededHintBtnsBlock = ((dumpBtn.parentNode).parentNode).querySelector(".hint-buttons")
                    let neededHintBtnArchive = neededHintBtnsBlock.querySelector(".archiveBtn")
                    let neededHintBtnDump = neededHintBtnsBlock.querySelector(".dumpBtn")
                    let neededHintBtnMark = neededHintBtnsBlock.querySelector(".markBtn")
                    let neededHintBtnEdit = neededHintBtnsBlock.querySelector(".editBtn")
                    let neededHintBlock = ((dumpBtn.parentNode).parentNode)
                    let neededHintTitle = ((dumpBtn.parentNode).parentNode).querySelector(".hint-title").textContent
                    let neededHintCreateDate = ((dumpBtn.parentNode).parentNode).querySelector(".hint-date").textContent
                    let neededEachBlock = ((dumpBtn.parentNode).parentNode).parentNode
                    let csrftoken = $('input[name=csrfmiddlewaretoken]').val();

                    if (neededEachBlock.querySelectorAll(".hint").length == 1) {
                        neededEachBlock.remove();
                        $.ajax({
                            headers: {"X-CSRFToken": csrftoken},
                
                            type: "POST",
                            url: requestURLtoRemoveHint,
                            data: {
                                'id': hintID
                            }
                        }); 
                    }

                    if (neededEachBlock.querySelectorAll(".hint").length > 1) {
                        neededHintBlock.remove();
                        $.ajax({
                            headers: {"X-CSRFToken": csrftoken},
                
                            type: "POST",
                            url: requestURLtoRemoveHint,
                            data: {
                                'id': hintID
                            }
                        }); 
                    }
                })
                
                // SYSTEM TO MARK AND UNMARK THE HINT AS IMPORTANT                

                let markBtn = document.querySelector("#markBtn"+g)
                markBtn.addEventListener('click', () => {
                    console.log(markBtn);
                    let neededHintBtnsBlock = ((markBtn.parentNode).parentNode).querySelector(".hint-buttons")
                    let neededHintBtnArchive = neededHintBtnsBlock.querySelector(".archiveBtn")
                    let neededHintBtnDump = neededHintBtnsBlock.querySelector(".dumpBtn")
                    let neededHintBtnMark = neededHintBtnsBlock.querySelector(".markBtn")
                    let neededHintBtnEdit = neededHintBtnsBlock.querySelector(".editBtn")
                    let neededHintBlock = ((markBtn.parentNode).parentNode)
                    let neededHintTitle = ((markBtn.parentNode).parentNode).querySelector(".hint-title").textContent
                    let neededHintCreateDate = ((markBtn.parentNode).parentNode).querySelector(".hint-date").textContent
                    let csrftoken = $('input[name=csrfmiddlewaretoken]').val();

                    let requestURLtoMarkHint = '/markhint/'
                    let requestURLtoUnMarkHint = '/unmarkhint/'
                
                    console.log(neededHintTitle, neededHintCreateDate)

                    $.get(requestURLtoUnMarkHint,data={'title': neededHintTitle, 'date_to': neededHintCreateDate}, (data) => {
                        
                        // Если нужная статья не помечена "Важной"(is_marked = 0), то помечаем;

                        if (data == 0 ) {

                            // В блоке кода ниже - динамически меняется внешний вид заметки

                            neededHintBlock.classList.add("marked")
                            neededHintBtnArchive.src = "/static/img/archive-color.png/"
                            neededHintBtnDump.src = "/static/img/dump-color.png/"
                            neededHintBtnMark.src = "/static/img/star-yellow.png/"
                            neededHintBtnEdit.src = "/static/img/pencil-color.png/"

                            // В блоке кода ниже - отправляется POST запрос для изменения у заметки статуса "is_marked" на 1

                            $.ajax({
                                headers: {"X-CSRFToken": csrftoken},
                    
                                type: "POST",
                                url: requestURLtoMarkHint,
                                data: {
                                    'title': neededHintTitle,
                                    'date_to': neededHintCreateDate,
                                }
                            });                         

                        }

                        if (data == 1 ) {

                            // В блоке кода ниже - динамически меняется внешний вид заметки

                            neededHintBlock.classList.remove("marked")
                            neededHintBtnArchive.src = "/static/img/archive-blue.png/"
                            neededHintBtnDump.src = "/static/img/dump-blue.png/"
                            neededHintBtnMark.src = "/static/img/star-blue.png/"
                            neededHintBtnEdit.src = "/static/img/pencil-blue.png/"

                            // В блоке кода ниже - отправляется POST запрос для изменения у заметки статуса "is_marked" на 0

                            $.ajax({
                                headers: {"X-CSRFToken": csrftoken},
                    
                                type: "POST",
                                url: requestURLtoUnMarkHint,
                                data: {
                                    'title': neededHintTitle,
                                    'date_to': neededHintCreateDate,
                                }
                            });  

                        }
                    }, 'json');
                    
                    


                })

                markBtnsDict.push(markBtn)
                console.log(markBtnsDict)
    
            };

        }

        AddHintsToScreen(data);
        
    
    }, 'json');

    // let markBtn = document.getElementsByClassName("markBtn")

    // console.log(markBtn)

    // markBtn.addEventListener('click', () => {
    //     console.log(markBtn.parentNode)

    // })

};




// REQUESTS TO CREATE HINTS

const hintTitle = document.querySelector('.new-hint-title-input');
const hintDateTo = document.querySelector('.new-hint-date-to-input');
const hintCB1 = document.querySelector('#cb1');
const hintCB2 = document.querySelector('#cb2');
const hintCB3 = document.querySelector('#cb3');
const hintCB4 = document.querySelector('#cb4');
const hintCB5 = document.querySelector('#cb5');
const createHintBtn = document.querySelector('.new-hint-button-go');

const requestURLtoCreateHint = '/createnewhint/';

createHintBtn.addEventListener('click', () => {
    console.log('wtf');
    let titleVal = hintTitle.value;
    let dateTo = hintDateTo.value;
    let cb1 = hintCB1.value;
    let cb2 = hintCB2.value;
    let cb3 = hintCB3.value;
    let cb4 = hintCB4.value;
    let cb5 = hintCB5.value;
    let csrftoken = $('input[name=csrfmiddlewaretoken]').val();

    // При соблюдении условия заполнения полей titleVal и dateTo - отправляем ajax POST запрос на сервер для занесения новой заметки в базу данных;

    if (titleVal == null || titleVal == '' || dateTo == null || dateTo == '') {
        alert('Введите название заметки и дату исполнения');
    }else{
        $.ajax({
            headers: {"X-CSRFToken": csrftoken},

            type: "POST",
            url: requestURLtoCreateHint,
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

        // После добавления новой заметки закрываем окно;

        CloseNewHint();
        let neededDate = 0;

        // Получаем текущую дату в формате dd.mm.yyyy;

        let date = new Date();
        let outputDate = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();
        console.log(outputDate);

        // Выбираем все блоки day-title-p в DOM;
        function CheckNewDate() {

            let dayTitleBlocks = document.querySelectorAll(".day-title-p");
            console.log(dayTitleBlocks)

        // Сверяем дату в каждом .day-title с текущей датой и берем подходящий;

            for (let i = (dayTitleBlocks.length - 1 ); i > -1 || i != -1 ; i--) {
                console.log(i);
                console.log(dayTitleBlocks[i].textContent);
                if (dayTitleBlocks[i].textContent == outputDate) {
                    console.log(dayTitleBlocks[i], outputDate)
                    neededDate = dayTitleBlocks[i];
                    console.log(neededDate);
                    break
                }else if (i == -1) {
                    console.log('ЭЛЗ ИФ И = -1')
                    neededDate = 2;
                };  
            };
        }

        CheckNewDate()

        // Если найден подходящий блок - ищем его родителя(блок с классом each-day);
        
        let neededDateParent = 0;
        if (! neededDate == 2 || ! neededDate == 0) {
            neededDateParent = neededDate.parentNode;
            neededDateParent = neededDateParent.parentNode;
        }

        // Добавляем в нужный блок с классом each-day новую заметку(использую JQuery);

        if (! neededDate == 2 || ! neededDate == 0) {

            

            let newFixedHintHtml = ('<div class="hint">\r\n<p class="hint-title">' + titleVal + '</p>\r\n<p class="date-complete">До: <span class="hint-date">' + dateTo + '</span></p>\r\n<div class="hint-buttons">\r\n<img src="/static/img/archive-blue.png" alt="" class="btn-hint archiveBtn">\r\n<img src="/static/img/dump-blue.png" alt="" class="btn-hint dumpBtn">\r\n<img src="/static/img/star-blue.png" alt="" class="btn-hint markBtn">\r\n<img src="/static/img/pencil-blue.png" alt="" class="btn-hint editBtn">\r\n</div>\r\n<div class="checkboxes">\r\n<ul>\r\n<li class="checkbox">'+cb1+'</li>\r\n<li class="checkbox">'+cb2+'</li>\r\n<li class="checkbox">'+cb3+'</li>\r\n<li class="checkbox">'+cb4+'</li>\r\n<li class="checkbox">'+cb5+'</li>\r\n</ul>\r\n</div>\r\n</div>\r\n \r\n');
            $(newFixedHintHtml).appendTo(neededDateParent);

        };

        // Если нужной даты не находится, то добавляем новый блок each-day блок с новой заметкой;

        if ( neededDate == 2 ||  neededDate == 0 ) {

            let allHintsBlock = document.querySelector('.hints');
            let newEachDayBlock = ('<div class="each-day">\r\n \r\n<div class="day-title">\r\n<p class="day-title-p" >' + outputDate + '</p>\r\n</div>\r\n \r\n<div class="hint">\r\n<p class="hint-title">' + titleVal + '</p>\r\n<p class="date-complete">До: <span class="hint-date">' + dateTo + '</span></p>\r\n<div class="hint-buttons">\r\n<img src="/static/img/archive-blue.png" alt="" class="btn-hint archiveBtn">\r\n<img src="/static/img/dump-blue.png" alt="" class="btn-hint dumpBtn">\r\n<img src="/static/img/star-blue.png" alt="" class="btn-hint markBtn">\r\n<img src="/static/img/pencil-blue.png" alt="" class="btn-hint editBtn">\r\n</div>\r\n<div class="checkboxes">\r\n<ul>\r\n<li class="checkbox">'+cb1+'</li>\r\n<li class="checkbox">'+cb2+'</li>\r\n<li class="checkbox">'+cb3+'</li>\r\n<li class="checkbox">'+cb4+'</li>\r\n<li class="checkbox">'+cb5+'</li>\r\n</ul>\r\n</div>\r\n</div>\r\n \r\n</div>');
            
            $(newEachDayBlock).appendTo(allHintsBlock);

        }
    }
    window.location.reload();
});

// REQUEST TO FILTER AS ARCHIVED

let filterArchivedBtn = document.querySelector('.archiveFilter')


filterArchivedBtn.addEventListener('click', () => {
    let allEachBlocks = document.querySelectorAll('.each-day')
    let requestURLtoFilterAsArchived = '/archivefilter/'
    console.log(allEachBlocks)
    allEachBlocks.forEach((element) => {
        element.remove()
    })

    $.get(requestURLtoFilterAsArchived, (data) => {
        for (let g = (Object.keys(data).length - 1 ); g != -1; g--) {

       
                
            let dataObj = Object.keys(data)[g];


            let titleVal = data[dataObj]["hint_title"];
            let dateTo = data[dataObj]["date_to"];
            let cb1 = data[dataObj]["cb1"];
            let cb2 = data[dataObj]["cb2"];
            let cb3 = data[dataObj]["cb3"];
            let cb4 = data[dataObj]["cb4"];
            let cb5 = data[dataObj]["cb5"];
            let hintDateCreate = data[dataObj]["create_date"];
            let hintIsMarked = data[dataObj]["is_marked"];
            let hintID = data[dataObj]["id"];
            let hintIsArchived = data[dataObj]["is_archived"];


            let neededDate = 0
            function CheckHintsDate() {

                let dayTitleBlocks = document.querySelectorAll(".day-title-p");
 
    
                // Сверяем дату в каждом .day-title с текущей датой и берем подходящий;
                
                for (let t = (dayTitleBlocks.length - 1 ); t > -1 || t != -1 ; t--) {
  
                    if (dayTitleBlocks[t].textContent == hintDateCreate) {
          
                        neededDate = dayTitleBlocks[t];
           
                        break
                    }else{
  
                        neededDate = 2;
                    };  
                };
            }

            CheckHintsDate();


            let neededDateParent = 0;
                if ( neededDate != 2 && neededDate != 0) {
                neededDateParent = neededDate.parentNode;

                neededDateParent = neededDateParent.parentNode;

            }
            
            // Добавляем в нужный блок с классом each-day заметку(использую JQuery);

            if ( neededDate != 2) {

            
                if (hintIsMarked == 0) {
                    let newFixedHintHtml = ('<div class="hint">\r\n<p class="hint-title">' + titleVal + '</p>\r\n<p class="date-complete">До: <span class="hint-date">' + dateTo + '</span></p>\r\n<div class="hint-buttons">\r\n<img src="/static/img/archive-blue.png" alt="" class="btn-hint archiveBtn" id="archiveBtn'+ g +'">\r\n\r\n</div>\r\n<div class="checkboxes">\r\n<ul>\r\n<li class="checkbox">'+cb1+'</li>\r\n<li class="checkbox">'+cb2+'</li>\r\n<li class="checkbox">'+cb3+'</li>\r\n<li class="checkbox">'+cb4+'</li>\r\n<li class="checkbox">'+cb5+'</li>\r\n</ul>\r\n</div>\r\n</div>\r\n \r\n');
                $(newFixedHintHtml).appendTo(neededDateParent);
                }

                if (hintIsMarked == 1) {
                    let newFixedHintHtml = ('<div class="hint marked">\r\n<p class="hint-title">' + titleVal + '</p>\r\n<p class="date-complete">До: <span class="hint-date">' + dateTo + '</span></p>\r\n<div class="hint-buttons">\r\n<img src="/static/img/archive-color.png" alt="" class="btn-hint archiveBtn" id="archiveBtn'+ g +'">\r\n\r\n</div>\r\n<div class="checkboxes">\r\n<ul>\r\n<li class="checkbox">'+cb1+'</li>\r\n<li class="checkbox">'+cb2+'</li>\r\n<li class="checkbox">'+cb3+'</li>\r\n<li class="checkbox">'+cb4+'</li>\r\n<li class="checkbox">'+cb5+'</li>\r\n</ul>\r\n</div>\r\n</div>\r\n \r\n');
                $(newFixedHintHtml).appendTo(neededDateParent);
                }
                

            };

            // Если нужной даты не находится, то добавляем новый блок each-day блок с новой заметкой;

            if ( neededDate == 2 ||  neededDate == 0 ) {

                if (hintIsMarked == 0){
                    let allHintsBlock = document.querySelector('.hints');
                    let newEachDayBlock = ('<div class="each-day">\r\n \r\n<div class="day-title">\r\n<p class="day-title-p" >' + hintDateCreate + '</p>\r\n</div>\r\n \r\n<div class="hint">\r\n<p class="hint-title">' + titleVal + '</p>\r\n<p class="date-complete">До: <span class="hint-date">' + dateTo + '</span></p>\r\n<div class="hint-buttons">\r\n<img src="/static/img/archive-blue.png" alt="" class="btn-hint archiveBtn" id="archiveBtn'+ g +'">\r\n\r\n</div>\r\n<div class="checkboxes">\r\n<ul>\r\n<li class="checkbox">'+cb1+'</li>\r\n<li class="checkbox">'+cb2+'</li>\r\n<li class="checkbox">'+cb3+'</li>\r\n<li class="checkbox">'+cb4+'</li>\r\n<li class="checkbox">'+cb5+'</li>\r\n</ul>\r\n</div>\r\n</div>\r\n \r\n</div>');
                
                    $(newEachDayBlock).appendTo(allHintsBlock);
                }

                if (hintIsMarked == 1) {
                    let allHintsBlock = document.querySelector('.hints');
                    let newEachDayBlock = ('<div class="each-day">\r\n \r\n<div class="day-title">\r\n<p class="day-title-p" >' + hintDateCreate + '</p>\r\n</div>\r\n \r\n<div class="hint marked">\r\n<p class="hint-title">' + titleVal + '</p>\r\n<p class="date-complete">До: <span class="hint-date">' + dateTo + '</span></p>\r\n<div class="hint-buttons">\r\n<img src="/static/img/archive-color.png" alt="" class="btn-hint archiveBtn" id="archiveBtn'+ g +'">\r\n\r\n</div>\r\n<div class="checkboxes">\r\n<ul>\r\n<li class="checkbox">'+cb1+'</li>\r\n<li class="checkbox">'+cb2+'</li>\r\n<li class="checkbox">'+cb3+'</li>\r\n<li class="checkbox">'+cb4+'</li>\r\n<li class="checkbox">'+cb5+'</li>\r\n</ul>\r\n</div>\r\n</div>\r\n \r\n</div>');
                
                    $(newEachDayBlock).appendTo(allHintsBlock);
                }

                
            }
                let archiveBtn = document.querySelector("#archiveBtn"+g)
                let requestURLtoArchiveHint = '/archivehint/'
                let requestURLtoUnArchiveHint = '/unarchivehint/'
                archiveBtn.addEventListener('click', () => {
                let neededHintBtnsBlock = ((archiveBtn.parentNode).parentNode).querySelector(".hint-buttons")
                let neededHintBtnArchive = neededHintBtnsBlock.querySelector(".archiveBtn")
                let neededHintBtnDump = neededHintBtnsBlock.querySelector(".dumpBtn")
                let neededHintBtnMark = neededHintBtnsBlock.querySelector(".markBtn")
                let neededHintBtnEdit = neededHintBtnsBlock.querySelector(".editBtn")
                let neededHintBlock = ((archiveBtn.parentNode).parentNode)
                let neededHintTitle = ((archiveBtn.parentNode).parentNode).querySelector(".hint-title").textContent
                let neededHintCreateDate = ((archiveBtn.parentNode).parentNode).querySelector(".hint-date").textContent
                let neededEachBlock = ((archiveBtn.parentNode).parentNode).parentNode
                let csrftoken = $('input[name=csrfmiddlewaretoken]').val();

                $.get(requestURLtoUnArchiveHint,data={'title': neededHintTitle, 'date_to': neededHintCreateDate}, (data) => {

                    if (data == 0 ) {

                        if (neededEachBlock.querySelectorAll(".hint").length == 1) {
                            console.log(neededEachBlock)
                            neededEachBlock.remove();
                            
                            $.ajax({
                                headers: {"X-CSRFToken": csrftoken},
                    
                                type: "POST",
                                url: requestURLtoArchiveHint,
                                data: {
                                    'title': neededHintTitle,
                                    'date_to': neededHintCreateDate,
                                }
                            });
                        }
                        if (neededEachBlock.querySelectorAll(".hint").length > 1) {
                            neededHintBlock.remove(); 

                            $.ajax({
                                headers: {"X-CSRFToken": csrftoken},
                    
                                type: "POST",
                                url: requestURLtoArchiveHint,
                                data: {
                                    'title': neededHintTitle,
                                    'date_to': neededHintCreateDate,
                                }
                            });
                         };
                    }

                    if (data == 1 ) {

                        $.ajax({
                            headers: {"X-CSRFToken": csrftoken},
                
                            type: "POST",
                            url: requestURLtoUnArchiveHint,
                            data: {
                                'title': neededHintTitle,
                                'date_to': neededHintCreateDate,
                            }
                        });  
                        neededHintBlock.remove();
                    }
                    }, 'json');    
            })
        };
    })
    
})

// REQUEST TO FILTER HINTS AS OUTDATED

let filterOutdatedBtn = document.querySelector('.outdatedFilter')

filterOutdatedBtn.addEventListener('click', () => {

    let allEachBlocks = document.querySelectorAll('.each-day')
    let requestURLtoFilterAsOutdated = '/outdatedfilter/'
    console.log(allEachBlocks)
    allEachBlocks.forEach((element) => {
        element.remove()
    })

        $.get(requestURLtoFilterAsOutdated, (data) => { 

                for (let g = (Object.keys(data).length - 1 ); g != -1; g--) {

                    console.log('ТУТАЧКЕ', g)
                    
                    let dataObj = Object.keys(data)[g];


                    let titleVal = data[dataObj]["hint_title"];
                    let dateTo = data[dataObj]["date_to"];
                    let cb1 = data[dataObj]["cb1"];
                    let cb2 = data[dataObj]["cb2"];
                    let cb3 = data[dataObj]["cb3"];
                    let cb4 = data[dataObj]["cb4"];
                    let cb5 = data[dataObj]["cb5"];
                    let hintDateCreate = data[dataObj]["create_date"];
                    let hintIsMarked = data[dataObj]["is_marked"];
                    let hintID = data[dataObj]["id"];
                    let hintIsArchived = data[dataObj]["is_archived"];
        
    
                    let neededDate = 0
                    function CheckHintsDate() {
        
                        let dayTitleBlocks = document.querySelectorAll(".day-title-p");
        
            
                        // Сверяем дату в каждом .day-title с текущей датой и берем подходящий;
                        
                        for (let t = (dayTitleBlocks.length - 1 ); t > -1 || t != -1 ; t--) {
        
                            if (dayTitleBlocks[t].textContent == hintDateCreate) {
                
                                neededDate = dayTitleBlocks[t];
                
                                break
                            }else{
        
                                neededDate = 2;
                            };  
                        };
                    }
        
                    CheckHintsDate();

        
                    let neededDateParent = 0;
                        if ( neededDate != 2 && neededDate != 0) {
                        neededDateParent = neededDate.parentNode;

                        neededDateParent = neededDateParent.parentNode;
    
                    }
                    if ( hintIsArchived == 1 ) {
                        continue;
                    }
                    // Добавляем в нужный блок с классом each-day заметку(использую JQuery);
        
                    if ( neededDate != 2) {
        
                    
                        if (hintIsMarked == 0) {
                            let newFixedHintHtml = ('<div class="hint">\r\n<p class="hint-title">' + titleVal + '</p>\r\n<p class="date-complete">До: <span class="hint-date">' + dateTo + '</span></p>\r\n<div class="hint-buttons">\r\n<img src="/static/img/archive-blue.png" alt="" class="btn-hint archiveBtn" id="archiveBtn'+ g +'">\r\n<img src="/static/img/dump-blue.png" alt="" class="btn-hint dumpBtn" id="dumpBtn'+ g +'">\r\n<img src="/static/img/star-blue.png" alt="" class="btn-hint markBtn" id="markBtn'+ g +'">\r\n<img src="/static/img/pencil-blue.png" alt="" class="btn-hint editBtn" id="editBtn'+ g +'">\r\n</div>\r\n<div class="checkboxes">\r\n<ul>\r\n<li class="checkbox">'+cb1+'</li>\r\n<li class="checkbox">'+cb2+'</li>\r\n<li class="checkbox">'+cb3+'</li>\r\n<li class="checkbox">'+cb4+'</li>\r\n<li class="checkbox">'+cb5+'</li>\r\n</ul>\r\n</div>\r\n</div>\r\n \r\n');
                        $(newFixedHintHtml).appendTo(neededDateParent);
                        }

                        if (hintIsMarked == 1) {
                            let newFixedHintHtml = ('<div class="hint marked">\r\n<p class="hint-title">' + titleVal + '</p>\r\n<p class="date-complete">До: <span class="hint-date">' + dateTo + '</span></p>\r\n<div class="hint-buttons">\r\n<img src="/static/img/archive-color.png" alt="" class="btn-hint archiveBtn" id="archiveBtn'+ g +'">\r\n<img src="/static/img/dump-color.png" alt="" class="btn-hint dumpBtn" id="dumpBtn'+ g +'">\r\n<img src="/static/img/star-yellow.png" alt="" class="btn-hint markBtn" id="markBtn'+ g +'">\r\n<img src="/static/img/pencil-color.png" alt="" class="btn-hint editBtn" id="editBtn'+ g +'">\r\n</div>\r\n<div class="checkboxes">\r\n<ul>\r\n<li class="checkbox">'+cb1+'</li>\r\n<li class="checkbox">'+cb2+'</li>\r\n<li class="checkbox">'+cb3+'</li>\r\n<li class="checkbox">'+cb4+'</li>\r\n<li class="checkbox">'+cb5+'</li>\r\n</ul>\r\n</div>\r\n</div>\r\n \r\n');
                        $(newFixedHintHtml).appendTo(neededDateParent);
                        }
                        
        
                    };
        
                    // Если нужной даты не находится, то добавляем новый блок each-day блок с новой заметкой;
        
                    if ( neededDate == 2 ||  neededDate == 0 ) {

                        if (hintIsMarked == 0){
                            let allHintsBlock = document.querySelector('.hints');
                            let newEachDayBlock = ('<div class="each-day">\r\n \r\n<div class="day-title">\r\n<p class="day-title-p" >' + hintDateCreate + '</p>\r\n</div>\r\n \r\n<div class="hint">\r\n<p class="hint-title">' + titleVal + '</p>\r\n<p class="date-complete">До: <span class="hint-date">' + dateTo + '</span></p>\r\n<div class="hint-buttons">\r\n<img src="/static/img/archive-blue.png" alt="" class="btn-hint archiveBtn" id="archiveBtn'+ g +'">\r\n<img src="/static/img/dump-blue.png" alt="" class="btn-hint dumpBtn" id="dumpBtn'+ g +'">\r\n<img src="/static/img/star-blue.png" alt="" class="btn-hint markBtn" id="markBtn'+ g +'">\r\n<img src="/static/img/pencil-blue.png" alt="" class="btn-hint editBtn" id="editBtn'+ g +'">\r\n</div>\r\n<div class="checkboxes">\r\n<ul>\r\n<li class="checkbox">'+cb1+'</li>\r\n<li class="checkbox">'+cb2+'</li>\r\n<li class="checkbox">'+cb3+'</li>\r\n<li class="checkbox">'+cb4+'</li>\r\n<li class="checkbox">'+cb5+'</li>\r\n</ul>\r\n</div>\r\n</div>\r\n \r\n</div>');
                        
                            $(newEachDayBlock).appendTo(allHintsBlock);
                        }

                        if (hintIsMarked == 1) {
                            let allHintsBlock = document.querySelector('.hints');
                            let newEachDayBlock = ('<div class="each-day">\r\n \r\n<div class="day-title">\r\n<p class="day-title-p" >' + hintDateCreate + '</p>\r\n</div>\r\n \r\n<div class="hint marked">\r\n<p class="hint-title">' + titleVal + '</p>\r\n<p class="date-complete">До: <span class="hint-date">' + dateTo + '</span></p>\r\n<div class="hint-buttons">\r\n<img src="/static/img/archive-color.png" alt="" class="btn-hint archiveBtn" id="archiveBtn'+ g +'">\r\n<img src="/static/img/dump-color.png" alt="" class="btn-hint dumpBtn" id="dumpBtn'+ g +'">\r\n<img src="/static/img/star-yellow.png" alt="" class="btn-hint markBtn" id="markBtn'+ g +'">\r\n<img src="/static/img/pencil-color.png" alt="" class="btn-hint editBtn" id="editBtn'+ g +'">\r\n</div>\r\n<div class="checkboxes">\r\n<ul>\r\n<li class="checkbox">'+cb1+'</li>\r\n<li class="checkbox">'+cb2+'</li>\r\n<li class="checkbox">'+cb3+'</li>\r\n<li class="checkbox">'+cb4+'</li>\r\n<li class="checkbox">'+cb5+'</li>\r\n</ul>\r\n</div>\r\n</div>\r\n \r\n</div>');
                        
                            $(newEachDayBlock).appendTo(allHintsBlock);
                        }
        
                        
        
                    };

                    

                    // SETTINGS SYSTEM

                    // Change Email

                    let changeEmailInput = document.querySelector('.change-email-input')
                    let changeEmailBtn = document.querySelector('.change-email-btn')
                    let settingsBtn = document.querySelector('#settingsBtn');
                    let requestURLtoGetUserEmail = '/getemailurl/'
                    let requestURLtoChangeEmail = '/changeemail/'
                    let useremail = ''
                    let csrftoken = $('input[name=csrfmiddlewaretoken]').val();

                    settingsBtn.addEventListener('click', () => {
                        $.get(requestURLtoGetUserEmail, (data) => {
                            useremail = data;
                            changeEmailInput.value = useremail;
                        });

                        
                    })

                    changeEmailBtn.addEventListener('click', () => {
                        $.ajax({
                            headers: {"X-CSRFToken": csrftoken},
                
                            type: "POST",
                            url: requestURLtoChangeEmail,
                            data: {
                                'email': changeEmailInput.value
                            }
                        });
                        window.location.reload();
                    })

                    // Change Password

                    let passwordEditInput1 = document.querySelector('.change-password-input')
                    let passwordEditInput2 = document.querySelector('.change-password-input2')
                    let changePassBtn = document.querySelector('.change-password-btn')
                    let requestURLtoChangePass = '/changepass/'

                    changePassBtn.addEventListener('click', () => {
                        if (passwordEditInput1.value == passwordEditInput2.value) {
                            $.ajax({
                                headers: {"X-CSRFToken": csrftoken},
                    
                                type: "POST",
                                url: requestURLtoChangePass,
                                data: {
                                    'password': passwordEditInput1.value
                                }
                            });
                            window.location.reload();
                        }else{
                            alert('Пароли должны быть одинаковы!')
                        }
                    })

                    // SYSTEM TO EDIT THE HINT

                    let editBtn = document.querySelector("#editBtn"+g)
                    // let requestURLtoArchiveHint = '/archivehint/'
                    // let requestURLtoUnArchiveHint = '/unarchivehint/'

                    editBtn.addEventListener('click', () => {
                        let editHintBlock = document.querySelector(".edit-hint-block")
                        let neededHintBtnsBlock = ((editBtn.parentNode).parentNode).querySelector(".hint-buttons")
                        let neededHintBtnArchive = neededHintBtnsBlock.querySelector(".archiveBtn")
                        let neededHintBtnDump = neededHintBtnsBlock.querySelector(".dumpBtn")
                        let neededHintBtnMark = neededHintBtnsBlock.querySelector(".markBtn")
                        let neededHintBtnEdit = neededHintBtnsBlock.querySelector(".editBtn")
                        let neededHintBlock = ((editBtn.parentNode).parentNode)
                        let neededHintTitle = ((editBtn.parentNode).parentNode).querySelector(".hint-title").textContent
                        let neededHintCreateDate = ((editBtn.parentNode).parentNode).querySelector(".hint-date").textContent
                        let neededEachBlock = ((editBtn.parentNode).parentNode).parentNode
                        let csrftoken = $('input[name=csrfmiddlewaretoken]').val();
                        let requestURLtoEditHint = '/edithint/'

                        // Поля формы изменения заметки с подставленными значениями

                        let titleEditInput = document.querySelector('.edit-hint-title-input')
                        let dateToEditInput = document.querySelector('.edit-hint-date-to-input')
                        let cb1Edit = document.querySelector('#editcb1')
                        let cb2Edit = document.querySelector('#editcb2')
                        let cb3Edit = document.querySelector('#editcb3')
                        let cb4Edit = document.querySelector('#editcb4')
                        let cb5Edit = document.querySelector('#editcb5')

                        titleEditInput.value = neededHintTitle
                        dateToEditInput.value = neededHintTitle
                        // cb1Edit.value = neededHintCreateDate
                        // cb2Edit.value = neededHintTitle
                        // cb3Edit.value = neededHintTitle
                        // cb4Edit.value = neededHintTitle
                        // cb5Edit.value = neededHintTitle

                        // Вывод окна редактирования

                        $('.dark-block ').show(500, () => {
                            darkBlock.classList.remove("disabled-block");
                        });
                    
                        $('.edit-hint-block ').show(500, () => {
                            editHintBlock.classList.remove("disabled-block");
                        });
                    
                        darkBlock.addEventListener("click", () => {
                            $('.dark-block ').hide(500, () => {
                                darkBlock.classList.add("disabled-block");
                            });
                            
                            $('.edit-hint-block ').hide(500, () => {
                                editHintBlock.classList.add("disabled-block");
                            });
                        })

                        // Отправка данных с формы для изменения данных заметки на сервер

                        editGoBtn = document.querySelector('#editHintBtn')

                        editGoBtn.addEventListener('click', () => {

                        if (titleEditInput.value == null || titleEditInput.value == '' || dateToEditInput.value == null || dateToEditInput.value == '') {
                            alert('Заполните название заметки и дату окончания!' )

                        }else if ((titleEditInput.value).length > 64 || (cb1Edit.value).length > 64 || (cb2Edit.value).length > 64 || (cb3Edit.value).length > 64 || (cb4Edit.value).length > 64 || (cb5Edit.value).length > 64) {

                            alert('В названии заметки и подзадач не должно быть больше 64 символов!')
                            
                        }else{
                            let hintEditedTitle = titleEditInput.value
                            let hintEditedDateTo = dateToEditInput.value
                            let hintEditedCB1 = cb1Edit.value
                            let hintEditedCB2 = cb2Edit.value
                            let hintEditedCB3 = cb3Edit.value
                            let hintEditedCB4 = cb4Edit.value
                            let hintEditedCB5 = cb5Edit.value

                            $.ajax({
                                headers: {"X-CSRFToken": csrftoken},
                    
                                type: "POST",
                                url: requestURLtoEditHint,
                                data: {
                                    'title': hintEditedTitle,
                                    'date_to': hintEditedDateTo,
                                    'cb1': hintEditedCB1,
                                    'cb2': hintEditedCB2,
                                    'cb3': hintEditedCB3,
                                    'cb4': hintEditedCB4,
                                    'cb5': hintEditedCB5,
                                    'hint_id': hintID,
                                }
                            });
                            window.location.reload();
                        }
                    })
                })     
                            
                        
                    

                    // SYSTEM TO ARCHIVE THE HINT

                    let archiveBtn = document.querySelector("#archiveBtn"+g)
                    let requestURLtoArchiveHint = '/archivehint/'
                    let requestURLtoUnArchiveHint = '/unarchivehint/'

                    archiveBtn.addEventListener('click', () => {
                        let neededHintBtnsBlock = ((archiveBtn.parentNode).parentNode).querySelector(".hint-buttons")
                        let neededHintBtnArchive = neededHintBtnsBlock.querySelector(".archiveBtn")
                        let neededHintBtnDump = neededHintBtnsBlock.querySelector(".dumpBtn")
                        let neededHintBtnMark = neededHintBtnsBlock.querySelector(".markBtn")
                        let neededHintBtnEdit = neededHintBtnsBlock.querySelector(".editBtn")
                        let neededHintBlock = ((archiveBtn.parentNode).parentNode)
                        let neededHintTitle = ((archiveBtn.parentNode).parentNode).querySelector(".hint-title").textContent
                        let neededHintCreateDate = ((archiveBtn.parentNode).parentNode).querySelector(".hint-date").textContent
                        let neededEachBlock = ((archiveBtn.parentNode).parentNode).parentNode
                        let csrftoken = $('input[name=csrfmiddlewaretoken]').val();

                        $.get(requestURLtoUnArchiveHint,data={'title': neededHintTitle, 'date_to': neededHintCreateDate}, (data) => {

                            if (data == 0 ) {

                                if (neededEachBlock.querySelectorAll(".hint").length == 1) {
                                    console.log(neededEachBlock)
                                    neededEachBlock.remove();
                                    
                                    $.ajax({
                                        headers: {"X-CSRFToken": csrftoken},
                            
                                        type: "POST",
                                        url: requestURLtoArchiveHint,
                                        data: {
                                            'title': neededHintTitle,
                                            'date_to': neededHintCreateDate,
                                        }
                                    });
                                }
                                if (neededEachBlock.querySelectorAll(".hint").length > 1) {
                                    neededHintBlock.remove(); 

                                    $.ajax({
                                        headers: {"X-CSRFToken": csrftoken},
                            
                                        type: "POST",
                                        url: requestURLtoArchiveHint,
                                        data: {
                                            'title': neededHintTitle,
                                            'date_to': neededHintCreateDate,
                                        }
                                    });
                                };
                            }

                            if (data == 1 ) {

                                $.ajax({
                                    headers: {"X-CSRFToken": csrftoken},
                        
                                    type: "POST",
                                    url: requestURLtoUnArchiveHint,
                                    data: {
                                        'title': neededHintTitle,
                                        'date_to': neededHintCreateDate,
                                    }
                                });  

                            }
                            }, 'json');    
                    })    
                    
                    // SHOWING HIDEN CHECKBOXES
                    let dumpBtnForCheckboxes = document.querySelector("#dumpBtn"+g)
                    let neededHintBlock = ((dumpBtnForCheckboxes.parentNode).parentNode)
                    let openedCheckboxBlock = 0

                    neededHintBlock.addEventListener('click', () => {
                        let neededHintBtnsBlock = ((dumpBtn.parentNode).parentNode).querySelector(".hint-buttons")
                        let neededHintBtnArchive = neededHintBtnsBlock.querySelector(".archiveBtn")
                        let neededHintBtnDump = neededHintBtnsBlock.querySelector(".dumpBtn")
                        let neededHintBtnMark = neededHintBtnsBlock.querySelector(".markBtn")
                        let neededHintBtnEdit = neededHintBtnsBlock.querySelector(".editBtn")
                        let neededHintTitle = ((dumpBtn.parentNode).parentNode).querySelector(".hint-title").textContent
                        let neededHintCreateDate = ((dumpBtn.parentNode).parentNode).querySelector(".hint-date").textContent
                        let neededEachBlock = ((dumpBtn.parentNode).parentNode).parentNode
                        let CheckboxBlock = neededHintBlock.querySelector('.checkboxes')
                        


                    
                        if (openedCheckboxBlock == 0) {
                            
                            CheckboxBlock.style.display = 'block'
                            openedCheckboxBlock++ 
                            
                        }else {
                            CheckboxBlock.style.display = 'none'
                            openedCheckboxBlock-- 
                        }


                    })

                    // SYSTEM TO DELETE THE HINT

                    let requestURLtoRemoveHint = '/removehint/'
                    let dumpBtn = document.querySelector("#dumpBtn"+g)

                    dumpBtn.addEventListener('click', () => {
                        let neededHintBtnsBlock = ((dumpBtn.parentNode).parentNode).querySelector(".hint-buttons")
                        let neededHintBtnArchive = neededHintBtnsBlock.querySelector(".archiveBtn")
                        let neededHintBtnDump = neededHintBtnsBlock.querySelector(".dumpBtn")
                        let neededHintBtnMark = neededHintBtnsBlock.querySelector(".markBtn")
                        let neededHintBtnEdit = neededHintBtnsBlock.querySelector(".editBtn")
                        let neededHintBlock = ((dumpBtn.parentNode).parentNode)
                        let neededHintTitle = ((dumpBtn.parentNode).parentNode).querySelector(".hint-title").textContent
                        let neededHintCreateDate = ((dumpBtn.parentNode).parentNode).querySelector(".hint-date").textContent
                        let neededEachBlock = ((dumpBtn.parentNode).parentNode).parentNode
                        let csrftoken = $('input[name=csrfmiddlewaretoken]').val();

                        if (neededEachBlock.querySelectorAll(".hint").length == 1) {
                            neededEachBlock.remove();
                            $.ajax({
                                headers: {"X-CSRFToken": csrftoken},
                    
                                type: "POST",
                                url: requestURLtoRemoveHint,
                                data: {
                                    'id': hintID
                                }
                            }); 
                        }

                        if (neededEachBlock.querySelectorAll(".hint").length > 1) {
                            neededHintBlock.remove();
                            $.ajax({
                                headers: {"X-CSRFToken": csrftoken},
                    
                                type: "POST",
                                url: requestURLtoRemoveHint,
                                data: {
                                    'id': hintID
                                }
                            }); 
                        }
                    })
                    
                    // SYSTEM TO MARK AND UNMARK THE HINT AS IMPORTANT                

                    let markBtn = document.querySelector("#markBtn"+g)
                    markBtn.addEventListener('click', () => {
                        console.log(markBtn);
                        let neededHintBtnsBlock = ((markBtn.parentNode).parentNode).querySelector(".hint-buttons")
                        let neededHintBtnArchive = neededHintBtnsBlock.querySelector(".archiveBtn")
                        let neededHintBtnDump = neededHintBtnsBlock.querySelector(".dumpBtn")
                        let neededHintBtnMark = neededHintBtnsBlock.querySelector(".markBtn")
                        let neededHintBtnEdit = neededHintBtnsBlock.querySelector(".editBtn")
                        let neededHintBlock = ((markBtn.parentNode).parentNode)
                        let neededHintTitle = ((markBtn.parentNode).parentNode).querySelector(".hint-title").textContent
                        let neededHintCreateDate = ((markBtn.parentNode).parentNode).querySelector(".hint-date").textContent
                        let csrftoken = $('input[name=csrfmiddlewaretoken]').val();

                        let requestURLtoMarkHint = '/markhint/'
                        let requestURLtoUnMarkHint = '/unmarkhint/'
                    
                        console.log(neededHintTitle, neededHintCreateDate)

                        $.get(requestURLtoUnMarkHint,data={'title': neededHintTitle, 'date_to': neededHintCreateDate}, (data) => {
                            
                            // Если нужная статья не помечена "Важной"(is_marked = 0), то помечаем;

                            if (data == 0 ) {

                                // В блоке кода ниже - динамически меняется внешний вид заметки

                                neededHintBlock.classList.add("marked")
                                neededHintBtnArchive.src = "/static/img/archive-color.png/"
                                neededHintBtnDump.src = "/static/img/dump-color.png/"
                                neededHintBtnMark.src = "/static/img/star-yellow.png/"
                                neededHintBtnEdit.src = "/static/img/pencil-color.png/"

                                // В блоке кода ниже - отправляется POST запрос для изменения у заметки статуса "is_marked" на 1

                                $.ajax({
                                    headers: {"X-CSRFToken": csrftoken},
                        
                                    type: "POST",
                                    url: requestURLtoMarkHint,
                                    data: {
                                        'title': neededHintTitle,
                                        'date_to': neededHintCreateDate,
                                    }
                                });                         

                            }

                            if (data == 1 ) {

                                // В блоке кода ниже - динамически меняется внешний вид заметки

                                neededHintBlock.classList.remove("marked")
                                neededHintBtnArchive.src = "/static/img/archive-blue.png/"
                                neededHintBtnDump.src = "/static/img/dump-blue.png/"
                                neededHintBtnMark.src = "/static/img/star-blue.png/"
                                neededHintBtnEdit.src = "/static/img/pencil-blue.png/"

                                // В блоке кода ниже - отправляется POST запрос для изменения у заметки статуса "is_marked" на 0

                                $.ajax({
                                    headers: {"X-CSRFToken": csrftoken},
                        
                                    type: "POST",
                                    url: requestURLtoUnMarkHint,
                                    data: {
                                        'title': neededHintTitle,
                                        'date_to': neededHintCreateDate,
                                    }
                                });  

                            }
                        }, 'json');
                        
                        


                    })

                    // markBtnsDict.push(markBtn)
                    // console.log(markBtnsDict)
        
                };

            })

            
        
        }, 'json');

// RESET ALL FILTERS

let resetFiltersBtn = document.querySelector('.resetFilters')

resetFiltersBtn.addEventListener('click', () => {
    window.location.reload()
})

// FILTER BY IMPORTANT

let filterMarkedBtn = document.querySelector('.markedFilter')

filterMarkedBtn.addEventListener('click', () => {

    let allEachBlocks = document.querySelectorAll('.each-day')
    let requestURLtoFilterAsMarked = '/markedfilter/'
    console.log(allEachBlocks)
    allEachBlocks.forEach((element) => {
        element.remove()
    })

        $.get(requestURLtoFilterAsMarked, (data) => { 

                for (let g = (Object.keys(data).length - 1 ); g != -1; g--) {

                    console.log('ТУТАЧКЕ', g)
                    
                    let dataObj = Object.keys(data)[g];


                    let titleVal = data[dataObj]["hint_title"];
                    let dateTo = data[dataObj]["date_to"];
                    let cb1 = data[dataObj]["cb1"];
                    let cb2 = data[dataObj]["cb2"];
                    let cb3 = data[dataObj]["cb3"];
                    let cb4 = data[dataObj]["cb4"];
                    let cb5 = data[dataObj]["cb5"];
                    let hintDateCreate = data[dataObj]["create_date"];
                    let hintIsMarked = data[dataObj]["is_marked"];
                    let hintID = data[dataObj]["id"];
                    let hintIsArchived = data[dataObj]["is_archived"];
        
    
                    let neededDate = 0
                    function CheckHintsDate() {
        
                        let dayTitleBlocks = document.querySelectorAll(".day-title-p");
        
            
                        // Сверяем дату в каждом .day-title с текущей датой и берем подходящий;
                        
                        for (let t = (dayTitleBlocks.length - 1 ); t > -1 || t != -1 ; t--) {
        
                            if (dayTitleBlocks[t].textContent == hintDateCreate) {
                
                                neededDate = dayTitleBlocks[t];
                
                                break
                            }else{
        
                                neededDate = 2;
                            };  
                        };
                    }
        
                    CheckHintsDate();

        
                    let neededDateParent = 0;
                        if ( neededDate != 2 && neededDate != 0) {
                        neededDateParent = neededDate.parentNode;

                        neededDateParent = neededDateParent.parentNode;
    
                    }
                    if ( hintIsArchived == 1 ) {
                        continue;
                    }
                    // Добавляем в нужный блок с классом each-day заметку(использую JQuery);
        
                    if ( neededDate != 2) {
        
                    
                        if (hintIsMarked == 0) {
                            let newFixedHintHtml = ('<div class="hint">\r\n<p class="hint-title">' + titleVal + '</p>\r\n<p class="date-complete">До: <span class="hint-date">' + dateTo + '</span></p>\r\n<div class="hint-buttons">\r\n<img src="/static/img/archive-blue.png" alt="" class="btn-hint archiveBtn" id="archiveBtn'+ g +'">\r\n<img src="/static/img/dump-blue.png" alt="" class="btn-hint dumpBtn" id="dumpBtn'+ g +'">\r\n<img src="/static/img/star-blue.png" alt="" class="btn-hint markBtn" id="markBtn'+ g +'">\r\n<img src="/static/img/pencil-blue.png" alt="" class="btn-hint editBtn" id="editBtn'+ g +'">\r\n</div>\r\n<div class="checkboxes">\r\n<ul>\r\n<li class="checkbox">'+cb1+'</li>\r\n<li class="checkbox">'+cb2+'</li>\r\n<li class="checkbox">'+cb3+'</li>\r\n<li class="checkbox">'+cb4+'</li>\r\n<li class="checkbox">'+cb5+'</li>\r\n</ul>\r\n</div>\r\n</div>\r\n \r\n');
                        $(newFixedHintHtml).appendTo(neededDateParent);
                        }

                        if (hintIsMarked == 1) {
                            let newFixedHintHtml = ('<div class="hint marked">\r\n<p class="hint-title">' + titleVal + '</p>\r\n<p class="date-complete">До: <span class="hint-date">' + dateTo + '</span></p>\r\n<div class="hint-buttons">\r\n<img src="/static/img/archive-color.png" alt="" class="btn-hint archiveBtn" id="archiveBtn'+ g +'">\r\n<img src="/static/img/dump-color.png" alt="" class="btn-hint dumpBtn" id="dumpBtn'+ g +'">\r\n<img src="/static/img/star-yellow.png" alt="" class="btn-hint markBtn" id="markBtn'+ g +'">\r\n<img src="/static/img/pencil-color.png" alt="" class="btn-hint editBtn" id="editBtn'+ g +'">\r\n</div>\r\n<div class="checkboxes">\r\n<ul>\r\n<li class="checkbox">'+cb1+'</li>\r\n<li class="checkbox">'+cb2+'</li>\r\n<li class="checkbox">'+cb3+'</li>\r\n<li class="checkbox">'+cb4+'</li>\r\n<li class="checkbox">'+cb5+'</li>\r\n</ul>\r\n</div>\r\n</div>\r\n \r\n');
                        $(newFixedHintHtml).appendTo(neededDateParent);
                        }
                        
        
                    };
        
                    // Если нужной даты не находится, то добавляем новый блок each-day блок с новой заметкой;
        
                    if ( neededDate == 2 ||  neededDate == 0 ) {

                        if (hintIsMarked == 0){
                            let allHintsBlock = document.querySelector('.hints');
                            let newEachDayBlock = ('<div class="each-day">\r\n \r\n<div class="day-title">\r\n<p class="day-title-p" >' + hintDateCreate + '</p>\r\n</div>\r\n \r\n<div class="hint">\r\n<p class="hint-title">' + titleVal + '</p>\r\n<p class="date-complete">До: <span class="hint-date">' + dateTo + '</span></p>\r\n<div class="hint-buttons">\r\n<img src="/static/img/archive-blue.png" alt="" class="btn-hint archiveBtn" id="archiveBtn'+ g +'">\r\n<img src="/static/img/dump-blue.png" alt="" class="btn-hint dumpBtn" id="dumpBtn'+ g +'">\r\n<img src="/static/img/star-blue.png" alt="" class="btn-hint markBtn" id="markBtn'+ g +'">\r\n<img src="/static/img/pencil-blue.png" alt="" class="btn-hint editBtn" id="editBtn'+ g +'">\r\n</div>\r\n<div class="checkboxes">\r\n<ul>\r\n<li class="checkbox">'+cb1+'</li>\r\n<li class="checkbox">'+cb2+'</li>\r\n<li class="checkbox">'+cb3+'</li>\r\n<li class="checkbox">'+cb4+'</li>\r\n<li class="checkbox">'+cb5+'</li>\r\n</ul>\r\n</div>\r\n</div>\r\n \r\n</div>');
                        
                            $(newEachDayBlock).appendTo(allHintsBlock);
                        }

                        if (hintIsMarked == 1) {
                            let allHintsBlock = document.querySelector('.hints');
                            let newEachDayBlock = ('<div class="each-day">\r\n \r\n<div class="day-title">\r\n<p class="day-title-p" >' + hintDateCreate + '</p>\r\n</div>\r\n \r\n<div class="hint marked">\r\n<p class="hint-title">' + titleVal + '</p>\r\n<p class="date-complete">До: <span class="hint-date">' + dateTo + '</span></p>\r\n<div class="hint-buttons">\r\n<img src="/static/img/archive-color.png" alt="" class="btn-hint archiveBtn" id="archiveBtn'+ g +'">\r\n<img src="/static/img/dump-color.png" alt="" class="btn-hint dumpBtn" id="dumpBtn'+ g +'">\r\n<img src="/static/img/star-yellow.png" alt="" class="btn-hint markBtn" id="markBtn'+ g +'">\r\n<img src="/static/img/pencil-color.png" alt="" class="btn-hint editBtn" id="editBtn'+ g +'">\r\n</div>\r\n<div class="checkboxes">\r\n<ul>\r\n<li class="checkbox">'+cb1+'</li>\r\n<li class="checkbox">'+cb2+'</li>\r\n<li class="checkbox">'+cb3+'</li>\r\n<li class="checkbox">'+cb4+'</li>\r\n<li class="checkbox">'+cb5+'</li>\r\n</ul>\r\n</div>\r\n</div>\r\n \r\n</div>');
                        
                            $(newEachDayBlock).appendTo(allHintsBlock);
                        }
        
                        
        
                    };

                    

                    // SETTINGS SYSTEM

                    // Change Email

                    let changeEmailInput = document.querySelector('.change-email-input')
                    let changeEmailBtn = document.querySelector('.change-email-btn')
                    let settingsBtn = document.querySelector('#settingsBtn');
                    let requestURLtoGetUserEmail = '/getemailurl/'
                    let requestURLtoChangeEmail = '/changeemail/'
                    let useremail = ''
                    let csrftoken = $('input[name=csrfmiddlewaretoken]').val();

                    settingsBtn.addEventListener('click', () => {
                        $.get(requestURLtoGetUserEmail, (data) => {
                            useremail = data;
                            changeEmailInput.value = useremail;
                        });

                        
                    })

                    changeEmailBtn.addEventListener('click', () => {
                        $.ajax({
                            headers: {"X-CSRFToken": csrftoken},
                
                            type: "POST",
                            url: requestURLtoChangeEmail,
                            data: {
                                'email': changeEmailInput.value
                            }
                        });
                        window.location.reload();
                    })

                    // Change Password

                    let passwordEditInput1 = document.querySelector('.change-password-input')
                    let passwordEditInput2 = document.querySelector('.change-password-input2')
                    let changePassBtn = document.querySelector('.change-password-btn')
                    let requestURLtoChangePass = '/changepass/'

                    changePassBtn.addEventListener('click', () => {
                        if (passwordEditInput1.value == passwordEditInput2.value) {
                            $.ajax({
                                headers: {"X-CSRFToken": csrftoken},
                    
                                type: "POST",
                                url: requestURLtoChangePass,
                                data: {
                                    'password': passwordEditInput1.value
                                }
                            });
                            window.location.reload();
                        }else{
                            alert('Пароли должны быть одинаковы!')
                        }
                    })

                    // SYSTEM TO EDIT THE HINT

                    let editBtn = document.querySelector("#editBtn"+g)
                    // let requestURLtoArchiveHint = '/archivehint/'
                    // let requestURLtoUnArchiveHint = '/unarchivehint/'

                    editBtn.addEventListener('click', () => {
                        let editHintBlock = document.querySelector(".edit-hint-block")
                        let neededHintBtnsBlock = ((editBtn.parentNode).parentNode).querySelector(".hint-buttons")
                        let neededHintBtnArchive = neededHintBtnsBlock.querySelector(".archiveBtn")
                        let neededHintBtnDump = neededHintBtnsBlock.querySelector(".dumpBtn")
                        let neededHintBtnMark = neededHintBtnsBlock.querySelector(".markBtn")
                        let neededHintBtnEdit = neededHintBtnsBlock.querySelector(".editBtn")
                        let neededHintBlock = ((editBtn.parentNode).parentNode)
                        let neededHintTitle = ((editBtn.parentNode).parentNode).querySelector(".hint-title").textContent
                        let neededHintCreateDate = ((editBtn.parentNode).parentNode).querySelector(".hint-date").textContent
                        let neededEachBlock = ((editBtn.parentNode).parentNode).parentNode
                        let csrftoken = $('input[name=csrfmiddlewaretoken]').val();
                        let requestURLtoEditHint = '/edithint/'

                        // Поля формы изменения заметки с подставленными значениями

                        let titleEditInput = document.querySelector('.edit-hint-title-input')
                        let dateToEditInput = document.querySelector('.edit-hint-date-to-input')
                        let cb1Edit = document.querySelector('#editcb1')
                        let cb2Edit = document.querySelector('#editcb2')
                        let cb3Edit = document.querySelector('#editcb3')
                        let cb4Edit = document.querySelector('#editcb4')
                        let cb5Edit = document.querySelector('#editcb5')

                        titleEditInput.value = neededHintTitle
                        dateToEditInput.value = neededHintTitle
                        // cb1Edit.value = neededHintCreateDate
                        // cb2Edit.value = neededHintTitle
                        // cb3Edit.value = neededHintTitle
                        // cb4Edit.value = neededHintTitle
                        // cb5Edit.value = neededHintTitle

                        // Вывод окна редактирования

                        $('.dark-block ').show(500, () => {
                            darkBlock.classList.remove("disabled-block");
                        });
                    
                        $('.edit-hint-block ').show(500, () => {
                            editHintBlock.classList.remove("disabled-block");
                        });
                    
                        darkBlock.addEventListener("click", () => {
                            $('.dark-block ').hide(500, () => {
                                darkBlock.classList.add("disabled-block");
                            });
                            
                            $('.edit-hint-block ').hide(500, () => {
                                editHintBlock.classList.add("disabled-block");
                            });
                        })

                        // Отправка данных с формы для изменения данных заметки на сервер

                        editGoBtn = document.querySelector('#editHintBtn')

                        editGoBtn.addEventListener('click', () => {

                        if (titleEditInput.value == null || titleEditInput.value == '' || dateToEditInput.value == null || dateToEditInput.value == '') {
                            alert('Заполните название заметки и дату окончания!' )

                        }else if ((titleEditInput.value).length > 64 || (cb1Edit.value).length > 64 || (cb2Edit.value).length > 64 || (cb3Edit.value).length > 64 || (cb4Edit.value).length > 64 || (cb5Edit.value).length > 64) {

                            alert('В названии заметки и подзадач не должно быть больше 64 символов!')
                            
                        }else{
                            let hintEditedTitle = titleEditInput.value
                            let hintEditedDateTo = dateToEditInput.value
                            let hintEditedCB1 = cb1Edit.value
                            let hintEditedCB2 = cb2Edit.value
                            let hintEditedCB3 = cb3Edit.value
                            let hintEditedCB4 = cb4Edit.value
                            let hintEditedCB5 = cb5Edit.value

                            $.ajax({
                                headers: {"X-CSRFToken": csrftoken},
                    
                                type: "POST",
                                url: requestURLtoEditHint,
                                data: {
                                    'title': hintEditedTitle,
                                    'date_to': hintEditedDateTo,
                                    'cb1': hintEditedCB1,
                                    'cb2': hintEditedCB2,
                                    'cb3': hintEditedCB3,
                                    'cb4': hintEditedCB4,
                                    'cb5': hintEditedCB5,
                                    'hint_id': hintID,
                                }
                            });
                            window.location.reload();
                        }
                    })
                })     
                            
                        
                    

                    // SYSTEM TO ARCHIVE THE HINT

                    let archiveBtn = document.querySelector("#archiveBtn"+g)
                    let requestURLtoArchiveHint = '/archivehint/'
                    let requestURLtoUnArchiveHint = '/unarchivehint/'

                    archiveBtn.addEventListener('click', () => {
                        let neededHintBtnsBlock = ((archiveBtn.parentNode).parentNode).querySelector(".hint-buttons")
                        let neededHintBtnArchive = neededHintBtnsBlock.querySelector(".archiveBtn")
                        let neededHintBtnDump = neededHintBtnsBlock.querySelector(".dumpBtn")
                        let neededHintBtnMark = neededHintBtnsBlock.querySelector(".markBtn")
                        let neededHintBtnEdit = neededHintBtnsBlock.querySelector(".editBtn")
                        let neededHintBlock = ((archiveBtn.parentNode).parentNode)
                        let neededHintTitle = ((archiveBtn.parentNode).parentNode).querySelector(".hint-title").textContent
                        let neededHintCreateDate = ((archiveBtn.parentNode).parentNode).querySelector(".hint-date").textContent
                        let neededEachBlock = ((archiveBtn.parentNode).parentNode).parentNode
                        let csrftoken = $('input[name=csrfmiddlewaretoken]').val();

                        $.get(requestURLtoUnArchiveHint,data={'title': neededHintTitle, 'date_to': neededHintCreateDate}, (data) => {

                            if (data == 0 ) {

                                if (neededEachBlock.querySelectorAll(".hint").length == 1) {
                                    console.log(neededEachBlock)
                                    neededEachBlock.remove();
                                    
                                    $.ajax({
                                        headers: {"X-CSRFToken": csrftoken},
                            
                                        type: "POST",
                                        url: requestURLtoArchiveHint,
                                        data: {
                                            'title': neededHintTitle,
                                            'date_to': neededHintCreateDate,
                                        }
                                    });
                                }
                                if (neededEachBlock.querySelectorAll(".hint").length > 1) {
                                    neededHintBlock.remove(); 

                                    $.ajax({
                                        headers: {"X-CSRFToken": csrftoken},
                            
                                        type: "POST",
                                        url: requestURLtoArchiveHint,
                                        data: {
                                            'title': neededHintTitle,
                                            'date_to': neededHintCreateDate,
                                        }
                                    });
                                };
                            }

                            if (data == 1 ) {

                                $.ajax({
                                    headers: {"X-CSRFToken": csrftoken},
                        
                                    type: "POST",
                                    url: requestURLtoUnArchiveHint,
                                    data: {
                                        'title': neededHintTitle,
                                        'date_to': neededHintCreateDate,
                                    }
                                });  

                            }
                            }, 'json');    
                    })    
                    
                    // SHOWING HIDEN CHECKBOXES
                    let dumpBtnForCheckboxes = document.querySelector("#dumpBtn"+g)
                    let neededHintBlock = ((dumpBtnForCheckboxes.parentNode).parentNode)
                    let openedCheckboxBlock = 0

                    neededHintBlock.addEventListener('click', () => {
                        let neededHintBtnsBlock = ((dumpBtn.parentNode).parentNode).querySelector(".hint-buttons")
                        let neededHintBtnArchive = neededHintBtnsBlock.querySelector(".archiveBtn")
                        let neededHintBtnDump = neededHintBtnsBlock.querySelector(".dumpBtn")
                        let neededHintBtnMark = neededHintBtnsBlock.querySelector(".markBtn")
                        let neededHintBtnEdit = neededHintBtnsBlock.querySelector(".editBtn")
                        let neededHintTitle = ((dumpBtn.parentNode).parentNode).querySelector(".hint-title").textContent
                        let neededHintCreateDate = ((dumpBtn.parentNode).parentNode).querySelector(".hint-date").textContent
                        let neededEachBlock = ((dumpBtn.parentNode).parentNode).parentNode
                        let CheckboxBlock = neededHintBlock.querySelector('.checkboxes')
                        


                    
                        if (openedCheckboxBlock == 0) {
                            
                            CheckboxBlock.style.display = 'block'
                            openedCheckboxBlock++ 
                            
                        }else {
                            CheckboxBlock.style.display = 'none'
                            openedCheckboxBlock-- 
                        }


                    })

                    // SYSTEM TO DELETE THE HINT

                    let requestURLtoRemoveHint = '/removehint/'
                    let dumpBtn = document.querySelector("#dumpBtn"+g)

                    dumpBtn.addEventListener('click', () => {
                        let neededHintBtnsBlock = ((dumpBtn.parentNode).parentNode).querySelector(".hint-buttons")
                        let neededHintBtnArchive = neededHintBtnsBlock.querySelector(".archiveBtn")
                        let neededHintBtnDump = neededHintBtnsBlock.querySelector(".dumpBtn")
                        let neededHintBtnMark = neededHintBtnsBlock.querySelector(".markBtn")
                        let neededHintBtnEdit = neededHintBtnsBlock.querySelector(".editBtn")
                        let neededHintBlock = ((dumpBtn.parentNode).parentNode)
                        let neededHintTitle = ((dumpBtn.parentNode).parentNode).querySelector(".hint-title").textContent
                        let neededHintCreateDate = ((dumpBtn.parentNode).parentNode).querySelector(".hint-date").textContent
                        let neededEachBlock = ((dumpBtn.parentNode).parentNode).parentNode
                        let csrftoken = $('input[name=csrfmiddlewaretoken]').val();

                        if (neededEachBlock.querySelectorAll(".hint").length == 1) {
                            neededEachBlock.remove();
                            $.ajax({
                                headers: {"X-CSRFToken": csrftoken},
                    
                                type: "POST",
                                url: requestURLtoRemoveHint,
                                data: {
                                    'id': hintID
                                }
                            }); 
                        }

                        if (neededEachBlock.querySelectorAll(".hint").length > 1) {
                            neededHintBlock.remove();
                            $.ajax({
                                headers: {"X-CSRFToken": csrftoken},
                    
                                type: "POST",
                                url: requestURLtoRemoveHint,
                                data: {
                                    'id': hintID
                                }
                            }); 
                        }
                    })
                    
                    // SYSTEM TO MARK AND UNMARK THE HINT AS IMPORTANT                

                    let markBtn = document.querySelector("#markBtn"+g)
                    markBtn.addEventListener('click', () => {
                        console.log(markBtn);
                        let neededHintBtnsBlock = ((markBtn.parentNode).parentNode).querySelector(".hint-buttons")
                        let neededHintBtnArchive = neededHintBtnsBlock.querySelector(".archiveBtn")
                        let neededHintBtnDump = neededHintBtnsBlock.querySelector(".dumpBtn")
                        let neededHintBtnMark = neededHintBtnsBlock.querySelector(".markBtn")
                        let neededHintBtnEdit = neededHintBtnsBlock.querySelector(".editBtn")
                        let neededHintBlock = ((markBtn.parentNode).parentNode)
                        let neededHintTitle = ((markBtn.parentNode).parentNode).querySelector(".hint-title").textContent
                        let neededHintCreateDate = ((markBtn.parentNode).parentNode).querySelector(".hint-date").textContent
                        let csrftoken = $('input[name=csrfmiddlewaretoken]').val();

                        let requestURLtoMarkHint = '/markhint/'
                        let requestURLtoUnMarkHint = '/unmarkhint/'
                    
                        console.log(neededHintTitle, neededHintCreateDate)

                        $.get(requestURLtoUnMarkHint,data={'title': neededHintTitle, 'date_to': neededHintCreateDate}, (data) => {
                            
                            // Если нужная статья не помечена "Важной"(is_marked = 0), то помечаем;

                            if (data == 0 ) {

                                // В блоке кода ниже - динамически меняется внешний вид заметки

                                neededHintBlock.classList.add("marked")
                                neededHintBtnArchive.src = "/static/img/archive-color.png/"
                                neededHintBtnDump.src = "/static/img/dump-color.png/"
                                neededHintBtnMark.src = "/static/img/star-yellow.png/"
                                neededHintBtnEdit.src = "/static/img/pencil-color.png/"

                                // В блоке кода ниже - отправляется POST запрос для изменения у заметки статуса "is_marked" на 1

                                $.ajax({
                                    headers: {"X-CSRFToken": csrftoken},
                        
                                    type: "POST",
                                    url: requestURLtoMarkHint,
                                    data: {
                                        'title': neededHintTitle,
                                        'date_to': neededHintCreateDate,
                                    }
                                });                         

                            }

                            if (data == 1 ) {

                                // В блоке кода ниже - динамически меняется внешний вид заметки

                                neededHintBlock.classList.remove("marked")
                                neededHintBtnArchive.src = "/static/img/archive-blue.png/"
                                neededHintBtnDump.src = "/static/img/dump-blue.png/"
                                neededHintBtnMark.src = "/static/img/star-blue.png/"
                                neededHintBtnEdit.src = "/static/img/pencil-blue.png/"

                                // В блоке кода ниже - отправляется POST запрос для изменения у заметки статуса "is_marked" на 0

                                $.ajax({
                                    headers: {"X-CSRFToken": csrftoken},
                        
                                    type: "POST",
                                    url: requestURLtoUnMarkHint,
                                    data: {
                                        'title': neededHintTitle,
                                        'date_to': neededHintCreateDate,
                                    }
                                });  

                            }
                        }, 'json');
                        
                        


                    })

                    // markBtnsDict.push(markBtn)
                    // console.log(markBtnsDict)
        
                };

            })

            
        
        }, 'json');

// FILTER BY DATE TO

let filterDateToBtn = document.querySelector('.dateToFilter')

filterDateToBtn.addEventListener('click', () => {

    let allEachBlocks = document.querySelectorAll('.each-day')
    let requestURLtoFilterAsDateTo = '/datetofilter/'
    console.log(allEachBlocks)
    allEachBlocks.forEach((element) => {
        element.remove()
    })

        $.get(requestURLtoFilterAsDateTo, (data) => { 

                for (let g = (Object.keys(data).length - 1 ); g != -1; g--) {

                    console.log('ТУТАЧКЕ', g)
                    
                    let dataObj = Object.keys(data)[g];


                    let titleVal = data[dataObj]["hint_title"];
                    let dateTo = data[dataObj]["date_to"];
                    let cb1 = data[dataObj]["cb1"];
                    let cb2 = data[dataObj]["cb2"];
                    let cb3 = data[dataObj]["cb3"];
                    let cb4 = data[dataObj]["cb4"];
                    let cb5 = data[dataObj]["cb5"];
                    let hintDateCreate = data[dataObj]["create_date"];
                    let hintIsMarked = data[dataObj]["is_marked"];
                    let hintID = data[dataObj]["id"];
                    let hintIsArchived = data[dataObj]["is_archived"];
        
    
                    let neededDate = 0
                    function CheckHintsDate() {
        
                        let dayTitleBlocks = document.querySelectorAll(".day-title-p");
        
            
                        // Сверяем дату в каждом .day-title с текущей датой и берем подходящий;
                        
                        for (let t = (dayTitleBlocks.length - 1 ); t > -1 || t != -1 ; t--) {
        
                            if (dayTitleBlocks[t].textContent == hintDateCreate) {
                
                                neededDate = dayTitleBlocks[t];
                
                                break
                            }else{
        
                                neededDate = 2;
                            };  
                        };
                    }
        
                    CheckHintsDate();

        
                    let neededDateParent = 0;
                        if ( neededDate != 2 && neededDate != 0) {
                        neededDateParent = neededDate.parentNode;

                        neededDateParent = neededDateParent.parentNode;
    
                    }
                    if ( hintIsArchived == 1 ) {
                        continue;
                    }
                    // Добавляем в нужный блок с классом each-day заметку(использую JQuery);
        
                    // if ( neededDate != 2) {
        
                    
                    //     if (hintIsMarked == 0) {
                    //         let newFixedHintHtml = ('<div class="hint">\r\n<p class="hint-title">' + titleVal + '</p>\r\n<p class="date-complete">До: <span class="hint-date">' + dateTo + '</span></p>\r\n<div class="hint-buttons">\r\n<img src="/static/img/archive-blue.png" alt="" class="btn-hint archiveBtn" id="archiveBtn'+ g +'">\r\n<img src="/static/img/dump-blue.png" alt="" class="btn-hint dumpBtn" id="dumpBtn'+ g +'">\r\n<img src="/static/img/star-blue.png" alt="" class="btn-hint markBtn" id="markBtn'+ g +'">\r\n<img src="/static/img/pencil-blue.png" alt="" class="btn-hint editBtn" id="editBtn'+ g +'">\r\n</div>\r\n<div class="checkboxes">\r\n<ul>\r\n<li class="checkbox">'+cb1+'</li>\r\n<li class="checkbox">'+cb2+'</li>\r\n<li class="checkbox">'+cb3+'</li>\r\n<li class="checkbox">'+cb4+'</li>\r\n<li class="checkbox">'+cb5+'</li>\r\n</ul>\r\n</div>\r\n</div>\r\n \r\n');
                    //     $(newFixedHintHtml).appendTo(neededDateParent);
                    //     }

                    //     if (hintIsMarked == 1) {
                    //         let newFixedHintHtml = ('<div class="hint marked">\r\n<p class="hint-title">' + titleVal + '</p>\r\n<p class="date-complete">До: <span class="hint-date">' + dateTo + '</span></p>\r\n<div class="hint-buttons">\r\n<img src="/static/img/archive-color.png" alt="" class="btn-hint archiveBtn" id="archiveBtn'+ g +'">\r\n<img src="/static/img/dump-color.png" alt="" class="btn-hint dumpBtn" id="dumpBtn'+ g +'">\r\n<img src="/static/img/star-yellow.png" alt="" class="btn-hint markBtn" id="markBtn'+ g +'">\r\n<img src="/static/img/pencil-color.png" alt="" class="btn-hint editBtn" id="editBtn'+ g +'">\r\n</div>\r\n<div class="checkboxes">\r\n<ul>\r\n<li class="checkbox">'+cb1+'</li>\r\n<li class="checkbox">'+cb2+'</li>\r\n<li class="checkbox">'+cb3+'</li>\r\n<li class="checkbox">'+cb4+'</li>\r\n<li class="checkbox">'+cb5+'</li>\r\n</ul>\r\n</div>\r\n</div>\r\n \r\n');
                    //     $(newFixedHintHtml).appendTo(neededDateParent);
                    //     }
                        
        
                    // };
        
                    // Если нужной даты не находится, то добавляем новый блок each-day блок с новой заметкой;
        
                    // if ( neededDate == 2 ||  neededDate == 0 ) {

                        if (hintIsMarked == 0){
                            let allHintsBlock = document.querySelector('.hints');
                            let newEachDayBlock = ('<div class="each-day">\r\n \r\n<div class="day-title">\r\n<p class="day-title-p" >' + hintDateCreate + '</p>\r\n</div>\r\n \r\n<div class="hint">\r\n<p class="hint-title">' + titleVal + '</p>\r\n<p class="date-complete">До: <span class="hint-date">' + dateTo + '</span></p>\r\n<div class="hint-buttons">\r\n<img src="/static/img/archive-blue.png" alt="" class="btn-hint archiveBtn" id="archiveBtn'+ g +'">\r\n<img src="/static/img/dump-blue.png" alt="" class="btn-hint dumpBtn" id="dumpBtn'+ g +'">\r\n<img src="/static/img/star-blue.png" alt="" class="btn-hint markBtn" id="markBtn'+ g +'">\r\n<img src="/static/img/pencil-blue.png" alt="" class="btn-hint editBtn" id="editBtn'+ g +'">\r\n</div>\r\n<div class="checkboxes">\r\n<ul>\r\n<li class="checkbox">'+cb1+'</li>\r\n<li class="checkbox">'+cb2+'</li>\r\n<li class="checkbox">'+cb3+'</li>\r\n<li class="checkbox">'+cb4+'</li>\r\n<li class="checkbox">'+cb5+'</li>\r\n</ul>\r\n</div>\r\n</div>\r\n \r\n</div>');
                        
                            $(newEachDayBlock).appendTo(allHintsBlock);
                        }

                        if (hintIsMarked == 1) {
                            let allHintsBlock = document.querySelector('.hints');
                            let newEachDayBlock = ('<div class="each-day">\r\n \r\n<div class="day-title">\r\n<p class="day-title-p" >' + hintDateCreate + '</p>\r\n</div>\r\n \r\n<div class="hint marked">\r\n<p class="hint-title">' + titleVal + '</p>\r\n<p class="date-complete">До: <span class="hint-date">' + dateTo + '</span></p>\r\n<div class="hint-buttons">\r\n<img src="/static/img/archive-color.png" alt="" class="btn-hint archiveBtn" id="archiveBtn'+ g +'">\r\n<img src="/static/img/dump-color.png" alt="" class="btn-hint dumpBtn" id="dumpBtn'+ g +'">\r\n<img src="/static/img/star-yellow.png" alt="" class="btn-hint markBtn" id="markBtn'+ g +'">\r\n<img src="/static/img/pencil-color.png" alt="" class="btn-hint editBtn" id="editBtn'+ g +'">\r\n</div>\r\n<div class="checkboxes">\r\n<ul>\r\n<li class="checkbox">'+cb1+'</li>\r\n<li class="checkbox">'+cb2+'</li>\r\n<li class="checkbox">'+cb3+'</li>\r\n<li class="checkbox">'+cb4+'</li>\r\n<li class="checkbox">'+cb5+'</li>\r\n</ul>\r\n</div>\r\n</div>\r\n \r\n</div>');
                        
                            $(newEachDayBlock).appendTo(allHintsBlock);
                        }
        
                        
        
                    // };

                    

                    // SETTINGS SYSTEM

                    // Change Email

                    let changeEmailInput = document.querySelector('.change-email-input')
                    let changeEmailBtn = document.querySelector('.change-email-btn')
                    let settingsBtn = document.querySelector('#settingsBtn');
                    let requestURLtoGetUserEmail = '/getemailurl/'
                    let requestURLtoChangeEmail = '/changeemail/'
                    let useremail = ''
                    let csrftoken = $('input[name=csrfmiddlewaretoken]').val();

                    settingsBtn.addEventListener('click', () => {
                        $.get(requestURLtoGetUserEmail, (data) => {
                            useremail = data;
                            changeEmailInput.value = useremail;
                        });

                        
                    })

                    changeEmailBtn.addEventListener('click', () => {
                        $.ajax({
                            headers: {"X-CSRFToken": csrftoken},
                
                            type: "POST",
                            url: requestURLtoChangeEmail,
                            data: {
                                'email': changeEmailInput.value
                            }
                        });
                        window.location.reload();
                    })

                    // Change Password

                    let passwordEditInput1 = document.querySelector('.change-password-input')
                    let passwordEditInput2 = document.querySelector('.change-password-input2')
                    let changePassBtn = document.querySelector('.change-password-btn')
                    let requestURLtoChangePass = '/changepass/'

                    changePassBtn.addEventListener('click', () => {
                        if (passwordEditInput1.value == passwordEditInput2.value) {
                            $.ajax({
                                headers: {"X-CSRFToken": csrftoken},
                    
                                type: "POST",
                                url: requestURLtoChangePass,
                                data: {
                                    'password': passwordEditInput1.value
                                }
                            });
                            window.location.reload();
                        }else{
                            alert('Пароли должны быть одинаковы!')
                        }
                    })

                    // SYSTEM TO EDIT THE HINT

                    let editBtn = document.querySelector("#editBtn"+g)
                    // let requestURLtoArchiveHint = '/archivehint/'
                    // let requestURLtoUnArchiveHint = '/unarchivehint/'

                    editBtn.addEventListener('click', () => {
                        let editHintBlock = document.querySelector(".edit-hint-block")
                        let neededHintBtnsBlock = ((editBtn.parentNode).parentNode).querySelector(".hint-buttons")
                        let neededHintBtnArchive = neededHintBtnsBlock.querySelector(".archiveBtn")
                        let neededHintBtnDump = neededHintBtnsBlock.querySelector(".dumpBtn")
                        let neededHintBtnMark = neededHintBtnsBlock.querySelector(".markBtn")
                        let neededHintBtnEdit = neededHintBtnsBlock.querySelector(".editBtn")
                        let neededHintBlock = ((editBtn.parentNode).parentNode)
                        let neededHintTitle = ((editBtn.parentNode).parentNode).querySelector(".hint-title").textContent
                        let neededHintCreateDate = ((editBtn.parentNode).parentNode).querySelector(".hint-date").textContent
                        let neededEachBlock = ((editBtn.parentNode).parentNode).parentNode
                        let csrftoken = $('input[name=csrfmiddlewaretoken]').val();
                        let requestURLtoEditHint = '/edithint/'

                        // Поля формы изменения заметки с подставленными значениями

                        let titleEditInput = document.querySelector('.edit-hint-title-input')
                        let dateToEditInput = document.querySelector('.edit-hint-date-to-input')
                        let cb1Edit = document.querySelector('#editcb1')
                        let cb2Edit = document.querySelector('#editcb2')
                        let cb3Edit = document.querySelector('#editcb3')
                        let cb4Edit = document.querySelector('#editcb4')
                        let cb5Edit = document.querySelector('#editcb5')

                        titleEditInput.value = neededHintTitle
                        dateToEditInput.value = neededHintTitle
                        // cb1Edit.value = neededHintCreateDate
                        // cb2Edit.value = neededHintTitle
                        // cb3Edit.value = neededHintTitle
                        // cb4Edit.value = neededHintTitle
                        // cb5Edit.value = neededHintTitle

                        // Вывод окна редактирования

                        $('.dark-block ').show(500, () => {
                            darkBlock.classList.remove("disabled-block");
                        });
                    
                        $('.edit-hint-block ').show(500, () => {
                            editHintBlock.classList.remove("disabled-block");
                        });
                    
                        darkBlock.addEventListener("click", () => {
                            $('.dark-block ').hide(500, () => {
                                darkBlock.classList.add("disabled-block");
                            });
                            
                            $('.edit-hint-block ').hide(500, () => {
                                editHintBlock.classList.add("disabled-block");
                            });
                        })

                        // Отправка данных с формы для изменения данных заметки на сервер

                        editGoBtn = document.querySelector('#editHintBtn')

                        editGoBtn.addEventListener('click', () => {

                        if (titleEditInput.value == null || titleEditInput.value == '' || dateToEditInput.value == null || dateToEditInput.value == '') {
                            alert('Заполните название заметки и дату окончания!' )

                        }else if ((titleEditInput.value).length > 64 || (cb1Edit.value).length > 64 || (cb2Edit.value).length > 64 || (cb3Edit.value).length > 64 || (cb4Edit.value).length > 64 || (cb5Edit.value).length > 64) {

                            alert('В названии заметки и подзадач не должно быть больше 64 символов!')
                            
                        }else{
                            let hintEditedTitle = titleEditInput.value
                            let hintEditedDateTo = dateToEditInput.value
                            let hintEditedCB1 = cb1Edit.value
                            let hintEditedCB2 = cb2Edit.value
                            let hintEditedCB3 = cb3Edit.value
                            let hintEditedCB4 = cb4Edit.value
                            let hintEditedCB5 = cb5Edit.value

                            $.ajax({
                                headers: {"X-CSRFToken": csrftoken},
                    
                                type: "POST",
                                url: requestURLtoEditHint,
                                data: {
                                    'title': hintEditedTitle,
                                    'date_to': hintEditedDateTo,
                                    'cb1': hintEditedCB1,
                                    'cb2': hintEditedCB2,
                                    'cb3': hintEditedCB3,
                                    'cb4': hintEditedCB4,
                                    'cb5': hintEditedCB5,
                                    'hint_id': hintID,
                                }
                            });
                            window.location.reload();
                        }
                    })
                })     
                            
                        
                    

                    // SYSTEM TO ARCHIVE THE HINT

                    let archiveBtn = document.querySelector("#archiveBtn"+g)
                    let requestURLtoArchiveHint = '/archivehint/'
                    let requestURLtoUnArchiveHint = '/unarchivehint/'

                    archiveBtn.addEventListener('click', () => {
                        let neededHintBtnsBlock = ((archiveBtn.parentNode).parentNode).querySelector(".hint-buttons")
                        let neededHintBtnArchive = neededHintBtnsBlock.querySelector(".archiveBtn")
                        let neededHintBtnDump = neededHintBtnsBlock.querySelector(".dumpBtn")
                        let neededHintBtnMark = neededHintBtnsBlock.querySelector(".markBtn")
                        let neededHintBtnEdit = neededHintBtnsBlock.querySelector(".editBtn")
                        let neededHintBlock = ((archiveBtn.parentNode).parentNode)
                        let neededHintTitle = ((archiveBtn.parentNode).parentNode).querySelector(".hint-title").textContent
                        let neededHintCreateDate = ((archiveBtn.parentNode).parentNode).querySelector(".hint-date").textContent
                        let neededEachBlock = ((archiveBtn.parentNode).parentNode).parentNode
                        let csrftoken = $('input[name=csrfmiddlewaretoken]').val();

                        $.get(requestURLtoUnArchiveHint,data={'title': neededHintTitle, 'date_to': neededHintCreateDate}, (data) => {

                            if (data == 0 ) {

                                if (neededEachBlock.querySelectorAll(".hint").length == 1) {
                                    console.log(neededEachBlock)
                                    neededEachBlock.remove();
                                    
                                    $.ajax({
                                        headers: {"X-CSRFToken": csrftoken},
                            
                                        type: "POST",
                                        url: requestURLtoArchiveHint,
                                        data: {
                                            'title': neededHintTitle,
                                            'date_to': neededHintCreateDate,
                                        }
                                    });
                                }
                                if (neededEachBlock.querySelectorAll(".hint").length > 1) {
                                    neededHintBlock.remove(); 

                                    $.ajax({
                                        headers: {"X-CSRFToken": csrftoken},
                            
                                        type: "POST",
                                        url: requestURLtoArchiveHint,
                                        data: {
                                            'title': neededHintTitle,
                                            'date_to': neededHintCreateDate,
                                        }
                                    });
                                };
                            }

                            if (data == 1 ) {

                                $.ajax({
                                    headers: {"X-CSRFToken": csrftoken},
                        
                                    type: "POST",
                                    url: requestURLtoUnArchiveHint,
                                    data: {
                                        'title': neededHintTitle,
                                        'date_to': neededHintCreateDate,
                                    }
                                });  

                            }
                            }, 'json');    
                    })    
                    
                    // SHOWING HIDEN CHECKBOXES
                    let dumpBtnForCheckboxes = document.querySelector("#dumpBtn"+g)
                    let neededHintBlock = ((dumpBtnForCheckboxes.parentNode).parentNode)
                    let openedCheckboxBlock = 0

                    neededHintBlock.addEventListener('click', () => {
                        let neededHintBtnsBlock = ((dumpBtn.parentNode).parentNode).querySelector(".hint-buttons")
                        let neededHintBtnArchive = neededHintBtnsBlock.querySelector(".archiveBtn")
                        let neededHintBtnDump = neededHintBtnsBlock.querySelector(".dumpBtn")
                        let neededHintBtnMark = neededHintBtnsBlock.querySelector(".markBtn")
                        let neededHintBtnEdit = neededHintBtnsBlock.querySelector(".editBtn")
                        let neededHintTitle = ((dumpBtn.parentNode).parentNode).querySelector(".hint-title").textContent
                        let neededHintCreateDate = ((dumpBtn.parentNode).parentNode).querySelector(".hint-date").textContent
                        let neededEachBlock = ((dumpBtn.parentNode).parentNode).parentNode
                        let CheckboxBlock = neededHintBlock.querySelector('.checkboxes')
                        


                    
                        if (openedCheckboxBlock == 0) {
                            
                            CheckboxBlock.style.display = 'block'
                            openedCheckboxBlock++ 
                            
                        }else {
                            CheckboxBlock.style.display = 'none'
                            openedCheckboxBlock-- 
                        }


                    })

                    // SYSTEM TO DELETE THE HINT

                    let requestURLtoRemoveHint = '/removehint/'
                    let dumpBtn = document.querySelector("#dumpBtn"+g)

                    dumpBtn.addEventListener('click', () => {
                        let neededHintBtnsBlock = ((dumpBtn.parentNode).parentNode).querySelector(".hint-buttons")
                        let neededHintBtnArchive = neededHintBtnsBlock.querySelector(".archiveBtn")
                        let neededHintBtnDump = neededHintBtnsBlock.querySelector(".dumpBtn")
                        let neededHintBtnMark = neededHintBtnsBlock.querySelector(".markBtn")
                        let neededHintBtnEdit = neededHintBtnsBlock.querySelector(".editBtn")
                        let neededHintBlock = ((dumpBtn.parentNode).parentNode)
                        let neededHintTitle = ((dumpBtn.parentNode).parentNode).querySelector(".hint-title").textContent
                        let neededHintCreateDate = ((dumpBtn.parentNode).parentNode).querySelector(".hint-date").textContent
                        let neededEachBlock = ((dumpBtn.parentNode).parentNode).parentNode
                        let csrftoken = $('input[name=csrfmiddlewaretoken]').val();

                        if (neededEachBlock.querySelectorAll(".hint").length == 1) {
                            neededEachBlock.remove();
                            $.ajax({
                                headers: {"X-CSRFToken": csrftoken},
                    
                                type: "POST",
                                url: requestURLtoRemoveHint,
                                data: {
                                    'id': hintID
                                }
                            }); 
                        }

                        if (neededEachBlock.querySelectorAll(".hint").length > 1) {
                            neededHintBlock.remove();
                            $.ajax({
                                headers: {"X-CSRFToken": csrftoken},
                    
                                type: "POST",
                                url: requestURLtoRemoveHint,
                                data: {
                                    'id': hintID
                                }
                            }); 
                        }
                    })
                    
                    // SYSTEM TO MARK AND UNMARK THE HINT AS IMPORTANT                

                    let markBtn = document.querySelector("#markBtn"+g)
                    markBtn.addEventListener('click', () => {
                        console.log(markBtn);
                        let neededHintBtnsBlock = ((markBtn.parentNode).parentNode).querySelector(".hint-buttons")
                        let neededHintBtnArchive = neededHintBtnsBlock.querySelector(".archiveBtn")
                        let neededHintBtnDump = neededHintBtnsBlock.querySelector(".dumpBtn")
                        let neededHintBtnMark = neededHintBtnsBlock.querySelector(".markBtn")
                        let neededHintBtnEdit = neededHintBtnsBlock.querySelector(".editBtn")
                        let neededHintBlock = ((markBtn.parentNode).parentNode)
                        let neededHintTitle = ((markBtn.parentNode).parentNode).querySelector(".hint-title").textContent
                        let neededHintCreateDate = ((markBtn.parentNode).parentNode).querySelector(".hint-date").textContent
                        let csrftoken = $('input[name=csrfmiddlewaretoken]').val();

                        let requestURLtoMarkHint = '/markhint/'
                        let requestURLtoUnMarkHint = '/unmarkhint/'
                    
                        console.log(neededHintTitle, neededHintCreateDate)

                        $.get(requestURLtoUnMarkHint,data={'title': neededHintTitle, 'date_to': neededHintCreateDate}, (data) => {
                            
                            // Если нужная статья не помечена "Важной"(is_marked = 0), то помечаем;

                            if (data == 0 ) {

                                // В блоке кода ниже - динамически меняется внешний вид заметки

                                neededHintBlock.classList.add("marked")
                                neededHintBtnArchive.src = "/static/img/archive-color.png/"
                                neededHintBtnDump.src = "/static/img/dump-color.png/"
                                neededHintBtnMark.src = "/static/img/star-yellow.png/"
                                neededHintBtnEdit.src = "/static/img/pencil-color.png/"

                                // В блоке кода ниже - отправляется POST запрос для изменения у заметки статуса "is_marked" на 1

                                $.ajax({
                                    headers: {"X-CSRFToken": csrftoken},
                        
                                    type: "POST",
                                    url: requestURLtoMarkHint,
                                    data: {
                                        'title': neededHintTitle,
                                        'date_to': neededHintCreateDate,
                                    }
                                });                         

                            }

                            if (data == 1 ) {

                                // В блоке кода ниже - динамически меняется внешний вид заметки

                                neededHintBlock.classList.remove("marked")
                                neededHintBtnArchive.src = "/static/img/archive-blue.png/"
                                neededHintBtnDump.src = "/static/img/dump-blue.png/"
                                neededHintBtnMark.src = "/static/img/star-blue.png/"
                                neededHintBtnEdit.src = "/static/img/pencil-blue.png/"

                                // В блоке кода ниже - отправляется POST запрос для изменения у заметки статуса "is_marked" на 0

                                $.ajax({
                                    headers: {"X-CSRFToken": csrftoken},
                        
                                    type: "POST",
                                    url: requestURLtoUnMarkHint,
                                    data: {
                                        'title': neededHintTitle,
                                        'date_to': neededHintCreateDate,
                                    }
                                });  

                            }
                        }, 'json');
                        
                        


                    })

                    // markBtnsDict.push(markBtn)
                    // console.log(markBtnsDict)
        
                };

            })

            
        
        }, 'json');
