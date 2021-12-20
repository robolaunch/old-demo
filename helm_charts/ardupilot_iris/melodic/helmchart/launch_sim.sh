#!/bin/bash
sudo sed -i 's/9090/'"$ROSBRIDGE_PORT"'/g' /opt/ros/melodic/share/rosbridge_server/launch/rosbridge_websocket.launch	   
source /opt/ros/melodic/setup.bash
export NO_AT_BRIDGE=1
sleep 45s
roscore &
sleep 5s
gazebo --verbose ~/ardupilot_gazebo/worlds/iris_arducopter_runway.world &
sleep 5s
roslaunch mavros apm.launch fcu_url:=udp://:14855@ &
sleep 5s
~/ardupilot/Tools/autotest/sim_vehicle.py -v ArduCopter -f gazebo-iris --console
