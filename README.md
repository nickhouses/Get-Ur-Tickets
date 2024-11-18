- [Get-Ur-Tickets](#get-ur-tickets)
  - [Production Deployment](#production-deployment)
    - [AWS Amplify Frontend](#aws-amplify-frontend)
    - [Python Anywhere Backend](#python-anywhere-backend)
      - [Load Balancer Server](#load-balancer-server)
      - [Load Balancer Code](#load-balancer-code)
      - [Deployment Steps](#deployment-steps)
  - [Local Development](#local-development)
    - [Frontend](#frontend)
      - [Optional](#optional)
    - [Backend](#backend)
    - [Docker](#docker)
  - [How the application works](#how-the-application-works)

# [Get-Ur-Tickets](https://main.d356ozzs66r3xx.amplifyapp.com/)

## Production Deployment
### [AWS Amplify Frontend](https://main.d356ozzs66r3xx.amplifyapp.com/)
The frontend uses CI / CD (Continuous Integration / Continuous Deployment) and will redeploy upon merging.

### [Python Anywhere Backend](https://GetUrTickets.pythonanywhere.com/)
Our backend application was deployed on [Python Anywhere's free plan](https://www.pythonanywhere.com/pricing/). This means the backend application only has 1 web worker per web app, and will queue multiple requests while the front of the queue is being processed.

A workaround solution was made for the aforementioned problem. We deployed a load balancer on Python Anywhere and built multiple servers to provide faster responses to when the server gets overloaded. The problem with this approach is that when updates or changes are added to the backend, because each server has to be updated individually since they are spread across different accounts.

#### [Load Balancer Server](https://loadbalancer8888.pythonanywhere.com/)
#### [Load Balancer Code](./load-balancer/flask_app.py)
The load balancer is a simple round robin load balancer. The servers it sends to requests to can be found in its code.

#### Deployment Steps
1. Switch to the Console tab
   1. Open a bash console
   2. Navigate to the project directory
   3. Pull the most up-to-date code from the repository
        - `git pull`

2. Switch to the Web tab
   1. Ensure to set the Source code and Working directory to backend: `/home/websitename/Get-Ur-Tickets/backend`
   2. Ensure the Virtualenv path is set - must make this in console
        - In backend directory run `pip install pipreqs`
    3. Then run `pipreqs . --force`
    4. Then run `python -m venv venv`
    5. Then run `source venv/bin/`
    6. Then run `pip install -r requirements.txt`
    7. Then run `pip install --upgrade flask werkzeug`
    8. Then set Virualenv to the location of the venv.
    9. Configure the WSGI configuration file by clicking on the location
        - Set your `project_home` to the pwd of ur backend, `should be the same as source and working directory`.
    ![alt text](image.png)
     8. Click the green reload button at the top of the page
## Local Development
### Frontend
1. Go to the frontend directory
   - `cd get-ur-tickets`
2. Install all of the dependencies
    - `npm install`
3. Build the application
    - `npm run build`
4. Serve the application using waitress
    - `serve -s build`

#### Optional
1. If using a Linux machine, or UNIX machines (needs testing), you may run `chmod +x build.sh` if you wish to use the build script instead. 
2. After enabling the build script for execution, run `./build.sh` in the root directory of your repo git clone.
3. This will run all necessary commands to build/aquire dependencies and prompt you to start the webserver locally if you wish.

### Backend
The entry point of the backend is [flask_app.py](./backend/flask_app.py)

1. Change directories to the backend directory
   - `cd backend`
2. Create requirements.txt
   - `pipreqs .` 
3. Create a virtual environment
   - `python -m venv venv`
4. Activate the virtual environment
   - Windows
     - `.\venv\Scripts\activate`
   - MacOS
     - `source venv/bin/activate`
5. Install Dependencies
    - `pip install -r requirements.txt`
6. Serve the application
   - `waitress-serve --port=80 --call flask_app:create_app`
7. Deactivate Virutal Environment
   - `deactivate`
8. Make POST requests using curl
    ```shell 
    curl -d '{"originAirportCode":"LAS", "keyword":"formula-1"}' -X POST https://GetUrTickets.pythonanywhere.com/result -H "Content-Type: application/json"
    ```
   - If need be, edit the parameters passed by modifying what is inside the curly braces

You can expect the output to be in a JSON format like the following.
```json
[
    {
        "Total_Price": 637.0,
        "Name": "2024 Formula 1 Pirelli United States Grand Prix - Saturday",
        "Venue": "Austin+Texas",
        "Ticket_Price": 179.0,
        "Ticket_URL": "https://www.ticketmaster.com/2024-formula-1-pirelli-united-states-austin-texas-10-19-2024/event/3A006091CC9350FA",
        "Flight": {
            "Price": 458,
            "URL": "https://www.google.com/travel/flights?hl=en&gl=us&tfs=CBwQAhoeEgoyMDI0LTEwLTE4agcIARIDTEFTcgcIARIDQVVTGh4SCjIwMjQtMTAtMjBqBwgBEgNBVVNyBwgBEgNMQVNCAQFIAXABmAEB",
            "Airline": "Frontier",
            "Logo": "https://www.gstatic.com/flights/airline_logos/70px/F9.png",
            "Travel_Class": "Economy"
        },
        "Hotel": {
            "Price": 0,
            "URL": "",
            "Name": ""
        }
    },
    {
        "Total_Price": 1073.0,
        "Name": "2024 Formula 1 Pirelli United States Grand Prix - Sunday",
        "Venue": "Austin+Texas",
        "Ticket_Price": 249.0,
        "Ticket_URL": "https://www.ticketmaster.com/2024-formula-1-pirelli-united-states-austin-texas-10-20-2024/event/3A006091CD365146",
        "Flight": {
            "Price": 388,
            "URL": "https://www.google.com/travel/flights?hl=en&gl=us&tfs=CBwQAhoeEgoyMDI0LTEwLTE5agcIARIDTEFTcgcIARIDQVVTGh4SCjIwMjQtMTAtMjFqBwgBEgNBVVNyBwgBEgNMQVNCAQFIAXABmAEB",
            "Airline": "Frontier",
            "Logo": "https://www.gstatic.com/flights/airline_logos/70px/F9.png",
            "Travel_Class": "Economy"
        },
        "Hotel": {
            "Price": 436,
            "URL": "https://www.hilton.com/en/hotels/auscdht-home2-suites-austin-cedar-park-tx/?SEO_id=GMB-AMER-HT-AUSCDHT&y_source=1_MjA4MjM1NS03MTUtbG9jYXRpb24ud2Vic2l0ZQ%3D%3D",
            "Name": "Home2 Suites by Hilton Austin/Cedar Park, TX"
        }
    },
    {
        "Total_Price": 1507.0,
        "Name": "Souvenir Ticket - FORMULA 1 AUSTRALIAN GRAND PRIX 2025",
        "Venue": "Albert+Park+Victoria",
        "Ticket_Price": 25.0,
        "Ticket_URL": "https://www.ticketmaster.com.au/souvenir-ticket-formula-1-australian-grand-albert-park-16-03-2025/event/250061339E1A2126",
        "Flight": {
            "Price": 1378,
            "URL": "https://www.google.com/travel/flights?hl=en&gl=us&tfs=CBwQAhoeEgoyMDI1LTAzLTE1agcIARIDTEFTcgcIARIDTUVMGh4SCjIwMjUtMDMtMTdqBwgBEgNNRUxyBwgBEgNMQVNCAQFIAXABmAEB",
            "Airline": "Alaska",
            "Logo": "https://www.gstatic.com/flights/airline_logos/70px/AS.png",
            "Travel_Class": "Economy"
        },
        "Hotel": {
            "Price": 104,
            "URL": "https://inkhotels.com/melbourne-southbank/",
            "Name": "Ink Hotel Melbourne Southbank"
        }
    },
    {
        "Total_Price": 1575.96,
        "Name": "Saturday Joyflight - FORMULA 1 AUSTRALIAN GRAND PRIX 2025",
        "Venue": "Albert+Park+Victoria",
        "Ticket_Price": 114.96,
        "Ticket_URL": "https://www.ticketmaster.com.au/saturday-joyflight-formula-1-australian-grand-albert-park-15-03-2025/event/25006130BDDF2A66",
        "Flight": {
            "Price": 1461,
            "URL": "https://www.google.com/travel/flights?hl=en&gl=us&tfs=CBwQAhoeEgoyMDI1LTAzLTE0agcIARIDTEFTcgcIARIDTUVMGh4SCjIwMjUtMDMtMTZqBwgBEgNNRUxyBwgBEgNMQVNCAQFIAXABmAEB",
            "Airline": "Alaska",
            "Logo": "https://www.gstatic.com/flights/airline_logos/70px/AS.png",
            "Travel_Class": "Economy"
        },
        "Hotel": {
            "Price": 0,
            "URL": "",
            "Name": ""
        }
    },
    {
        "Total_Price": 1592.96,
        "Name": "Friday Joyflight - FORMULA 1 AUSTRALIAN GRAND PRIX 2025",
        "Venue": "Albert+Park+Victoria",
        "Ticket_Price": 114.96,
        "Ticket_URL": "https://www.ticketmaster.com.au/friday-joyflight-formula-1-australian-grand-albert-park-14-03-2025/event/25006130BDD82A62",
        "Flight": {
            "Price": 1478,
            "URL": "https://www.google.com/travel/flights?hl=en&gl=us&tfs=CBwQAhoeEgoyMDI1LTAzLTEzagcIARIDTEFTcgcIARIDTUVMGh4SCjIwMjUtMDMtMTVqBwgBEgNNRUxyBwgBEgNMQVNCAQFIAXABmAEB",
            "Airline": "Air Canada",
            "Logo": "https://www.gstatic.com/flights/airline_logos/70px/AC.png",
            "Travel_Class": "Economy"
        },
        "Hotel": {
            "Price": 0,
            "URL": "",
            "Name": ""
        }
    },
    {
        "Total_Price": 1596.96,
        "Name": "Sunday Joyflight - FORMULA 1 AUSTRALIAN GRAND PRIX 2025",
        "Venue": "Albert+Park+Victoria",
        "Ticket_Price": 114.96,
        "Ticket_URL": "https://www.ticketmaster.com.au/sunday-joyflight-formula-1-australian-grand-albert-park-16-03-2025/event/25006130BDE32A68",
        "Flight": {
            "Price": 1378,
            "URL": "https://www.google.com/travel/flights?hl=en&gl=us&tfs=CBwQAhoeEgoyMDI1LTAzLTE1agcIARIDTEFTcgcIARIDTUVMGh4SCjIwMjUtMDMtMTdqBwgBEgNNRUxyBwgBEgNMQVNCAQFIAXABmAEB",
            "Airline": "Alaska",
            "Logo": "https://www.gstatic.com/flights/airline_logos/70px/AS.png",
            "Travel_Class": "Economy"
        },
        "Hotel": {
            "Price": 104,
            "URL": "https://inkhotels.com/melbourne-southbank/",
            "Name": "Ink Hotel Melbourne Southbank"
        }
    },
    {
        "Total_Price": 2216.5299999999997,
        "Name": "Thursday Joyflight - FORMULA 1 AUSTRALIAN GRAND PRIX 2025",
        "Venue": "Albert+Park+Victoria",
        "Ticket_Price": 85.53,
        "Ticket_URL": "https://www.ticketmaster.com.au/thursday-joyflight-formula-1-australian-grand-albert-park-13-03-2025/event/25006130BDC82A60",
        "Flight": {
            "Price": 1461,
            "URL": "https://www.google.com/travel/flights?hl=en&gl=us&tfs=CBwQAhoeEgoyMDI1LTAzLTEyagcIARIDTEFTcgcIARIDTUVMGh4SCjIwMjUtMDMtMTRqBwgBEgNNRUxyBwgBEgNMQVNCAQFIAXABmAEB",
            "Airline": "Alaska",
            "Logo": "https://www.gstatic.com/flights/airline_logos/70px/AS.png",
            "Travel_Class": "Economy"
        },
        "Hotel": {
            "Price": 670,
            "URL": "https://all.accor.com/hotel/8811/index.en.shtml",
            "Name": "Mercure Melbourne Albert Park"
        }
    },
    {
        "Total_Price": 5282.0,
        "Name": "Individual G04 Formula 1 2024",
        "Venue": "M\u00e9xico+Ciudad+de+M\u00e9xico",
        "Ticket_Price": 4767.0,
        "Ticket_URL": "https://www.ticketmaster.com.mx/individual-g04-formula-1-2024-mexico-27-10-2024/event/140060B8940A0DC4",
        "Flight": {
            "Price": 345,
            "URL": "https://www.google.com/travel/flights?hl=en&gl=us&tfs=CBwQAhoeEgoyMDI0LTEwLTI2agcIARIDTEFTcgcIARIDTUVYGh4SCjIwMjQtMTAtMjhqBwgBEgNNRVhyBwgBEgNMQVNCAQFIAXABmAEB",
            "Airline": "VivaAerobus",
            "Logo": "https://www.gstatic.com/flights/airline_logos/70px/VB.png",
            "Travel_Class": "Economy"
        },
        "Hotel": {
            "Price": 170,
            "URL": "https://hotelesemporio.com/hoteles/emporio-ciudad-de-mexico/?partner=10956&utm_source=google&utm_medium=organic&utm_campaign=MyBusiness",
            "Name": "Hotel Emporio Ciudad de M\u00e9xico"
        }
    },
    {
        "Total_Price": 5378.0,
        "Name": "Individual G04 Formula 1 2024",
        "Venue": "M\u00e9xico+Ciudad+de+M\u00e9xico",
        "Ticket_Price": 4767.0,
        "Ticket_URL": "https://www.ticketmaster.com.mx/individual-g04-formula-1-2024-mexico-26-10-2024/event/140060B893FA0DB7",
        "Flight": {
            "Price": 405,
            "URL": "https://www.google.com/travel/flights?hl=en&gl=us&tfs=CBwQAhoeEgoyMDI0LTEwLTI1agcIARIDTEFTcgcIARIDTUVYGh4SCjIwMjQtMTAtMjdqBwgBEgNNRVhyBwgBEgNMQVNCAQFIAXABmAEB",
            "Airline": "VivaAerobus",
            "Logo": "https://www.gstatic.com/flights/airline_logos/70px/VB.png",
            "Travel_Class": "Economy"
        },
        "Hotel": {
            "Price": 206,
            "URL": "https://hotelesemporio.com/hoteles/emporio-ciudad-de-mexico/?partner=10956&utm_source=google&utm_medium=organic&utm_campaign=MyBusiness",
            "Name": "Hotel Emporio Ciudad de M\u00e9xico"
        }
    },
    {
        "Total_Price": 5411.0,
        "Name": "Individual G04 Formula 1 2024",
        "Venue": "M\u00e9xico+Ciudad+de+M\u00e9xico",
        "Ticket_Price": 4766.0,
        "Ticket_URL": "https://www.ticketmaster.com.mx/individual-g04-formula-1-2024-mexico-25-10-2024/event/140060B893DF0D99",
        "Flight": {
            "Price": 439,
            "URL": "https://www.google.com/travel/flights?hl=en&gl=us&tfs=CBwQAhoeEgoyMDI0LTEwLTI0agcIARIDTEFTcgcIARIDTUVYGh4SCjIwMjQtMTAtMjZqBwgBEgNNRVhyBwgBEgNMQVNCAQFIAXABmAEB",
            "Airline": "VivaAerobus",
            "Logo": "https://www.gstatic.com/flights/airline_logos/70px/VB.png",
            "Travel_Class": "Economy"
        },
        "Hotel": {
            "Price": 206,
            "URL": "https://hotelesemporio.com/hoteles/emporio-ciudad-de-mexico/?partner=10956&utm_source=google&utm_medium=organic&utm_campaign=MyBusiness",
            "Name": "Hotel Emporio Ciudad de M\u00e9xico"
        }
    },
    {
        "Total_Price": 50945.0,
        "Name": "Boxes Grada 11 + Speed Lounge Formula 1 2024",
        "Venue": "M\u00e9xico+Ciudad+de+M\u00e9xico",
        "Ticket_Price": 50300.0,
        "Ticket_URL": "https://www.ticketmaster.com.mx/boxes-grada-11-speed-lounge-formula-mexico-25-10-2024/event/140061329A51126E",
        "Flight": {
            "Price": 439,
            "URL": "https://www.google.com/travel/flights?hl=en&gl=us&tfs=CBwQAhoeEgoyMDI0LTEwLTI0agcIARIDTEFTcgcIARIDTUVYGh4SCjIwMjQtMTAtMjZqBwgBEgNNRVhyBwgBEgNMQVNCAQFIAXABmAEB",
            "Airline": "VivaAerobus",
            "Logo": "https://www.gstatic.com/flights/airline_logos/70px/VB.png",
            "Travel_Class": "Economy"
        },
        "Hotel": {
            "Price": 206,
            "URL": "https://hotelesemporio.com/hoteles/emporio-ciudad-de-mexico/?partner=10956&utm_source=google&utm_medium=organic&utm_campaign=MyBusiness",
            "Name": "Hotel Emporio Ciudad de M\u00e9xico"
        }
    }
]
```

### Docker
1. Commands to build and run 
   - To build the container issue the command `docker build -t get-ur-tickets-app .`
   - To run the container issue the command  `docker run -p 3000:3000 get-ur-tickets-app`
2. Build Phase:
   - When the Docker file is built it will do the following: 
   - Download the node.js 16 image
   - Create a working directory in the `/app` container
   - Copy the package.json files
   - Run `npm install` to install dependencies 
3. Run Phase:
   - When the Docker file is ran it will do the following:
   - Expose port 3000 in the container to port 3000 on your local machine
   - Start the Node.js application using npm start 
   - The application will be accessible on your local machine at `http://localhost:3000`
4. FAQ:
   - Ensure Docker is installed on your computer.
   - The initial build will take approximately 2 minutes.
   - If the build fails and the error you encounter is 401 unauthorized, make sure you are logged into Docker on your terminal. 
   - The command to log in is `docker login -u <username>`
  
## How the application works
![](img/System-Diagram.jpg)

GetUrTickets is a RESTful application that works by making GET, POST, PUT, and DELETE requests. The application has a frontend user interface that the user will interact with, and a backend that handles all of the processing of the application. The application will be hosted on Amazon Web Services using [AWS Amplify](https://aws.amazon.com/amplify/). The application will be deployed each time there is a new commit to our team repository.

Based on the diagram at the top. The user will request tickets for a specific (event) on the frontend. The backend will make an API call to SeatGeek for the upcoming events, which will then make an API call to SerpAPI for upcoming flight options based on the result from SeatGeek. After this, the backend will calculate each choice’s total price (tickets + flight), sort, and send the results to the frontend. The frontend will display the results and give the user the choice to filter. After this, the front end will provide the user an option to buy tickets through affiliate links so our application can receive a final payout.

The UML diagram below shows how the application works on a detailed level.

![](img/UML.jpg)
