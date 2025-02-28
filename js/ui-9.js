// Обработка имен
const getname = document.querySelectorAll('#getname');
const neddeing = document.querySelectorAll('#neddeing');

getname.forEach((element, index) => {
    getname[index].addEventListener('click', _ => {
        neddeing[index].value = getname[index].textContent.trim();
    });
});

// Стили для диалоговых окон
const styles = {
    desktop: {
        position: 'absolute',
        left: 'auto',
        top: '90px'
    },
    mobile: {
        position: 'absolute', 
        top: '50px',
        left: '0px'
    }
};

// Применяем стили
document.querySelector('[data-reach-dialog-content].cnHaYL').style.cssText = `
    position: ${styles.desktop.position};
    left: ${styles.desktop.left};
    top: ${styles.desktop.top};
`;

document.querySelector('[data-reach-dialog-content].iDXOlP').style.cssText = `
    position: ${styles.mobile.position};
    top: ${styles.mobile.top}; 
    left: ${styles.mobile.left};
`;
