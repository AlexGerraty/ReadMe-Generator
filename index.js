const fs = require('fs');
const inquirer = require('inquirer');

const questions = [
   {
       type: 'input',
       name: 'title',
       message: 'What is the title of your project?'
   },
   {
       type: 'input',
       name: 'description',
       message: 'Please enter a description of your project:'
   },
   {
       type: 'input',
       name: 'installation',
       message: 'Please enter installation instructions for your project:'
   },
   {
       type: 'input',
       name: 'usage',
       message: 'Please enter usage information for your project:'
   },
   {
       type: 'list',
       name: 'license',
       message: 'Please choose a license for your project:',
       choices: ['MIT', 'GPLv3', 'Apache 2.0', 'BSD 3-Clause', 'None']
   },
   {
       type: 'input',
       name: 'contributing',
       message: 'Please enter contribution guidelines for your project:'
   },
   {
       type: 'input',
       name: 'tests',
       message: 'Please enter test instructions for your project:'
   },
   {
       type: 'input',
       name: 'github',
       message: 'Please enter your GitHub username:'
   },
   {
       type: 'input',
       name: 'email',
       message: 'Please enter your email address:'
   }
];

function writeToFile(fileName, data) {
   fs.writeFile(fileName, data, err => {
       if (err) {
           console.log(err);
           return;
       }

       console.log('Your README.md file has been generated!');
   });
}

function generateReadme(answers) {
   let licenseBadge = '';
   let licenseLink = '';

   switch (answers.license) {
       case 'MIT':
           licenseBadge = '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)';
           licenseLink = 'This application is covered under the MIT license.';
           break;
       case 'GPLv3':
           licenseBadge = '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)';
           licenseLink = 'This application is covered under the GPLv3 license.';
           break;
       case 'Apache 2.0':
           licenseBadge = '[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)';
           licenseLink = 'This application is covered under the Apache 2.0 license.';
           break;
       case 'BSD 3-Clause':
           licenseBadge = '[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)';
           licenseLink = 'This application is covered under the BSD 3-Clause license.';
           break;
       case 'None':
           licenseBadge = '';
           licenseLink = 'This application is not covered under any specific license.';
           break;
   }

   const readme = `
# ${answers.title}

${licenseBadge}

 Table of Contents

 - [Description] (#description)
 - [Installation] (#installation)
 - [Usage] (#usage)
 - [License] (#license)
 - [Contributing] (#contributing)
 - [Tests] (#tests)
 - [Questions] (#questions)

## Description

${answers.description}

## Installation

${answers.installation}

## Usage

${answers.usage}

## License

${licenseLink}

## Contributing

${answers.contributing}

## Tests

${answers.tests}

## Questions

For any inquiries, please contact me via email: ${answers.email}

If you would like, check out my GitHub profile: [${answers.github}](https://github.com/${answers.github})

`;

   return readme;
}

inquirer.prompt(questions).then(answers => {
   const readme = generateReadme(answers);
   writeToFile('README.md', readme);
});