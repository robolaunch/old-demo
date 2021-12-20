#!/bin/bash
sudo sed -i 's/9090/'"$ROSBRIDGE_PORT"'/g' /opt/ros/melodic/share/rosbridge_server/launch/rosbridge_websocket.launch	   
source /opt/ros/melodic/setup.bash
source ~/catkin_ws/devel/setup.bash
sleep 45s
roscore &
sleep 5s
roslaunch ur_gazebo ur5.launch limited:=true &
sleep 5s
roslaunch ur5_moveit_config ur5_moveit_planning_execution.launch sim:=true limited:=true &
sleep 5s
roslaunch ur5_moveit_config moveit_rviz.launch config:=true &
echo "Session Running. Press [Return] to exit."
read
