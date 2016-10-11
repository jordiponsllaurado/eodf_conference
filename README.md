# eodf_conference

INSTALL PYTHON 3.5
==========================
tar xzvf Python-3.5.0.tgz
cd Python-3.5.0
./configure
make
sudo make install

pip3 install pyrebase
pip3 install requests --upgrade

python3.4 reader.py

sudo nano /home/pi/.config/lxsession/LXDE-pi/autostart
@lxtermianl -e python3.4 /home/pi/Desktop/eodf_conference/reader.py