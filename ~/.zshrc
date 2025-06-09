# bun completions
[ -s "/Users/nfhome/.bun/_bun" ] && source "/Users/nfhome/.bun/_bun"

# bun
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"

# function to make pushing to GitHub more efficient
function pushit() {
  if [ -z "$1" ]; then
    echo "❌ Please provide a commit message."
    return 1
  fi

  # Store the original directory and find git root
  local original_dir=$(pwd)
  local git_root=$(git rev-parse --show-toplevel 2>/dev/null)
  
  if [ -z "$git_root" ]; then
    echo "❌ Not in a git repository!"
    return 1
  fi

  # Change to git root for consistent behavior
  cd "$git_root"

  # Check if package.json has a build script
  if [ -f "package.json" ] && grep -q '"build"' package.json; then
    echo "🔧 Building project..."
    if ! bun run build; then
      echo "❌ Build failed!"
      cd "$original_dir"
      return 1
    fi
  fi

  echo "📦 Staging all changes..."
  git add .

  echo "📝 Committing with message: $1"
  if ! git commit -m "$1"; then
    echo "❌ Commit failed or nothing to commit!"
    cd "$original_dir"
    return 1
  fi

  echo "⬆️ Pushing to origin..."
  if ! git push; then
    echo "❌ Push failed!"
    cd "$original_dir"
    return 1
  fi

  cd "$original_dir"
  echo "✅ All done! 🚀"
  echo "💡 To deploy workers, run:"
  echo "   cd api && npx wrangler deploy && cd .. && npx wrangler deploy"
}

# Start up MCPs
pgrep -f "browser-tools-server" > /dev/null || (npx @agentdeskai/browser-tools-server@latest > /dev/null 2>&1 &)

# Show full path in terminal
export PROMPT='%n@%m:%~ %# ' 