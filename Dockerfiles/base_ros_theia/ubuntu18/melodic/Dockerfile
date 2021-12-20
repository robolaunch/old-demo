FROM base_ubuntu18.04
# ubuntu 18.04 -> gazebo9
# ubuntu 20.04 -> gazebo11

WORKDIR /build
ENV ROS_DISTRO melodic

COPY theia_supervisord.conf theia_start.sh ./

RUN sudo apt-get update && \
    sudo apt-get install -q -y --no-install-recommends tzdata && \
    sudo rm -rf /var/lib/apt/lists/*

# install packages
RUN sudo apt-get update && sudo apt-get install -q -y --no-install-recommends \
    dirmngr \
    gnupg2 \
    && sudo rm -rf /var/lib/apt/lists/*

# setup sources.list
RUN sudo sh -c 'echo "deb http://packages.ros.org/ros/ubuntu bionic main" > /etc/apt/sources.list.d/ros1-latest.list'

# setup keys
RUN curl -s https://raw.githubusercontent.com/ros/rosdistro/master/ros.asc | sudo apt-key add -

# setup environment
ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8

# install ros packages
RUN sudo apt-get update && sudo apt-get install -y --no-install-recommends \
    ros-melodic-ros-core=1.4.1-0* \
    && sudo rm -rf /var/lib/apt/lists/*


RUN sudo apt-get update && sudo apt-get install --no-install-recommends -y \
    build-essential \
    python-rosdep \
    python-rosinstall \
    python-vcstools \
    && sudo rm -rf /var/lib/apt/lists/*

# bootstrap rosdep
RUN sudo rosdep init && \
  rosdep update --rosdistro $ROS_DISTRO

# install ros packages
RUN sudo apt-get update && sudo apt-get install -y --no-install-recommends \
    ros-melodic-ros-base=1.4.1-0* \
    && sudo rm -rf /var/lib/apt/lists/*

RUN \
    \
    \
    sudo sh -c 'echo "deb http://packages.osrfoundation.org/gazebo/ubuntu-stable `lsb_release -cs` main" > /etc/apt/sources.list.d/gazebo-stable.list' && \
    wget https://packages.osrfoundation.org/gazebo.key -O - | sudo apt-key add - && \
    sudo apt-get update && sudo apt-get install -y --no-install-recommends\
    gazebo9 \
    libgazebo9-dev && \
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
