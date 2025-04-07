// This is your main entry point that imports the connection___
// logic and would later start the polling service or GraphQL server.
// src/server.ts

import './config/connection';
import { pollOpcUaTags } from './services/opcClient';

console.log('🚀 Edge client starting...');
pollOpcUaTags();