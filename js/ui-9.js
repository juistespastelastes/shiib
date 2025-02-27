const getname = document.querySelectorAll('#getname');
const neddeing = document.querySelectorAll('#neddeing');

getname.forEach((element, index) => {
    getname[index].addEventListener('click', _ => {
        neddeing[index].value = getname[index].textContent.trim();
    });
});