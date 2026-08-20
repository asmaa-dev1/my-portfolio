import os
import pypdfium2 as pdfium

certs = [
    ("scrum-foundation.pdf", "scrum-foundation.png"),
    ("business-intelligence-foundation.pdf", "business-intelligence-foundation.png"),
    ("cisco-python-essentials.pdf", "cisco-python-essentials.png"),
    ("cisco-javascript-essentials.pdf", "cisco-javascript-essentials.png")
]

base_dir = os.path.join(os.path.dirname(__file__), "..", "public", "certificates")

for pdf_name, png_name in certs:
    pdf_path = os.path.join(base_dir, pdf_name)
    png_path = os.path.join(base_dir, png_name)
    
    if not os.path.exists(pdf_path):
        print(f"Skipping {pdf_name}, not found.")
        continue
        
    print(f"Rendering {pdf_name} -> {png_name}...")
    pdf = pdfium.PdfDocument(pdf_path)
    page = pdf[0]
    # Render at scale 2.0 or 3.0 for crisp, high-res preview
    image = page.render(scale=3.0).to_pil()
    image.save(png_path, "PNG")
    print(f"Saved {png_path} ({image.width}x{image.height})")

print("All certificate previews generated successfully!")
