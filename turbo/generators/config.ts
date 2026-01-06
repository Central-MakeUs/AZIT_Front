import type { PlopTypes } from '@turbo/gen';

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator('base', {
    description: 'Create a new base library package (no React)',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the package?',
        validate: (input: string) => {
          if (!input) return 'Package name is required';
          return true;
        },
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'packages/{{kebabCase name}}/package.json',
        templateFile: 'base/templates/package.json.hbs',
      },
      {
        type: 'add',
        path: 'packages/{{kebabCase name}}/tsconfig.json',
        templateFile: 'base/templates/tsconfig.json.hbs',
      },
      {
        type: 'add',
        path: 'packages/{{kebabCase name}}/eslint.config.js',
        templateFile: 'base/templates/eslint.config.js.hbs',
      },
      {
        type: 'add',
        path: 'packages/{{kebabCase name}}/src/index.ts',
        templateFile: 'base/templates/src/index.ts.hbs',
      },
    ],
  });
}
