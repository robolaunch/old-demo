#!/bin/bash
sudo sed -i 's/9090/'"$ROSBRIDGE_PORT"'/g' /opt/ros/melodic/share/rosbridge_server/launch/rosbridge_websocket.launch	   
source /opt/ros/melodic/setup.bash
source ~/catkin_ws/devel/setup.bash
sleep 45s
roscore &
sleep 5s
roslaunch fly_bot Kwad_gazebo.launch &
sleep 150s
roslaunch fly_bot control_spawner.launch &
sleep 5s
rosrun fly_bot control.py &        
sleep 5s
echo "Session Running. Press [Return] to exit."
read
