curl -LO https://github.com/neovim/neovim/releases/latest/download/nvim-linux64.tar.gz

sudo tar -C /opt -xzf nvim-linux64.tar.gz

sudo ln -s /opt/nvim-linux64/bin/nvim /usr/local/bin/nvim

rm nvim-linux64.tar.gz

git clone https://github.com/LazyVim/starter ~/.config/nvim

sudo apt-add-repository ppa:fish-shell/release-3
sudo apt update
sudo apt install fish

chsh -s /usr/bin/fish
