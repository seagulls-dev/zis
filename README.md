# ZIS3 Front-End

## Setup instruction

Clone git repo

```
clone git git@gitlab.zcom.cz:zisv3/zis3-frontend.git
```

Go to project folder

```
cd zis3-frontend
```

Install dependencies

```
yarn install
```

Run the command to create the `.env` file in project root with default variables

```
cat <<EOF >.env.local
REACT_APP_API_ROOT="https://zistest.zcom.cz/api/v1"
REACT_APP_AUTH_PATH="/user/auth"
REACT_APP_WEBSITE_NAME="ZIS3-FE"
REACT_APP_FOXENTRY_API_ROOT="https://api.foxentry.cz/v1"
REACT_APP_FOXENTRY_API_COMPANY_SEARCH="company/search"
REACT_APP_FOXENTRY_API_COMPANY_GET="company/get"
REACT_APP_FOXENTRY_API_KEY="oascsScxugzXb7vFRgaQ"
REACT_APP_ARES_API_ROOT="https://wwwinfo.mfcr.cz/cgi-bin/ares/darv_bas.cgi"
EOF
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br /> Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br /> You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br /> See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br /> It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br /> Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

<hr />

## Recommended editor

- VS Code

## Recommended plugins

- ESLint (automatically review typescript code and applyes auto fixes on save)
- Prettier - Code formatter (formats code automatically respecting TSLint config)

## Optional plugins

- GitLens
- Docker
- Sass
- Yaml
- Material Icon Theme
- Material Theme

## SCSS Style rules

- Components should have CssClass with same name as component name in PascalCase style. Example: `.ComponentName`
- Components inner elements should have prefix with component name separated by underline. inner element names should be all lower case with '-' as separator between words. Example:`.ComponentName_left-container`
