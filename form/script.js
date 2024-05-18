const nextButton = document.querySelector           (   '.btn-next'    );
const prevButton = document.querySelector           (   '.btn-prev'    );
const steps      = document.querySelectorAll        (   '.step'        );
const form_steps = document.querySelectorAll        (   '.form-step'   );

const partnerCheckbox = document.querySelector      (   'input[name="check-partner"]'   );
const partnerNumberInput = document.querySelector   (   'input[name="partner-number"]'  );


let active = 1;

nextButton.addEventListener('click', () => {
    active++;
    if ( active > steps.length ) {
        active = steps.length;
    }
    updateProgress();
})

prevButton.addEventListener('click', () => {
    active--;
    if( active < 1 ) {
        active = 1;
    }
    updateProgress();
})

const updateProgress = () => {

    /* toggle .active class for each list item */

    steps.forEach (( step, i ) => {
        if ( i == (active -1)) {
            step.classList.add('active');
            if (form_steps[i]) {
            form_steps[i].classList.add('active');
            }
        } else {
            step.classList.remove('active');
            if (form_steps[i]) {
            form_steps[i].classList.remove('active');
            }
        }
    });

    if ( active === 1 ) {
        prevButton.disabled = true;
    } else if ( active === steps.length ) {
        nextButton.disabled = true;
    } else {
        prevButton.disabled = false;
        nextButton.disabled = false;
    }

}

updateProgress();


/* campo de texto del checkbox */

partnerCheckbox.addEventListener('change', () => {
    if (partnerCheckbox.checked) {
        partnerNumberInput.disabled = false;
    } else {
        partnerNumberInput.disabled = true;
        partnerNumberInput.value = '';
    }
});

