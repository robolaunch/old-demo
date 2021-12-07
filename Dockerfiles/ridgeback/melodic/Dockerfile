FROM base_ros_theia_ubuntu18.04_melodic

WORKDIR /home/user/catkin_ws

ENV ROS_DISTRO melodic

# This enable us to source files
RUN sudo rm /bin/sh && sudo ln -s /bin/bash /bin/sh && \
    wget https://packages.clearpathrobotics.com/public.key -O - | sudo apt-key add - && \
    sudo sh -c 'echo "deb https://packages.clearpathrobotics.com/stable/ubuntu $(lsb_release -cs) main" > /etc/apt/sources.list.d/clearpath-latest.list' && \
    sudo apt-get update && \
    sudo apt install -y --no-install-recommends \
    ros-$ROS_DISTRO-rosbridge-server \
    ros-$ROS_DISTRO-ridgeback-simulator \
    ros-$ROS_DISTRO-ridgeback-desktop \
    ros-$ROS_DISTRO-realsense2-camera \
    ros-$ROS_DISTRO-realsense2-description \
    ros-$ROS_DISTRO-gazebo-plugins \
    wmctrl && \
    sudo mkdir -p /home/user/catkin_ws/src && \
    sudo chown -R user:user /home/user/catkin_ws/ && \
    cd /home/user/catkin_ws/src && \
    sudo git clone https://github.com/ridgeback/ridgeback.git && \
    sudo git clone https://github.com/ridgeback/ridgeback_simulator.git && \
    sudo git clone https://github.com/ProvEdge/LMS1xx.git && \
    sudo git clone https://github.com/ProvEdge/pointgrey_camera_driver.git && \
    cd .. && \
    sudo apt update && \
    . /opt/ros/$ROS_DISTRO/setup.sh && \
    rosdep install --from-paths src --ignore-src -r -y && \
    catkin_make && \
    sudo rm -rf /var/lib/apt/lists/* && \
    echo "source /opt/ros/$ROS_DISTRO/setup.bash" >> ~/.bashrc && \
    echo "source /home/user/catkin_ws/devel/setup.bash" >> ~/.bashrc && \
    /bin/bash -c "source ~/.bashrc"
     
     
#  noetic repoları yok

#RUN echo "no"
     
#ENTRYPOINT . /opt/ros/$ROS_DISTRO/setup.sh && \
#    ls && \
#    . devel/setup.sh && \
#    roslaunch ridgeback_gazebo ridgeback_world.launch


