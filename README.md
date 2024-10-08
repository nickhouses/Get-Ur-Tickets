- [Get-Ur-Tickets](#get-ur-tickets)
- [Process to run it locally](#process-to-run-it-locally)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [Docker](#docker)
- [How the application works](#how-the-application-works)

# Get-Ur-Tickets
This is repository is for the CS 472 project.

# Process to run application on AWS
## Access the AWS machine
- Update the permissions on the KeyPair file
  - `chmod 400 "MyKeyPair.pem"`
- ssh into AWS machine 
  - `ssh -i "MyKeyPair.pem" ubuntu@ec2-54-152-125-46.compute-1.amazonaws.com`

## Get the most up-to-date code
- Clone the repository
  - `git clone https://github.com/CS-472/Get-Ur-Tickets.git`
- Pull the most up-to-date code from the repository
   `git pull`

## Serve the flask application
- Check if there are any active screens
  - `screen -ls`
- Terminate any active screens
  - `screen -X -S <session_id> quit`
- Resume any active screens
  - `screen -r`
- Serve the flask application
  - `waitress-serve --port=5000 --call flask_app:create_app`

### The application is now served [here](http://54.152.125.46:5000)

# Process to run it locally
## Frontend
1. `npm install bootstrap react-bootstrap aws-amplify @aws-amplify/ui-react` - use this command to # get the dependancies to be able to start it.
   
2. `npm start`

### Frontend Optional: 
1. If using a Linux machine, or UNIX machines (needs testing), you may run `chmod +x build.sh` if you wish to use the build script instead. 

2. After enabling the build script for execution, run `./build.sh` in the root directory of your repo git clone.

3. This will run all necessary commands to build/aquire dependencies and prompt you to start the webserver locally if you wish.

## Backend
The entry point of the backend is [flask_app.py](./backend/flask_app.py)

1. Change directories to the backend directory: `cd backend`
2. Run `python3 flask_app.py`
3. Run the following command.
```shell 
curl -d '{"originAirportCode":"LAS", "keyword":"formula-1"}' -X POST http://localhost:5000/test -H "Content-Type: application/json"
```

- If need be, edit the parameters passed by modifying what is inside the curly braces

You can expect the output to be in a JSON format like the following.
```json
{
    "result": [
        [
            287.0,
            "2024 Formula 1 Pirelli United States Grand Prix - Friday",
            [
                "Austin",
                "Texas"
            ],
            "https://www.ticketmaster.com/2024-formula-1-pirelli-united-states-austin-texas-10-18-2024/event/3A006091CC0450AD",
            "2024-10-17",
            "2024-10-19"
        ],
        [
            346.0,
            "2024 Formula 1 Pirelli United States Grand Prix - Saturday",
            [
                "Austin",
                "Texas"
            ],
            "https://www.ticketmaster.com/2024-formula-1-pirelli-united-states-austin-texas-10-19-2024/event/3A006091CC9350FA",
            "2024-10-18",
            "2024-10-20"
        ],
        [
            403.0,
            "2024 Formula 1 Pirelli United States Grand Prix - Sunday",
            [
                "Austin",
                "Texas"
            ],
            "https://www.ticketmaster.com/2024-formula-1-pirelli-united-states-austin-texas-10-20-2024/event/3A006091CD365146",
            "2024-10-19",
            "2024-10-21"
        ],
        [
            1272.0,
            "Souvenir Ticket - FORMULA 1 AUSTRALIAN GRAND PRIX 2025",
            [
                "Albert Park",
                "Victoria"
            ],
            "https://www.ticketmaster.com.au/souvenir-ticket-formula-1-australian-grand-albert-park-16-03-2025/event/250061339E1A2126",
            "2025-03-15",
            "2025-03-17"
        ],
        [
            1361.96,
            "Sunday Joyflight - FORMULA 1 AUSTRALIAN GRAND PRIX 2025",
            [
                "Albert Park",
                "Victoria"
            ],
            "https://www.ticketmaster.com.au/sunday-joyflight-formula-1-australian-grand-albert-park-16-03-2025/event/25006130BDE32A68",
            "2025-03-15",
            "2025-03-17"
        ],
        [
            1379.96,
            "Friday Joyflight - FORMULA 1 AUSTRALIAN GRAND PRIX 2025",
            [
                "Albert Park",
                "Victoria"
            ],
            "https://www.ticketmaster.com.au/friday-joyflight-formula-1-australian-grand-albert-park-14-03-2025/event/25006130BDD82A62",
            "2025-03-13",
            "2025-03-15"
        ],
        [
            1418.53,
            "Thursday Joyflight - FORMULA 1 AUSTRALIAN GRAND PRIX 2025",
            [
                "Albert Park",
                "Victoria"
            ],
            "https://www.ticketmaster.com.au/thursday-joyflight-formula-1-australian-grand-albert-park-13-03-2025/event/25006130BDC82A60",
            "2025-03-12",
            "2025-03-14"
        ],
        [
            1510.96,
            "Saturday Joyflight - FORMULA 1 AUSTRALIAN GRAND PRIX 2025",
            [
                "Albert Park",
                "Victoria"
            ],
            "https://www.ticketmaster.com.au/saturday-joyflight-formula-1-australian-grand-albert-park-15-03-2025/event/25006130BDDF2A66",
            "2025-03-14",
            "2025-03-16"
        ],
        [
            5034.0,
            "Individual G04 Formula 1 2024",
            [
                "M\u00e9xico",
                "Ciudad de M\u00e9xico"
            ],
            "https://www.ticketmaster.com.mx/individual-g04-formula-1-2024-mexico-26-10-2024/event/140060B893FA0DB7",
            "2024-10-25",
            "2024-10-27"
        ],
        [
            5043.0,
            "Individual G04 Formula 1 2024",
            [
                "M\u00e9xico",
                "Ciudad de M\u00e9xico"
            ],
            "https://www.ticketmaster.com.mx/individual-g04-formula-1-2024-mexico-25-10-2024/event/140060B893DF0D99",
            "2024-10-24",
            "2024-10-26"
        ],
        [
            5054.0,
            "Individual G04 Formula 1 2024",
            [
                "M\u00e9xico",
                "Ciudad de M\u00e9xico"
            ],
            "https://www.ticketmaster.com.mx/individual-g04-formula-1-2024-mexico-27-10-2024/event/140060B8940A0DC4",
            "2024-10-26",
            "2024-10-28"
        ],
        [
            50577.0,
            "Boxes Grada 11 + Speed Lounge Formula 1 2024",
            [
                "M\u00e9xico",
                "Ciudad de M\u00e9xico"
            ],
            "https://www.ticketmaster.com.mx/boxes-grada-11-speed-lounge-formula-mexico-25-10-2024/event/140061329A51126E",
            "2024-10-24",
            "2024-10-26"
        ]
    ]
}
```

## Docker
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

# How the application works
![](img/System-Diagram.jpg)

GetUrTickets is a RESTful application that works by making GET, POST, PUT, and DELETE requests. The application has a frontend user interface that the user will interact with, and a backend that handles all of the processing of the application. The application will be hosted on Amazon Web Services using [AWS Amplify](https://aws.amazon.com/amplify/). The application will be deployed each time there is a new commit to our team repository.

Based on the diagram at the top. The user will request tickets for a specific (event) on the frontend. The backend will make an API call to SeatGeek for the upcoming events, which will then make an API call to SerpAPI for upcoming flight options based on the result from SeatGeek. After this, the backend will calculate each choice’s total price (tickets + flight), sort, and send the results to the frontend. The frontend will display the results and give the user the choice to filter. After this, the front end will provide the user an option to buy tickets through affiliate links so our application can receive a final payout.

The UML diagram below shows how the application works on a detailed level.

![](img/UML.jpg)