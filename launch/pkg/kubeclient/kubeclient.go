package kubeclient

import (
	"context"
	"fmt"
	"strconv"

	deploy "k8s.io/api/apps/v1"
	v1ns "k8s.io/api/core/v1"

	v1 "k8s.io/api/rbac/v1"

	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/util/intstr"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/tools/clientcmd"
)

//Create kubernetes connection.
func GetKubeClient() (*kubernetes.Clientset, error) {
	config, err := clientcmd.BuildConfigFromFlags("", "./config.yaml")
	if err != nil {
		return nil, err
	}
	client, err := kubernetes.NewForConfig(config)
	if err != nil {
		return nil, err
	}
	return client, err
}

// The following function create role for access user resource at namespace
func CreateUserRole(u string) error {
	client, err := GetKubeClient()
	if err != nil {
		fmt.Printf("Client connection failed: %v", err)
	}
	// Pre-defined user role
	role := &v1.Role{
		ObjectMeta: metav1.ObjectMeta{
			Name:      u + "_role",
			Namespace: u,
		},
		Rules: []v1.PolicyRule{
			{
				APIGroups: []string{""},
				Resources: []string{"pods,services"},
				Verbs:     []string{"get", "list"},
			},
		},
	}
	//role binding for defined role
	rbind := &v1.RoleBinding{
		ObjectMeta: metav1.ObjectMeta{
			Name:      u + "_role",
			Namespace: u,
		},
		Subjects: []v1.Subject{
			{
				Kind:     "Group",
				Name:     u + "_role",
				APIGroup: "rbac.authorization.k8s.io",
			},
		},
		RoleRef: v1.RoleRef{
			Kind:     "Role",
			Name:     u + "_role",
			APIGroup: "rbac.authorization.k8s.io",
		},
	}
	//Template of role-binding to keycloak group
	// Deploy role to cluster
	_, err = client.RbacV1().Roles(u).Create(context.TODO(), role, metav1.CreateOptions{})
	if err != nil {
		return err
	}
	_, err = client.RbacV1().RoleBindings(u).Create(context.TODO(), rbind, metav1.CreateOptions{})
	if err != nil {
		return err
	}
	return nil

}

// Create namespace for given name!
func CreateNamespace(name string) error {
	client, err := GetKubeClient()
	if err != nil {
		return err
	}
	ns := client.CoreV1().Namespaces()
	nd := &v1ns.Namespace{
		ObjectMeta: metav1.ObjectMeta{
			Name: name,
			Labels: map[string]string{
				name: "created",
			},
		},
	}
	_, err = ns.Create(context.TODO(), nd, metav1.CreateOptions{})
	if err != nil {
		return err
	}
	return nil
}

func DeleteNamespace(name string) error {
	client, err := GetKubeClient()
	if err != nil {
		return err
	}
	ns := client.CoreV1().Namespaces()

	err = ns.Delete(context.TODO(), name, metav1.DeleteOptions{})
	if err != nil {
		return err
	}
	return nil
}

func GetService(name string, namespace string) (*v1ns.Service, error) {
	client, err := GetKubeClient()
	if err != nil {
		return nil, err
	}
	svc, err := client.CoreV1().Services(namespace).Get(context.TODO(), name, metav1.GetOptions{})
	if err != nil {
		return nil, err
	}
	return svc, err

}

func GetDeployment(name string, namespace string) (*deploy.Deployment, error) {
	client, err := GetKubeClient()
	if err != nil {
		return nil, err
	}
	deploy, err := client.AppsV1().Deployments(namespace).Get(context.TODO(), name, metav1.GetOptions{})
	if err != nil {
		return nil, err
	}
	return deploy, err

}

func UpdateDeployment(namespace string, deployment *deploy.Deployment) (*deploy.Deployment, error) {
	client, err := GetKubeClient()
	if err != nil {
		return nil, err
	}
	deploy, err := client.AppsV1().Deployments(namespace).Update(context.TODO(), deployment, metav1.UpdateOptions{})
	if err != nil {
		return nil, err
	}
	return deploy, err

}

