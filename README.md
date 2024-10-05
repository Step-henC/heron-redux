# Heron Data UI 2.0

This is a refactor of Heron Data [found here](https://github.com/Step-henC/heron-data-internet) 

Refactored to cleaner look-and-feel and better state management using redux and redux persist. Also improved developer experience with RsBuild as the bundler as opposed to webpack, for RsBuild's faster build times. Refactor additionally, includes dynamic imports (code splitting) for faster web page load times. This refactor removed the heavy, React Bootstrap 5 Library to reduce total blocking time (TBT) by 50% (800 ms to 300ms) to allow users quicker time to interact with code. 

Refactor also includes Web Workers for better performance and component memoization to prevent expensive re-renders.

However, despite refactor, website functions the same from the user's perspective. Added loading spinners for better user experience and to compensate for the lazy loading.

# How To Run Locally

## Docker 
    There is a docker for development and production environment in AWS EKS. 
    To run docker, open cmd line and run `docker build -t heron-redux:local -f Dockerfile.dev .` 
    Then, run `docker run -p 3000:3000 heron-redux:local` and open browser to `localhost:3000`

    If you want to run the production Dockerfile, enter `docker build -t heron-redux:local .` and then `docker run -p 3000:80 heron-redux:local`
     and open browser to `localhost:3000`

## NPM 
  If npm is installed, go to root directory and run `npm start -- --open`


# K8s and Helm

Make sure you have helm installed locally. 

Ideally, helm would be ran with Dockerfile.dev for the environment variables to be updated in the helm chart and not the production docker container. SO that the front and backend services can communicate in a local configuration.

To run local k8s setup, go to heron-helm directory, `cd heron-helm`
and do `helm install heron-helm .`

To check if install was successful, you can execute `kubectl get pods`
and `kubectl get svc`. It may take a few a seconds to see services start. 

Depending on if using minikube, you can do `minikube service heron-service` for frontend to open in browser and open dashboard to check pod health, running `minikube dashboard`. 

For front and backend to communicate, /etc/hosts file will have to be updated to minikube ip to resolve hostnames. 

# Deployment Architecture

This branch runs on Vercel. Backend code for glyco Excel chart export occurs on 
Vercel Serverless functions in [this code base here](https://github.com/Step-henC/heron_api_serverless). 
The endpoint for this code is https://main-domain/

Whereas endpoint for [dockerized backend server here](https://github.com/Step-henC/heron_api_server)
is http://main-domain/api/glyco/excel