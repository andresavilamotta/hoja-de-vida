import os
import subprocess
import sys

REPOS = {
    # UI, Estética y Frontend
    "impeccable": "https://github.com/pbakaus/impeccable.git",
    "antigravity-awesome-skills": "https://github.com/sickn33/antigravity-awesome-skills.git",
    "antigravity_global_skills": "https://github.com/krishnakanthb13/antigravity_global_skills.git",
    "tailwindcss": "https://github.com/tailwindlabs/tailwindcss.git",
    "shadcn-ui": "https://github.com/shadcn-ui/ui.git",
    "radix-primitives": "https://github.com/radix-ui/primitives.git",
    "magicui": "https://github.com/magicuidesign/magicui.git",
    "motion": "https://github.com/motiondivision/motion.git",
    "lenis": "https://github.com/darkroomengineering/lenis.git",
    "axe-core": "https://github.com/dequelabs/axe-core.git",
    
    # Arquitectura & Backend
    "temporal": "https://github.com/temporalio/temporal.git",
    "dagster": "https://github.com/dagster-io/dagster.git",
    "langgraph": "https://github.com/langchain-ai/langgraph.git",
    "crewAI": "https://github.com/crewAIInc/crewAI.git",
    "flyte": "https://github.com/flyteorg/flyte.git",
    "argo-workflows": "https://github.com/argoproj/argo-workflows.git",
    "kestra": "https://github.com/kestra-io/kestra.git",
    "starter-workflows": "https://github.com/actions/starter-workflows.git"
}

TARGET_DIR = os.path.join(os.getcwd(), "docs", "references")

def main():
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8')
    os.makedirs(TARGET_DIR, exist_ok=True)
    print(f"📁 Directorio de referencias: {TARGET_DIR}")
    
    for name, url in REPOS.items():
        repo_path = os.path.join(TARGET_DIR, name)
        if os.path.exists(repo_path):
            print(f"✅ Ya existe: {name}")
            continue
        
        print(f"🚀 Clonando {name} ({url})...")
        try:
            subprocess.run(
                ["git", "clone", "--depth", "1", url, repo_path],
                check=True,
                capture_output=True,
                text=True
            )
            print(f"✨ Exitoso: {name}")
        except subprocess.CalledProcessError as e:
            print(f"⚠️ Advertencia/Error al clonar {name}: {e.stderr.strip() or e}")

if __name__ == "__main__":
    main()
