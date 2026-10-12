(function () {
  'use strict';

  // Factor de peso volumétrico: kg por CBM (referencia, estándar aéreo)
  const FACTOR_VOLUMETRICO = 167;

  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      const open = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  const form = document.getElementById('calcForm');
  const status = document.getElementById('calcStatus');
  const resCbm = document.getElementById('resCbm');
  const resPrecio = document.getElementById('resPrecio');
  const resPesoVol = document.getElementById('resPesoVol');

  function fmt(n, decimales) {
    return n.toLocaleString('es-VE', {
      minimumFractionDigits: decimales,
      maximumFractionDigits: decimales
    });
  }

  function num(input) {
    const v = parseFloat(input.value);
    return isNaN(v) ? NaN : v;
  }

  function calcular() {
    const precioCbm = num(form.precio);
    const cajas = num(form.cajas);
    const largo = num(form.largo);
    const ancho = num(form.ancho);
    const alto = num(form.alto);

    const valido = [precioCbm, cajas, largo, ancho, alto].every(function (v) {
      return !isNaN(v);
    }) && precioCbm >= 0 && cajas > 0 && largo > 0 && ancho > 0 && alto > 0;

    if (!valido) {
      status.textContent = 'Completa el precio por CBM, la cantidad y las medidas (mayores a 0).';
      status.className = 'form-status is-error';
      resCbm.textContent = '-';
      resPrecio.textContent = '-';
      resPesoVol.textContent = '-';
      return;
    }

    // CBM = (largo × ancho × alto en cm) / 1.000.000 × cajas
    const cbmTotal = (largo * ancho * alto) / 1000000 * cajas;
    const precioTotal = cbmTotal * precioCbm;
    const pesoVolumetrico = cbmTotal * FACTOR_VOLUMETRICO;

    resCbm.textContent = fmt(cbmTotal, 3) + ' CBM';
    resPrecio.textContent = '$' + fmt(precioTotal, 2);
    resPesoVol.textContent = fmt(pesoVolumetrico, 2) + ' kg';

    status.textContent = '';
    status.className = 'form-status';
  }

  form.addEventListener('input', calcular);
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    calcular();
  });

  calcular();
})();