func CreateDeploymentService(name string, namespace string) error {
	client, err := GetKubeClient()
	if err != nil {
		return err
	}
	replicas := int32(1)
	dp := client.AppsV1().Deployments(namespace)

	//Create Service first after assign nodeport paramater to neko env var
	//Service Definition Template
	svc := client.CoreV1().Services(namespace)
	service := v1ns.Service{
		ObjectMeta: metav1.ObjectMeta{
			Name:      name,
			Namespace: namespace,
		},
		Spec: v1ns.ServiceSpec{
			Selector: map[string]string{
				"robot": name + "robolaunch",
			},
			Type: v1ns.ServiceTypeNodePort,
			Ports: []v1ns.ServicePort{
				{
					Protocol:   v1ns.ProtocolTCP,
					Port:       8080,
					Name:       "http",
					TargetPort: intstr.FromInt(8080),
				},
				{
					Protocol:   v1ns.ProtocolUDP,
					Port:       31555,
					Name:       "neko-webrtc",
					TargetPort: intstr.FromInt(31555),
				},
				{
					Protocol:   v1ns.ProtocolTCP,
					Port:       3000,
					Name:       "theia",
					TargetPort: intstr.FromInt(3000),
				},
			},
		},
	}
	createdSvc, err := svc.Create(context.TODO(), &service, metav1.CreateOptions{})
	if err != nil {
		fmt.Printf("Service did not created: %v", err)
		return err
	}

	var udpPort int32

	for _, port := range createdSvc.Spec.Ports {
		if port.Name == "neko-webrtc" {
			udpPort = port.NodePort
		}
	}

	// update service with node port details! only for demo
	//fetch service again!

	createdSvc.Spec.Ports[1].Port = udpPort
	createdSvc.Spec.Ports[1].TargetPort = intstr.FromInt(int(udpPort))

	_, err = svc.Update(context.TODO(), createdSvc, metav1.UpdateOptions{})
	if err != nil {
		fmt.Printf("Service didn't  updated!:%v\n", err)
		return err
	}
	//Deployment definition template
	deployment := deploy.Deployment{
		ObjectMeta: metav1.ObjectMeta{
			Name:      name,
			Namespace: namespace,
		},
		Spec: deploy.DeploymentSpec{
			Selector: &metav1.LabelSelector{
				MatchLabels: map[string]string{
					"robot": name + "robolaunch",
				},
			},
			Replicas: &replicas,
			Template: v1ns.PodTemplateSpec{
				ObjectMeta: metav1.ObjectMeta{
					Labels: map[string]string{
						"robot": name + "robolaunch",
					},
				},
				Spec: v1ns.PodSpec{
					Containers: []v1ns.Container{
						{
							Name:  "neko",
							Image: "m1k1o/neko:firefox",
							Stdin: true,
							TTY:   true,
							Ports: []v1ns.ContainerPort{
								{
									Name:          "http",
									ContainerPort: 8080,
									Protocol:      v1ns.ProtocolTCP,
								},
								{
									Name:          "neko-webrtc",
									ContainerPort: udpPort,
									Protocol:      v1ns.ProtocolUDP,
								},
							},
							Env: []v1ns.EnvVar{
								{Name: "NEKO_BIND", Value: "0.0.0.0:8080"},
								{Name: "NEKO_UDP_PORT", Value: strconv.Itoa(int(udpPort)) + "-" + strconv.Itoa(int(udpPort))},
								{Name: "NEKO_EPR", Value: strconv.Itoa(int(udpPort)) + "-" + strconv.Itoa(int(udpPort))},
								{Name: "NEKO_ICELITE", Value: "1"},
								{Name: "NEKO_SCREEN", Value: "1920x1080@30"},
							},
						},
						{

							Name:  "theia",
							Image: "theiaide/theia:next",
							Stdin: true,
							TTY:   true,
							Ports: []v1ns.ContainerPort{
								{
									Name:          "theia",
									ContainerPort: 3000,
									Protocol:      v1ns.ProtocolTCP,
								},
							},
						},
					},
				},
			},
		},
	}

	//Create deployment!
	_, err = dp.Create(context.TODO(), &deployment, metav1.CreateOptions{})
	if err != nil {
		fmt.Printf("Deployment did not created: %v", err)
		return err
	}

	return nil
}

func ListDeploymentService(namespace string) (*deploy.DeploymentList, error) {
	client, err := GetKubeClient()
	if err != nil {
		return nil, err
	}
	deploy, err := client.AppsV1().Deployments(namespace).List(context.TODO(), metav1.ListOptions{})
	if err != nil {
		return nil, err
	}
	return deploy, nil
}

func DeleteDeploymentService(name string, namespace string) error {
	client, err := GetKubeClient()
	if err != nil {
		return err
	}
	deploy := client.AppsV1().Deployments(namespace)

	svc := client.CoreV1().Services(namespace)

	err = deploy.Delete(context.TODO(), name, metav1.DeleteOptions{})
	if err != nil {
		return err
	}

	err = svc.Delete(context.TODO(), name, metav1.DeleteOptions{})
	if err != nil {
		return err
	}
	return nil
}
