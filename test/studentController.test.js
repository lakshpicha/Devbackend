const test = require('node:test');
const assert = require('node:assert/strict');
const { buildStudentQuery } = require('../controller/studentController');

test('buildStudentQuery maps search filters into a Mongo query', () => {
  const result = buildStudentQuery({
    skills: 'React, Node',
    branch: 'CSE',
    year: '3',
    college: 'PCCOE',
    location: 'Pune',
  });

  assert.ok(result.$and);
  assert.equal(result.$and.length, 6);
  assert.deepEqual(result.$and[0], {
    skills: { $elemMatch: { $regex: /React/i } },
  });
  assert.deepEqual(result.$and[1], {
    skills: { $elemMatch: { $regex: /Node/i } },
  });
  assert.deepEqual(result.$and[2], {
    branch: { $regex: /CSE/i },
  });
  assert.deepEqual(result.$and[3], {
    year: { $regex: /3/i },
  });
  assert.deepEqual(result.$and[4], {
    college: { $regex: /PCCOE/i },
  });
  assert.deepEqual(result.$and[5], {
    location: { $regex: /Pune/i },
  });
});
