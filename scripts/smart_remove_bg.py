import os
import glob
from PIL import Image
from rembg import remove

output_dir = r"j:\Mi unidad\Hoja de Vida\assets\images"
os.makedirs(output_dir, exist_ok=True)

brain_dir = r"C:\Users\Andre\.gemini\antigravity-ide\brain\161af727-a4ab-4923-8501-d341110c6df1"
files = sorted(glob.glob(os.path.join(brain_dir, "media__*.jpg")))

print(f"Processing {len(files)} images with rembg AI segmentation model...")

names = [
    ("profile-exec", "Ariel Andrés - Traje Ejecutivo Azul"),
    ("profile-portrait", "Ariel Andrés - Retrato Profesional"),
    ("profile-field", "Ariel Andrés - Enfoque Campo y Proyectos"),
    ("profile-tech", "Ariel Andrés - Tecnología e Innovación IA")
]

for idx, f in enumerate(files):
    if idx >= len(names):
        break
    prefix, label = names[idx]
    
    # Save original JPG
    orig_jpg = os.path.join(output_dir, f"{prefix}-orig.jpg")
    img_orig = Image.open(f).convert("RGB")
    img_orig.save(orig_jpg, quality=95)
    
    nobg_path_png = os.path.join(output_dir, f"{prefix}-nobg.png")
    nobg_path_webp = os.path.join(output_dir, f"{prefix}-nobg.webp")

    with open(f, 'rb') as i:
        input_data = i.read()
        output_data = remove(input_data)
        with open(nobg_path_png, 'wb') as o:
            o.write(output_data)
            
    # Save WebP version
    nobg_img = Image.open(nobg_path_png).convert("RGBA")
    nobg_img.save(nobg_path_webp, format="WEBP", quality=95)
    print(f"AI Cutout complete for {prefix} -> Saved PNG & WEBP")

print("All 4 transparent AI cutouts generated successfully!")
