/**
 * @file schema-utils.ts
 * A collection of GraphQL Functions
 */
import { readFile, readFileSync } from 'fs';
import { buildSchema, GraphQLSchema, validateSchema } from 'graphql';

/**
 * @function loadSchemaFromFile 
 * Loads a GraphQL schema file in async mode, returns a Promise
 */
function loadSchemaFromFile(filePath: any): Promise<string> {

    return new Promise((resolve, reject) => {
        readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });

};

/**
 * @function loadSchemaFromFileSync
 * Loads a GraphQL schema from a file in sync mode
 */
function loadSchemaFromFileSync(schemaFilePath: any): string {
    return readFileSync(schemaFilePath, 'utf-8');
};

/**
 * @function mergeSchemas
 * Merges string array to one string
 */
function mergeSchemas(stringArray: string[]): string {
    if (stringArray.length > 0) {
        return stringArray.reduce((acc, curr): string => {
            return acc = acc.concat(curr, ' ');
        });
    } else {
        return stringArray[0];
    }
};

/**
 * @function buildMultipleSchemas
 * Get string arrays, then merges them togerher, and tries to build with buildSchema function
 * experimental! - not working because GraphQL.js has an intresting systax that only one Query Type
 */
async function buildMultipleSchemas(schemaFilePaths: string[]): Promise<GraphQLSchema> {

    let builtSchemaObject: GraphQLSchema;

    let schemasPromiseArray: Promise<string>[] = [];

    schemaFilePaths.forEach((schemaPath: string) => {
        schemasPromiseArray.push(loadSchemaFromFile(schemaPath));
    });

    await Promise.all(schemasPromiseArray).then((stringArray) => {
        let mergedSchemas: string = mergeSchemas(stringArray);
        builtSchemaObject = buildSchema(mergedSchemas);
    });

    // @ts-ignore
    return builtSchemaObject;

}

/**
 * @function validateSchemaFragment
 * Validates schema fragment
 * experimental! - not working because GraphQL.js doesn't support a lot of debugging functions yet
 */
function validateSchemaFragment(schema: string, writeToConsole: boolean = false): boolean {

    const builtSchema = buildSchema(
        schema,
        {
            commentDescriptions: true,
            assumeValidSDL: true
        }
    );

    let isSchemaValid = true;

    /**
     * @function validateSchema (validate.d.ts)
     * If validateSchema has erros it will going return an array of GraphQLError object
     */
    validateSchema(builtSchema).forEach(error => {
        isSchemaValid = false;
        if (writeToConsole) {
            console.log(error.message);
        }
    });

    return isSchemaValid;
}

export { loadSchemaFromFileSync, loadSchemaFromFile, mergeSchemas, buildMultipleSchemas, validateSchemaFragment };
