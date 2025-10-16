import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function run() {
  const pkgRoot = join(__dirname, '..', 'package');
  const pkgPath = join(pkgRoot, 'package.json');
  const libPkgPath = join(pkgRoot, 'lib', 'package.json');

  const pkg = JSON.parse(await readFile(pkgPath, 'utf8'));
  const libPkg = JSON.parse(await readFile(libPkgPath, 'utf8'));

  if (pkg.version !== libPkg.version) {
    libPkg.version = pkg.version;
    await writeFile(libPkgPath, JSON.stringify(libPkg, null, 2) + '\n');
    console.log(`Synchronized lib/package.json version -> ${pkg.version}`);
  } else {
    console.log('lib/package.json already in sync');
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

