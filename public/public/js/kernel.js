var selectedCard = 1;
var cardsCount = 0;
request();

function showCard(show = 1) {
    for (var index = 0; index < cardsCount; index++) {
        if (index == show) {
            $(`#cardcollapse${index}`).addClass('show');
        } else {
            $(`#cardcollapse${index}`).removeClass('show');
        }

    }
    $(`#title`).html($(`#cardbutton${show}`).text());
    selectedCard = show;
    calculate();
}

function request() {
    $.ajax({
        url: "http://priceclaculate/calculation.php",
        context: document.body
    }).done(function (data) {
        data = JSON.parse(data);
        i = 1;
        worktypes = data[0];
        taxes = data[1];
        for (var key in worktypes) {
            fillFormAndButtons(i);
            if (worktypes.hasOwnProperty(key)) {
                $(`#cardbutton${i}`).html(key);
                fillSteps(worktypes[key], i, taxes[key]);
            }
            $(`#card${i} :input`).each(function () {
                $(this).change(function () {
                    calculate();
                });
            });
            i++;
        }
        cardsCount = i;
        $(`#title`).html($(`#cardbutton1`).text());
        $(".calcbody").css("display", "block");
        $(".loader").css("display", "none");
    });
}

function fillFormAndButtons(i) {
    form = '';
    button = '';
    form =
        `<div class="collapse ${(i == 1) ? "show" : null}" id="cardcollapse${i}">
            <div class="card-body nopadding">
                <form action="" method="post" id="card${i}">
                </form>
            </div>
        </div>`;
    button =
        `<button class="btn btn-primary" type="button" onclick="showCard(${i})" id="cardbutton${i}">
        </button>`;
    $(`#switchbuttons`).append(button);
    $(`#formsplace`).append(form);
}

function fillSteps(steps, i, taxes) {
    string = '';
    for (var key in steps) {
        if (steps.hasOwnProperty(key)) {
            string +=
                `<div class="card steps">
                    <div class="card-primary card-header" id = "card-head${i}">
                        ${key}
                    </div>
                    <div class="card-body">
                        ${fillFeatures(steps[key])}
                    </div>
                </div>`;
        }
    }
    string += fillTaxes(taxes);
    $(`#card${i}`).html(string);
}


function fillFeatures(steps) {
    string = '';
    for (var key in steps) {
        if (steps.hasOwnProperty(key)) {
            item = steps[key];
            var checktype = "checkbox"
            if (item.length > 1) {
                checktype = "radio";
            }
            string +=
                `<div class="card steps">
                    <div class="card-body">
                        <h5 class="card-title">${key}</h5>
                        ${fillService(item, checktype)}
                    </div>
                </div>`;
        }
    }
    return string;
}

function fillService(steps, checktype) {
    var string = '';
    var name = steps[0].feature_id;
    for (var key in steps) {
        if (steps.hasOwnProperty(key)) {
            item = steps[key];
            string +=
                `<div class="card border-left-success shadow  borderbottom">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs descriptiontext text-success text-uppercase mb-1">${item.description}</div>
                                <label class="switch">
                                    <input type="${checktype}" name="service-${name}" data-price="${item.price}" data-price_type="${item.price_type_id}" id="service-${item.feature_id}" class="success">
                                    <span class="slider round"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>`;
        }
    }
    if (steps.length > 1) {
        string +=
            `<button type="button" class="btn btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off" onClick="disableChecked('service-${name}')">
                Забыть выбор
            </button>`
    }

    return string;
}

function fillTaxes(taxes) {
    string = '';
    taxs = '';
    for (var key in taxes) {
        if (taxes.hasOwnProperty(key)) {
            item = taxes[key];
            string +=
                `
                <input type="hidden" name="taxes-${item.taxes_id}" data-price="${item.taxes_coste}" data-price_type="3" checked>
                `;
        }
    }
    return string;
}

function disableChecked(params) {
    inputs = $(`input[name="${params}"]`);
    for (var key in inputs) {
        if (inputs.hasOwnProperty(key)) {
            item = inputs[key];
            item.checked = false;
            calculate();
        }
    }
}

function calculate() {
    var procents = 0;
    var rezult = 0;
    var price;
    $.each($(`#card${selectedCard} :input`), function () {

        if ($(this)[0].checked == true) {
            price = parseInt($(this).data("price"));
            if ([1, 2, 4, 7].includes($(this).data("price_type"))) {
                rezult += price;
            }
            if ($(this).data("price_type") == 3) {
                procents += price;
            }
        }

    });
    rezult += rezult * (procents / 100);
    $(".counter").html(rezult);
}

function validateForm() {
    errorc = 0;
    form = {};
    $("form#submitform :input").each(function () {
        if ($(this)[0].name == "") {
            return true;
        }
        var input = $(this)[0];

        if (input.value !== "") {
            form[input.name] = input.value;
            $(input).removeClass("is-invalid");
            $(input).addClass("is-valid");
        } else {
            $(input).addClass("is-invalid");
            errorc++;
        }
    });
    if (errorc == 0) {
        data = {};
        $(`#card${selectedCard} :input`).each(function (key, value) {
            if (value.checked) {
                data[value.id] = 1;
            }
        });
        data = JSON.stringify(data);
        form = JSON.stringify(form);
        $.ajax({
            type: "POST",
            url: "http://priceclaculate/submit.php",
            data: `data=${data}&form=${form}`
        }).done(function (data) {
            $('#formalert').hide();
            $('#formsuccess').show();
            $('#notifisuccess').text(data);
            $('#submitform').hide();
        }).fail(function (data) {
            data = JSON.parse(data.responseText);
            $('#notifi').text(data.notifi);
            $('#formalert').show();
            data.data.forEach(element => {
                $(`form#submitform :input[name=${element}]`).addClass("is-invalid");
            });
        });
    }
}