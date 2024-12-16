resource "kubernetes_deployment" "core_deployment" {
  metadata {
    name = "core-deployment"
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        app = "core"
      }
    }

    template {
      metadata {
        labels = {
          app = "core"
        }
      }

      spec {
        container {
          name  = "core"
          image = "vsezol/minlink-core"

          port {
            container_port = 3000
          }

          image_pull_policy = "Always"
        }
      }
    }
  }
}

resource "kubernetes_service" "core_service" {
  metadata {
    name = "core-service"
  }

  spec {
    port {
      protocol    = "TCP"
      port        = 3001
      target_port = "3000"
    }

    selector = {
      app = "core"
    }

    type = "ClusterIP"
  }
}
