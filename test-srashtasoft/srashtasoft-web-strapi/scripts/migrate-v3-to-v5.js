'use strict';

const fs = require('fs');
const path = require('path');

const root = process.cwd();
const apiDir = path.join(root, 'api');
const componentsDir = path.join(root, 'components');
const outSrcDir = path.join(root, 'src');

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function writeJson(file, data) {
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
}

function toDisplayName(raw) {
  return String(raw || '')
    .replace(/[-_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (m) => m.toUpperCase());
}

function normalizeCollectionName(value) {
  return String(value || '')
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/-/g, '_')
    .toLowerCase();
}

function getTargetFromName(name) {
  return `api::${name}.${name}`;
}

function convertAttribute(attr) {
  const next = {};

  const simpleKeys = [
    'type',
    'required',
    'unique',
    'default',
    'min',
    'max',
    'minLength',
    'maxLength',
    'private',
    'configurable',
    'regex',
    'enum',
  ];

  if (attr.plugin === 'upload' && (attr.model === 'file' || attr.collection === 'file')) {
    next.type = 'media';
    next.multiple = Boolean(attr.collection === 'file');
    if (Array.isArray(attr.allowedTypes) && attr.allowedTypes.length) {
      next.allowedTypes = attr.allowedTypes;
    }
    if (typeof attr.required === 'boolean') {
      next.required = attr.required;
    }
    return next;
  }

  if (attr.type === 'component') {
    next.type = 'component';
    next.repeatable = Boolean(attr.repeatable);
    next.component = attr.component;
    if (typeof attr.required === 'boolean') {
      next.required = attr.required;
    }
    return next;
  }

  if (attr.model || attr.collection) {
    const relatedName = String(attr.model || attr.collection);
    if (attr.plugin === 'users-permissions' && relatedName === 'user') {
      next.type = 'relation';
      next.relation = attr.collection ? 'oneToMany' : 'manyToOne';
      next.target = 'plugin::users-permissions.user';
      return next;
    }
    next.type = 'relation';
    next.relation = attr.collection ? 'oneToMany' : 'manyToOne';
    next.target = getTargetFromName(relatedName);
    return next;
  }

  for (const key of simpleKeys) {
    if (key in attr) {
      next[key] = attr[key];
    }
  }

  if (!('type' in next) && attr.type) {
    next.type = attr.type;
  }

  return next;
}

function migrateContentTypes() {
  if (!fs.existsSync(apiDir)) return;

  const apiNames = fs
    .readdirSync(apiDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  for (const apiName of apiNames) {
    const settingsFile = path.join(apiDir, apiName, 'models', `${apiName}.settings.json`);
    if (!fs.existsSync(settingsFile)) continue;

    const src = readJson(settingsFile);
    const out = {
      kind: src.kind || 'collectionType',
      collectionName: src.collectionName || normalizeCollectionName(apiName),
      info: {
        singularName: apiName,
        pluralName: src.collectionName || (apiName.endsWith('s') ? apiName : `${apiName}s`),
        displayName: src.info?.name ? toDisplayName(src.info.name) : toDisplayName(apiName),
        description: src.info?.description || '',
      },
      options: {
        draftAndPublish: Boolean(src.options?.draftAndPublish),
      },
      pluginOptions: src.pluginOptions || {},
      attributes: {},
    };

    for (const [key, value] of Object.entries(src.attributes || {})) {
      out.attributes[key] = convertAttribute(value);
    }

    const outSchema = path.join(outSrcDir, 'api', apiName, 'content-types', apiName, 'schema.json');
    writeJson(outSchema, out);
  }
}

function migrateComponents() {
  if (!fs.existsSync(componentsDir)) return;

  const categories = fs
    .readdirSync(componentsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  for (const category of categories) {
    const categoryDir = path.join(componentsDir, category);
    const files = fs
      .readdirSync(categoryDir, { withFileTypes: true })
      .filter((d) => d.isFile() && d.name.endsWith('.json'))
      .map((d) => d.name);

    for (const fileName of files) {
      const name = fileName.replace(/\.json$/, '');
      const src = readJson(path.join(categoryDir, fileName));

      const out = {
        collectionName: src.collectionName || normalizeCollectionName(`components_${category}_${name}`),
        info: {
          displayName: src.info?.name ? toDisplayName(src.info.name) : toDisplayName(name),
          icon: src.info?.icon || 'puzzle',
          description: src.info?.description || '',
        },
        options: src.options || {},
        attributes: {},
        category,
      };

      for (const [key, value] of Object.entries(src.attributes || {})) {
        out.attributes[key] = convertAttribute(value);
      }

      const outFile = path.join(outSrcDir, 'components', category, `${name}.json`);
      writeJson(outFile, out);
    }
  }
}

migrateContentTypes();
migrateComponents();

console.log('Migration scaffolding generated in src/.');
