import { NODE_ENV } from 'config';
import fs from 'fs';
import path from 'path';

export const DEV_BUNDLE_ENTRY = '@@bundle.js';

export function getBuildContext({ assetPath, getConfig }) {
  if (NODE_ENV === 'development') {
    const { config } = getConfig();
    return {
      assetPath,
      manifest: {
        [DEV_BUNDLE_ENTRY]: config.output.filename,
      },
    };
  }

  const manifestPath = path.join(assetPath, 'asset-manifest.json');
  try {
    const rawManifest = fs.readFileSync(manifestPath, 'utf8');
    const manifest = JSON.parse(rawManifest);
    const context = {
      assetPath,
      manifest,
    };
    return context;
  } catch (error) {
    throw new Error(
      `Unable to read asset-manifest.json at path ${manifestPath}.`
    );
  }
}
