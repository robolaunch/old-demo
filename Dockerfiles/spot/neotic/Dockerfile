FROM base_ros_theia_ubuntu20.04_noetic

WORKDIR /home/user/catkin_ws

ENV ROS_DISTRO noetic

# This enable us to source files
RUN sudo rm /bin/sh && sudo ln -s /bin/bash /bin/sh && \
    sudo apt-get update && \
    sudo apt install -y --no-install-recommends \
    ros-$ROS_DISTRO-rosbridge-server \
    python3-rosdep \
    wmctrl && \
    sudo mkdir -p /home/user/catkin_ws/src && \
    sudo chown -R user:user /home/user/catkin_ws/ && \
    cd /home/user/catkin_ws/src && \
    sudo git clone --recursive https://github.com/PranshuTople/champ.git && \
    sudo git clone https://github.com/chvmp/champ_teleop.git && \
    sudo git clone https://github.com/chvmp/robots.git && \
    sudo git clone -b gazebo https://github.com/chvmp/spot_ros && \
    cd .. && \
    sudo apt update && \
    . /opt/ros/$ROS_DISTRO/setup.sh && \
    rosdep install --from-paths src --ignore-src -r -y && \
    catkin_make && \
    sudo rm -rf /var/lib/apt/lists/* && \
    echo "source /opt/ros/$ROS_DISTRO/setup.bash" >> ~/.bashrc && \
    echo "source ~/catkin_ws/devel/setup.bash" >> ~/.bashrc && \
    /bin/bash -c "source ~/.bashrc"
