FROM base_ros_theia_ubuntu20.04_noetic

WORKDIR /home/user/catkin_ws

ENV ROS_DISTRO noetic

# This enable us to source files
RUN sudo rm /bin/sh && sudo ln -s /bin/bash /bin/sh && \
    sudo apt-get update && \
    sudo apt install -y --no-install-recommends \
    ros-$ROS_DISTRO-leo-simulator && \
    sudo mkdir -p /home/user/catkin_ws/src && \
    sudo chown -R user:user /home/user/catkin_ws/ && \
    cd /home/user/catkin_ws/src && \
    cd .. && \
    . /opt/ros/$ROS_DISTRO/setup.sh && \
    sudo rm -rf /var/lib/apt/lists/* && \
    echo "source /opt/ros/$ROS_DISTRO/setup.bash" >> ~/.bashrc && \
    /bin/bash -c "source ~/.bashrc"
     



