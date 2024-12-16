provider "kubernetes" {
  config_path    = "~/.kube/config"
  config_context = "minikube"
}

# terraform {
#   required_providers {
#     kubernetes = {
#       source  = "hashicorp/kubernetes"
#       version = "2.35.0"
#     }
#     selectel = {
#       source  = "selectel/selectel"
#       version = "6.0.0"
#     }
#     openstack = {
#       source  = "terraform-provider-openstack/openstack"
#       version = "2.1.0"
#     }
#   }
# }

# provider "selectel" {
#   domain_name = "395339"
#   username    = "Vsezol"
#   password    = "PopaJopa123"
#   auth_region = "pool"
#   auth_url    = "https://cloud.api.selcloud.ru/identity/v3"
# }

# resource "selectel_iam_serviceuser_v1" "serviceuser_1" {
#   name     = "Vsezol"
#   password = "PopaJopa123"
#   role {
#     role_name  = "iam_admin"
#     scope      = "project"
#     project_id = "3e18c72a-c333-48a2-bdc8-15c9ae76279b"
#   }
# }

# provider "openstack" {
#   auth_url    = "https://cloud.api.selcloud.ru/identity/v3"
#   domain_name = "395339"
#   tenant_id   = selectel_vpc_project_v2.project_1.id
#   user_name   = selectel_iam_serviceuser_v1.serviceuser_1.name
#   password    = selectel_iam_serviceuser_v1.serviceuser_1.password
#   region = "ru-7"
# }
