#!/usr/bin/env bash
# One-shot script to publish the sf-decktools design system to imansur-sf/sf-decktools.
# Run this from your own terminal — the Claude sandbox can't push to github.com directly.
#
#   cd /Users/imansur/claude/sf-decktools-public
#   bash push.sh
#
# Prereqs:
#   - gh CLI authenticated as imansur-sf (run `gh auth status` to verify)
#   - The repo imansur-sf/sf-decktools has already been created (public) — Claude did this via the API
#
# After it runs, jsDelivr will serve files within ~10 minutes at:
#   https://cdn.jsdelivr.net/gh/imansur-sf/sf-decktools@main/{filename}

set -euo pipefail

cd "$(dirname "$0")"

if [ -d .git ]; then
  echo "✓ .git already exists, skipping init"
else
  git init -q
fi

git add -A

if git diff --cached --quiet; then
  echo "Nothing to commit."
else
  git -c user.email="${GIT_AUTHOR_EMAIL:-imansur@salesforce.com}" \
      -c user.name="${GIT_AUTHOR_NAME:-Imansur}" \
      commit -q -m "Initial commit — SF Decktools design system mirror for jsDelivr CDN"
fi

git branch -M main

if git remote get-url origin >/dev/null 2>&1; then
  git remote set-url origin https://github.com/imansur-sf/sf-decktools.git
else
  git remote add origin https://github.com/imansur-sf/sf-decktools.git
fi

echo "Pushing to github.com/imansur-sf/sf-decktools (~14MB, mostly the assets/ directory)…"
git push -u origin main

echo ""
echo "✓ Done."
echo ""
echo "Verify the CDN serves the files (jsDelivr caches for ~10 min after first push):"
echo "  curl -sLI https://cdn.jsdelivr.net/gh/imansur-sf/sf-decktools@main/components.css | head -1"
echo ""
echo "Once that returns HTTP/2 200, regenerate any deck via Slackbot and it should pick up the styles."
