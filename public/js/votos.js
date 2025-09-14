// public/js/votos.js
document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', async (ev) => {
        const btn = ev.target.closest('.btn-votar-tema');
        if (!btn) return; // no es un click al botón de votar

        const li = btn.closest('.tema');
        if (!li) return;

        const id = li.dataset.id;

        try {
        btn.disabled = true;

        // Llamada AJAX al endpoint montado en /temas
        const r = await fetch(`/temas/${id}/votar`, { method: 'POST' });
        const data = await r.json(); // -> { ok:true, votos:<num> }

        if (!data.ok) throw new Error(data.error || 'No se pudo votar');

        // Actualizar número de votos en el DOM (dentro del mismo <li>)
        const votosSpan = li.querySelector('span.votos');
        if (votosSpan) {
            votosSpan.textContent = String(data.votos);
        }
        // Actualizar atributo para poder reordenar
        li.dataset.votos = String(data.votos);

        // Reordenar la lista por votos desc
        const lista = document.querySelector('#lista-temas');
        if (lista) {
            const items = Array.from(lista.children);
            items.sort((a, b) => Number(b.dataset.votos) - Number(a.dataset.votos));
            items.forEach(it => lista.appendChild(it));
        }
        } catch (err) {
        console.error(err);
        alert('Ocurrió un error al votar. Intentá de nuevo.');
        } finally {
        btn.disabled = false;
        }
    });
});
