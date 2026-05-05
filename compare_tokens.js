#!/usr/bin/env node

/**
 * Figma Token Comparison Tool
 * Compares Figma design tokens with local tokens.json
 * 
 * Usage: node compare_tokens.js [options]
 * 
 * Options:
 *   --token <token>    Figma personal access token
 *   --file <key>       Figma file key (default: kMO3RdXXNoZrpHh24hQTl1)
 */

const fs = require('fs');
const https = require('https');

// Configuration
const FIGMA_FILE_KEY = process.argv.find(arg => arg.startsWith('--file='))?.split('=')[1] || 'kMO3RdXXNoZrpHh24hQTl1';
const FIGMA_TOKEN = process.argv.find(arg => arg.startsWith('--token='))?.split('=')[1] || process.env.FIGMA_TOKEN || '';
const LOCAL_TOKENS_PATH = './src/tokens/tokens.json';

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function loadLocalTokens() {
  try {
    const data = fs.readFileSync(LOCAL_TOKENS_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    log(`Error loading local tokens: ${error.message}`, 'red');
    process.exit(1);
  }
}

function fetchFigmaVariables(callback) {
  log(`\nFetching variables from Figma file: ${FIGMA_FILE_KEY}...`, 'blue');
  
  const options = {
    hostname: 'api.figma.com',
    path: `/v1/files/${FIGMA_FILE_KEY}/variables`,
    method: 'GET',
    headers: {
      'X-Figma-Token': FIGMA_TOKEN
    },
    timeout: 10000
  };

  const req = https.request(options, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      if (res.statusCode === 200) {
        try {
          const variables = JSON.parse(data);
          log('Successfully fetched Figma variables', 'green');
          callback(null, variables);
        } catch (error) {
          callback(new Error(`Failed to parse Figma response: ${error.message}`));
        }
      } else if (res.statusCode === 403) {
        callback(new Error('Invalid Figma token. Please generate a new personal access token.'));
      } else if (res.statusCode === 404) {
        callback(new Error('Figma file not found. Please verify the file key.'));
      } else {
        callback(new Error(`Figma API error: ${res.statusCode} - ${data}`));
      }
    });
  });

  req.on('error', (error) => {
    callback(new Error(`Network error: ${error.message}`));
  });

  req.on('timeout', () => {
    req.destroy();
    callback(new Error('Request timed out'));
  });

  req.end();
}

function compareTokens(localTokens, figmaVariables) {
  log('\n' + '='.repeat(80), 'cyan');
  log('TOKEN COMPARISON RESULTS', 'cyan');
  log('='.repeat(80), 'cyan');
  
  const discrepancies = [];
  const matches = [];
  
  // Compare color tokens
  log('\n--- Color Tokens ---', 'blue');
  
  // Extract Figma color variables
  const figmaColors = {};
  if (figmaVariables && figmaVariables.variables) {
    figmaVariables.variables.forEach(v => {
      if (v.resolvedType === 'COLOR') {
        figmaColors[v.name] = v;
      }
    });
  }
  
  log(`Figma color variables: ${Object.keys(figmaColors).length}`, 'gray');
  log(`Local color tokens: ${Object.keys(localTokens.color).length} categories`, 'gray');
  
  // Compare typography tokens
  log('\n--- Typography Tokens ---', 'blue');
  
  const figmaTypography = {};
  if (figmaVariables && figmaVariables.variables) {
    figmaVariables.variables.forEach(v => {
      if (v.resolvedType === 'FLOAT' || v.resolvedType === 'STRING') {
        if (v.name.includes('font') || v.name.includes('text') || v.name.includes('typography')) {
          figmaTypography[v.name] = v;
        }
      }
    });
  }
  
  log(`Figma typography variables: ${Object.keys(figmaTypography).length}`, 'gray');
  
  // Compare spacing tokens
  log('\n--- Spacing Tokens ---', 'blue');
  
  const figmaSpacing = {};
  if (figmaVariables && figmaVariables.variables) {
    figmaVariables.variables.forEach(v => {
      if (v.name.includes('spacing') || v.name.includes('gap') || v.name.includes('padding')) {
        figmaSpacing[v.name] = v;
      }
    });
  }
  
  log(`Figma spacing variables: ${Object.keys(figmaSpacing).length}`, 'gray');
  log(`Local spacing tokens: ${Object.keys(localTokens.spacing).length}`, 'gray');
  
  // Summary
  log('\n--- Summary ---', 'blue');
  
  const result = {
    matches: matches,
    discrepancies: discrepancies,
    figmaVariables: figmaVariables,
    localTokens: localTokens
  };
  
  if (discrepancies.length === 0 && matches.length === 0) {
    log('\nNo variables found in Figma file or unable to fetch variables.', 'yellow');
    log('Please ensure:', 'yellow');
    log('1. File key is correct', 'yellow');
    log('2. Figma token is valid and has file read permissions', 'yellow');
    log('3. Variables are defined in the Figma file', 'yellow');
  }
  
  return result;
}

function generateReport(comparison) {
  log('\n' + '='.repeat(80), 'cyan');
  log('COMPARISON REPORT', 'cyan');
  log('='.repeat(80), 'cyan');
  
  const report = {
    timestamp: new Date().toISOString(),
    figmaFileKey: FIGMA_FILE_KEY,
    summary: {
      discrepancies: comparison.discrepancies.length,
      matches: comparison.matches.length
    },
    discrepancies: comparison.discrepancies,
    matches: comparison.matches
  };
  
  // Save report to file
  const reportPath = './figma-token-comparison-report.json';
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  log(`\nReport saved to: ${reportPath}`, 'green');
  
  return report;
}

// Main execution
function main() {
  log('\n' + '='.repeat(80), 'cyan');
  log('FIGMA TOKEN COMPARISON TOOL', 'cyan');
  log('='.repeat(80), 'cyan');
  
  // Check for token
  if (FIGMA_TOKEN === '') {
    log('\n⚠ Warning: Using default token which may be expired', 'yellow');
    log('To use a new token, set FIGMA_TOKEN environment variable or use --token flag', 'yellow');
  }
  
  log(`\nFile key: ${FIGMA_FILE_KEY}`);
  log(`Local tokens: ${LOCAL_TOKENS_PATH}`);
  
  // Load local tokens
  const localTokens = loadLocalTokens();
  log(`Loaded ${Object.keys(localTokens.color).length} color categories from local tokens`, 'green');
  
  // Fetch Figma variables
  fetchFigmaVariables((error, figmaVariables) => {
    if (error) {
      log(`\n❌ Error: ${error.message}`, 'red');
      log('\nTo generate a new Figma token:', 'yellow');
      log('1. Go to https://www.figma.com/settings', 'yellow');
      log('2. Navigate to Security > Personal access tokens', 'yellow');
      log('3. Generate new token with "file_content:read" scope', 'yellow');
      log('4. Run with: FIGMA_TOKEN=<your_token> node compare_tokens.js', 'yellow');
      log('\nOr use the Figma MCP server in VS Code/Cursor to extract variables', 'yellow');
      
      // Still generate report with available data
      const comparison = compareTokens(localTokens, null);
      generateReport(comparison);
      process.exit(1);
    }
    
    // Compare tokens
    const comparison = compareTokens(localTokens, figmaVariables);
    
    // Generate report
    generateReport(comparison);
  });
}

if (require.main === module) {
  main();
}

module.exports = { compareTokens, fetchFigmaVariables };
