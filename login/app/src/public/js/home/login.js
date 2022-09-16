"use strict";


const id  = document.querySelector("#id"),
pw = document.querySelector("#pw"),
loginBtn  = document.querySelector("#button");



loginBtn.addEventListener("click", login);



function login() {
    if(!id.value) {return alert("아이디를 입력해주세요.")};
    if(!pw.value) {return alert("패스워드를 입력해주세요.")};
    const req= {
        id : id.value,
        pw : pw.value,
    };

    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body : JSON.stringify(req),
    })  .then((res) => res.json())
        .then((res) => {
            if (res.sucess) {
                location.href = "/";
            } else {
                if(res.err) return alert(res.err);
                alert(res.msg);
            }
    }).catch((err) => {
        console.error("로그인 중 에러 발생");
    });
}

