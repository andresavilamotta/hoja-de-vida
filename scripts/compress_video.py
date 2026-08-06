import os
import subprocess
import imageio_ffmpeg

input_video = r"j:\Mi unidad\Hoja de Vida\Escena_inicial_-_2026-08-04_202608041137.mp4"
output_dir = r"j:\Mi unidad\Hoja de Vida\assets"
os.makedirs(output_dir, exist_ok=True)

output_video = os.path.join(output_dir, "video_pitch.mp4")
output_poster = os.path.join(output_dir, "video_poster.jpg")

ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
print(f"Using FFmpeg at: {ffmpeg_exe}")
print(f"Input Video Size: {os.path.getsize(input_video)/(1024*1024):.2f} MB")

# 1. Compress Video with H.264 CRF 26 and AAC Audio for web faststart
cmd_compress = [
    ffmpeg_exe,
    "-y",
    "-i", input_video,
    "-vcodec", "libx264",
    "-crf", "26",
    "-preset", "medium",
    "-acodec", "aac",
    "-b:a", "128k",
    "-movflags", "+faststart",
    output_video
]

print("Executing H.264 web compression...")
res = subprocess.run(cmd_compress, capture_output=True, text=True)
if res.returncode == 0:
    print(f"Compressed Video Created: {output_video} ({os.path.getsize(output_video)/(1024*1024):.2f} MB)")
else:
    print("Compression Error:", res.stderr)

# 2. Extract poster image thumbnail
cmd_poster = [
    ffmpeg_exe,
    "-y",
    "-ss", "00:00:02",
    "-i", input_video,
    "-vframes", "1",
    "-q:v", "2",
    output_poster
]

print("Generating video poster frame...")
res_poster = subprocess.run(cmd_poster, capture_output=True, text=True)
if res_poster.returncode == 0:
    print(f"Poster Image Created: {output_poster}")
else:
    print("Poster Extraction Error:", res_poster.stderr)

print("Video processing complete!")
