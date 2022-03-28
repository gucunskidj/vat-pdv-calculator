const form = document.querySelector('#form');
const iznos = document.querySelector('#iznos');
const stopa = document.querySelector('#stopa');
const iznosPDV = document.querySelector('#iznos-pdv');
const iznosKonacan = document.querySelector('#iznos-konacan');
const saberi = document.querySelector('#saberi');
const oduzmi = document.querySelector('#oduzmi');

form.addEventListener('submit', (e) => {
	e.preventDefault();

	proveriIznosIzracunajPDV();
});

oduzmi.addEventListener('click', (e) => {
	e.preventDefault();
	const iznosVrednost = Number(iznos.value);
	const iznosPdvVrednost = Number(iznosPDV.value);

	if (iznosVrednost !== '' && iznosVrednost >= 1 && iznosPDV.value !== '') {
		iznosKonacan.value = (iznosVrednost - iznosPdvVrednost).toFixed(2);
		setSuccess(iznos);
	} else if (iznosPDV.value === '') {
		setError(iznos, 'Morate prvo izračunati PDV');
	} else {
		setError(iznos, 'Morate prvo izračunati PDV');
		iznosPDV.value = '';
		iznosKonacan.value = '';
	}
});

saberi.addEventListener('click', (e) => {
	e.preventDefault();
	const iznosVrednost = Number(iznos.value);
	const iznosPdvVrednost = Number(iznosPDV.value);

	if (iznosVrednost !== '' && iznosVrednost >= 1 && iznosPDV.value !== '') {
		iznosKonacan.value = (iznosVrednost + iznosPdvVrednost).toFixed(2);
		setSuccess(iznos);
	} else if (iznosPDV.value === '') {
		setError(iznos, 'Morate prvo izračunati PDV');
	} else {
		setError(iznos, 'Morate prvo izračunati PDV');
		iznosPDV.value = '';
		iznosKonacan.value = '';
	}
});

const izracunajPDV = (iznos, stopa) => {
	if (stopa === 'opsta') {
		iznosPDV.value = (iznos * 0.2).toFixed(2);
	}

	if (stopa === 'posebna') {
		iznosPDV.value = (iznos * 0.1).toFixed(2);
	}
};

const setError = (element, message) => {
	const inputControl = element.parentElement;
	const errorDisplay = inputControl.querySelector('.error');

	errorDisplay.innerText = message;
	inputControl.classList.add('error');
	inputControl.classList.remove('success');
};

const setSuccess = (element) => {
	const inputControl = element.parentElement;
	const errorDisplay = inputControl.querySelector('.error');

	errorDisplay.innerText = '';
	inputControl.classList.add('success');
	inputControl.classList.remove('error');
};

const proveriIznosIzracunajPDV = () => {
	const iznosVrednost = iznos.value.trim();
	const stopaPDV = stopa.value;

	if (iznosVrednost === '') {
		setError(iznos, 'Morate uneti iznos za računanje PDV-a');
		iznosPDV.value = '';
		iznosKonacan.value = '';
	} else if (iznosVrednost < 0) {
		setError(iznos, 'Iznos mora biti pozitivan broj');
		iznosPDV.value = '';
		iznosKonacan.value = '';
	} else if (iznosVrednost < 1) {
		setError(iznos, 'Minimalna vrednost iznosa mora bit 1');
		iznosPDV.value = '';
		iznosKonacan.value = '';
	} else {
		setSuccess(iznos);
		izracunajPDV(iznosVrednost, stopaPDV);
	}
};
