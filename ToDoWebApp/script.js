var myNodelist = document.getElementsByTagName('LI');
var i;
for (i = 0; i < myNodelist.length; i++) {
    var division = document.createElement('div');
    var span = document.createElement('SPAN');
    var txt = document.createTextNode('\u00D7');
    division.appendChild(span);
    span.className = 'close';
    span.appendChild(txt);
    myNodelist[i].appendChild(division);
}

var close = document.getElementsByClassName('close');
var i;
for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
        var div = this.parentElement.parentElement;
        div.style.display = 'none';
    };
}

var list = document.querySelector('ul');
list.addEventListener('click', function (ev) {
    console.log('clicked on ' + ev.target.tagName);
    if (ev.target.tagName === 'DIV') {
        ev.target.parentElement.classList.toggle('checked');
    }
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
    }
}, false);

function newElement () {
    var li = document.createElement('li');
    var division = document.createElement('div');
    var division2 = document.createElement('div');
    var inputValue = document.getElementById('myInput').value;
    var des = document.getElementById('des').value;
    var t = document.createTextNode(inputValue);
    var t2 = document.createTextNode(des);
    li.appendChild(t);
    li.appendChild(t2);
    if (inputValue === '' && des === '') {
        alert('You must write something!');
    } else {
        document.getElementById('myUL').appendChild(li);
    }
    document.getElementById('myInput').value = '';
    document.getElementById('des').value = '';
    var item = document.createElement('div');
    var desc = document.createElement('div');
    item.classList.add('val');
    desc.classList.add('val2');
    item.appendChild(t);
    desc.appendChild(t2);
    var span = document.createElement('SPAN');
    var txt = document.createTextNode('\u00D7');
    division.appendChild(span);
    division2.appendChild(span);
    span.className = 'close';
    span.appendChild(txt);
    li.appendChild(item);
    li.appendChild(division);
    li.appendChild(desc);
    li.appendChild(division2);
    for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            var div = this.parentElement.parentElement;
            div.style.display = 'none';
        };
    }
}