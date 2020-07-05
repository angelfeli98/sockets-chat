

const events = () => {
    window.addEventListener('load', () => {
        const token = sessionStorage.getItem('token') || localStorage.getItem('token');
        if(!!!token)
            window.location.href = '/';
    })
}



const init = () => {
    events();
}

export{
    init
}