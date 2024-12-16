minikube start
eval $(minikube docker-env)
terraform apply

# kubectl port-forward svc/client-service 8080:80
# kubectl port-forward svc/bff-service 3000:3000
