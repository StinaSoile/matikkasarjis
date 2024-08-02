# Matikkasarjikset - math comics

This code is a frontend for my math comic project that I do to practice coding.
Matikkasarjikset-math comics project is a web page in finnish language, for reading my interactive math comics. Comics can be read when a user solves math problems which are part of the story.
This project is meant for elementary and middle school students to review mathematics, and for more gifted kids to challenge and motivate them.

Address of this web page is https://matikkasarjikset.onrender.com .
Frontend is made with typescript using react.

Backend is in different repository: https://github.com/StinaSoile/matikkasarjis-backend. It is made with typescript.

Cloud application used to run both backend and frontend is Render. I am using free version, which spins down the service when not in use. This causes a need to wait for about a minute, when opening the web page.
More information: https://docs.render.com/free#free-web-services .

# Install project

clone the repository:
git@github.com:StinaSoile/matikkasarjis.git
install dependencies:
npm install

To run in development mode, npm run dev uses local backend and requires installing that, npm run dev-prod uses backend in address https://matikkasarjis-backend.onrender.com/ .

Build and run builded code:
npm run build
npm start
