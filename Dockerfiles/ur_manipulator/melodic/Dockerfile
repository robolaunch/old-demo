FROM base_ros_theia_ubuntu18.04_melodic

WORKDIR /home/user/catkin_ws

ENV ROS_DISTRO melodic

# This enable us to source files
RUN sudo rm /bin/sh && sudo ln -s /bin/bash /bin/sh && \
    sudo apt-get update && \
    sudo mkdir -p /home/user/catkin_ws/src && \
    sudo chown -R user:user /home/user/catkin_ws/ && \
    cd /home/user/catkin_ws/src && \
    git clone -b $ROS_DISTRO-devel https://github.com/ros-industrial/universal_robot.git && \
    cd .. && \
    sudo apt update && \
    . /opt/ros/$ROS_DISTRO/setup.sh && \
    rosdep update && \
    rosdep install --rosdistro $ROS_DISTRO --ignore-src --from-paths src -y && \
    catkin_make && \
    sudo rm -rf /var/lib/apt/lists/* && \
    echo "source /opt/ros/$ROS_DISTRO/setup.bash" >> ~/.bashrc && \
    echo "source /home/user/catkin_ws/devel/setup.bash" >> ~/.bashrc && \
    /bin/bash -c "source ~/.bashrc"
     




