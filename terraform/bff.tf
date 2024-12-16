resource "kubernetes_deployment" "bff_deployment" {
  metadata {
    name = "bff-deployment"
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        app = "bff"
      }
    }

    template {
      metadata {
        labels = {
          app = "bff"
        }
      }

      spec {
        container {
          name  = "bff"
          image = "vsezol/minlink-bff"

          port {
            container_port = 3000
          }

          env_from {
            config_map_ref {
              name = "bff-config"
            }
          }

          image_pull_policy = "Always"
        }
      }
    }
  }
}

resource "kubernetes_config_map" "bff_config" {
  metadata {
    name = "bff-config"
  }

  data = {
    CORE_API_URL = "http://core-service.default.svc.cluster.local:3001/api"
  }
}

resource "kubernetes_service" "bff_service" {
  metadata {
    name = "bff-service"
  }

  spec {
    port {
      protocol    = "TCP"
      port        = 3000
      target_port = "3000"
    }

    selector = {
      app = "bff"
    }

    type = "NodePort"
  }
}
