# `Create a Node.js Server with TypeScript`

## `Initialize a New Project:`

bash
Copy code

```
mkdir your-project-name
cd your-project-name
npm init -
```

Install Dependencies:

bash
Copy code

```
npm install express typescript @types/node @types/express ts-node
```

### `Create tsconfig.json:`

bash
Copy code

```
npx tsc --init
```

Update tsconfig.json to include the following:

```
{
"compilerOptions": {
"target": "es6",
"module": "commonjs",
"outDir": "./dist",
"rootDir": "./src",
"strict": true
}
}
```

### `Install Jest for Testing`

Install Jest and TypeScript Dependencies:

bash
Copy code

```
npm install --save-dev jest ts-jest @types/jest
```

Create jest.config.js:

bash
Copy code

```
npx ts-jest config:init
```

## `Deploy to Heroku`

Initialize a Git Repository:

bash
Copy code

```
git init
```

Commit Your Code:

bash
Copy code

```
git add .
git commit -m "Initial commit"
```

## ` Create a Procfile for Heroku:`

Before create a file named Procfile (without any file extension) with the following content:
try run:

```
web: npm start
```

if didn't run try:

```
make file
```

## `Deploy to Heroku:`

Create a Heroku Account:

If you don't have one, sign up for a Heroku account.

Install Heroku CLI:

Follow the instructions on the Heroku CLI installation page.

Login to Heroku:

bash
Copy code

```
heroku login
```

Create a Heroku App:

bash
Copy code

```
heroku create your-app-name
```

Push to Heroku:

bash
Copy code

```
git push heroku master
```

Open the App:

bash
Copy code

```
heroku open
```

That's it!
