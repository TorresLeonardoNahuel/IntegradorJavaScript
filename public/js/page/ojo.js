const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password');
const miOjo = document.querySelector('#imgOjo');

togglePassword.addEventListener('click', function () {
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    if (password.type === 'text') {
        miOjo.setAttribute ('src','https://cdn-icons-png.flaticon.com/128/44/44326.png');
        miOjo.setAttribute('data-src','https://cdn-icons-png.flaticon.com/128/44/44326.png');
        miOjo.setAttribute('alt','Ojo abierto');
        miOjo.setAttribute('title','ojo abierto');
        miOjo.setAttribute('srcset','https://cdn-icons-png.flaticon.com/128/44/44326.png 4x');
    }else{
        miOjo.setAttribute ('src','https://cdn-icons-png.flaticon.com/128/8442/8442580.png');
        miOjo.setAttribute('data-src','"https://cdn-icons-png.flaticon.com/128/8442/8442580.png');
        miOjo.setAttribute('alt','Ojo cerrado');
        miOjo.setAttribute('title','ojo cerrado');
        miOjo.setAttribute('srcset','https://cdn-icons-png.flaticon.com/128/8442/8442580.png 4x');
    }
});