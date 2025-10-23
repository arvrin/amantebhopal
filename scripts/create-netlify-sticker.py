#!/usr/bin/env python3
from PIL import Image, ImageDraw, ImageFont
import os

# Paths
script_dir = os.path.dirname(os.path.abspath(__file__))
project_dir = os.path.dirname(script_dir)
qr_path = os.path.join(project_dir, "qrchimpX1024 (3).png")
output_path = os.path.join(project_dir, "public/qr-codes/sticker-netlify.png")

# Create output directory if it doesn't exist
os.makedirs(os.path.dirname(output_path), exist_ok=True)

# Load the heart-shaped QR code
qr_code = Image.open(qr_path)

# Create a new image with white background (A4 aspect ratio, portrait)
# Using 2480 x 3508 pixels (A4 at 300 DPI) but scaling down for web use
width = 1240
height = 1754
sticker = Image.new('RGB', (width, height), 'white')
draw = ImageDraw.Draw(sticker)

# Brand color
brand_red = (139, 21, 56)  # #8B1538

# Draw decorative border frame at top
frame_y = 180
frame_height = 120
frame_padding = 200

# Draw rounded rectangle frame
def draw_rounded_rectangle(draw, xy, radius, outline, width):
    x1, y1, x2, y2 = xy
    draw.rounded_rectangle(xy, radius=radius, outline=outline, width=width)

# Draw outer frame
draw_rounded_rectangle(
    draw,
    (frame_padding, frame_y, width - frame_padding, frame_y + frame_height),
    radius=20,
    outline=brand_red,
    width=3
)

# Draw inner frame
inner_padding = 10
draw_rounded_rectangle(
    draw,
    (frame_padding + inner_padding, frame_y + inner_padding,
     width - frame_padding - inner_padding, frame_y + frame_height - inner_padding),
    radius=15,
    outline=brand_red,
    width=2
)

# Draw diamond decorations
diamond_size = 15
def draw_diamond(x, y):
    points = [
        (x, y - diamond_size),
        (x + diamond_size, y),
        (x, y + diamond_size),
        (x - diamond_size, y)
    ]
    draw.polygon(points, outline=brand_red, width=2)

# Add diamonds at corners
diamond_positions = [
    (frame_padding - 25, frame_y + 20),
    (frame_padding - 25, frame_y + frame_height - 20),
    (width - frame_padding + 25, frame_y + 20),
    (width - frame_padding + 25, frame_y + frame_height - 20),
    (width // 2, frame_y - 25),
    (width // 2, frame_y + frame_height + 25)
]

for x, y in diamond_positions:
    draw_diamond(x, y)

# Try to use a nice font, fall back to default if not available
try:
    # Try different serif fonts
    title_font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Georgia.ttf", 100)
    tagline_font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Georgia.ttf", 36)
    button_font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Georgia Bold.ttf", 50)
    subtitle_font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Georgia.ttf", 32)
except:
    try:
        title_font = ImageFont.truetype("/Library/Fonts/Arial.ttf", 100)
        tagline_font = ImageFont.truetype("/Library/Fonts/Arial.ttf", 36)
        button_font = ImageFont.truetype("/Library/Fonts/Arial Bold.ttf", 50)
        subtitle_font = ImageFont.truetype("/Library/Fonts/Arial.ttf", 32)
    except:
        title_font = ImageFont.load_default()
        tagline_font = ImageFont.load_default()
        button_font = ImageFont.load_default()
        subtitle_font = ImageFont.load_default()

# Draw "AMANTE" text in the frame
title_text = "AMANTE"
title_bbox = draw.textbbox((0, 0), title_text, font=title_font)
title_width = title_bbox[2] - title_bbox[0]
title_x = (width - title_width) // 2
title_y = frame_y + (frame_height - (title_bbox[3] - title_bbox[1])) // 2
draw.text((title_x, title_y), title_text, font=title_font, fill=brand_red)

# Draw tagline
tagline = "A World of Flavor, Just a Scan Away."
tagline_bbox = draw.textbbox((0, 0), tagline, font=tagline_font)
tagline_width = tagline_bbox[2] - tagline_bbox[0]
tagline_x = (width - tagline_width) // 2
tagline_y = frame_y + frame_height + 80
draw.text((tagline_x, tagline_y), tagline, font=tagline_font, fill=brand_red)

# Resize and paste QR code
qr_size = 700
qr_resized = qr_code.resize((qr_size, qr_size), Image.Resampling.LANCZOS)
qr_x = (width - qr_size) // 2
qr_y = tagline_y + 100
sticker.paste(qr_resized, (qr_x, qr_y), qr_resized if qr_resized.mode == 'RGBA' else None)

# Draw rounded button below QR code
button_y = qr_y + qr_size + 60
button_width = 450
button_height = 90
button_x = (width - button_width) // 2

# Draw button background
draw.rounded_rectangle(
    (button_x, button_y, button_x + button_width, button_y + button_height),
    radius=45,
    fill=brand_red
)

# Draw "SCAN ME" text
button_text = "SCAN ME"
button_bbox = draw.textbbox((0, 0), button_text, font=button_font)
button_text_width = button_bbox[2] - button_bbox[0]
button_text_height = button_bbox[3] - button_bbox[1]
button_text_x = button_x + (button_width - button_text_width) // 2
button_text_y = button_y + (button_height - button_text_height) // 2
draw.text((button_text_x, button_text_y), button_text, font=button_font, fill='white')

# Draw subtitle below button
subtitle = "View Our Menu"
subtitle_bbox = draw.textbbox((0, 0), subtitle, font=subtitle_font)
subtitle_width = subtitle_bbox[2] - subtitle_bbox[0]
subtitle_x = (width - subtitle_width) // 2
subtitle_y = button_y + button_height + 30
draw.text((subtitle_x, subtitle_y), subtitle, font=subtitle_font, fill=brand_red)

# Save the sticker
sticker.save(output_path, 'PNG', quality=95)
print(f"✅ Netlify sticker created successfully!")
print(f"📄 Location: {output_path}")
print(f"📊 Size: {width}x{height} pixels")
