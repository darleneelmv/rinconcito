/* Rinconcito Dulcesito — datos, ilustraciones y conexión con la nube.
   Lo usan index.html (clientes) y admin.html (panel). */
(function () {
  'use strict';

  /* ---------- Paleta tomada del logo ---------- */
  const COLORES = {
    chocolate: '#2A140D',
    cacao: '#5B2A18',
    fresa: '#FF3D7F',
    algodon: '#FFC2D4',
    leche: '#FFEDF2',
    caramelo: '#F29A2E',
    mermelada: '#D7193A',
    limon: '#D9F27A'
  };

  const CATEGORIAS = ['Pays', 'Gelatinas', 'Bebidas', 'Donas', 'Postres', 'Pasteles'];

  const CONFIG_BASE = {
    whatsapp: '524381113112',
    instagram: 'rinconcito_dulcesito',
    horario: 'Lunes a viernes',
    zona: 'Puruándiro, Michoacán',
    aviso: 'Todo se prepara por pedido. Escríbenos con 1 día de anticipación para pasteles y pays.'
  };

  /* ---------- Textos de la página (se editan en el panel, pestaña Página) ---------- */
  const TEXTOS_BASE = {
    hero_brocha: 'dulce, atrevido y hecho por pedido',
    hero_t1: 'El antojo', hero_t2: 'manda',
    hero_sub: 'Pays, gelatinas, donas, bebidas y pasteles hechos en Puruándiro. Tú pides, nosotros lo llevamos a tu casa.',
    st_envio: 'Envío a domicilio', st_pedido: 'Hecho por pedido',
    cintas: 'Pays de queso, Gelatina de kéfir, Donas con Oreo, Fresa con tapioca, Pasteles, Postres en vaso, Envío a domicilio',
    man_brocha: 'lo que sí lleva',
    manifiesto: 'Fresa de verdad. *Mermelada casera. Kéfir con probióticos. Nada se queda en vitrina: *todo se hace por pedido y llega fresco a tu puerta.',
    pas_brocha: 'recién salidos del horno', pas_t1: 'Pasteles', pas_t2: 'nuevos', st_pasteles: 'Pídelo un día antes',
    menu_brocha: 'todo lo que hacemos', menu_t1: 'El menú', menu_t2: 'completo',
    pasos_brocha: 'fácil, como debe ser', pasos_t1: 'Así pides',
    paso1_t: 'Arma tu pedido', paso1_p: 'Toca el + en lo que se te antoje. Puedes mezclar pays, bebidas y donas.',
    paso2_t: 'Mándalo por WhatsApp', paso2_p: 'Se escribe solito con tu lista y total. Te confirmamos fecha y hora.',
    paso3_t: 'Recíbelo en casa', paso3_p: 'Te lo llevamos en Puruándiro o pasas por él. Pasteles y pays, con un día de anticipación.',
    fin_brocha: 'aquí te esperamos', fin_t1: '¿Se te', fin_t2: 'antojó?',
    escenas: {
      Pays: { t1: 'Pay de', t2: 'queso', brocha: 'la estrella de la casa', st: 'Versión light' },
      Gelatinas: { t1: 'Gelatina', t2: 'de kéfir', brocha: 'con probióticos', st: 'Endulzada con 0 cal' },
      Bebidas: { t1: 'Fresa', t2: 'con tapioca', brocha: 'bien fría, para la tarde', st: 'Litro o medio' },
      Donas: { t1: 'Donas', t2: 'glaseadas', brocha: 'con galleta Oreo', st: 'Recién hechas' },
      Postres: { t1: 'Postres', t2: 'en vaso', brocha: 'las favoritas de todos', st: 'Súper chocolate' }
    },
    portada: ['dona-oreo', 'bebida-fresa', 'pay-mermelada'],
    final: 'pastel-tresleches'
  };
  function textos(config) {
    const t = (config && config.textos) || {};
    const r = Object.assign({}, TEXTOS_BASE, t);
    r.escenas = {};
    Object.keys(TEXTOS_BASE.escenas).concat(Object.keys(t.escenas || {})).forEach((k) => {
      r.escenas[k] = Object.assign({}, TEXTOS_BASE.escenas[k] || {}, (t.escenas || {})[k] || {});
    });
    Object.keys(r).forEach((k) => { if (typeof r[k] === 'string' && !r[k].trim()) r[k] = TEXTOS_BASE[k]; });
    return r;
  }

  /* ---------- Menú inicial (lo que ya vendes + pasteles nuevos) ----------
     p = precio de venta, c = costo estimado de ingredientes y empaque.
     Todo se puede cambiar desde el panel. */
  const PRODUCTOS_BASE = [
    {
      id: 'pay-light', nombre: 'Pay de queso light', cat: 'Pays', color: '#FFC2D4',
      desc: 'Cremoso, ligero y con fresas frescas encima. El clásico de la casa.',
      ilus: { t: 'pay', v: 'fresas' }, tags: ['Light'], destacado: true, nuevo: false, disponible: true,
      opciones: [{ n: 'Entero', p: 220, c: 95 }], foto: '',
      notas: 'Costo estimado: queso crema 2 barras $64, galleta María $17, mantequilla $12, huevo $8, endulzante $6, fresas $10, molde aluminio $6. Ajusta a tus precios reales.'
    },
    {
      id: 'pay-mermelada', nombre: 'Pay de queso con mermelada casera', cat: 'Pays', color: '#FF3D7F',
      desc: 'Nuestro pay light cubierto de mermelada de fresa hecha en casa, sin azúcar.',
      ilus: { t: 'pay', v: 'mermelada' }, tags: ['Light', 'Sin azúcar'], destacado: false, nuevo: false, disponible: true,
      opciones: [{ n: 'Entero', p: 240, c: 105 }], foto: '', notas: ''
    },
    {
      id: 'pay-almendra', nombre: 'Pay de queso light con almendras', cat: 'Pays', color: '#F29A2E',
      desc: 'Base crujiente, relleno suave y almendra fileteada tostada encima.',
      ilus: { t: 'pay', v: 'almendra' }, tags: ['Light'], destacado: false, nuevo: false, disponible: true,
      opciones: [{ n: 'Entero', p: 240, c: 112 }], foto: '', notas: ''
    },
    {
      id: 'gelatina-kefir', nombre: 'Gelatina de kéfir con fresa', cat: 'Gelatinas', color: '#2A140D',
      desc: 'Llena de probióticos, con mermelada de fresa natural endulzada con 0 calorías.',
      ilus: { t: 'gelatina', v: 'fresa' }, tags: ['Probióticos', 'Sin azúcar'], destacado: true, nuevo: false, disponible: true,
      opciones: [{ n: 'Entera', p: 200, c: 85 }, { n: 'Rebanada', p: 30, c: 11 }], foto: '', notas: ''
    },
    {
      id: 'bebida-fresa', nombre: 'Bebida cremosa de fresa con tapioca', cat: 'Bebidas', color: '#FF8FB1',
      desc: 'Fresa natural, tapioca suave, gelatina de coco y gelatina de fresa.',
      ilus: { t: 'bebida', v: 'fresa' }, tags: ['Fría'], destacado: true, nuevo: false, disponible: true,
      opciones: [{ n: 'Litro', p: 60, c: 22 }, { n: 'Medio litro', p: 35, c: 13 }], foto: '', notas: ''
    },
    {
      id: 'dona-oreo', nombre: 'Donas glaseadas con Oreo', cat: 'Donas', color: '#2A140D',
      desc: 'Esponjosas, con glaseado blanco y galleta Oreo triturada.',
      ilus: { t: 'dona', v: 'oreo' }, tags: [], destacado: true, nuevo: false, disponible: true,
      opciones: [{ n: 'Pieza', p: 25, c: 8 }, { n: 'Media docena', p: 140, c: 48 }], foto: '',
      notas: 'Precio de ejemplo: confírmalo o cámbialo.'
    },
    {
      id: 'hersheys-oreo', nombre: "Postre Hershey's con Oreo", cat: 'Postres', color: '#F29A2E',
      desc: "Capas de chocolate Hershey's, crema y galleta Oreo. Las favoritas de todos.",
      ilus: { t: 'vaso', v: 'chocolate' }, tags: ['Súper chocolate'], destacado: true, nuevo: false, disponible: true,
      opciones: [{ n: 'Vaso', p: 55, c: 22 }], foto: '',
      notas: 'Precio de ejemplo: confírmalo o cámbialo.'
    },

    /* ----- Pasteles nuevos: fáciles de hacer, margen cercano al 50% ----- */
    {
      id: 'pastel-tresleches', nombre: 'Tres leches de fresa', cat: 'Pasteles', color: '#2A140D',
      desc: 'Bizcocho empapado en tres leches, chantilly y fresas frescas.',
      ilus: { t: 'pastel', v: 'fresa' }, tags: ['10 porciones'], destacado: true, nuevo: true, disponible: true,
      opciones: [{ n: 'Mediano (10 p.)', p: 350, c: 175 }], foto: '',
      notas: 'RECETA FÁCIL (molde 20 cm)\n1. Bate 4 huevos con 150 g de azúcar hasta que esponjen; agrega 150 g de harina con 1 cdita de polvo para hornear y vainilla, en forma envolvente.\n2. Hornea 30 min a 180 °C. Deja enfriar y pica con un tenedor.\n3. Licúa 1 lechera + 1 evaporada + 1 media crema y empapa el bizcocho.\n4. Cubre con 250 ml de chantilly batido y fresas en mitades. Refrigera 3 h.\n\nCOSTO: huevo $16, azúcar $4, harina $5, lechera $32, evaporada $22, media crema $20, chantilly $25, fresas $22, vainilla $3, gas $8, base y domo $18 = $175.'
    },
    {
      id: 'pastel-chocolate', nombre: 'Pastel de chocolate húmedo', cat: 'Pasteles', color: '#F29A2E',
      desc: 'De un solo tazón, súper húmedo y bañado en ganache de chocolate.',
      ilus: { t: 'pastel', v: 'chocolate' }, tags: ['12 porciones'], destacado: false, nuevo: true, disponible: true,
      opciones: [{ n: 'Mediano (12 p.)', p: 300, c: 153 }], foto: '',
      notas: 'RECETA FÁCIL (molde 22 cm)\n1. En un tazón mezcla 250 g harina, 300 g azúcar, 70 g cocoa, 1 cdita bicarbonato y 1 de polvo para hornear.\n2. Agrega 2 huevos, 250 ml leche, 120 ml aceite y 250 ml de café caliente. Mezcla hasta integrar.\n3. Hornea 40 min a 175 °C.\n4. Ganache: calienta 1 media crema y vierte sobre 200 g de chocolate semiamargo; mezcla y baña el pastel frío.\n\nCOSTO: harina $8, cocoa $16, azúcar $9, huevo $8, leche $7, aceite $6, café $3, polvos $3, chocolate $45, media crema $20, gas $10, base y caja $18 = $153.'
    },
    {
      id: 'pastel-oreo', nombre: 'Pastel frío de Oreo', cat: 'Pasteles', color: '#FFC2D4',
      desc: 'Sin horno: base de Oreo, relleno cremoso de queso y galletas encima.',
      ilus: { t: 'pastel', v: 'oreo' }, tags: ['Sin horno', '10 porciones'], destacado: false, nuevo: true, disponible: true,
      opciones: [{ n: 'Mediano (10 p.)', p: 360, c: 185 }], foto: '',
      notas: 'RECETA FÁCIL (molde 20 cm, sin horno)\n1. Tritura 2 paquetes de Oreo con 90 g de mantequilla derretida y presiona en el molde.\n2. Hidrata 1 sobre de grenetina en 1/4 taza de agua y derrítela.\n3. Licúa 1 barra de queso crema, 1 lechera, 1 media crema y la grenetina. Agrega 1 paquete de Oreo en trozos.\n4. Vierte, decora con Oreo enteras y refrigera 4 h.\n\nCOSTO: Oreo 3 paquetes $60, mantequilla $15, queso crema $32, lechera $32, media crema $20, grenetina $8, base y domo $18 = $185.'
    },
    {
      id: 'chocoflan', nombre: 'Chocoflan', cat: 'Pasteles', color: '#D7193A',
      desc: 'El pastel imposible: chocolate abajo, flan arriba y cajeta escurriendo.',
      ilus: { t: 'pastel', v: 'chocoflan' }, tags: ['12 porciones'], destacado: false, nuevo: true, disponible: true,
      opciones: [{ n: 'Molde rosca (12 p.)', p: 350, c: 173 }], foto: '',
      notas: 'RECETA FÁCIL (molde de rosca 24 cm)\n1. Unta el molde con mantequilla y 1/2 frasco de cajeta.\n2. Prepara una mezcla de pastel de chocolate (harina 200 g, cocoa 50 g, azúcar 200 g, 2 huevos, 250 ml leche, 60 ml aceite) y viértela.\n3. Licúa 1 lechera, 1 evaporada, 4 huevos y vainilla; vierte con cuidado encima (se acomoda solo).\n4. Hornea a baño María 1 h 10 min a 180 °C, cubierto con aluminio. Enfría y desmolda.\n\nCOSTO: harina $7, cocoa $12, azúcar $6, huevo $24, leche $7, aceite $5, lechera $32, evaporada $22, cajeta $25, vainilla $3, gas $12, base y caja $18 = $173.'
    },
    {
      id: 'carlota-limon', nombre: 'Carlota de limón', cat: 'Pasteles', color: '#D9F27A',
      desc: 'Sin horno: capas de galleta María y crema de limón bien fresquita.',
      ilus: { t: 'pastel', v: 'limon' }, tags: ['Sin horno', '10 porciones'], destacado: false, nuevo: true, disponible: true,
      opciones: [{ n: 'Mediana (10 p.)', p: 260, c: 118 }], foto: '',
      notas: 'RECETA FÁCIL (molde 20 cm, sin horno)\n1. Licúa 1 lechera, 1 evaporada y el jugo de 6 limones hasta que espese.\n2. En el molde alterna capas de galleta María y crema (4 a 5 capas).\n3. Decora con ralladura y rodajas de limón. Refrigera 4 h.\n\nCOSTO: galleta María 2 paquetes $34, lechera $32, evaporada $22, limones $10, ralladura/decoración $2, base y domo $18 = $118.'
    }
  ];

  /* ---------- Utilidades ---------- */
  const dinero = (n) => '$' + Math.round(Number(n) || 0).toLocaleString('es-MX');
  const copia = (o) => JSON.parse(JSON.stringify(o));
  const hoy = () => {
    const d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  };
  const nuevoId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const memoria = {
    leer(k, def) { try { const v = localStorage.getItem('rd_' + k); return v ? JSON.parse(v) : def; } catch (e) { return def; } },
    guardar(k, v) { try { localStorage.setItem('rd_' + k, JSON.stringify(v)); return true; } catch (e) { return false; } }
  };

  /* ================================================================
     ILUSTRACIONES SVG de cada producto (ligeras, sin fotos)
     ================================================================ */
  let contador = 0;
  function rng(seed) {
    let a = seed >>> 0;
    return function () {
      a |= 0; a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const f = (n) => Math.round(n * 10) / 10;

  // Contorno "ondulado" suave alrededor de una elipse
  function onda(cx, cy, rx, ry, amp, n, seed) {
    const r = rng(seed); const pts = [];
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2; const k = 1 + (r() - 0.5) * amp;
      pts.push([cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k]);
    }
    let d = 'M' + f(pts[0][0]) + ' ' + f(pts[0][1]);
    for (let i = 0; i < n; i++) {
      const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
      d += ' C' + f(p1[0] + (p2[0] - p0[0]) / 6) + ' ' + f(p1[1] + (p2[1] - p0[1]) / 6) + ' ' +
        f(p2[0] - (p3[0] - p1[0]) / 6) + ' ' + f(p2[1] - (p3[1] - p1[1]) / 6) + ' ' + f(p2[0]) + ' ' + f(p2[1]);
    }
    return d + 'Z';
  }

  // Escurrido (chocolate, mermelada, cajeta) sobre el borde frontal de una elipse
  function escurrido(cx, cy, rx, ry, seed, largo, ancho) {
    const r = rng(seed); const pasos = 26; let d = '';
    const borde = [];
    for (let i = 0; i <= pasos; i++) {
      const a = Math.PI - (i / pasos) * Math.PI;
      borde.push([cx + Math.cos(a) * rx, cy + Math.sin(a) * ry]);
    }
    d = 'M' + f(borde[0][0]) + ' ' + f(borde[0][1] - 4);
    for (let i = 0; i <= pasos; i++) {
      const [x, y] = borde[i];
      if (i > 0 && i < pasos && r() > 0.42) {
        const w = ancho * (0.6 + r() * 0.6), L = largo * (0.35 + r());
        d += ' L' + f(x - w) + ' ' + f(y) + ' L' + f(x - w) + ' ' + f(y + L) +
          ' A' + f(w) + ' ' + f(w) + ' 0 0 0 ' + f(x + w) + ' ' + f(y + L) + ' L' + f(x + w) + ' ' + f(y);
      } else d += ' L' + f(x) + ' ' + f(y + 3);
    }
    for (let i = pasos; i >= 0; i--) d += ' L' + f(borde[i][0]) + ' ' + f(borde[i][1] - 10);
    return d + 'Z';
  }

  function fresaEntera(x, y, s, rot, id) {
    const sem = [];
    const r = rng(Math.round(x * 7 + y * 13));
    for (let i = 0; i < 9; i++) sem.push(`<ellipse cx="${f((r() - 0.5) * 14)}" cy="${f(-4 + r() * 16)}" rx="1.1" ry="1.7" fill="#ffe08a" opacity=".9"/>`);
    return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">
      <path d="M0 -14 C11 -15 16 -5 12 6 C9 14 3 19 0 19 C-3 19 -9 14 -12 6 C-16 -5 -11 -15 0 -14Z" fill="url(#${id}fr)"/>
      ${sem.join('')}
      <path d="M0 -13 L-9 -19 L-3 -14 L-6 -22 L0 -15 L6 -22 L3 -14 L9 -19Z" fill="#3fa34d"/>
      <ellipse cx="-5" cy="-5" rx="3" ry="5" fill="#fff" opacity=".35"/></g>`;
  }
  function fresaMitad(x, y, s, rot, id) {
    return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">
      <path d="M0 -14 C11 -15 16 -5 12 6 C9 14 3 19 0 19 C-3 19 -9 14 -12 6 C-16 -5 -11 -15 0 -14Z" fill="url(#${id}fr)"/>
      <path d="M0 -8 C6 -9 9 -3 7 4 C5 9 2 12 0 12 C-2 12 -5 9 -7 4 C-9 -3 -6 -9 0 -8Z" fill="#ffd2d9"/>
      <path d="M0 -6 L0 10" stroke="#ff8fa3" stroke-width="1.5"/>
      <path d="M-4 -15 L0 -12 L4 -15" stroke="#3fa34d" stroke-width="3" fill="none" stroke-linecap="round"/></g>`;
  }
  function galletaOreo(x, y, s, rot) {
    return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">
      <ellipse cx="0" cy="5" rx="22" ry="22" fill="#1c1414"/>
      <ellipse cx="0" cy="2" rx="22" ry="22" fill="#2e2323"/>
      <ellipse cx="0" cy="2" rx="15" ry="15" fill="none" stroke="#3d3030" stroke-width="2"/>
      <path d="M-8 -6 L8 10 M8 -6 L-8 10 M0 -10 L0 14" stroke="#3d3030" stroke-width="2"/>
      <ellipse cx="-7" cy="-7" rx="6" ry="3" fill="#fff" opacity=".12"/></g>`;
  }

  function defsComunes(id) {
    return `<radialGradient id="${id}fr" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#ff6b7a"/><stop offset=".6" stop-color="#e3172f"/><stop offset="1" stop-color="#9e0a1d"/></radialGradient>
      <linearGradient id="${id}lado" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".28"/><stop offset=".25" stop-color="#000" stop-opacity="0"/><stop offset=".7" stop-color="#fff" stop-opacity=".08"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient>
      <linearGradient id="${id}brillo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>`;
  }

  function pay(v, id) {
    let ranuras = '';
    for (let t = -0.95; t <= 0.951; t += 0.095) {
      const s1 = Math.sqrt(1 - t * t);
      ranuras += `<line x1="${f(200 + 152 * t)}" y1="${f(200 + 64 * s1)}" x2="${f(200 + 128 * t)}" y2="${f(266 + 30 * s1)}" stroke="#6f767e" stroke-opacity=".28" stroke-width="2"/>`;
    }
    let arriba = '';
    const r = rng(v.length * 31 + 7);
    if (v === 'mermelada') {
      arriba = `<path d="${onda(200, 202, 116, 44, 0.12, 14, 5)}" fill="url(#${id}mer)"/>`;
      for (let i = 0; i < 14; i++) {
        const a = r() * Math.PI * 2, d = Math.sqrt(r()) * 0.82;
        arriba += `<path d="${onda(200 + Math.cos(a) * 104 * d, 202 + Math.sin(a) * 38 * d, 9 + r() * 6, 6 + r() * 3, 0.5, 6, i + 3)}" fill="#a3001a" opacity=".55"/>`;
      }
      arriba += `<ellipse cx="160" cy="186" rx="40" ry="9" fill="#fff" opacity=".35" transform="rotate(-8 160 186)"/><ellipse cx="240" cy="214" rx="18" ry="4" fill="#fff" opacity=".3"/>`;
    } else if (v === 'almendra') {
      for (let i = 0; i < 46; i++) {
        const a = r() * Math.PI * 2, d = Math.sqrt(r()) * 0.9;
        const x = 200 + Math.cos(a) * 118 * d, y = 202 + Math.sin(a) * 44 * d;
        arriba += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(11 + r() * 5)}" ry="${f(4 + r() * 2)}" transform="rotate(${f(r() * 180)} ${f(x)} ${f(y)})" fill="url(#${id}alm)" stroke="#c48a4a" stroke-width="1"/>`;
      }
    } else {
      const pos = [[200, 200, 0], [150, 196, -50], [250, 196, 50], [175, 222, -20], [225, 222, 20], [200, 176, 0], [128, 212, -70], [272, 212, 70]];
      pos.forEach((p, i) => { arriba += (i % 2 ? fresaEntera : fresaMitad)(p[0], p[1], 1.6, p[2], id); });
    }
    return `<defs>${defsComunes(id)}
      <linearGradient id="${id}lat" x1="0" x2="1"><stop offset="0" stop-color="#7f868e"/><stop offset=".22" stop-color="#eef1f4"/><stop offset=".5" stop-color="#aab1b9"/><stop offset=".78" stop-color="#f6f8fa"/><stop offset="1" stop-color="#7f868e"/></linearGradient>
      <radialGradient id="${id}cos" cx=".5" cy=".4" r=".7"><stop offset="0" stop-color="#f7cf8c"/><stop offset="1" stop-color="#c47f33"/></radialGradient>
      <radialGradient id="${id}rel" cx=".42" cy=".38" r=".75"><stop offset="0" stop-color="#fff8e8"/><stop offset=".65" stop-color="#f8e2b6"/><stop offset="1" stop-color="#e2b06c"/></radialGradient>
      <radialGradient id="${id}mer" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#ff4a5f"/><stop offset=".7" stop-color="#d1102b"/><stop offset="1" stop-color="#8f0016"/></radialGradient>
      <linearGradient id="${id}alm" x1="0" x2="1"><stop offset="0" stop-color="#fbe9c8"/><stop offset="1" stop-color="#e2b77a"/></linearGradient></defs>
      <path d="M48 200 L72 266 A128 30 0 0 0 328 266 L352 200Z" fill="url(#${id}lat)"/>${ranuras}
      <ellipse cx="200" cy="200" rx="154" ry="65" fill="#dfe3e8" stroke="#959ca4" stroke-width="2"/>
      <ellipse cx="200" cy="200" rx="142" ry="58" fill="url(#${id}cos)"/>
      <ellipse cx="200" cy="202" rx="126" ry="48" fill="url(#${id}rel)"/>${arriba}`;
  }

  function gelatina(v, id) {
    let gotas = ''; const r = rng(11);
    return `<defs>${defsComunes(id)}
      <linearGradient id="${id}est" x1="0" x2="26" gradientUnits="userSpaceOnUse" spreadMethod="repeat"><stop offset="0" stop-color="#ffffff"/><stop offset=".5" stop-color="#efe3e6"/><stop offset="1" stop-color="#ffffff"/></linearGradient>
      <radialGradient id="${id}pl" cx=".5" cy=".4"><stop offset="0" stop-color="#5a4a47"/><stop offset="1" stop-color="#2e2422"/></radialGradient>
      <radialGradient id="${id}mer" cx=".4" cy=".3" r=".9"><stop offset="0" stop-color="#ff4a5f"/><stop offset=".7" stop-color="#d1102b"/><stop offset="1" stop-color="#8f0016"/></radialGradient></defs>
      <ellipse cx="200" cy="300" rx="178" ry="46" fill="url(#${id}pl)"/>
      <ellipse cx="200" cy="294" rx="160" ry="38" fill="#3b2f2c"/>
      <path d="M68 172 L80 282 A120 34 0 0 0 320 282 L332 172Z" fill="url(#${id}est)"/>
      <path d="M68 172 L80 282 A120 34 0 0 0 320 282 L332 172Z" fill="url(#${id}lado)"/>
      <ellipse cx="200" cy="172" rx="132" ry="44" fill="#fffafb"/>
      <path d="${escurrido(200, 172, 128, 42, 21, 46, 9)}" fill="url(#${id}mer)"/>
      <path d="${onda(200, 168, 120, 38, 0.1, 12, 4)}" fill="url(#${id}mer)"/>
      <ellipse cx="200" cy="170" rx="40" ry="13" fill="#3b2f2c"/>
      <ellipse cx="200" cy="168" rx="40" ry="12" fill="#e9d9dd"/>
      <ellipse cx="150" cy="156" rx="34" ry="7" fill="#fff" opacity=".35" transform="rotate(-10 150 156)"/>
      ${fresaMitad(128, 168, 1.3, -60, id)}${fresaMitad(272, 168, 1.3, 60, id)}${fresaMitad(200, 196, 1.3, 0, id)}${fresaMitad(160, 190, 1.1, -25, id)}${fresaMitad(240, 190, 1.1, 25, id)}
      ${fresaEntera(64, 296, 1.7, -30, id)}${fresaEntera(330, 300, 1.6, 25, id)}${fresaMitad(352, 274, 1.3, 70, id)}`;
  }

  function bebida(v, id) {
    const r = rng(9); let dentro = '';
    for (let i = 0; i < 70; i++) dentro += `<circle cx="${f(120 + r() * 160)}" cy="${f(120 + r() * 210)}" r="${f(2.5 + r() * 3)}" fill="#fff" opacity="${f(0.35 + r() * 0.4)}"/>`;
    for (let i = 0; i < 12; i++) { const x = 130 + r() * 130, y = 150 + r() * 170; dentro += `<rect x="${f(x)}" y="${f(y)}" width="16" height="16" rx="4" fill="#fff8f2" opacity=".92" transform="rotate(${f(r() * 60)} ${f(x + 8)} ${f(y + 8)})"/>`; }
    for (let i = 0; i < 12; i++) { const x = 130 + r() * 130, y = 140 + r() * 180; dentro += `<rect x="${f(x)}" y="${f(y)}" width="15" height="15" rx="3" fill="#e8193c" opacity=".85" transform="rotate(${f(r() * 60)} ${f(x + 8)} ${f(y + 8)})"/>`; }
    return `<defs>${defsComunes(id)}
      <linearGradient id="${id}beb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd3df"/><stop offset="1" stop-color="#ff8eaa"/></linearGradient>
      <clipPath id="${id}cl"><path d="M114 108 L132 326 A68 15 0 0 0 268 326 L286 108Z"/></clipPath>
      <pattern id="${id}pop" width="18" height="18" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="9" height="18" fill="#ff3d7f"/><rect x="9" width="9" height="18" fill="#fff"/></pattern></defs>
      <ellipse cx="200" cy="340" rx="96" ry="18" fill="#000" opacity=".12"/>
      <rect x="226" y="18" width="16" height="230" rx="8" fill="url(#${id}pop)" transform="rotate(14 234 130)"/>
      <path d="M114 108 L132 326 A68 15 0 0 0 268 326 L286 108Z" fill="url(#${id}beb)"/>
      <g clip-path="url(#${id}cl)">${dentro}</g>
      <ellipse cx="200" cy="108" rx="86" ry="17" fill="#ffc1d1"/>
      <path d="M106 80 L128 330 A72 16 0 0 0 272 330 L294 80" fill="none" stroke="#fff" stroke-opacity=".75" stroke-width="3"/>
      <ellipse cx="200" cy="80" rx="94" ry="19" fill="none" stroke="#fff" stroke-opacity=".8" stroke-width="3"/>
      <path d="M124 100 L140 300" stroke="#fff" stroke-opacity=".5" stroke-width="10" stroke-linecap="round"/>
      ${fresaMitad(118, 82, 2, -35, id)}`;
  }

  function dona(v, id) {
    const r = rng(17); let migas = '';
    for (let i = 0; i < 60; i++) {
      const a = r() * Math.PI * 2, d = 0.42 + r() * 0.5;
      const x = 200 + Math.cos(a) * 118 * d, y = 196 + Math.sin(a) * 84 * d;
      migas += `<path d="${onda(x, y, 2 + r() * 6, 2 + r() * 5, 0.8, 5, i)}" fill="${r() > 0.2 ? '#231818' : '#3a2c2c'}"/>`;
    }
    return `<defs>${defsComunes(id)}
      <radialGradient id="${id}mas" cx=".5" cy=".45" r=".6"><stop offset=".45" stop-color="#f5bf72"/><stop offset="1" stop-color="#b9682a"/></radialGradient>
      <radialGradient id="${id}gl" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#ffffff"/><stop offset=".8" stop-color="#f8eee9"/><stop offset="1" stop-color="#e9d8d1"/></radialGradient></defs>
      <ellipse cx="200" cy="244" rx="138" ry="92" fill="#9c541f"/>
      <ellipse cx="200" cy="222" rx="140" ry="98" fill="url(#${id}mas)"/>
      <path d="${onda(200, 206, 126, 88, 0.1, 18, 3)}" fill="url(#${id}gl)"/>
      <path d="M90 236 q4 26 10 30 q6 -4 4 -24Z M290 240 q-2 22 -9 28 q-6 -6 -3 -26Z M200 290 q2 18 -6 24 q-6 -6 -2 -24Z" fill="#fbf5f2"/>
      <ellipse cx="200" cy="200" rx="44" ry="30" fill="#c87a3a"/>
      <ellipse cx="200" cy="206" rx="40" ry="25" fill="#6b3816"/>
      ${migas}${galletaOreo(250, 150, 1.4, 20)}
      <ellipse cx="140" cy="160" rx="34" ry="12" fill="#fff" opacity=".55" transform="rotate(-25 140 160)"/>`;
  }

  function vaso(v, id) {
    const r = rng(5); let migas = '';
    for (let i = 0; i < 40; i++) migas += `<circle cx="${f(110 + r() * 180)}" cy="${f(268 + r() * 50)}" r="${f(2 + r() * 5)}" fill="#1c1414"/>`;
    return `<defs>${defsComunes(id)}
      <clipPath id="${id}cl"><path d="M96 130 L124 318 A76 16 0 0 0 276 318 L304 130Z"/></clipPath>
      <linearGradient id="${id}ch" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7a3b1c"/><stop offset="1" stop-color="#4a200e"/></linearGradient></defs>
      <ellipse cx="200" cy="334" rx="100" ry="18" fill="#000" opacity=".15"/>
      <g clip-path="url(#${id}cl)">
        <rect x="80" y="120" width="240" height="220" fill="url(#${id}ch)"/>
        <path d="M80 210 q30 -12 60 0 t60 0 t60 0 t60 0 V262 H80Z" fill="#fff6ee"/>
        <rect x="80" y="262" width="240" height="80" fill="#2e2323"/>${migas}
        <path d="M80 164 q30 10 60 0 t60 0 t60 0 t60 0 V172 H80Z" fill="#3a1608" opacity=".6"/>
      </g>
      <path d="M96 130 L124 318 A76 16 0 0 0 276 318 L304 130" fill="none" stroke="#fff" stroke-opacity=".8" stroke-width="3"/>
      <path d="${onda(200, 120, 98, 30, 0.2, 12, 8)}" fill="#fff9f4"/>
      <path d="${onda(186, 100, 60, 26, 0.25, 9, 2)}" fill="#fffdfb"/>
      <path d="M120 110 q20 22 40 0 q20 26 40 2 q18 24 38 -2 q14 18 32 4" fill="none" stroke="#4a200e" stroke-width="7" stroke-linecap="round"/>
      ${galletaOreo(232, 66, 1.6, 18)}
      <g transform="translate(130 50) rotate(-22)"><rect width="66" height="40" rx="4" fill="#5a2a12"/><path d="M22 0 V40 M44 0 V40 M0 20 H66" stroke="#3d1a09" stroke-width="3"/><rect x="2" y="2" width="62" height="8" rx="3" fill="#fff" opacity=".12"/></g>
      <path d="M110 150 L132 300" stroke="#fff" stroke-opacity=".45" stroke-width="10" stroke-linecap="round"/>`;
  }

  function pastel(v, id) {
    const cuerpo = 'M60 168 L60 284 A140 40 0 0 0 340 284 L340 168Z';
    let lado = '#fff3ee', tapa = '#fffaf7', extra = '', capas = '';
    const r = rng(v.length * 13);
    if (v === 'chocolate') {
      lado = `url(#${id}cho)`; tapa = '#3a1a10';
      extra = `<path d="${escurrido(200, 168, 140, 40, 4, 50, 9)}" fill="#3a1a10"/><ellipse cx="200" cy="166" rx="134" ry="37" fill="#3a1a10"/>
        <ellipse cx="160" cy="154" rx="54" ry="8" fill="#fff" opacity=".18" transform="rotate(-6 160 154)"/>`;
      for (let i = 0; i < 8; i++) { const a = (i / 8) * Math.PI * 2; const x = 200 + Math.cos(a) * 96, y = 168 + Math.sin(a) * 26; extra += `<rect x="${f(x - 12)}" y="${f(y - 14)}" width="24" height="18" rx="3" fill="#5a2a12" transform="rotate(${f(-20 + r() * 40)} ${f(x)} ${f(y)})"/><rect x="${f(x - 10)}" y="${f(y - 12)}" width="20" height="5" rx="2" fill="#fff" opacity=".15"/>`; }
    } else if (v === 'oreo') {
      lado = '#f7f2ee'; tapa = '#fbf8f5';
      for (let i = 0; i < 70; i++) capas += `<circle cx="${f(66 + r() * 268)}" cy="${f(178 + r() * 120)}" r="${f(1.5 + r() * 3)}" fill="#2a2020" opacity=".85"/>`;
      extra = `<path d="${escurrido(200, 168, 140, 40, 9, 40, 8)}" fill="#1c1414"/><ellipse cx="200" cy="166" rx="132" ry="36" fill="#fbf8f5"/>`;
      for (let i = 0; i < 30; i++) { const a = r() * Math.PI * 2, d = r() * 0.7; extra += `<path d="${onda(200 + Math.cos(a) * 120 * d, 166 + Math.sin(a) * 32 * d, 3 + r() * 5, 3 + r() * 4, 0.8, 5, i)}" fill="#231818"/>`; }
      [[120, 150, -20], [170, 138, -8], [230, 138, 8], [280, 150, 20], [200, 170, 0]].forEach((p) => { extra += galletaOreo(p[0], p[1], 1.1, p[2]); });
    } else if (v === 'chocoflan') {
      lado = `url(#${id}cho)`; tapa = '#c96d10';
      capas = `<path d="M60 168 L60 214 A140 40 0 0 0 340 214 L340 168Z" fill="#f2b04a"/>`;
      extra = `<path d="${escurrido(200, 168, 140, 40, 13, 54, 9)}" fill="url(#${id}caj)"/><ellipse cx="200" cy="166" rx="136" ry="38" fill="url(#${id}caj)"/>
        <ellipse cx="200" cy="164" rx="40" ry="11" fill="#7a3b10"/><ellipse cx="200" cy="168" rx="38" ry="9" fill="#3a1a10"/>
        <ellipse cx="140" cy="154" rx="40" ry="7" fill="#fff" opacity=".35" transform="rotate(-8 140 154)"/>`;
    } else if (v === 'limon') {
      lado = '#fff6d6'; tapa = '#fff4b8';
      for (let i = 0; i < 5; i++) capas += `<path d="M60 ${190 + i * 22} A140 40 0 0 0 340 ${190 + i * 22} L340 ${198 + i * 22} A140 40 0 0 1 60 ${198 + i * 22}Z" fill="#e3b873"/>`;
      extra = `<ellipse cx="200" cy="166" rx="134" ry="37" fill="#fff1a8"/>`;
      for (let i = 0; i < 40; i++) { const a = r() * Math.PI * 2, d = r() * 0.8; extra += `<rect x="${f(200 + Math.cos(a) * 120 * d)}" y="${f(166 + Math.sin(a) * 32 * d)}" width="6" height="2" rx="1" fill="#7cc242" transform="rotate(${f(r() * 180)} ${f(200 + Math.cos(a) * 120 * d)} ${f(166 + Math.sin(a) * 32 * d)})"/>`; }
      [[140, 160], [200, 150], [260, 160], [170, 180], [232, 180]].forEach((p, i) => {
        extra += `<g transform="translate(${p[0]} ${p[1]}) rotate(${-20 + i * 10}) scale(1 .55)"><circle r="22" fill="#5fb336"/><circle r="18" fill="#e9f7b0"/>${[0, 1, 2, 3, 4, 5, 6, 7].map((k) => `<path d="M0 0 L${f(Math.cos(k * 0.785) * 16)} ${f(Math.sin(k * 0.785) * 16)}" stroke="#c6e86a" stroke-width="3"/>`).join('')}</g>`;
      });
    } else {
      lado = '#fff3f0'; tapa = '#fffaf8';
      for (let i = 0; i < 16; i++) { const a = (i / 16) * Math.PI * 2; extra += `<circle cx="${f(200 + Math.cos(a) * 124)}" cy="${f(168 + Math.sin(a) * 34)}" r="13" fill="#fffdfc"/><circle cx="${f(196 + Math.cos(a) * 124)}" cy="${f(164 + Math.sin(a) * 34)}" r="5" fill="#fff"/>`; }
      [[200, 150, 0], [150, 160, -40], [250, 160, 40], [175, 176, -15], [225, 176, 15], [200, 172, 0]].forEach((p, i) => { extra += (i % 2 ? fresaMitad : fresaEntera)(p[0], p[1], 1.5, p[2], id); });
      capas = `<path d="M60 222 A140 40 0 0 0 340 222 L340 230 A140 40 0 0 1 60 230Z" fill="#ff9db5" opacity=".7"/>`;
    }
    return `<defs>${defsComunes(id)}
      <linearGradient id="${id}cho" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6b3420"/><stop offset="1" stop-color="#3f1d10"/></linearGradient>
      <radialGradient id="${id}caj" cx=".4" cy=".3" r=".9"><stop offset="0" stop-color="#e9952c"/><stop offset="1" stop-color="#9c4c0a"/></radialGradient>
      <radialGradient id="${id}base" cx=".5" cy=".4"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#e8c9d2"/></radialGradient></defs>
      <ellipse cx="200" cy="300" rx="176" ry="46" fill="url(#${id}base)"/>
      <ellipse cx="200" cy="304" rx="176" ry="46" fill="none" stroke="#d9aebb" stroke-width="3"/>
      <path d="${cuerpo}" fill="${lado}"/>${capas}<path d="${cuerpo}" fill="url(#${id}lado)"/>
      <ellipse cx="200" cy="168" rx="140" ry="40" fill="${tapa}"/>${extra}`;
  }

  const DIBUJOS = { pay, gelatina, bebida, dona, vaso, pastel };

  function ilustracion(prod, clase) {
    if (prod && prod.foto) {
      return `<img class="${clase || ''} es-foto" src="${prod.foto}" alt="${esc(prod.nombre)}" loading="lazy" decoding="async">`;
    }
    const il = (prod && prod.ilus) || { t: 'pastel', v: 'fresa' };
    const fn = DIBUJOS[il.t] || pastel;
    const id = 'i' + (++contador) + '_';
    return `<svg class="${clase || ''}" viewBox="0 0 400 400" role="img" aria-label="${esc(prod ? prod.nombre : '')}" xmlns="http://www.w3.org/2000/svg">${fn(il.v || '', id)}</svg>`;
  }

  const ESTILOS_ILUS = [
    { t: 'pay', v: 'fresas', n: 'Pay con fresas' }, { t: 'pay', v: 'mermelada', n: 'Pay con mermelada' },
    { t: 'pay', v: 'almendra', n: 'Pay con almendras' }, { t: 'gelatina', v: 'fresa', n: 'Gelatina con fresa' },
    { t: 'bebida', v: 'fresa', n: 'Bebida' }, { t: 'dona', v: 'oreo', n: 'Dona glaseada' },
    { t: 'vaso', v: 'chocolate', n: 'Vaso de postre' }, { t: 'pastel', v: 'fresa', n: 'Pastel de fresas' },
    { t: 'pastel', v: 'chocolate', n: 'Pastel de chocolate' }, { t: 'pastel', v: 'oreo', n: 'Pastel de Oreo' },
    { t: 'pastel', v: 'chocoflan', n: 'Chocoflan' }, { t: 'pastel', v: 'limon', n: 'Carlota de limón' }
  ];

  function aplicarRegistro(lista, accion, dato) {
    lista = Array.isArray(lista) ? lista.slice() : [];
    if (accion === 'agregar') lista.push(dato);
    else if (accion === 'actualizar') lista = lista.map((x) => (x.id === dato.id ? Object.assign({}, x, dato) : x));
    else if (accion === 'borrar') lista = lista.filter((x) => x.id !== dato.id);
    return lista;
  }

  /* ================================================================
     CONEXIÓN: nube (Netlify) o, si no hay, este navegador
     ================================================================ */
  async function pedir(ruta, opciones) {
    const r = await fetch('/api/' + ruta, Object.assign({ cache: 'no-store' }, opciones || {}));
    const tipo = r.headers.get('content-type') || '';
    if (!tipo.includes('application/json')) throw new Error('sin-api');
    const j = await r.json();
    if (!r.ok) { const e = new Error(j.error || 'Error ' + r.status); e.status = r.status; throw e; }
    return j;
  }

  const Datos = {
    modo: 'local',
    clave: '',
    async catalogo() {
      try {
        const j = await pedir('productos');
        this.modo = 'nube';
        return {
          productos: Array.isArray(j.productos) && j.productos.length ? j.productos : copia(PRODUCTOS_BASE),
          config: Object.assign({}, CONFIG_BASE, j.config || {})
        };
      } catch (e) {
        this.modo = 'local';
        return {
          productos: memoria.leer('productos', null) || copia(PRODUCTOS_BASE),
          config: Object.assign({}, CONFIG_BASE, memoria.leer('config', {}))
        };
      }
    },
    async hayNube() {
      try { const j = await pedir('estado'); this.modo = 'nube'; return j; } catch (e) { this.modo = 'local'; return null; }
    },
    cabeceras() { return { 'content-type': 'application/json', 'x-admin-key': this.clave }; },
    async entrar(clave) {
      this.clave = clave;
      await pedir('login', { method: 'POST', headers: this.cabeceras(), body: '{}' });
      return true;
    },
    async guardarCatalogo(productos, config) {
      if (this.modo === 'nube') {
        await pedir('productos', { method: 'PUT', headers: this.cabeceras(), body: JSON.stringify({ productos, config }) });
      } else {
        if (!memoria.guardar('productos', productos) || !memoria.guardar('config', config)) throw new Error('No hay espacio en este navegador. Usa fotos más pequeñas.');
      }
    },
    async finanzas() {
      if (this.modo === 'nube') {
        const j = await pedir('finanzas', { headers: this.cabeceras() });
        return { ventas: j.ventas || [], gastos: j.gastos || [] };
      }
      return { ventas: memoria.leer('ventas', []), gastos: memoria.leer('gastos', []) };
    },
    // Agrega, actualiza o borra UNA venta/gasto. El servidor mezcla el cambio
    // con lo que ya hay, así dos celulares pueden registrar ventas a la vez.
    async registro(coleccion, accion, dato) {
      if (this.modo === 'nube') {
        return pedir('registro', { method: 'POST', headers: this.cabeceras(), body: JSON.stringify({ coleccion, accion, dato }) });
      }
      const lista = memoria.leer(coleccion, []);
      const nueva = aplicarRegistro(lista, accion, dato);
      memoria.guardar(coleccion, nueva);
      return { [coleccion]: nueva };
    },
    async reemplazarFinanzas(ventas, gastos) {
      if (this.modo === 'nube') {
        await pedir('finanzas', { method: 'PUT', headers: this.cabeceras(), body: JSON.stringify({ ventas, gastos }) });
      } else { memoria.guardar('ventas', ventas); memoria.guardar('gastos', gastos); }
    }
  };

  window.RD = { COLORES, CATEGORIAS, CONFIG_BASE, TEXTOS_BASE, textos, PRODUCTOS_BASE, ESTILOS_ILUS, ilustracion, dinero, copia, hoy, nuevoId, esc, memoria, Datos };
})();
