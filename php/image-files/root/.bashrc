cat <<'MSG'
 ___________  _____ ____    _                _                  _
|___  /_   _|/ ____|___ \  | |              | |                | |
   / /  | | | (___   __) | | |__   __ _  ___| | _____ _ __   __| |
  / /   | |  \___ \ |__ <  | '_ \ / _` |/ __| |/ / _ \ '_ \ / _` |
 / /__ _| |_ ____) |___) | | |_) | (_| | (__|   <  __/ | | | (_| |
/_____|_____|_____/|____/  |_.__/ \__,_|\___|_|\_\___|_| |_|\__,_|

MSG

echo "PHP version: ${PHP_VERSION}"

if ! shopt -oq posix; then
  if [ -f /usr/share/bash-completion/bash_completion ]; then
    . /usr/share/bash-completion/bash_completion
  elif [ -f /etc/bash_completion.d/yii ]; then
    . /etc/bash_completion.d/yii
  fi
fi
