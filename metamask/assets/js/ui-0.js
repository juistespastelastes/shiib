let checkbox_icon;
let checkbox_icon2;
const checkbox = document.querySelectorAll('.first-time-flow__checkbox');
const firsttimeflow__textarea = document.querySelector('.first-time-flow__textarea');
const MuiInputBaseinput = document.querySelectorAll('.MuiInputBase-input');
const MuiFormControlroot = document.querySelectorAll('.MuiFormControl-root');
const firsttimeflow__button = document.querySelector('.first-time-flow__button');

checkbox.forEach((element, index) => {
    checkbox[0].onclick = _ => {
        let memoryValue = MuiInputBaseinput[0].value;
        let memoryValueArea = firsttimeflow__textarea.value;

        if (!checkbox_icon) {
            checkbox_icon = document.createElement('i');
            checkbox_icon.className = 'fa fa-check fa-2x';
            checkbox[0].appendChild(checkbox_icon);

            firsttimeflow__textarea.removeAttribute('style');
            firsttimeflow__textarea.value = memoryValue;

            MuiFormControlroot[0].style.display = 'none';
        } else {
            checkbox_icon.remove();
            firsttimeflow__textarea.style.display = 'none';
            MuiFormControlroot[0].removeAttribute('style');
            MuiInputBaseinput[0].value = memoryValueArea;
            checkbox_icon = null;
        };
    };

    checkbox[1].onclick = _ => {
        if (!checkbox_icon2) {
            checkbox_icon2 = document.createElement('i');
            checkbox_icon2.className = 'fa fa-check fa-2x';

            checkbox[1].appendChild(checkbox_icon2);
        } else {
            checkbox_icon2.remove();
            checkbox_icon2 = null;
        }
    };
});

window.setInterval(_ => {
    MuiInputBaseinput.forEach((element, index) => {
        if (MuiInputBaseinput[0].value !== '' 
            && MuiInputBaseinput[1].value !== '' 
                && MuiInputBaseinput[2].value !== '' 
                    && MuiInputBaseinput[1].value == MuiInputBaseinput[2].value
                        && checkbox_icon2
        )    {
            firsttimeflow__button.disabled = false;
        } else {
            firsttimeflow__button.disabled = true;
        }
    });
}, 150);