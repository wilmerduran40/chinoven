(function () {
  'use strict';

  // Menú móvil
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      const open = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Formulario de cotización
  const form = document.getElementById('quoteForm');
  const status = document.getElementById('formStatus');

  if (form && status) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      if (!form.checkValidity()) {
        status.textContent = 'Por favor completa los campos obligatorios.';
        status.className = 'form-status is-error';
        return;
      }

      const data = new FormData(form);
      const nombre = data.get('nombre') || '';
      const whatsapp = data.get('whatsapp') || '';
      const producto = data.get('producto') || '';
      const cantidad = data.get('cantidad') || '';
      const detalle = data.get('detalle') || '';

      // Prepara el mensaje para WhatsApp (mientras no haya backend/email configurado)
      const mensaje = [
        'Nueva solicitud de cotización - Chinoven Imports',
        'Nombre: ' + nombre,
        'WhatsApp: ' + whatsapp,
        'Producto: ' + producto,
        'Cantidad: ' + cantidad,
        detalle ? 'Detalles: ' + detalle : ''
      ].filter(Boolean).join('\n');

      const waNumber = '5800000000000'; // Reemplazar con el número real
      const waUrl = 'https://wa.me/' + waNumber + '?text=' + encodeURIComponent(mensaje);

      status.textContent = 'Enviando tu solicitud...';
      status.className = 'form-status';

      window.open(waUrl, '_blank');
      form.reset();

      setTimeout(function () {
        status.textContent = '¡Solicitud preparada! Se abrió WhatsApp para confirmar el envío.';
        status.className = 'form-status is-success';
      }, 400);
    });
  }
})();
