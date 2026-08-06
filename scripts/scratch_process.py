import os
import glob
from PIL import Image

output_dir = r"j:\Mi unidad\Hoja de Vida\assets\images"
os.makedirs(output_dir, exist_ok=True)

brain_dir = r"C:\Users\Andre\.gemini\antigravity-ide\brain\161af727-a4ab-4923-8501-d341110c6df1"
files = sorted(glob.glob(os.path.join(brain_dir, "media__*.jpg")))

print(f"Found {len(files)} files.")

# Try rembg if available
try:
    from rembg import remove
    use_rembg = True
    print("Using rembg for state-of-the-art background removal.")
except ImportError:
    use_rembg = False
    print("rembg not installed, using color floodfill / thresholding fallback.")

names = [
    ("profile-exec", "Ariel Andrés - Traje Ejecutivo Azul"),
    ("profile-portrait", "Ariel Andrés - Retrato Profesional"),
    ("profile-field", "Ariel Andrés - Enfoque Campo y Proyectos"),
    ("profile-tech", "Ariel Andrés - Tecnología e Innovación IA")
]

for idx, f in enumerate(files):
    if idx >= len(names):
        break
    prefix, desc = names[idx]
    
    # Save original jpg to assets
    orig_path = os.path.join(output_dir, f"{prefix}-orig.jpg")
    img = Image.open(f)
    img.save(orig_path, quality=95)
    
    nobg_path_png = os.path.join(output_dir, f"{prefix}-nobg.png")
    nobg_path_webp = os.path.join(output_dir, f"{prefix}-nobg.webp")
    
    if use_rembg:
        with open(f, 'rb') as i:
            with open(nobg_path_png, 'wb') as o:
                input_data = i.read()
                output_data = remove(input_data)
                o.write(output_data)
        # Convert transparent PNG to optimized WebP
        nobg_img = Image.open(nobg_path_png)
        nobg_img.save(nobg_path_webp, format="WEBP", quality=95)
    else:
        # High quality white background removal with color thresholding and smooth edge feathering
        rgba = img.convert("RGBA")
        datas = rgba.getdata()
        
        newData = []
        for item in datas:
            # Check white/near-white studio background
            r, g, b, a = item
            # Distance from pure white
            if r > 240 and g > 240 and b > 240:
                newData.append((255, 255, 255, 0))
            elif r > 220 and g > 220 and b > 220:
                # Soft transition border
                alpha = int(255 * (1.0 - (min(r, g, b) - 220) / 20.0))
                newData.append((r, g, b, alpha))
            else:
                newData.append((r, g, b, 255))
        
        rgba.putdata(newData)
        rgba.save(nobg_path_png, format="PNG")
        rgba.save(nobg_path_webp, format="WEBP", quality=95)

    print(f"Processed image {idx+1}: {prefix} -> Saved PNG & WEBP")

print("Processing complete!")
