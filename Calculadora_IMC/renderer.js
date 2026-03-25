    // ── IMC Classification ───────────────────────────────────────────────────────

    const CLASIFICACIONES = [
    {
        min: 0, max: 16,
        label: 'Delgadez Severa',
        desc: 'Desnutrición grave. Se recomienda atención médica urgente.',
        color: '#ff4444',
        bg: 'rgba(255,68,68,.15)',
        emoji: '🔴'
    },
    {
        min: 16, max: 17,
        label: 'Delgadez Moderada',
        desc: 'Bajo peso moderado. Consultar con un nutriólogo o médico.',
        color: '#ff6b35',
        bg: 'rgba(255,107,53,.15)',
        emoji: '🟠'
    },
    {
        min: 17, max: 18.5,
        label: 'Bajo Peso',
        desc: 'Ligeramente por debajo del peso saludable.',
        color: '#ffd700',
        bg: 'rgba(255,215,0,.15)',
        emoji: '🟡'
    },
    {
        min: 18.5, max: 25,
        label: 'Peso Normal',
        desc: '¡Excelente! Peso dentro del rango saludable recomendado.',
        color: '#c8f55a',
        bg: 'rgba(200,245,90,.15)',
        emoji: '🟢'
    },
    {
        min: 25, max: 30,
        label: 'Sobrepeso',
        desc: 'Peso ligeramente elevado. Se recomienda actividad física y dieta balanceada.',
        color: '#ff8c00',
        bg: 'rgba(255,140,0,.15)',
        emoji: '🟡'
    },
    {
        min: 30, max: 35,
        label: 'Obesidad Grado I',
        desc: 'Obesidad leve. Riesgo moderado de enfermedades metabólicas.',
        color: '#ff6b35',
        bg: 'rgba(255,107,53,.15)',
        emoji: '🟠'
    },
    {
        min: 35, max: 40,
        label: 'Obesidad Grado II',
        desc: 'Obesidad severa. Riesgo elevado. Consultar a un médico.',
        color: '#ff4444',
        bg: 'rgba(255,68,68,.15)',
        emoji: '🔴'
    },
    {
        min: 40, max: Infinity,
        label: 'Obesidad Grado III',
        desc: 'Obesidad mórbida. Alto riesgo de complicaciones. Atención médica necesaria.',
        color: '#cc0000',
        bg: 'rgba(204,0,0,.15)',
        emoji: '🔴'
    }
    ];

    function getClasificacion(imc) {
    return CLASIFICACIONES.find(c => imc >= c.min && imc < c.max) || CLASIFICACIONES[CLASIFICACIONES.length - 1];
    }

    // IMC range for scale: 10 → 42 (mapped to 0% → 100%)
    function imcToPercent(imc) {
    const MIN = 10, MAX = 42;
    return Math.min(100, Math.max(0, ((imc - MIN) / (MAX - MIN)) * 100));
    }

    // Initials from name
    function getInitials(name) {
    return name.trim().split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase();
    }

    // Format date
    function formatDate(iso) {
    return new Date(iso).toLocaleDateString('es-MX', {
        day: '2-digit', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
    });
    }

    // ── State ────────────────────────────────────────────────────────────────────
    let records = [];

    // ── DOM refs ─────────────────────────────────────────────────────────────────
    const inpNombre   = document.getElementById('inp-nombre');
    const inpPeso     = document.getElementById('inp-peso');
    const inpAltura   = document.getElementById('inp-altura');
    const btnCalc     = document.getElementById('btn-calc');
    const resultCard  = document.getElementById('result-card');
    const resNombre   = document.getElementById('res-nombre');
    const resImc      = document.getElementById('res-imc');
    const resBadge    = document.getElementById('res-badge');
    const resDetail   = document.getElementById('res-detail');
    const scaleMarker = document.getElementById('scale-marker');
    const recordsList = document.getElementById('records-list');
    const emptyState  = document.getElementById('empty-state');
    const countBadge  = document.getElementById('count-badge');
    const btnExport   = document.getElementById('btn-export');
    const btnClose    = document.getElementById('btn-close');
    const btnMinimize = document.getElementById('btn-minimize');
    const toast       = document.getElementById('toast');

    // ── Toast ─────────────────────────────────────────────────────────────────────
    let toastTimer;
    function showToast(msg, color = '#c8f55a') {
    clearTimeout(toastTimer);
    toast.textContent = msg;
    toast.style.color = color;
    toast.classList.add('show');
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
    }

    // ── Window controls ───────────────────────────────────────────────────────────
    btnClose.addEventListener('click', () => window.imc.closeWindow());
    btnMinimize.addEventListener('click', () => window.imc.minimizeWindow());

    // ── Calculate ─────────────────────────────────────────────────────────────────
    btnCalc.addEventListener('click', calcular);
    [inpNombre, inpPeso, inpAltura].forEach(el =>
    el.addEventListener('keydown', e => { if (e.key === 'Enter') calcular(); })
    );

    async function calcular() {
    const nombre = inpNombre.value.trim();
    const peso   = parseFloat(inpPeso.value);
    const altura = parseFloat(inpAltura.value);

    if (!nombre) {
        inpNombre.focus();
        inpNombre.style.borderColor = '#ff4444';
        setTimeout(() => inpNombre.style.borderColor = '', 1500);
        showToast('⚠️  Ingresa el nombre de la persona', '#ff8c00');
        return;
    }
    if (!peso || peso <= 0 || peso > 500) {
        inpPeso.focus();
        inpPeso.style.borderColor = '#ff4444';
        setTimeout(() => inpPeso.style.borderColor = '', 1500);
        showToast('⚠️  Ingresa un peso válido (kg)', '#ff8c00');
        return;
    }
    if (!altura || altura < 50 || altura > 250) {
        inpAltura.focus();
        inpAltura.style.borderColor = '#ff4444';
        setTimeout(() => inpAltura.style.borderColor = '', 1500);
        showToast('⚠️  Ingresa una altura válida (cm)', '#ff8c00');
        return;
    }

    const alturaM = altura / 100;
    const imc = peso / (alturaM * alturaM);
    const imcStr = imc.toFixed(2);
    const cls = getClasificacion(imc);

    // Show result
    resNombre.textContent = nombre.toUpperCase();
    resImc.textContent = imcStr;
    resImc.style.color = cls.color;

    resBadge.textContent = `${cls.emoji}  ${cls.label}`;
    resBadge.style.background = cls.bg;
    resBadge.style.color = cls.color;

    resDetail.innerHTML = `${cls.desc}<br><span style="color:#555">Peso: ${peso} kg · Altura: ${altura} cm</span>`;

    // Scale marker
    const pct = imcToPercent(imc);
    scaleMarker.style.left = `${pct}%`;
    scaleMarker.style.boxShadow = `0 0 0 3px ${cls.color}`;

    resultCard.classList.add('visible');

    const record = {
        id:            crypto.randomUUID(),
        nombre,
        peso,
        altura,
        imc:           imcStr,
        clasificacion: cls.label,
        color:         cls.color,
        bg:            cls.bg,
        emoji:         cls.emoji,
        fecha:         new Date().toISOString()
    };

    const result = await window.imc.saveRecord(record);
    if (result.success) {
        records.unshift(record);
        renderRecords();
        showToast(`✓  Registro guardado para ${nombre}`);
    } else {
        showToast('✗  Error al guardar', '#ff4444');
    }
    }

    function renderRecords() {
    countBadge.textContent = `${records.length} registro${records.length !== 1 ? 's' : ''}`;

    [...recordsList.querySelectorAll('.record-item')].forEach(el => el.remove());

    if (records.length === 0) {
        emptyState.style.display = 'flex';
        return;
    }
    emptyState.style.display = 'none';

    records.forEach(r => {
        const item = document.createElement('div');
        item.className = 'record-item';
        item.dataset.id = r.id;

        item.innerHTML = `
        <div class="rec-main">
            <div class="rec-avatar" style="background:${r.bg};color:${r.color}">${getInitials(r.nombre)}</div>
            <div class="rec-info">
            <div class="rec-name">${r.nombre}</div>
            <div class="rec-meta">${r.peso} kg · ${r.altura} cm · ${formatDate(r.fecha)}</div>
            </div>
        </div>
        <div class="rec-right">
            <div>
            <div class="rec-imc" style="color:${r.color}">${r.imc}</div>
            <div class="rec-badge" style="background:${r.bg};color:${r.color}">${r.emoji} ${r.clasificacion}</div>
            </div>
            <button class="btn-delete" data-id="${r.id}" title="Eliminar">✕</button>
        </div>
        `;
        recordsList.appendChild(item);
    });

    recordsList.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        const res = await window.imc.deleteRecord(id);
        if (res.success) {
            records = records.filter(r => r.id !== id);
            renderRecords();
            showToast('Registro eliminado', '#f55a5a');
        }
        });
    });
    }

    btnExport.addEventListener('click', async () => {
    if (records.length === 0) {
        showToast('⚠️  No hay registros para exportar', '#ff8c00');
        return;
    }
    const res = await window.imc.exportCSV();
    if (res.success) {
        showToast('✓  CSV exportado correctamente');
    } else if (!res.cancelled) {
        showToast('✗  Error al exportar', '#ff4444');
    }
    });

    (async () => {
    records = await window.imc.getRecords();
    renderRecords();
    })();