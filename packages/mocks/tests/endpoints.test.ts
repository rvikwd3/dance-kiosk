import { startServer, stopServer, makeAuthenticatedRequest } from './utils.js';

// Start the MSW server
startServer();

// Test functions
async function testHealthEndpoint(): Promise<boolean> {
  console.log('\n🔍 Testing Health Endpoint...');
  try {
    const response = await fetch('http://localhost:4000/health');
    const data = await response.json();
    
    console.log('Status:', response.status);
    console.log('Response:', JSON.stringify(data, null, 2));
    
    if (response.status === 200) {
      console.log('✅ Health endpoint test successful!');
      return true;
    } else {
      console.log('❌ Health endpoint test failed: Expected status 200, got', response.status);
      return false;
    }
  } catch (error) {
    console.error('❌ Health endpoint test failed:', error instanceof Error ? error.message : String(error));
    return false;
  }
}

async function testGetClassesEndpoint(): Promise<boolean> {
  console.log('\n🔍 Testing Get Classes Endpoint...');
  try {
    const response = await makeAuthenticatedRequest('http://localhost:4000/availability/classes?minDate=2024-01-01&maxDate=2024-12-31&timezone=UTC');
    const data = await response.json();
    
    console.log('Status:', response.status);
    console.log('Response:', JSON.stringify(data, null, 2));
    
    if (response.status === 200) {
      console.log('✅ Get Classes endpoint test successful!');
      return true;
    } else {
      console.log('❌ Get Classes endpoint test failed: Expected status 200, got', response.status);
      return false;
    }
  } catch (error) {
    console.error('❌ Get Classes endpoint test failed:', error instanceof Error ? error.message : String(error));
    return false;
  }
}

async function testUnauthenticatedRequest(): Promise<boolean> {
  console.log('\n🔍 Testing Unauthenticated Request...');
  try {
    const response = await fetch('http://localhost:4000/availability/classes');
    const data = await response.json();
    
    console.log('Status:', response.status);
    console.log('Response:', JSON.stringify(data, null, 2));
    
    if (response.status === 401) {
      console.log('✅ Unauthenticated request correctly rejected!');
      return true;
    } else {
      console.log('❌ Unauthenticated request test failed: Expected status 401, got', response.status);
      return false;
    }
  } catch (error) {
    console.error('❌ Unauthenticated request test failed:', error instanceof Error ? error.message : String(error));
    return false;
  }
}

async function testInvalidCredentials(): Promise<boolean> {
  console.log('\n🔍 Testing Invalid Credentials...');
  try {
    const response = await fetch('http://localhost:4000/availability/classes', {
      headers: {
        'Authorization': 'Basic d3JvbmctdXNlcjp3cm9uZy1rZXk=',
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    
    console.log('Status:', response.status);
    console.log('Response:', JSON.stringify(data, null, 2));
    
    if (response.status === 401) {
      console.log('✅ Invalid credentials correctly rejected!');
      return true;
    } else {
      console.log('❌ Invalid credentials test failed: Expected status 401, got', response.status);
      return false;
    }
  } catch (error) {
    console.error('❌ Invalid credentials test failed:', error instanceof Error ? error.message : String(error));
    return false;
  }
}

async function testNonExistentEndpoint(): Promise<boolean> {
  console.log('\n🔍 Testing Non-existent Endpoint...');
  try {
    const response = await makeAuthenticatedRequest('http://localhost:4000/api/nonexistent');
    const data = await response.json();
    
    console.log('Status:', response.status);
    console.log('Response:', JSON.stringify(data, null, 2));
    
    if (response.status === 404) {
      console.log('✅ Non-existent endpoint correctly handled!');
      return true;
    } else {
      console.log('❌ Non-existent endpoint test failed: Expected status 404, got', response.status);
      return false;
    }
  } catch (error) {
    console.error('❌ Non-existent endpoint test failed:', error instanceof Error ? error.message : String(error));
    return false;
  }
}

// Run all tests
async function runAllTests(): Promise<void> {
  console.log('🚀 Starting comprehensive MSW endpoint tests...\n');
  
  const tests = [
    { name: 'Health Endpoint', fn: testHealthEndpoint },
    { name: 'Get Classes Endpoint', fn: testGetClassesEndpoint },
    { name: 'Unauthenticated Request', fn: testUnauthenticatedRequest },
    { name: 'Invalid Credentials', fn: testInvalidCredentials },
    { name: 'Non-existent Endpoint', fn: testNonExistentEndpoint }
  ];
  
  const results: Array<{ name: string; passed: boolean }> = [];
  
  for (const test of tests) {
    const result = await test.fn();
    results.push({ name: test.name, passed: result });
  }
  
  // Summary
  console.log('\n📊 Test Summary:');
  console.log('================');
  results.forEach(result => {
    const status = result.passed ? '✅ PASS' : '❌ FAIL';
    console.log(`${status} ${result.name}`);
  });
  
  const passedCount = results.filter(r => r.passed).length;
  const totalCount = results.length;
  
  console.log(`\n🎯 Overall: ${passedCount}/${totalCount} tests passed`);
  
  if (passedCount === totalCount) {
    console.log('🎉 All tests passed! Your MSW server is working correctly.');
  } else {
    console.log('⚠️  Some tests failed. Check the output above for details.');
  }
  
  // Close the server
  stopServer();
}

// Run the tests
runAllTests().catch(error => {
  console.error('❌ Test suite failed:', error);
  stopServer();
}); 