#!/bin/bash
sudo sed -i 's/9090/'"$ROSBRIDGE_PORT"'/g' /opt/ros/melodic/share/rosbridge_server/launch/rosbridge_websocket.launch	   
source /opt/ros/melodic/setup.bash
source ~/catkin_ws/devel/setup.bash
export DISPLAY=:0  
sleep 45s
roscore &
sleep 5s
roslaunch unitree_gazebo normal.launch rname:=go1 wname:=stairs &
sleep 5s
roslaunch rosbridge_server rosbridge_websocket.launch &
sleep 5s
echo "Session Running. Press [Return] to exit."
read
