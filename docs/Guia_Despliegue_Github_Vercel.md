# Guía de Despliegue de tu Portafolio en GitHub y Vercel

Esta guía te guiará paso a paso para subir tu portafolio y tu hoja de vida a un repositorio de **GitHub** y desplegarla en producción con **Vercel** de manera gratuita, obteniendo un enlace público interactivo.

---

## Paso 1: Inicializar tu Repositorio Git Local

1. Abre tu terminal de PowerShell en la carpeta de tu hoja de vida (`j:\Mi unidad\Hoja de Vida`).
2. Inicializa el repositorio ejecutando:
   ```powershell
   git init
   ```
3. Verifica que el archivo `.gitignore` que creamos esté presente para evitar subir archivos basura temporales.
4. Agrega todos los archivos al área de preparación (staging):
   ```powershell
   git add .
   ```
5. Realiza tu primer commit local:
   ```powershell
   git commit -m "feat: portafolio interactivo y hoja de vida optimizada"
   ```

---

## Paso 2: Crear el Repositorio en GitHub y Subir el Código

1. Inicia sesión en tu cuenta de **GitHub** ([github.com](https://github.com)).
2. Haz clic en el botón **New** (Nuevo repositorio) en la esquina superior izquierda.
3. Configura el repositorio:
   * **Repository name:** `hoja-de-vida` (o el nombre que prefieras).
   * **Public/Private:** Recomendamos **Público** para que Vercel y los reclutadores puedan acceder sin restricciones, pero puedes ponerlo Privado si lo prefieres (Vercel también puede desplegar repositorios privados vinculando tu cuenta).
   * *IMPORTANTE:* **No** marques las opciones de agregar un archivo README, .gitignore o licencia, ya que ya los tenemos creados en local.
4. Haz clic en **Create repository**.
5. GitHub te mostrará unas líneas de comandos. Copia y ejecuta en tu terminal las siguientes tres líneas (reemplazando por tu usuario y nombre de repositorio real):
   ```powershell
   git remote add origin https://github.com/tu-usuario/tu-repositorio.git
   git branch -M main
   git push -u origin main
   ```

---

## Paso 3: Desplegar en Producción con Vercel (Auto-despliegue)

Dado que estructuramos todo tu proyecto en la raíz de tu carpeta de trabajo (`index.html`, `styles.css`, `script.js`, y el PDF de soportes en el mismo nivel), Vercel lo detectará automáticamente como una web estática nativa y la desplegará en segundos.

1. Ve a **Vercel** ([vercel.com](https://vercel.com)) e inicia sesión con tu cuenta de GitHub (esto facilitará la sincronización).
2. En tu Dashboard, haz clic en el botón **Add New...** y luego selecciona **Project** (Proyecto).
3. Verás una lista de tus repositorios de GitHub. Busca el repositorio `hoja-de-vida` y haz clic en **Import** (Importar).
4. En la configuración del proyecto:
   * **Framework Preset:** Déjalo en **Other** (Vercel detectará que es HTML/CSS puro).
   * **Root Directory:** Déjalo como `./` (la raíz del proyecto).
   * **Build and Development Settings:** No requieres modificar nada.
5. Haz clic en **Deploy** (Desplegar).

¡Listo! En menos de 30 segundos, Vercel compilará tu sitio y te entregará una URL pública (del tipo `hoja-de-vida-tu-usuario.vercel.app`).

### ¿Cómo funciona a partir de ahora?
Cada vez que realices un cambio en tu hoja de vida o en los estilos locales y hagas un `git push` a GitHub:
```powershell
git add .
git commit -m "docs: actualizar certificaciones"
git push
```
**Vercel detectará el cambio y actualizará tu página web en producción automáticamente en pocos segundos.**
