FROM nvidia/opengl:1.2-glvnd-runtime-ubuntu20.04
# Comment the line above and uncomment the line below for Ubuntu 18.04
#FROM nvidia/opengl:1.2-glvnd-runtime-ubuntu18.04

LABEL maintainer "https://github.com/ehfd"

# Make all NVIDIA GPUS visible, but we want to manually install drivers
ARG NVIDIA_VISIBLE_DEVICES=all
# Supress interactive menu while installing keyboard-configuration
ARG DEBIAN_FRONTEND=noninteractive
ENV NVIDIA_DRIVER_CAPABILITIES all

# Default options (password is "mypasswd")
ENV TZ UTC
ENV PASSWD mypasswd
ENV SIZEW 1920
ENV SIZEH 1080
ENV CDEPTH 24
ENV VIDEO_PORT DFP

ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8

COPY local ./local
COPY www   ./www
COPY neko dbus default.pa conf.xml bootstrap.sh supervisord.conf ./

# Install locales to prevent errors
RUN apt-get clean && \
    apt-get update && \
    apt-get install -y --no-install-recommends locales && \
    locale-gen en_US.UTF-8 && \
    \
    \
    \
    dpkg --add-architecture i386 && \
    apt-get update && apt-get install -y \
        software-properties-common \
        apt-utils \
        build-essential \
        ca-certificates \
        kmod \
        libc6:i386 \
        libc6-dev \
        curl \
        file \
        wget \
        gzip \
        zip \
        unzip \
        gcc \
        git \
        make \
        python \
        python-numpy \
        python3 \
        python3-numpy \
        mlocate \
        nano \
        vim \
        htop \
        firefox \
        supervisor \
        net-tools \
        libpci3 \
        libelf-dev \
        libglvnd-dev \
        pkg-config \
        mesa-utils \
        libglu1 \
        libglu1:i386 \
        libsm6 \
        libxv1 \
        libxv1:i386 \
        libxtst6 \
        libxtst6:i386 \
        x11-xkb-utils \
        x11-xserver-utils \
        x11-apps \
        dbus-x11 \
        libdbus-c++-1-0v5 \
        xauth \
        xinit \
        xfonts-base \
        xkb-data \
        libxrandr-dev \
        xorg-dev \
        ubuntu-mate-desktop && \
    if [ "$(grep VERSION_CODENAME= /etc/os-release | cut -d= -f2)" = "bionic" ]; then apt-get install -y --no-install-recommends vulkan-utils; else apt-get install -y --no-install-recommends vulkan-tools; fi && \
    # Remove Bluetooth packages that throw errors
    apt-get autoremove --purge -y blueman bluez bluez-cups pulseaudio-module-bluetooth && \
    \
    \
    \
    apt-get update && apt-get install -y --no-install-recommends openssh-server; \
    wget http://ftp.br.debian.org/debian/pool/main/libv/libvpx/libvpx4_1.6.1-3+deb9u2_amd64.deb; \
    dpkg -i libvpx4_1.6.1-3+deb9u2_amd64.deb; \
    \
    \
    \
    apt-get install -y --no-install-recommends \
        sudo && \
    groupadd -g 1000 user && \
    useradd -ms /bin/bash user -u 1000 -g 1000 && \
    usermod -a -G adm,audio,cdrom,dialout,dip,fax,floppy,input,lp,lpadmin,netdev,plugdev,scanner,ssh,sudo,tape,tty,video,voice,pulse user && \
    echo "user ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers && \
    chown -R user:user /home/user && \
    echo "user:${PASSWD}" | chpasswd && \
    ln -snf "/usr/share/zoneinfo/$TZ" /etc/localtime && echo "$TZ" > /etc/timezone && \
    sudo mkdir /gst/ -p && \
    sudo mkdir -p /etc/neko /var/log/neko; sudo chmod 1777 /var/log/neko; sudo chown user:user /var/log/neko/ && \
    sudo mkdir -p /home/user/.config/pulse/ && \
    echo "default-server=unix:/tmp/pulseaudio.socket" > /home/user/.config/pulse/client.conf && \
    rm -rf /var/lib/apt/lists/* && \
    \
    \
    \
    sudo mv local /gst; \
    sudo mv www /var; \
    sudo mv neko /usr/bin; \
    sudo mv dbus /usr/bin; \
    sudo mv default.pa /etc/pulse; \
    sudo mv conf.xml /etc/neko; \
    sudo mv /etc/neko/conf.xml /etc/neko/openbox.xml; \
    sudo mv bootstrap.sh /etc; \
    sudo mv supervisord.conf /etc && \
    \
    \
    \
    chmod 755 /etc/bootstrap.sh && \
    chmod 755 /etc/supervisord.conf && \
    sudo mkdir -p /etc/provedge/supervisord/

USER user
WORKDIR /home/user

ENTRYPOINT ["/usr/bin/supervisord"]
