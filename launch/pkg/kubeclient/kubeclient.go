package kubeclient

import (
	"context"
	"fmt"

	v1ns "k8s.io/api/core/v1"
	v1 "k8s.io/api/rbac/v1"

	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
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
			v1.PolicyRule{
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
			v1.Subject{
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
