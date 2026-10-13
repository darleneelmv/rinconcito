# Rinconcito Dulcesito: tu página y tu panel

Esta carpeta trae todo:

- `index.html` es la página que ven tus clientes. Arman su pedido y se los manda por WhatsApp ya escrito, con total.
- `admin.html` es tu panel (entras en `tusitio.netlify.app/admin`): productos y precios, ventas, gastos y ganancias.
- `netlify/functions/api.mjs` es la parte que guarda todo en la nube. No necesitas tocarla.
- `assets/` tiene el logo, las letras y los dibujos de los postres.

## Subirlo a internet con Netlify (gratis, sin programar)

Necesitas unos 20 minutos y dos cuentas gratuitas: GitHub (donde se guardan los archivos) y Netlify (la que publica tu página).

### 1. Sube la carpeta a GitHub

1. Entra a github.com y crea una cuenta.
2. Arriba a la derecha toca **+** y luego **New repository**.
3. Nombre: `rinconcito-dulcesito`. Déjalo en **Private** si quieres. Toca **Create repository**.
4. En la siguiente pantalla toca el enlace **uploading an existing file**.
5. Descomprime el zip en tu computadora, abre la carpeta `rinconcito` y **arrastra todo lo que hay adentro** (las carpetas `assets` y `netlify`, y los archivos `index.html`, `admin.html`, `netlify.toml`, `package.json`, `LEEME.md`) a la ventana de GitHub.
6. Espera a que suban y toca **Commit changes**.

Revisa que en GitHub veas la carpeta `netlify` con `functions/api.mjs` adentro. Sin ella, el panel no guarda en la nube.

### 2. Publícalo en Netlify

1. Entra a netlify.com y toca **Sign up**, elige **GitHub** para entrar con esa misma cuenta.
2. Toca **Add new project** (o **Add new site**) y elige **Import an existing project**.
3. Elige **GitHub**, da permiso y selecciona `rinconcito-dulcesito`.
4. No cambies nada de la configuración (ya viene en `netlify.toml`). Toca **Deploy**.
5. En uno o dos minutos te da una dirección tipo `algo-raro-123.netlify.app`.

### 3. Pon la contraseña de tu panel

1. En Netlify, dentro de tu sitio: **Project configuration** (o **Site configuration**) y luego **Environment variables**.
2. **Add a variable**: en *Key* escribe `ADMIN_PASSWORD` y en *Value* tu contraseña (que sea larga, por ejemplo `FresaConTapioca2026!`).
3. Ve a **Deploys** y toca **Trigger deploy** y luego **Deploy project** para que tome la contraseña.

### 4. Ponle buen nombre

En **Project configuration** busca **Change project name** (o **Change site name**) y escribe `rinconcito-dulcesito`. Tu página queda en:

- Clientes: `https://rinconcito-dulcesito.netlify.app`
- Tu panel: `https://rinconcito-dulcesito.netlify.app/admin`

Si ese nombre ya está ocupado, prueba `rinconcitodulcesito` o `rinconcito-dulcesito-puruandiro`.

### 5. Compártelo con tus clientes

- En Instagram, edita tu perfil y en **Enlaces** pon la dirección de tu página (puedes dejar también el de WhatsApp).
- Mándala en tus estados de WhatsApp y ponla en tu perfil de WhatsApp Business.
- Si algún día quieres un dominio propio (como `rinconcitodulcesito.com.mx`), en Netlify ve a **Domain management**.

## Tu panel de administración

Entras en `tusitio.netlify.app/admin` con tu contraseña. Tiene seis pestañas:

- **Resumen:** ventas, gastos y ganancia del mes, con gráficas.
- **Ventas** y **Gastos:** para registrar cada pedido y cada compra.
- **Productos:** toca un producto para cambiar su **foto** (toca el círculo de la imagen o el botón *Subir foto*), nombre, precio, costo, o para ocultarlo.
- **Página:** cambias los textos de tu página (títulos, frases, pasos) y eliges qué postres salen en grande en la portada y al final.
- **Ajustes:** tu WhatsApp, Instagram, horario, respaldos.

Si abres `admin.html` en tu computadora antes de subirlo, te pide crear una contraseña de prueba. Lo que guardes así se queda solo en esa computadora; ya en Netlify entras con la contraseña del paso 3.

## Uso diario

- **Cambiar textos de la página:** pestaña *Página*, cambia y toca *Guardar cambios*.
- **Cambiar precios o productos:** entra a `/admin`, pestaña *Productos*, toca el producto, cambia y guarda. Tus clientes lo ven al recargar la página. No necesitas volver a subir nada.
- **Fotos reales:** en *Productos*, toca el postre y luego el círculo de la imagen (o *Subir foto*). Se achica sola para que la página siga rápida. Si quitas la foto vuelve el dibujo.
- **Ventas:** cuando te llegue un pedido por WhatsApp, regístralo en *Ventas*. Si no te han pagado, márcalo como *Pendiente* y tócalo cuando te paguen.
- **Gastos:** anota lo que compras (ingredientes, empaques, gas, envíos). Así el *Resumen* te dice la ganancia real del mes.
- **Respaldo:** en *Ajustes* descarga un respaldo cada mes y guárdalo en tu correo.

## Sobre los pasteles nuevos

Cada pastel nuevo trae en sus *Notas privadas* una receta sencilla y cuánto cuesta hacerlo. Los costos son estimados con precios comunes de súper en Michoacán: cámbialos por lo que tú pagas y el panel te dice tu ganancia y te sugiere el precio para el margen que quieras. La mano de obra y tu tiempo no están incluidos en el costo.

Las donas ($25 pieza, $140 media docena) y el postre Hershey's con Oreo ($55) traen precios de ejemplo: ajústalos a los tuyos.

## Si algo no funciona

- **El panel dice "Solo este navegador":** la parte de la nube no se activó. Revisa que la carpeta `netlify` y el archivo `package.json` estén en GitHub y vuelve a publicar.
- **"Falta crear la contraseña":** haz el paso 3.
- **Se me olvidó la contraseña:** cámbiala en Netlify (paso 3) y vuelve a publicar.
- **Cambié algo del diseño:** sube el archivo cambiado a GitHub (botón *Add file* y luego *Upload files*); Netlify publica solo.

Arrastrar la carpeta en *Netlify Drop* también publica la página, pero así el panel no puede guardar en la nube. Usa el método con GitHub.
