let inputField = document.getElementById('inputField');
let resultField = document.getElementById('resultField');
let docE =  document.documentElement;
let saveStatus = document.getElementById('saveStatus');
var lastTheme = localStorage.getItem('theme');
var lastFontSize = localStorage.getItem('fontSize');
var statusTimer = 0;

function updateStatus (input)
{
    saveStatus.innerHTML = input;
    statusTimer = 0;
}

function support() {
    var alertMessage = "از ارسال پیام مربوط به سامانه آموزشیار خودداری کنید. این برنامه تنها ابزاری برای تبدیل متن است و هیچ وابستگی‌ای به سامانه ندارد.\nTelegram: AntiqueOcean";
    alert(alertMessage);
}

function switchTheme() {

   if (String(docE.getAttribute("class")).indexOf('dark') != -1) {
        docE.setAttribute('class', String(docE.getAttribute("class")).replace('dark', 'light'));
        localStorage.setItem('theme', 'light');
    }
    else {
        docE.setAttribute('class', String(docE.getAttribute("class")).replace('light', 'dark'));
        localStorage.setItem('theme', 'dark');
    }

}

function fontUp() {
    if (String(docE.getAttribute("class")).indexOf('small') != -1) {
        docE.setAttribute('class', String(docE.getAttribute("class")).replace('small', 'medium'));
        localStorage.setItem('fontSize', 'medium');
    }
    else if (String(docE.getAttribute("class")).indexOf('medium') != -1) {
        docE.setAttribute('class', String(docE.getAttribute("class")).replace('medium', 'big'));
        localStorage.setItem('fontSize', 'big');
    }
    else if (String(docE.getAttribute("class")).indexOf('big') != -1) {
        docE.setAttribute('class', String(docE.getAttribute("class")).replace('big', 'huge'));
        localStorage.setItem('fontSize', 'huge');
    }
}

function copy(input) {
    updateStatus('کپی شد.');
    let tempstr = document.getElementById(String(input)).innerHTML;

    navigator.clipboard.writeText(tempstr);
  }

function fontDown() {
    if (String(docE.getAttribute("class")).indexOf('huge') != -1) {
        docE.setAttribute('class', String(docE.getAttribute("class")).replace('huge', 'big'));
        localStorage.setItem('fontSize', 'big');
    }
    else if (String(docE.getAttribute("class")).indexOf('big') != -1) {
        docE.setAttribute('class', String(docE.getAttribute("class")).replace('big', 'medium'));
        localStorage.setItem('fontSize', 'medium');
    }
    else if (String(docE.getAttribute("class")).indexOf('medium') != -1) {
        docE.setAttribute('class', String(docE.getAttribute("class")).replace('medium', 'small'));
        localStorage.setItem('fontSize', 'small');
    }
}


function convert(input)
{
    var removeOne = false;
    if (input[input.length-1] === ' ')
        removeOne = true;
    let result = "%";
    for (var i = 0; i < input.length; i++)
    {
        if (input[i] === ' ' || input[i] === 'ی' || input[i] === 'ي' || input[i] === 'ک' || input[i] === 'ك')
            result += '%';
        else if (input[i] === 'ـ')
            continue;
        else
            result += input[i];
    }

    if (!removeOne) result += '%';
    return result;
}

function refreshList() {
    document.getElementById('list').innerHTML = '';
    for (var i = 0; i < localStorage.length; i++)
    {   
        if (localStorage.key(i).indexOf("درس") != -1){
            tempstr = localStorage.getItem(localStorage.key(i));
            document.getElementById('list').innerHTML = document.getElementById('list').innerHTML +
            "<div class=\"list-item\"> <button onclick=\"copy('item" + i + "');\" class=\"mainItem\"> <a id=\"item" + i + "\">" + tempstr + "</a> <a>کپی</a> </button>\
            <button class=\"remove\" onclick=\"removeItem(\'" + localStorage.key(i) + "\');\">✘</button> </div>";  
        }
    }
}
refreshList();

function addItem() {
    if (localStorage.getItem('درس ' + inputField.value) != null) {
        //localStorage.removeItem('درس ' + inputField.value);
        updateStatus ('آیتم از پیش وجود دارد.');
    }
    else {
        updateStatus ('آیتم ذخیره شد.');
    }
    localStorage.setItem('درس ' + inputField.value, convert(inputField.value));
    refreshList();
    
}

function removeItem(input) {
    localStorage.removeItem(input);
    refreshList();
    updateStatus ('آیتم حذف شد.');
}

function loop() {
    resultField.innerHTML = convert(inputField.value);
    if (statusTimer >= 2000)
        saveStatus.innerHTML = '';
    statusTimer += 250;
}
setInterval(loop, 250);

///at start
{     
    if (lastTheme != null)
    {
        if (lastTheme === 'light')
            switchTheme();   
    } else {
        localStorage.setItem('theme', 'dark');
    }

    if (lastFontSize != null)
    {
        docE.setAttribute('class', String(docE.getAttribute("class")).replace('medium', lastFontSize));
    } else localStorage.setItem('fontSize', 'medium');
    var alertMessage = "این برنامه به طور مستقل و جدا از تیم توسعه و پشتیبانی سامانه آموزشیار ساخته شده است. از ارسال تیکت پشتیبانی مربوط به سامانه، خودداری کنید.";
    if (localStorage.getItem("isTabdilyaarFirstTime") === null) {
        localStorage.setItem("isTabdilyaarFirstTime", "false");
        alert (alertMessage);
        if (isAndroid)
            NativeAndroid.showAndroidMessage("توجه!", alertMessage, "فهمیدم");
    }
}