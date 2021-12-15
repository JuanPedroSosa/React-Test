export function CorreoEsValido(email) {
	const mail = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i;
	return mail.test(email);

}

// La función chequea que solo haya números, no puede haber símbolos .,+-
export const EsSoloNumero = (numero) => {
	const patron = /^\d*$/;
	return patron.test(numero);
}

export function CelularEsValido(numero) {
	const regexTel = /^(\(\+?\d{2,3}\)[\*|\s|\-|\.]?(([\d][\*|\s|\-|\.]?){6})(([\d][\s|\-|\.]?){2})?|(\+?[\d][\s|\-|\.]?){8}(([\d][\s|\-|\.]?){2}(([\d][\s|\-|\.]?){2})?)?)$/;
	return regexTel.test(numero/*"(11) 3322 2222"*/);
}

export function MontoEsValido(str) {
	// Verifica si la cadena es una magnitud de punto flotante con
	// 9 enteros máximo y 2 decimales maxímo.
	return (/^[0-9]{0,9}(\.[0-9]{0,2})?$/).test(str);
}
