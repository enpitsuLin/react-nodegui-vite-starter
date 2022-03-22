# react-nodegui-vite-starter

A [Vite](https://vitejs.dev/) powered React NodeGui starter template 

## Features

- ⚡️ Instant HMR - use Vite on dev rather than webpack

## Use the Template

### GitHub Template

[Create a repo with this template on GitHub](/generate)

## Usage

### Development

Run the dev server

```bash
pnpm dev
```

### Packaging app as a distributable

#### Step 1: init your app

```bash
npx nodegui-packer --init AppName
```
This will produce the deploy directory containing the template. You can modify this to suite your needs. Like add icons, change the name, description and add other native features or dependencies. Make sure you commit this directory.

#### Step 2: (Run this command every time you want to build a new distributable)

Next you can run the pack command:

```bash
pnpm build
```

This will produce the js bundle along with assets inside the `./dist` directory

```bash
pnpm deploy
```

This will build the distributable using [@nodegui/packer](https://github.com/nodegui/packer) based on your build products

# License
MIT