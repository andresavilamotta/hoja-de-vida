import os
import zipfile

script_dir = os.path.dirname(os.path.abspath(__file__))
base_dir = os.path.dirname(script_dir) # j:\Mi unidad\Hoja de Vida

export_dir = os.path.join(base_dir, "export_ia")
os.makedirs(export_dir, exist_ok=True)

output_md = os.path.join(export_dir, "PROYECTO_COMPLETO_HOJA_DE_VIDA.md")
output_zip = os.path.join(export_dir, "hoja_de_vida_codigo_fuente.zip")

print("Generando paquete organizado para Inteligencia Artificial...")

# 1. GENERAR PROYECTO COMPLETO EN UN SOLO ARCHIVO MARKDOWN
files_to_include_md = [
    ("DOCUMENTACIÓN Y PERFIL PROFESIONAL", os.path.join("docs", "Propuesta_Hoja_de_Vida_Optimizada_2026.md")),
    ("PROMPT VIDEO PITCH GOOGLE VIDS", os.path.join("docs", "Prompt_Video_Pitch_Google_Vids.md")),
    ("GUÍA DE CARGA EN PORTALES", os.path.join("docs", "Guia_Carga_Portales_Computrabajo_ElEmpleo.md")),
    ("GUÍA DE DESPLIEGUE GITHUB/VERCEL", os.path.join("docs", "Guia_Despliegue_Github_Vercel.md")),
    ("GUÍA MIGRACIÓN DE DOMINIO", os.path.join("docs", "Guia_Migracion_Dominio_Namecheap.md")),
    ("ESTRUCTURA PRINCIPAL (index.html)", "index.html"),
    ("ESTILOS Y DISEÑO (styles.css)", "styles.css"),
    ("LÓGICA INTERACTIVA (script.js)", "script.js"),
    ("HOJA DE VIDA IMPRIMIBLE (hoja_de_vida_imprimible.html)", "hoja_de_vida_imprimible.html"),
]

with open(output_md, "w", encoding="utf-8") as f_md:
    f_md.write("# PROYECTO COMPLETO: PORTAFOLIO PROFESIONAL ARIEL ANDRÉS ÁVILA MOTTA\n\n")
    f_md.write("> **Propósito:** Este archivo contiene el código fuente completo, la documentación estratégica y la propuesta de perfil profesional organizada para su análisis exhaustivo en modelos de Inteligencia Artificial (ChatGPT, Claude, Gemini, DeepSeek, etc.).\n\n")
    f_md.write("---\n\n")
    
    f_md.write("## 1. MAPA Y ESTRUCTURA DEL PROYECTO\n\n")
    f_md.write("- **Titular:** Ariel Andrés Ávila Motta - Economista & Magíster (c) en Gerencia de Proyectos\n")
    f_md.write("- **Tecnologías:** HTML5, Vanilla CSS3 (Variables, Glassmorphism, Responsive, Dark/Light Mode), JavaScript ES6+\n")
    f_md.write("- **Componentes Clave:** Hero interactivo con recortes sin marco, barra selectora de poses/roles, tarjetas flotantes de habilidades, línea de tiempo interactiva de contratos, filtro de proyectos por categoría, soporte para descarga de CV imprimible.\n\n")
    f_md.write("---\n\n")

    f_md.write("## 2. PROMPTS SUGERIDOS PARA LA IA DE ANÁLISIS\n\n")
    f_md.write("Puedes copiar y pegar cualquiera de estos prompts junto con este archivo para potenciar el proyecto:\n\n")
    f_md.write("### Prompt 1: Auditoría de Código y UX/UI\n")
    f_md.write("```text\nAnaliza el código de index.html, styles.css y script.js adjunto. Sugiere mejoras específicas de accesibilidad (WCAG), rendimiento de carga, animaciones micro-interactivas y optimización de SEO para posicionar el portafolio de un Economista y Gestor de Proyectos Públicos.\n```\n\n")
    f_md.write("### Prompt 2: Potencialización de Contenidos e Impacto\n")
    f_md.write("```text\nRevisa el contenido del perfil profesional y las experiencias laborales en Corpoamazonia y Banco W. Sugiere cómo reestructurar los textos del portafolio para maximizar el impacto ante reclutadores de organismos internacionales (BID, PNUD, USAID, MinAmbiente, DNP) y empresas privadas.\n```\n\n")
    f_md.write("### Prompt 3: Integración de Nuevas Funcionalidades IA\n")
    f_md.write("```text\nDado que Ariel Andrés es ganador de Hackathon de IA y experto en orquestación de Agentes LLM, ¿qué nuevas características interactivas basadas en IA (ej. chatbot asistente de su trayectoria, simulador de presupuesto SGR, o recomendador de servicios) podemos implementar en este código?\n```\n\n")
    f_md.write("---\n\n")
    f_md.write("## 3. CÓDIGO FUENTE Y DOCUMENTACIÓN DEL PROYECTO\n\n")

    for title, rel_file in files_to_include_md:
        filepath = os.path.join(base_dir, rel_file)
        if os.path.exists(filepath):
            f_md.write(f"### File: {title} (`{rel_file}`)\n\n")
            ext = os.path.splitext(rel_file)[1].replace(".", "")
            if ext == "js": lang = "javascript"
            elif ext == "css": lang = "css"
            elif ext == "html": lang = "html"
            else: lang = "markdown"
            
            f_md.write(f"```{lang}\n")
            with open(filepath, "r", encoding="utf-8", errors="ignore") as content_file:
                f_md.write(content_file.read())
            f_md.write("\n```\n\n---\n\n")

print(f"Archivo consolidado creado correctamente: {output_md}")

# 2. GENERAR ARCHIVO ZIP ULTRA LIVIANO (SIN PDFs PESADOS NI EXPORTS)
print("Generando paquete comprimido .ZIP (codigo y assets)...")

with zipfile.ZipFile(output_zip, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for root, dirs, files in os.walk(base_dir):
        # Ignore heavy directories
        if 'soportes_y_pdf' in root or 'export_ia' in root or '.git' in root or '.vercel' in root:
            continue
            
        for file in files:
            if file.endswith(('.pdf', '.xlsx', '.py', '.log', '.zip')):
                continue
            
            full_path = os.path.join(root, file)
            rel_path = os.path.relpath(full_path, base_dir)
            zipf.write(full_path, rel_path)

print(f"Archivo comprimido creado correctamente: {output_zip}")
print("Proceso completado exitosamente!")
