# Guía Paso a Paso: Migración de Dominio desde Squarespace a Namecheap y Conexión con tu Web

Esta guía te explica detalladamente cómo **migrar tu dominio de Squarespace a Namecheap** y cómo **conectar dicho dominio a tu sitio web desplegado** (por ejemplo, en Vercel, Netlify o GitHub Pages).

---

## 📋 Resumen del Proceso

El proceso consta de 2 fases principales:
1. **Fase 1:** Conectar el dominio a tu sitio web desplegado (puedes hacerlo en Squarespace mientras se realiza la transferencia o en Namecheap al finalizar).
2. **Fase 2:** Migrar la administración/registro del dominio desde Squarespace hacia Namecheap.

> [!NOTE]
> **Tiempo de transferencia entre registradores:** La transferencia de un dominio entre Squarespace y Namecheap suele tardar entre **2 y 7 días** en completarse por normativas de ICANN. Durante este tiempo tu dominio seguirá activo.

---

## 🚀 FASE 1: Migración del Dominio (Squarespace ➡️ Namecheap)

### Paso 1: Requisitos previos en Squarespace
1. Inicia sesión en tu cuenta de **Squarespace** y dirígete al panel de **Dominios** (`Domains`).
2. Selecciona el dominio que deseas transferir.
3. **Desactiva el Bloqueo de Dominio (Domain Lock):**
   * Busca la opción **Domain Lock / Bloquear dominio** y cámbiala a **Desactivado (Unlocked)**.
4. **Obtén el Código de Autorización (Auth Code / EPP Code):**
   * Haz clic en **Get Authorization Code / Obtener código de transferencia**.
   * Copia y guarda este código alfanumérico en un lugar seguro.
5. **Verifica tu Correo de Contacto:**
   * Asegúrate de que el correo electrónico registrado como titular del dominio esté activo y accesible, ya que recibirás correos de confirmación.

---

### Paso 2: Iniciar la Transferencia en Namecheap
1. Inicia sesión en tu cuenta de **Namecheap** ([namecheap.com](https://www.namecheap.com)).
2. En el menú principal o barra de búsqueda, selecciona **Domains** > **Domain Transfer**.
3. Escribe tu nombre de dominio (ejemplo: `tudominio.com`) y haz clic en **Transfer**.
4. Pega el **Auth Code / EPP Code** que obtuviste de Squarespace en el campo requerido.
5. Agrega la transferencia al carrito de compras y realiza el pago:
   * *Nota:* ICANN exige renovar el dominio por 1 año adicional al realizar la transferencia. Namecheap sumará este año a la fecha de vencimiento actual de tu dominio.
6. **Aprobar la transferencia:**
   * Recibirás un correo electrónico de confirmación de transferencia. Haz clic en el enlace de aprobación en el correo.
   * La transferencia quedará en estado de procesamiento (tarda normalmente entre 2 a 5 días).

---

## 🔗 FASE 2: Conectar el Dominio con tu Despliegue (ej. Vercel)

Para que tu sitio web cargue al escribir tu dominio personalizado, debes enlazar tu proveedor de hosting (como Vercel) con la DNS de tu dominio.

### Paso 1: Configurar el Dominio en tu Hosting (Vercel)
1. En tu panel de **Vercel** ([vercel.com](https://vercel.com)), ingresa a tu proyecto (`hoja-de-vida`).
2. Ve a **Settings** > **Domains**.
3. Ingresa tu dominio (ejemplo: `tudominio.com`) y haz clic en **Add**.
4. Vercel te mostrará los registros DNS requeridos:
   * **Para el Dominio Ápice (`tudominio.com`):**
     * Tipo: `A`
     * Nombre / Host: `@`
     * Valor / IP: `76.76.21.21`
   * **Para el Subdominio `www` (`www.tudominio.com`):**
     * Tipo: `CNAME`
     * Nombre / Host: `www`
     * Valor: `cname.vercel-dns.com`

---

### Paso 2: Registrar la DNS en Namecheap (Una vez completada la transferencia)
1. Entra a tu **Dashboard** de Namecheap.
2. Junto a tu dominio transferido, haz clic en **Manage**.
3. Ve a la pestaña **Advanced DNS**.
4. En **Host Records**, agrega los siguientes registros:

| Type (Tipo) | Host | Value (Valor) | TTL |
| :--- | :--- | :--- | :--- |
| **A Record** | `@` | `76.76.21.21` | Automatic / 1 min |
| **CNAME Record** | `www` | `cname.vercel-dns.com` | Automatic / 1 min |

5. Si existen registros antiguos de tipo A o CNAME de Squarespace, elimínalos para evitar conflictos.
6. Haz clic en **Save all changes**.

> [!TIP]
> **Propagación DNS:** La actualización de los registros DNS puede tardar de 5 minutos a 24 horas en propagarse mundialmente. Puedes verificar el estado en [dnschecker.org](https://dnschecker.org).

---

## ⏱️ ¿Qué hacer si quieres conectar el sitio WEB INMEDIATAMENTE mientras dura la migración?

Si no quieres esperar los 2 a 7 días que tarda la migración entre registradoras para que tu web funcione con el dominio:

1. Ve a **Squarespace** > **Domains** > **DNS Settings**.
2. Agrega allí los registros `A` (`76.76.21.21`) y `CNAME` (`cname.vercel-dns.com`) apuntando a Vercel.
3. Tu sitio web empezará a funcionar de inmediato con el dominio.
4. Luego realizas el proceso de transferencia a Namecheap. Cuando finalice la transferencia, replicas los mismos registros DNS en Namecheap. ¡Así no tendrás interrupciones!
