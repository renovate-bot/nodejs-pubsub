// Copyright 2024 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// This is a generated sample, using the typeless sample bot. Please
// look for the source TypeScript sample (.ts) for modifications.
'use strict';

/**
 * This application demonstrates how to perform basic operations on
 * schemas with the Google Cloud Pub/Sub API.
 *
 * For more information, see the README.md under /pubsub and the documentation
 * at https://cloud.google.com/pubsub/docs.
 */

// sample-metadata:
//   title: Rollback a Schema
//   description: Rolls back a schema on a project
//   usage: node rollbackSchema.js <schema-name> <revision-id>

// [START pubsub_rollback_schema]
/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
// const schemaNameOrId = 'YOUR_SCHEMA_NAME_OR_ID';
// const revisionId = 'YOUR_REVISION_ID';

// Imports the Google Cloud client library
const {PubSub} = require('@google-cloud/pubsub');

// Creates a client; cache this for further use
const pubSubClient = new PubSub();

async function rollbackSchema(schemaNameOrId, revisionId) {
  // Get the fully qualified schema name.
  const schema = pubSubClient.schema(schemaNameOrId);
  const name = await schema.getName();

  // Use the gapic client to roll back the schema revision.
  const schemaClient = await pubSubClient.getSchemaClient();
  await schemaClient.rollbackSchema({
    name,
    revisionId,
  });

  console.log(`Schema ${name} revision ${revisionId} rolled back.`);
}
// [END pubsub_rollback_schema]

function main(
  schemaNameOrId = 'YOUR_SCHEMA_NAME_OR_ID',
  revisionId = 'YOUR_REVISION_ID',
) {
  rollbackSchema(schemaNameOrId, revisionId).catch(err => {
    console.error(err.message);
    process.exitCode = 1;
  });
}

main(...process.argv.slice(2));
