FROM base_ros_theia_ubuntu20.04_foxy

WORKDIR /home/user/catkin_ws

ENV ROS_DISTRO foxy

# This enable us to source files
RUN sudo rm /bin/sh && sudo ln -s /bin/bash /bin/sh && \
    sudo apt-get update && \
    sudo apt install -y --no-install-recommends \
    python3-colcon-common-extensions \
    ros-$ROS_DISTRO-gazebo-ros-pkgs && \
    sudo mkdir -p /home/user/catkin_ws/src && \
    sudo chown -R user:user /home/user/catkin_ws/ && \
    cd /home/user/catkin_ws/src && \
    git clone --single-branch --branch foxy https://github.com/husarion/rosbot_description.git && \
    git clone --single-branch --branch ros2 https://github.com/lukaszmitka/rplidar_ros.git && \
    cd .. && \
    sudo apt update && \
    . /opt/ros/$ROS_DISTRO/setup.sh && \
    rosdep install --from-paths src --ignore-src -r -y && \
    colcon build --symlink-install && \
    sudo rm -rf /var/lib/apt/lists/* && \
    echo "source /opt/ros/$ROS_DISTRO/setup.bash" >> ~/.bashrc && \
    echo "source /home/user/catkin_ws/install/setup.bash" >> ~/.bashrc && \
    /bin/bash -c "source ~/.bashrc"
     



