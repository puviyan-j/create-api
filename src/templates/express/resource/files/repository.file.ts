import type { Module, Language, Architecture } from '../../../../types/answers.js';

export function generateRepository(
  module: Module,
  language: Language,
  architecture: Architecture,
  name: string,
) {
  if (module === 'commonjs') return cjs(architecture);

  return esm(architecture, language);
}

const esm = (architecture: Architecture, language: Language) => {
  return `
    export const findAll = async () => {
        return [];
    };

    export const findById = async (id) => {
        return {};
    };

    export const create = async (data) => {
        return {};
    };

    export const update = async (id, data) => {
        return {}
    };

    export const remove = async (id) => {
        return {};
    };
`;
};

const cjs = (architecture: Architecture) => {
  return `
    const findAll = async () => {
        return [];
    };

    const findById = async (id) => {
        return {};
    };

    const create = async (data) => {
        return {};
    };

    const update = async (id, data) => {
        return {};
    };

    const remove = async (id) => {
        return {};
    };

    module.exports = { findAll ,findById ,create ,update , remove };

    `;
};
