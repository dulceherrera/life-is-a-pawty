# Life's a Pawty

A full stack web application for prospective dog and/or cat adopters who want to find pets available for adoption.

I have always felt a deep love for animals, this is what made me develop this app. With this app I want dogs and cats that are in shelters to have more chances of being adopted and being part of a family that gives them love. As in the famous dating app, in this app you can match with pets (cats and dogs) in your area.

## Live Demo

Try the application at https://life-is-a-pawty.dulceherrera.com/

## Technologies Used

* HTML5
* CSS3
* JavaScript
* PostgreSQL
* ReactJS
* Node.js
* Express.js
* Webpack

## Features Implemented

* User can search the pets that are in an area.
* User can save the pets that they liked.
* User can delete a match they are no interested in.
* User can view the match list.
* User can view all the details of a pet.
* User can delete pets that they are no longer interested in.
* User can view the location of each pet.
* User can sign up for an account.
* User can sign in.
* User can sign out.

## Preview

![portfolio1](https://user-images.githubusercontent.com/97363006/209716434-bdfedd2c-fc71-4e4b-97aa-1a8d7d592d23.gif)


## Stretch Features
* User can see all available photos of their matched pets.

## Development

### System Requirements
* Node.js 16 or higher
* PostgreSQL
* NPM 8 or higher

### Getting Started

1. Clone the repository.

    ```shell
    git clone git@github.com:dulceherrera/life-is-a-pawty.git
    cd life-is-a-pawty
    ```
    
 2. Install all dependencies with NPM.

    ```shell
    npm install
    ```
    
 3. Make a copy of the env.example file.

    ```shell
    cp env.example .env
    ```
    
 4. Start PostgreSQL.

    ```shell
    sudo service postgresql start
    ```
    
 5. Create a new database.

    ```shell
    createdb pets
    ```
    
 6. Import the example database to PostgreSQL.

    ```shell
    npm run db:import
    ```
    
 7. Start the database with pgweb. Open the database at http://localhost:8081/ once is running.

    ```shell
    pgweb --db=pets
    ```
    
 8. Start the project. Once started you can view the application by opening http://localhost:3000 in your browser.

    ```shell
    npm run dev
    ```
    
 
    
    



