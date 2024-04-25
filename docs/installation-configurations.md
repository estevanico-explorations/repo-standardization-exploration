# Installation & Configurations
- [Installation \& Configurations](#installation--configurations)
  - [Notes \& Prerequisites](#notes--prerequisites)
  - [`Node` \& Scripts](#node--scripts)
  - [Configurations](#configurations)
    - [Typescript](#typescript)
    - [Building \& Distrobution](#building--distrobution)
    - [Documentation](#documentation)

## Notes & Prerequisites
1. This project was developed on an `OSX` platform
1. I used `bash` for all my terminal commands
1. I used `iterm2` as my terminal
1. There is no `Docker` configuration
1. There is an assumption that `devtools` will be available so that these bins are available
    - `git`
    - `curl`
1. I assume that the user will have `admin`/`sudo` access on their computer
  - Needed to install `brew` and some other packages if not available.
1. There may be spelling mistakes in the code. Please forgive those.
1. When generating the files the `large` one will be nearly a GB large (give or take). When running the application it's a good idea to run `npm run cln` so it'll delete the files in `data/*`
    - `cln` may fail because I'm not doing checks if the files exist. Nothing to worry about.
1. Photo by <a href="https://unsplash.com/@clark_fransa?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Arnold Francisca</a> on <a href="https://unsplash.com/photos/turned-on-macbook-pro-wit-programming-codes-display-f77Bh3inUpE?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>

## `Node` & Scripts
This code project assumes an `OSX` platform. I cannot guarantee it working on Windows or other `*nix` systems thought it should work on `Linux`.

```sh
# Check if brew exists. If it does skip the brew install.
which brew -a # example output if exists: /usr/local/bin/brew

# Install brew (skip if above is true)
# 
# [NOTE]: If you haven't already you'll need to install devTools. When running
# this command it'll ask you if you want to install. Follow the onscreen prompts
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node & nvm
brew install node
brew install nvm

# Install required Node version
# 
# [NOTE]: 
# nvm may not appear on your path after install. You can either add it yourself
# or ignore the next two steps. I wrote & tested this in node 16 & 18. There will
# be a couple of errors that show up when installing but nothing that is
# concerning or break the functionality.
nvm install 18

# Switch over to node -v => 18
# This isn't really going to make a big difference but to minimize issues it's
# safest to stay on the same version.
nvm use 18

# Install the codebase
npm i

# Create a sample datafile. There are 3 options
#   1. gen-mocks:small  → ~1MB
#   2. gen-mocks:medium → ~70MB
#   3. gen-mocks:large  → ~700MB
# 
# Not guaranteed to have the best data
npm run gen-mocks:{SIZE}
```


## Configurations
### Typescript
...

### Building & Distrobution
...

### Documentation
...
