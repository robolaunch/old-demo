FROM base_ros_theia_ubuntu20.04_noetic

WORKDIR /home/user/catkin_ws

ENV ROS_DISTRO noetic

# This enable us to source files
RUN sudo rm /bin/sh && sudo ln -s /bin/bash /bin/sh && \
    sudo apt-get update && \
    sudo apt install -y --no-install-recommends \
    python3-pip && \
    sudo mkdir -p /home/user/catkin_ws/src && \
    sudo chown -R user:user /home/user/catkin_ws/ && \
    cd /home/user/catkin_ws/src && \
    git clone --depth 1 https://github.com/CopterExpress/clover && \
    git clone --depth 1 https://github.com/CopterExpress/ros_led && \
    git clone --depth 1 https://github.com/ethz-asl/mav_comm && \
    cd .. && \
    . /opt/ros/$ROS_DISTRO/setup.sh && \
    rosdep update && \
    rosdep install --from-paths src --ignore-src -y && \
    sudo /usr/bin/python3 -m pip install -r src/clover/clover/requirements.txt && \
    cd src && \
    git clone --recursive --depth 1 --branch v1.12.0 https://github.com/PX4/PX4-Autopilot.git ~/PX4-Autopilot && \
    ln -s ~/PX4-Autopilot PX4-Autopilot && \
    ln -s ~/PX4-Autopilot/Tools/sitl_gazebo sitl_gazebo && \
    cd PX4-Autopilot/Tools/setup && \
    sudo ./ubuntu.sh --no-nuttx && \
    ln -s "$(catkin_find clover_simulation airframes)"/* ~/PX4-Autopilot/ROMFS/px4fmu_common/init.d-posix/airframes/ && \
    sudo /opt/ros/noetic/lib/mavros/install_geographiclib_datasets.sh && \
    cd /home/user/catkin_ws && \
    catkin_make && \
    sudo rm -rf /var/lib/apt/lists/* && \
    echo "source /opt/ros/$ROS_DISTRO/setup.bash" >> ~/.bashrc && \
    /bin/bash -c "source ~/.bashrc"
     



