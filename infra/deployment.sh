minikube start
# turn on docker-env for minikube
eval $(minikube docker-env)


kubectl apply -f client/deployment.yaml
kubectl apply -f client/service.yaml

kubectl apply -f bff/deployment.yaml
kubectl apply -f bff/service.yaml

kubectl apply -f core/deployment.yaml
kubectl apply -f core/service.yaml

kubectl get pods
kubectl get services
minikube service client-service


minikube stop
# turn off docker-env for minikube
eval $(minikube docker-env --unset)


