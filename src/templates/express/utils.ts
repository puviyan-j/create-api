import boxen from 'boxen';
import chalk from 'chalk';

const runCommand = (packageManager: 'npm' | 'pnpm' | 'yarn') =>
  packageManager === 'npm' ? 'npm run dev' : packageManager === 'yarn' ? 'yarn dev' : 'pnpm dev';

export const lastlog = (
  projectName: string,
  packageManager: 'npm' | 'pnpm' | 'yarn',
  install: boolean = true,
) => {
  const msg = `
${chalk.green.bold('✔ Project created successfully')}

${chalk.cyan('Next steps:')}

  ${chalk.white('1.')} ${chalk.yellow('cd')} ${projectName}
  ${chalk.white('2.')} ${chalk.yellow(packageManager)} install
  ${chalk.white('3.')} ${chalk.yellow(packageManager)} run dev
`;

  console.log(
    boxen(msg, {
      padding: 1,
      borderStyle: 'round',
      borderColor: 'green',
    }),
  );
};

export const prismalog = () => {
  const prismaBox = `
${chalk.magenta.bold('Prisma Setup')}

${chalk.white('If new database:')}
  ${chalk.yellow('npx prisma migrate dev --name init')}

${chalk.white('\nIf existing database:')}
  ${chalk.yellow('npx prisma db pull')}
  ${chalk.yellow('npx prisma generate')}
`;

  console.log(
    boxen(prismaBox, {
      padding: 1,
      borderStyle: 'round',
      borderColor: 'magenta',
    }),
  );
};


 
