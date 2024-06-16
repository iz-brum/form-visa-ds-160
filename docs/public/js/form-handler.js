document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector('#formulario'); // Seleciona pelo ID

    // Atualizar os selects de data
    const daySelect = document.getElementById('dia_nascimento');
    const monthSelect = document.getElementById('mes_nascimento');
    const yearSelect = document.getElementById('ano_nascimento');
    const birthdateInput = document.getElementById('data_nascimento');

    form.addEventListener('https://formspree.io/f/xayrrvpn', function(event) {
        event.preventDefault(); // Evita a recarga da página

        const day = daySelect.value;
        const month = monthSelect.value;
        const year = yearSelect.value;
        const birthdate = `${day}-${month}-${year}`;
        birthdateInput.value = birthdate;

        const formData = new FormData(form);

        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        console.log("Dados do formulário:", data);

        fetch(form.action, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(processedData => {
            window.location.href = '/resumo?data=' + encodeURIComponent(JSON.stringify(processedData));
        })
        .catch(error => {
            console.error('Erro:', error);
        });
    });
});
