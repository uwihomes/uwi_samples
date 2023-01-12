# uwi API Sample

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them:

- Node.js (v12 or higher)
- npm (v6 or higher)

### Installing

1. Clone the repository to your local machine

        git clone https://github.com/uwihomes/uwi_samples.git

2. Go into the uwi_samples/uwi_apis folder
        cd uwi_samples/uwi_apis

3. Install the dependencies
        npm install


### Configuring

Before you can run the project, you will need to configure the client ID, client secret, startDateTime and endDateTime in the `index.js` file.

1. Obtain your client ID and client secret in the API Clients section of your Developer CRM.
2. Open the `index.js` file in your favorite text editor.
3. Look for the following lines of code:
        const request = new UwiApi('your-client-id', 'your-client-secret', 'https://staging-api.uwi.ph');
        request.getApplications('2023-01-01 00:00:00', '2023-01-15 00:00:00');
4. Replace the string values with your actual client ID, client secret, startDateTime and endDateTime.
5. Save the file and close the text editor.

Make sure that the startDateTime and endDateTime are entered in the correct format.

### Running the project

1. Run the project

        node index.js

2. You should see the output on the terminal

## API Usage

Please note that requests to the API are limited to 5 minutes per request.