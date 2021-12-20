#!/bin/bash
sudo sed -i 's/9090/'"$ROSBRIDGE_PORT"'/g' /opt/ros/noetic/share/rosbridge_server/launch/rosbridge_websocket.launch	   
source /opt/ros/noetic/setup.bash
source ~/catkin_ws/devel/setup.bash
export JACKAL_LASER=1
export JACKAL_URDF_EXTRAS=$HOME/Desktop/realsense.urdf.xacro  
export DISPLAY=:0          
sleep 45s
roscore &
sleep 5s
roslaunch jackal_gazebo jackal_world.launch &
sleep 5s
roslaunch rosbridge_server rosbridge_websocket.launch &
sleep 5s
roslaunch jackal_navigation odom_navigation_demo.launch &        
sleep 5s
echo "Session Running. Press [Return] to exit."
read
