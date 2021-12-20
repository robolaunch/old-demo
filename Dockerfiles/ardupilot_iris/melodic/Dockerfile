#FROM hgtunc/boardmarker:v6-ros-base-theia
#FROM base_ros_theia_ubuntu20.04_noetic
FROM base_ros_theia_ubuntu18.04_melodic

RUN sudo rm /bin/sh && sudo ln -s /bin/bash /bin/sh

ENV DEBIAN_FRONTEND=noninteractive
ENV USER=user

WORKDIR /home/user/

RUN sudo git clone https://github.com/ArduPilot/ardupilot.git && \
    cd ardupilot && \
    sudo git submodule update --init --recursive && \
    sudo chown -R user:user ~/ardupilot && \
    ls -la Tools/environment_install/ && \
    Tools/environment_install/install-prereqs-ubuntu.sh -y && \
    source ~/.profile

WORKDIR /home/user/

RUN sudo git clone https://github.com/khancyr/ardupilot_gazebo && \
    sudo chown -R user:user ~/ardupilot_gazebo && \
    cd ardupilot_gazebo && \
    sudo mkdir build && \
    cd build && \
    sudo cmake .. && \
    sudo make -j4 && \
    sudo make install && \
    echo 'export GAZEBO_MODEL_PATH=~/ardupilot_gazebo/models' >> ~/.bashrc && \
    echo 'export GAZEBO_RESOURCE_PATH=~/ardupilot_gazebo/worlds:${GAZEBO_RESOURCE_PATH}' >> ~/.bashrc && \
    . ~/.bashrc

WORKDIR /home/user/

ENV ROS_DISTRO melodic

RUN sudo apt-get install -y ros-$ROS_DISTRO-mavros ros-$ROS_DISTRO-mavros-extras && \
    wget https://raw.githubusercontent.com/mavlink/mavros/master/mavros/scripts/install_geographiclib_datasets.sh && \
    sudo chmod a+x install_geographiclib_datasets.sh && \
    sudo ./install_geographiclib_datasets.sh
    

    
RUN sudo apt-get update && \
    sudo apt-get install -y \ 
    python-dev python-opencv python-wxgtk4.0 python-pip python-matplotlib python-lxml python-pygame && \
    pip install PyYAML mavproxy --user && \
    echo "export PATH=$PATH:$HOME/.local/bin" >> ~/.bashrc

	    
