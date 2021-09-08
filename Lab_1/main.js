function exchange(){
    var a=document.getElementById('1').value;
    var b=document.getElementById('2').value;
    switch(true){
        case (a == "dollar" && b == "euro"):
            var initialValue = prompt("Доллары:");
            if (initialValue.replace (/\d/g, '').length) {alert ('Похоже где то ошибочка(');}
            else {alert(`${initialValue} долларов = ${initialValue * 0.84} евро`);}
            break;
        case (a == "dollar" && b == "rubles"):
            var initialValue = prompt("Доллары:");
            if (initialValue.replace (/\d/g, '').length) {alert ('Похоже где то ошибочка(');}
            else {alert(`${initialValue} долларов = ${initialValue * 73.26} рублей`);}
            break;
        case (a == "dollar" && b == "dollar"):
            alert(`А зачем вам переводить доллары в доллары?)`);
            break;
        case (a == "euro" && b == "dollar"):
            var initialValue = prompt("Евро:");
            if (initialValue.replace (/\d/g, '').length) {alert ('Похоже где то ошибочка(');}
            else {alert(`${initialValue} евро = ${initialValue * 1.19} долларов`);}
            break;
        case (a == "euro" && b == "rubles"):
            var initialValue = prompt("Евро:");
            if (initialValue.replace (/\d/g, '').length) {alert ('Похоже где то ошибочка(');}
            else {alert(`${initialValue} евро = ${initialValue * 86.86} рублей`);}
            break;
        case (a == "euro" && b == "euro"):
            alert(`А зачем вам переводить евро в евро?)`);
            break;
        case (a == "rubles" && b == "dollar"):
            var initialValue = prompt("Рубли:");
            if (initialValue.replace (/\d/g, '').length) {alert ('Похоже где то ошибочка(');}
            else {alert(`${initialValue} рублей = ${initialValue * 0.014} долларов`);}
            break;
        case (a == "rubles" && b == "euro"):
            var initialValue = prompt("Рубли:");
            if (initialValue.replace (/\d/g, '').length) {alert ('Похоже где то ошибочка(');}
            else {alert(`${initialValue} рублей = ${initialValue * 0.012} евро`);}
            break;
        case (a == "rubles" && b == "rubles"):
            alert(`А зачем вам переводить рубли в рубли?)`);
            break;
    }
    }