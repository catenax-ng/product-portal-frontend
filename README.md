# Catena-X Portal Frontend

The portal has been moved and this repository is now **deprecated**.
You can find the code at the new location:

https://github.com/catenax-ng/tx-portal-frontend

If you want to check out previous versions of the code just open the according release version.
The last one (also available in main) would be:

https://github.com/catenax-ng/product-portal-frontend/tree/0.9.0


Frontend web application and shared UI components for the Catena-X Portal written in React and Typescript.

Here are three ways to run the application locally on http://localhost:3000/

### Local build & run

    yarn
    yarn build
    yarn start


### Local docker build & run & publish

    yarn build:docker
    yarn publish:docker
    yarn start:docker


### Running the image from GitHub container registry

    export IMAGE=ghcr.io/catenax-ng/product-portal-frontend:main
    docker pull $IMAGE
    docker run --rm -d -p 3000:8080 --name cx-portal $IMAGE
