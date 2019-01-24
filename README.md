# Codus
Codus is an open-source online platform for code practice. Right now, Codus supports only the Java
programming language.

## Structure
The main Codus app has two components: the front-end, located inside the [`app` folder](https://github.com/codus-app/codus/tree/master/app),
and `codus-engine`, the back-end, located inside the [`engine` folder](https://github.com/codus-app/codus/tree/master/engine).

## How it works
Most of Codus’s data, including problem info and users’ solutions, is stored in MongoDB. MongoDB in
Codus is configured with the [KeystoneJS](https://github.com/keystonejs/keystone) framework, which
comes with an admin UI for the database out of the box.

The data stored in MongoDB is made available to Codus through `codus-engine`, the backend component
of Codus. `codus-engine` connects to MongoDB and reads and reformats information from the database
in order to respond to user requests. Specific information about `codus-engine`'s endpoints can be
found inside its [dedicated README](https://github.com/codus-app/codus/blob/master/engine/README.md).

Beyond storing user data, Codus needs to be able to understand and run user code in order to check
users’ solutions. A dedicated package created for Codus, [`codus-execute-java`](https://github.com/codus-app/codus-execute-java)
is responsible for securely executing user code. Executing arbitrary code is a notoriously dangerous
and insecure practice, so `codus-execute-java` creates a new Docker container for each solution
execution, in order to completely contain the program and prevent malicious code from having any
impact. `codus-engine` exposes the `/user/solution/check/` endpoint which hooks into `codus-execute-java`
to verify users’ solutions.

The front end of the app is written in the [Vue](https://github.com/vuejs/vue) framework. As the
user navigates through and interacts with the app, Vue makes calls to the `codus-engine` in the
background to read and update user data.

## Contributing
You can run the front end of Codus locally without too much trouble if you use the `codus-engine` instance that’s already configured and running at `app.codus.io`. See the README inside `app` for more information.
