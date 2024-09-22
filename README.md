- [Get-Ur-Tickets](#get-ur-tickets)
- [Process to run it locally](#process-to-run-it-locally)
- [How the application works](#how-the-application-works)

# Get-Ur-Tickets
This is repository is for the CS 472 project.

# Process to run it locally
1. `npm install aws-amplify @aws-amplify/ui-react` - use this command to # get the dependancies to be able to start it.
   
2. `npm start`

# How the application works
![](img/System-Diagram.jpg)

GetUrTickets is a RESTful application that works by making GET, POST, PUT, and DELETE requests. The application has a frontend user interface that the user will interact with, and a backend that handles all of the processing of the application. The application will be hosted on Amazon Web Services using [AWS Amplify](https://aws.amazon.com/amplify/). The application will be deployed each time there is a new commit to our team repository.

Based on the diagram at the top. The user will request tickets for a specific (event) on the frontend. The backend will make an API call to SeatGeek for the upcoming events, which will then make an API call to SerpAPI for upcoming flight options based on the result from SeatGeek. After this, the backend will calculate each choice’s total price (tickets + flight), sort, and send the results to the frontend. The frontend will display the results and give the user the choice to filter. After this, the front end will provide the user an option to buy tickets through affiliate links so our application can receive a final payout.

The UML diagram below shows how the application works on a detailed level.

![](img/UML.jpg)