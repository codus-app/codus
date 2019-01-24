# `app`
> The front-end of Codus.

# Development
1. Install dependencies with `npm install`
2. Create a new file, `.env`. For development, the values in `.env.sample` should work well, and you can just copy/paste.
3. Run `npm start` to start the server
4. For now, you'll need `codus-landing` running in order to sign in to the app, though this may change in the future. Install `codus-landing` from GitHub:
```sh
git clone https://github.com/codus-app/codus-landing
cd codus-landing
npm install
```
5. Again, copy the contents of `.env.sample` to `.env`.
6. Run `npm start` to start `codus-landing`
7. Navigate to `localhost:5000` in `codus-landing`. After you sign in or create an account, you'll be taken to your locally-running copy of Codus.
