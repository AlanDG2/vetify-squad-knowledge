#!/bin/bash
# Hook UserPromptSubmit — inyecta el recordatorio del DoR compuesto antes de cada respuesta.
# Clon exacto del patrón de vetify-automation/automation/.claude/hooks/preflight-check.sh,
# apuntado a Definition of Ready (antes de pasar a desarrollo) en vez de Definition of Done.
# DoR final = core/dor/dor-core.md (6 universales) + el dor-ticket.md del adaptador activo.

ROOT="$(git rev-parse --show-toplevel 2>/dev/null || echo .)"

cat << 'EOF'

═══════════════════════════════════════════════════════════════════════
🚨 PRE-FLIGHT — Definition of Ready
═══════════════════════════════════════════════════════════════════════

Antes de declarar una HU/feature/epic "lista para desarrollo", verificar
el DoR compuesto: los 6 criterios universales (core) + los del adaptador
de tickets activo.

6 universales: (1) objetivo/descripción explícita; (2) CAs atómicos y
verificables; (3) alcance Y fuera de alcance explícitos; (4) diseño
referenciado o su ausencia justificada; (5) vinculada a su épica;
(6) dependencias/bloqueos identificados.

Regla dura: si falta CUALQUIER criterio aplicable → la HU NO está lista.
Es "casi lista" o "no cumple". NUNCA inflar el estado.
EOF

# Detectar el adaptador activo y mostrar sus criterios de ticket (si los hay)
ACTIVE_DOR=""
for cfg in "$ROOT"/adapters/*/adapter.config.json; do
  [ -f "$cfg" ] || continue
  if grep -q '"active"[[:space:]]*:[[:space:]]*true' "$cfg" 2>/dev/null; then
    dir="$(dirname "$cfg")"
    name="$(basename "$dir")"
    if [ -f "$dir/dor-ticket.md" ] && grep -qvE '^\s*(<!--|$)' "$dir/dor-ticket.md" 2>/dev/null; then
      echo ""
      echo "── Criterios extra del adaptador activo: $name ──"
      grep -E '^[0-9]+\.' "$dir/dor-ticket.md" 2>/dev/null
      ACTIVE_DOR="$name"
    fi
  fi
done

if [ -z "$ACTIVE_DOR" ]; then
  echo ""
  echo "Adaptador de tickets: ninguno con criterios extra (DoR = los 6 universales)."
fi

echo ""
echo "═══════════════════════════════════════════════════════════════════════"
