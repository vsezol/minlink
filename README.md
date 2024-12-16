# Minlink

FullStack url shortener.

## Run minikube

```sh
minikube start
eval $(minikube docker-env)
```

## Apply terraform

```sh
cd terraform && terraform apply
```

## Port forwarding

```sh
kubectl port-forward svc/client-service 8080:80
kubectl port-forward svc/bff-service 3000:3000
```

## Destroy terraform

```sh
cd terraform && terraform destroy
```

## Stop minikube

```sh
minikube stop
eval $(minikube docker-env --unset)
```
