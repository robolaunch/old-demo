#!/bin/bash
sudo sed -i 's/9090/'"$ROSBRIDGE_PORT"'/g' /opt/ros/noetic/share/rosbridge_server/launch/rosbridge_websocket.launch	   
source /opt/ros/noetic/setup.bash
source ~/catkin_ws/devel/setup.bash
export DISPLAY=:0  
sleep 45s
roscore &
sleep 5s
roslaunch spot_config gazebo.launch &
sleep 5s
roslaunch rosbridge_server rosbridge_websocket.launch &
sleep 5s
roslaunch spot_config navigate.launch &
sleep 5s
echo "Session Running. Press [Return] to exit."
read
