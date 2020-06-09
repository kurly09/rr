# rr; Review Request to Every Team member, on your CLI

## It will add your whole team member on your `LATEST` and `OPEN` pull request.

## Installation


### 1. Create GitHub access token
* Go to https://github.com/settings/tokens
* Push Generate new token button and copy and keep the token.

### 2. Set environment variables
```bash
# Add below environment variables your .bashrc / .zshrc
 export GITHUB_ACCESS_TOKEN=ADD_YOUR_OWN_ACCESS_KEY
 export GITHUB_ORG_NAME=ADD_YOUR_OWN_ORG_NAME
 export GITHUB_REPO_NAME=ADD_YOUR_REPOSITORY_NAME
 export GITHUB_MY_TEAM=ADD_YOUR_TEAM
 export GITHUB_MY_LOGIN_ID=ADD_YOUR_LOGIN_ID
```

### 3. Install rr
```
npm i -g @lv0gun9/rr
```

### 4. Create new PR on browser
You can do it.

### 5. Open your terminal and type `rr` and press the ENTER button.
It will shows your pull request URL when success.
