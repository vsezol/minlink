resource "kubernetes_deployment" "client_deployment" {
  metadata {
    name = "client-deployment"
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        app = "client"
      }
    }

    template {
      metadata {
        labels = {
          app = "client"
        }
      }

      spec {
        container {
          name  = "nginx"
          image = "vsezol/minlink-client:latest"

          port {
            container_port = 80
          }

          image_pull_policy = "Always"
        }
      }
    }
  }
}

resource "kubernetes_service" "client_service" {
  metadata {
    name = "client-service"
  }

  spec {
    port {
      protocol    = "TCP"
      port        = 80
      target_port = "80"
      node_port   = 31212
    }

    selector = {
      app = "client"
    }

    type = "NodePort"
  }
}
