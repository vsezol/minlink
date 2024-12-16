minikube start
# turn on docker-env for minikube
eval $(minikube docker-env)


kubectl apply -f client/deployment.yaml
kubectl apply -f client/service.yaml

kubectl apply -f bff/config.yaml
kubectl apply -f bff/deployment.yaml
kubectl apply -f bff/service.yaml

kubectl apply -f core/deployment.yaml
kubectl apply -f core/service.yaml

kubectl rollout restart deployment

kubectl get pods
kubectl get services
minikube service client-service


minikube stop
# turn off docker-env for minikube
eval $(minikube docker-env --unset)



# CLEAR ALL
kubectl delete all --all
docker stop $(docker ps -q)
docker rm -f $(docker ps -a -q)
docker rmi -f $(docker images -q)
minikube stop
eval $(minikube docker-env --unset)
npx nx run-many --target=docker
minikube start
eval $(minikube docker-env)
kubectl apply -f client/deployment.yaml
kubectl apply -f client/service.yaml
kubectl apply -f bff/config.yaml
kubectl apply -f bff/deployment.yaml
kubectl apply -f bff/service.yaml
kubectl apply -f core/deployment.yaml
kubectl apply -f core/service.yaml

# Show all mine
docker ps | grep vsezol
