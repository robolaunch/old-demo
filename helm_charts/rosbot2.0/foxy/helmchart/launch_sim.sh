#!/bin/bash
sudo sed -i 's/9090/'"$ROSBRIDGE_PORT"'/g' /opt/ros/foxy/share/rosbridge_server/launch/rosbridge_websocket.launch	   
source /opt/ros/foxy/setup.bash
source ~/catkin_ws/install/setup.bash
export DISPLAY=:0  
sleep 45s
export GAZEBO_RESOURCE_PATH=/usr/share/gazebo-11
roscore &
sleep 5s
ros2 launch rosbot_description navigation_demo_sim.launch.py &
sleep 5s
roslaunch rosbridge_server rosbridge_websocket.launch &
sleep 5s
echo "Session Running. Press [Return] to exit."
read
