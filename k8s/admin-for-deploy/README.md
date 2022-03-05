kubectl create -f admin.yaml 
kubectl create -f role.yaml 
#get tocken of admin
kubectl -n kube-system describe secret $(kubectl -n kube-system get secret | grep admin-user | awk '{print $1}')
