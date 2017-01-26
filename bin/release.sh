# Configure the publish registry
registry=`cat package.json | json publishConfig.registry`
if [ "$registry" = '' ]; then
    echo "NPM Registry is not configured. Which registry would you like to use?"
    read answer

    if [ "$answer" = '' ]; then
        echo "No NPM Registry provided. Exiting..."
        exit 0
    fi

    # Write the registry settings to package.json
    setupRegistryScript="this.publishConfig = !this.publishConfig ? {} : this.publishConfig; this.publishConfig.registry = '$answer';"
    packageJsonConfigured=`cat package.json | json -e "$setupRegistryScript"`

    if [ ! "$packageJsonConfigured" = '' ]; then
        echo $packageJsonConfigured | json > package.json
    fi
fi

# Display the registry settings before building
registry=`cat package.json | json publishConfig.registry`
echo "Publish Registry set to: '$registry'"

git add package.json
git commit -m "chore: setup NPM publish registry"

npm test &&
    preset=angular &&
    echo $preset &&
    bump=`conventional-recommended-bump -p angular` &&
    echo ${1:-$bump} &&
    npm --no-git-tag-version version ${1:-$bump} &>/dev/null &&
    conventional-changelog -i CHANGELOG.md -s -p ${2:-$preset} &&
    git add CHANGELOG.md &&
    version=`cat package.json | json version` &&
    git commit -m"docs(CHANGELOG): $version" &&
    npm version ${1:-$bump} -m "chore(release): %s" -f &&
    git push --follow-tags &&
    BABEL_ENV=release npm run build &&
    npm publish
