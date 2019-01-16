let token = readCookie("token");
var root = document.querySelectorAll("#root");
if (!token) {
    

    root[0].innerHTML = "";

    root[0].innerHTML += `
    <form action="" method="post">
        <div>
            <label for="username">Usernaam:</label>
            <input type="text" name="username" id="username">
        </div>
        <div>
            <label for="password">Wachtwoord:</label>
            <input type="password" name="password" id="password">
        </div>
        <div>
            <label for="remember-me">Onthoudt mij</label>
            <input type="checkbox" name="remember-me" id="remember-me">
            <br>
        </div>
        
        
        <input type="submit" value="Log in">
    </form>`

    const loginForm = document.querySelectorAll('form');

    
    let submitBtn = loginForm[0].children[3];
    

    submitBtn.addEventListener("click", function(e) {
        e.preventDefault()
        let userName = loginForm[0].children[0].children[1].value;
        let password = loginForm[0].children[1].children[1].value;
        let rememberMe = loginForm[0].children[2].children[1].checked;
        
        var data = {
            username: userName,
            password: password
        }
        
        loginFunc(data);

        console.log(data)
     
    })
}

function loginFunc(data) {
    fetch("http://127.0.0.1:8000/api/auth/token/?format=json", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(function (res) {
            return res.json()
        })
        .then(function (jsonData) {
            if (jsonData.token) {
                createCookie("token", jsonData.token, 365);
            } else {
                console.log("login failed")
            }
        })
}

function createCookie(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        expires = "; expires="+date.toGMTString();
    }
    else {
        expires = "";
    }
    document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1,c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length,c.length);
        }
    }
    return null;
}