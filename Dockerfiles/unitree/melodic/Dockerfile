FROM base_ros_theia_ubuntu18.04_melodic

WORKDIR /home/user/catkin_ws

ENV ROS_DISTRO melodic

# This enable us to source files
RUN sudo rm /bin/sh && sudo ln -s /bin/bash /bin/sh && \
    sudo apt-get update && \
    sudo apt install -y --no-install-recommends \
    ros-$ROS_DISTRO-controller-interface \
    ros-$ROS_DISTRO-gazebo-ros-control  \
    ros-$ROS_DISTRO-joint-state-controller  \
    ros-$ROS_DISTRO-effort-controllers  \
    ros-$ROS_DISTRO-joint-trajectory-controller \
    ros-$ROS_DISTRO-xacro && \
    sudo mkdir -p /home/user/catkin_ws/src && \
    sudo chown -R user:user /home/user/catkin_ws/ && \
    cd /home/user/catkin_ws/src && \
    git clone https://github.com/unitreerobotics/unitree_ros.git && \
    git clone https://github.com/unitreerobotics/unitree_ros_to_real.git && \
    rm -r unitree_ros_to_real/unitree_legged_real && \
    sed -i 's/bian/ubuntu/g' unitree_ros/unitree_gazebo/worlds/stairs.world && \
    cd .. && \
    sudo apt update && \
    . /opt/ros/$ROS_DISTRO/setup.sh && \
    rosdep install --from-paths src --ignore-src -r -y && \
    catkin_make && \
    sudo rm -rf /var/lib/apt/lists/* && \
    echo "source /opt/ros/$ROS_DISTRO/setup.bash" >> ~/.bashrc && \
    echo "source /home/user/catkin_ws/devel/setup.bash" >> ~/.bashrc && \
    /bin/bash -c "source ~/.bashrc"
     


# gazebo 8 is a dependency
