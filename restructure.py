import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Extract achievements-grid
achievements_match = re.search(r'(<div class="achievements-grid">.*?)(\s*</div>\s*</div>\s*</section>)', html, re.DOTALL)
if achievements_match:
    achievements_html = achievements_match.group(1) + '\n            </div>'
else:
    print("Error finding achievements-grid")
    achievements_html = ""

# 2. Extract timeline-container
timeline_match = re.search(r'(<div class="timeline-container">.*?)(\s*<!-- Otras Experiencias)', html, re.DOTALL)
if timeline_match:
    timeline_html = timeline_match.group(1)
else:
    print("Error finding timeline-container")
    timeline_html = ""

# 3. Extract other-experience
other_exp_match = re.search(r'(<div class="other-experience">.*?)(\s*</div>\s*</section>\s*<!-- Educación Section -->)', html, re.DOTALL)
if other_exp_match:
    other_exp_html = other_exp_match.group(1) + '\n            </div>'
else:
    print("Error finding other-experience")
    other_exp_html = ""

# Now, remove the old sections
# Remove achievements section
html = re.sub(r'<!-- Proyectos & Logros Recientes -->\s*<section class="achievements section-padding" id="logros">.*?</section>', '', html, flags=re.DOTALL)

# Remove experience section completely (we extracted everything inside it)
html = re.sub(r'<!-- Experiencia Interactiva Section -->\s*<section class="experience section-padding" id="experiencia">.*?</section>', '', html, flags=re.DOTALL)

# Now inject into the panels
# Panel 1
panel1_pattern = r'(<section class="theme-panel" id="analitica-ia">)(.*?)(</section>)'
def panel1_repl(m):
    content = m.group(2)
    return f'{m.group(1)}\n        <div class="theme-panel-top">{content}        </div>\n        <div class="theme-panel-support">\n            <div class="container">\n                {achievements_html}\n            </div>\n        </div>\n    {m.group(3)}'
html = re.sub(panel1_pattern, panel1_repl, html, flags=re.DOTALL)

# Panel 2
panel2_pattern = r'(<section class="theme-panel" id="conservacion">)(.*?)(</section>)'
def panel2_repl(m):
    content = m.group(2)
    return f'{m.group(1)}\n        <div class="theme-panel-top">{content}        </div>\n        <div class="theme-panel-support">\n            <div class="container">\n                {timeline_html}\n            </div>\n        </div>\n    {m.group(3)}'
html = re.sub(panel2_pattern, panel2_repl, html, flags=re.DOTALL)

# Panel 3
panel3_pattern = r'(<section class="theme-panel" id="institucional">)(.*?)(</section>)'
def panel3_repl(m):
    content = m.group(2)
    return f'{m.group(1)}\n        <div class="theme-panel-top">{content}        </div>\n        <div class="theme-panel-support">\n            <div class="container">\n                {other_exp_html}\n            </div>\n        </div>\n    {m.group(3)}'
html = re.sub(panel3_pattern, panel3_repl, html, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("HTML restructured successfully.")
