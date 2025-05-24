document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('inscripcionForm');
    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

        try {
            const formData = {
                nombre: form.Nombre.value.trim(),
                edad: parseInt(form.Edad.value),
                nombreTutor: form.Tutor.value.trim(),
                email: form.Email.value.trim(),
                telefono: form.Telefono.value.trim(),
                periodo: form.Periodo.value,
                observaciones: form.Observaciones.value.trim(),
            };

            const response = await fetch('http://localhost:3000/enviar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.mensaje);
                form.reset();
            } else {
                throw new Error(result.mensaje || 'Error en el servidor');
            }
        } catch (err) {
            alert('Error: ' + err.message);
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar solicitud';
        }
    });

    function validateForm() {
        let isValid = true;
        clearErrors();

        const edad = parseInt(form.Edad.value);
        if (isNaN(edad)) {
            showError(form.Edad, 'Edad no válida');
            isValid = false;
        } else if (edad < 3 || edad > 14) {
            showError(form.Edad, 'Edad debe ser entre 3 y 14 años');
            isValid = false;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.Email.value)) {
            showError(form.Email, 'Email no válido');
            isValid = false;
        }

        if (!/^[679]\d{8}$/.test(form.Telefono.value)) {
            showError(form.Telefono, 'Teléfono móvil no válido');
            isValid = false;
        }

        return isValid;
    }

    function showError(field, message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.color = '#dc3545';
        errorElement.style.fontSize = '0.9rem';
        errorElement.style.marginTop = '0.25rem';
        
        field.parentElement.appendChild(errorElement);
        field.classList.add('error-border');
    }

    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(e => e.remove());
        document.querySelectorAll('.error-border').forEach(e => e.classList.remove('error-border'));
    }
});
