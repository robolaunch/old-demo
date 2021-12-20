FROM base_ubuntu20.04
# ubuntu 18.04 -> gazebo9
# ubuntu 20.04 -> gazebo11

WORKDIR /build

ENV ROS_DISTRO noetic

COPY theia_supervisord.conf theia_start.sh ./

RUN sudo sh -c 'echo "deb http://packages.ros.org/ros/ubuntu $(lsb_release -sc) main" > /etc/apt/sources.list.d/ros-latest.list' && \
    curl -s https://raw.githubusercontent.com/ros/rosdistro/master/ros.asc | sudo apt-key add - && \
    sudo apt update && sudo apt install -y --no-install-recommends\
    ros-$ROS_DISTRO-ros-base \
    python3-rosdep \
    python3-rosinstall \
    python3-rosinstall-generator \
    python3-wstool \
    build-essential && \
    \
    \
    \
    sudo rosdep init && \
    rosdep update && \
    \
    \
    \
    sudo sh -c 'echo "deb http://packages.osrfoundation.org/gazebo/ubuntu-stable `lsb_release -cs` main" > /etc/apt/sources.list.d/gazebo-stable.list' && \
    wget https://packages.osrfoundation.org/gazebo.key -O - | sudo apt-key add - && \
    sudo apt-get update && sudo apt-get install -y --no-install-recommends\
    gazebo11 \
    libgazebo11-dev && \
    \
    \
    \
    sudo apt-get install -y --no-install-recommends curl build-essential sudo && \
    sudo curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash - && \
    sudo apt-get install -y --no-install-recommends nodejs && \
    sudo npm install -g yarn && \
    sudo chown user:user /build -R && \
    sudo curl -L https://raw.githubusercontent.com/theia-ide/theia-apps/master/theia-docker/next.package.json > /build/package.json && \
    \
    \
    \
    sudo yarn --pure-lockfile && \
    sudo NODE_OPTIONS="--max_old_space_size=4096" yarn theia build && \
    sudo yarn theia download:plugins && \
    sudo yarn --production && \
    \
    \
    \
    sudo apt-get update -y && sudo apt-get install -y --no-install-recommends nano libsecret-1-0 && \
    curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash - && \
    sudo apt-get install -y nodejs git && \
    \
    \
    \
    sudo mkdir /repos && \
    sudo chown -R user:user /repos && \
    \
    \
    \
    sudo mv theia_supervisord.conf /etc/provedge/supervisord && \
    sudo mv theia_start.sh /etc/provedge && \
    sudo chmod 755 /etc/provedge/theia_start.sh && \
    sudo rm -rf /var/lib/apt/lists/*
    # apt-get -y clean && \
    # sudo deluser user sudo
