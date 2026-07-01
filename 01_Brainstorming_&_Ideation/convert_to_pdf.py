"""Convert .md files to PDF (excluding README.md)."""
import os
import markdown
from xhtml2pdf import pisa

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
EXCLUDE = {"readme.md"}

HTML_TEMPLATE = """<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
    body {{
        font-family: Helvetica, Arial, sans-serif;
        font-size: 12px;
        line-height: 1.6;
        color: #222;
        margin: 40px;
    }}
    h1 {{
        font-size: 22px;
        color: #1a1a2e;
        border-bottom: 2px solid #16213e;
        padding-bottom: 8px;
        margin-bottom: 16px;
    }}
    h2 {{
        font-size: 17px;
        color: #16213e;
        margin-top: 24px;
    }}
    h3 {{
        font-size: 14px;
        color: #0f3460;
        margin-top: 18px;
    }}
    ul {{
        margin-left: 20px;
    }}
    li {{
        margin-bottom: 4px;
    }}
    p {{
        margin-bottom: 10px;
    }}
</style>
</head>
<body>
{content}
</body>
</html>"""


def convert_md_to_pdf(md_path, pdf_path):
    """Convert a single markdown file to PDF."""
    with open(md_path, "r", encoding="utf-8") as f:
        md_text = f.read()

    html_content = markdown.markdown(md_text, extensions=["extra", "sane_lists"])
    full_html = HTML_TEMPLATE.format(content=html_content)

    with open(pdf_path, "wb") as pdf_file:
        status = pisa.CreatePDF(full_html, dest=pdf_file)

    if status.err:
        print(f"  ERROR converting {md_path}")
        return False
    return True


def main():
    converted = 0
    for filename in sorted(os.listdir(SCRIPT_DIR)):
        if not filename.endswith(".md"):
            continue
        if filename.lower() in EXCLUDE:
            print(f"  Skipping: {filename}")
            continue

        md_path = os.path.join(SCRIPT_DIR, filename)
        pdf_name = filename.rsplit(".", 1)[0] + ".pdf"
        pdf_path = os.path.join(SCRIPT_DIR, pdf_name)

        print(f"  Converting: {filename} -> {pdf_name} ...", end=" ")
        if convert_md_to_pdf(md_path, pdf_path):
            print("OK")
            converted += 1
        else:
            print("FAILED")

    print(f"\nDone! {converted} file(s) converted.")


if __name__ == "__main__":
    main()
