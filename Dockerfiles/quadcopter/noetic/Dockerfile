FROM base_ros_theia_ubuntu20.04_noetic

WORKDIR /home/user/catkin_ws

#ENV ROS_DISTRO melodic
ENV ROS_DISTRO noetic

# This enable us to source files
RUN sudo rm /bin/sh && sudo ln -s /bin/bash /bin/sh && \
    sudo apt-key adv --keyserver 'hkp://keyserver.ubuntu.com:80' --recv-key C1CF6E31E6BADE8868B172B4F42ED6FBAB17C654 && \
    sudo apt-get update && \
    sudo apt install -y --no-install-recommends \
    ros-$ROS_DISTRO-ros-control \
    ros-$ROS_DISTRO-ros-controllers \
    ros-$ROS_DISTRO-gazebo-ros \
    ros-$ROS_DISTRO-gazebo-ros-control \
    ros-$ROS_DISTRO-teleop-twist-keyboard \
    ros-$ROS_DISTRO-gazebo-ros-pkgs \
    ros-$ROS_DISTRO-joint-state-controller \
    ros-$ROS_DISTRO-effort-controllers \
    ros-$ROS_DISTRO-position-controllers \
    ros-$ROS_DISTRO-xacro && \
    \
    \
    \
    sudo mkdir -p /home/user/catkin_ws/src && \
    sudo chown -R user:user /home/user/catkin_ws/ && \
    cd /home/user/catkin_ws/src && \
    catkin_create_pkg fly_bot rospy std_msgs && \
    git clone https://github.com/NishanthARao/ROS-Quadcopter-Simulation.git && \
    mv ROS-Quadcopter-Simulation/* fly_bot/ && \
    rm -rf ROS-Quadcopter-Simulation && \
    \
    \
    sed -i 's/ \t/\t/g' fly_bot/src/pid.py && \
    echo "<launch> <node name=\"control_spawner\" pkg=\"controller_manager\" type=\"spawner\" respawn=\"false\" output=\"screen\" args=\"--namespace=/Kwad joint_state_controller joint_motor_controller\" /> </launch>" > fly_bot/launch/control_spawner.launch && \
    \
    \
    chmod u+x fly_bot/src/control.py && \
    chmod u+x fly_bot/src/pid.py && \
    cd .. && \
    sudo apt update && \
    . /opt/ros/$ROS_DISTRO/setup.sh && \
    rosdep install --from-paths src --ignore-src -r -y && \
    catkin_make && \
    echo "source /opt/ros/$ROS_DISTRO/setup.bash" >> ~/.bashrc && \
    echo "source /home/user/catkin_ws/devel/setup.bash" >> ~/.bashrc && \
    /bin/bash -c "source ~/.bashrc" && \
    sudo update-alternatives --install /usr/bin/python python /usr/bin/python3 1 && \
    sudo rm -rf /var/lib/apt/lists/*
    
    



