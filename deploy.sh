#!/bin/bash

# Stop execution immediately if any command fails
set -e

# Accept a commit message as an argument, or use a default
COMMIT_MSG=${1:-"docs: update site content"}
WORKTREE_DIR="/tmp/buffaloner-gh-pages"

echo "🔨 1. Building the site..."
# I am using 'properdocs' based on your previous commands. 
# (If you moved back to standard mkdocs, change this to: uv run mkdocs build --clean)
uv run properdocs build --clean

echo "🌳 2. Setting up git worktree..."
# Clean up the temp directory if a previous run failed and left it behind
if [ -d "$WORKTREE_DIR" ]; then
    git worktree remove --force "$WORKTREE_DIR" 2>/dev/null || rm -rf "$WORKTREE_DIR"
fi

# Link the gh-pages branch to our temporary folder
git worktree add "$WORKTREE_DIR" gh-pages

echo "🔄 3. Syncing built files..."
# Sync the site/ folder into the worktree.
# --delete removes old deleted pages, but --exclude=".git" protects the branch data!
rsync -a --delete site/ "$WORKTREE_DIR/" --exclude=".git"

echo "✍️  4. Committing and signing..."
cd "$WORKTREE_DIR"
git add .

if git diff-index --quiet HEAD --; then
    echo "🤷 No changes to deploy. Cleaning up..."
    cd - > /dev/null
    git worktree remove "$WORKTREE_DIR"
    exit 0
fi

# Force GPG to attach to THIS specific script execution
export GPG_TTY=$(tty)

# Commit with the -S flag
git commit -S -m "$COMMIT_MSG"

echo "🚀 5. Pushing to GitHub..."
git push origin gh-pages

echo "🧹 6. Cleaning up..."
cd - > /dev/null
git worktree remove "$WORKTREE_DIR"

echo "✅ Deployment complete and verified!"
