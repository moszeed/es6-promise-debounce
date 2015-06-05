# -*- mode: ruby -*-
# vi: set ft=ruby :


#
# build script
#
VSS_VM_BUILD_SCRIPT = <<EOF


    #wait till docker has started
    echo "---> waiting for Docker to start (10 seconds) ..."
    sleep 10
    echo "--> lets go!"

    #remove available images (except the node image)
    DOCKER_IMAGES=$(docker images -a | grep -v 'node' | awk '{ if (NR!=1) {print $3;}}')
    if [ -n "$DOCKER_IMAGES" ]; then

        echo "--> stop running containers"
        docker stop $(docker ps -a -q)

        echo "--> remove old containers"
        docker rm $(docker ps -a -q)

        echo "--> remove old Images"
        docker rmi -f $DOCKER_IMAGES
    fi

    #change folder
    cd /es6-promise-debounce

    #cleanup node_modules folder
    rm -rf node_modules

    #build testing image
    docker build -f ./Dockerfile-Testing -t "es6-promise-debounce-testing" .

EOF

#
# booting script
# =>
VSS_BOOT_SCRIPT = <<EOF

    #set hostname, same as host os
    sudo sethostname #{`hostname`[0..-2]}

    # show used docker & nodejs version
    echo "\n"
    echo "------------------------------------------"
    docker --version
    echo "------------------------------------------"
    echo "\n"

    # first, stop all containers
    echo "--> stop running containers"
    docker stop $(docker ps -a -q)

    # and last, remove all containers
    echo "--> remove old containers"
    docker rm $(docker ps -a -q)

    #change folder
    cd /es6-promise-debounce

EOF



Vagrant.configure(2) do |config|

  ENV['VAGRANT_DEFAULT_PROVIDER'] = 'virtualbox'

  config.vm.box = "codekitchen/boot2docker"

    #config for app
    config.vm.define :vss do |vss|

        #network
        vss.vm.network "public_network"

        #shared folders
        vss.vm.synced_folder ".", "/es6-promise-debounce"
        vss.vm.synced_folder ".", "/vagrant", disabled: true

        #scripts
        vss.vm.provision :shell, :inline => VSS_VM_BUILD_SCRIPT, :privileged => false
        vss.vm.provision :shell, run: "always", :inline => VSS_BOOT_SCRIPT, :privileged => false

    end

    #set name for vm
    config.vm.provider "virtualbox" do |v|
        v.name = "es6-promise-debounce"
        v.customize ["sharedfolder", "add", :id, "--name", "www", "--hostpath", (("//?/" + File.dirname(__FILE__) + "/www").gsub("/","\\"))]
        v.customize ["setextradata", :id, "VBoxInternal2/SharedFoldersEnableSymlinksCreate/v-root", "1"]
    end

end
