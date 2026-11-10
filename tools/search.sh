#!/usr/bin/env bash
# search.sh - case-insensitive file name search for this Next.js project

# always run from the project root (the folder above tools/)
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT" || exit 1

# colors
GREEN=$'\033[32m'
RED=$'\033[31m'
CYAN=$'\033[36m'
HL=$'\033[1;30;43m'   # bold black text on yellow background
RESET=$'\033[0m'

# query from arguments, or ask for it
QUERY="$*"
if [ -z "$QUERY" ]; then
  read -rp "Search file name: " QUERY
fi

if [ -z "$QUERY" ]; then
  echo "${RED}Nothing to search.${RESET}" >&2
  exit 1
fi

# -iname = case-insensitive; *query* matches any extension (tsx, jsx, css, ...)
RESULTS="$(find . \
  \( -name node_modules -o -name .next -o -name .git -o -name dist -o -name build -o -name out -o -name coverage \) -prune \
  -o -type f -iname "*${QUERY}*" -print | sed 's|^\./||' | sort)"

if [ -z "$RESULTS" ]; then
  echo "${RED}No files found for '${QUERY}'${RESET}"
  exit 0
fi

# escape regex special chars so "." or "[" in the query don't break sed
ESC="$(printf '%s' "$QUERY" | sed -E 's/[][\.*^$/+?(){}|-]/\\&/g')"

COUNT="$(echo "$RESULTS" | wc -l)"

echo "$RESULTS" \
  | sed -E "s/${ESC}/${HL}&${RESET}${GREEN}/Ig" \
  | sed "s/^/${GREEN}/; s/\$/${RESET}/"

echo
echo "${CYAN}${COUNT} file(s) found${RESET}"