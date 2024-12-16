output "client_service_url" {
  value = kubernetes_service.client_service.metadata[0].name
}

output "bff_service_url" {
  value = kubernetes_service.bff_service.metadata[0].name
}

output "core_service_url" {
  value = kubernetes_service.core_service.metadata[0].name
}
