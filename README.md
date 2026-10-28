# Rinconcito Dulcesito · Sitio de pedidos y panel para repostería

Sitio web para una repostería de Puruándiro donde los clientes arman su pedido y lo envían por WhatsApp, más un panel de administración para llevar el negocio.

## Qué hace

**Página para clientes**
- Catálogo de postres; el cliente arma su pedido y se le genera el mensaje de **WhatsApp** ya escrito, con el total.

**Panel de administración** (`/admin`, protegido con contraseña)
- **Resumen:** ventas, gastos y ganancia del mes, con gráficas.
- **Ventas y gastos:** registro de cada pedido (pagado / pendiente) y de cada compra.
- **Productos:** foto (se comprime automáticamente), nombre, precio y costo; calcula la ganancia y sugiere precio según el margen deseado.
- **Página y ajustes:** textos editables sin tocar código, WhatsApp, horario y respaldos.

## Tecnologías

| Capa | Tecnología |
|---|---|
| Frontend | HTML, CSS, JavaScript |
| Backend | Netlify Functions (API serverless) |
| Datos | Almacenamiento en la nube de Netlify |
| Despliegue | Netlify (desde GitHub) |

## Estructura

```
index.html                  Página para clientes
admin.html                  Panel de administración
netlify/functions/api.mjs   API que guarda los datos en la nube
assets/                     Logo, ilustraciones y fuentes
```

Las instrucciones de despliegue para la dueña del negocio están en [`LEEME.md`](LEEME.md).
