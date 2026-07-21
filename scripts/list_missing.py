from pathlib import Path
import json
p = Path(__file__).resolve().parent.parent / 'campos_tela_cnpj_05373141000173.json'
obj = json.loads(p.read_text(encoding='utf-8'))
results = []

def walk(o, path):
    if isinstance(o, dict):
        if o.get('status') == 'FALTANDO':
            results.append(path)
        for k, v in o.items():
            newp = f"{path}.{k}" if path else k
            walk(v, newp)
    elif isinstance(o, list):
        for i, v in enumerate(o):
            walk(v, f"{path}[{i}]")

walk(obj, '')
for r in results:
    print(r)
