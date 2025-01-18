//Connection to a mySql database

//Krav för anslutningen
const cors = require("cors")
const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

//Säger vilka URL som kan använda uppkopplingen 
app.use(cors({
    origin: "http://127.0.0.1:5500"
}))

//Initsierar en Pool som ska ansluta till en mysql databas
const { 
    createPool 
} = require('mysql');


//Själva anslutningen 
const pool = createPool({
    host : "localhost",
    user : "root",
    password : "",
    database : "tennis_court_booking",
    connectionLimit: 10 //Bara tio enheter som kan ansluta 
});

//Pusha en bokning till databsen
app.post("/bookings", (req, res) => {

    const bookings = req.body[0];
    console.log("hRequest recived ", req.body);

    console.log("Bookings: ", bookings);

    //initsierar en vektor queryProemises
    let queryPromises = [];

    //Går igenom bokningarna
    bookings.forEach(booking => {
        console.log(booking.name);

        //Skapar en sql queryfråga
        const query = ("INSERT INTO bookings (bkNumber, Court, Date, Time, Name) VALUES (?,?,?,?,?)");
        
        //Lägger till värdena separat för att undvika sql injection
        const values = [booking.bkID, booking.court, booking.date, booking.time, booking.name];

        //Lägger till värdet till frågan
        queryPromises.push(
            new Promise((resolve, reject) => {
                pool.query(query, values, (error, resaults) => {
                    
                    if(error){
                        reject(error);
                    }
                    else {
                        resolve(resaults);
                    }
                });
            })
        ); 
    });


    //Skickar frågan 
    Promise.all(queryPromises)
        .then(() => {
            console.log("send");

            //200 när det lyckas
            res.status(200).json({message: "!All bookings successfully added"});
        })
        .catch(error => {
            console.error("Error insering bookings:", error);
            
            //500 när något går fel
            res.status(500).json({error: "An error ocurred while adding bookings."});
        });

       // console.log({bkID, court, date, time, name});
})

//Endpoint för att hämta alla bokningar
app.get("/getBookings", (req, res) => {

    console.log("Get bookings");

    //Sql fråga
    const query = "SELECT * FROM bookings";

    //Utför förfrågan på poolanslutningen
    pool.query(query, (error, results) => {
        if(error) {
            console.log("Error fetching bookings:", error);

            //500 ifall det blir avslag 
            res.status(500).json({ error: "An error occurred while fetching bookings"});
        }
        else{

            console.log("Raw results from database:", results);

            //Kör en clean på resultatet för att få ren JSON
            const cleanResults = JSON.parse(JSON.stringify(results));
            console.log("Bookings fetched from database:", cleanResults);

            //200 ifall det går igenom 
            res.status(200).json(cleanResults);
        }

    })
})


app.listen(port, "0.0.0.0", () => {
    console.log("Server running on http://localhost:" + port);
})
//pool.query("select * from bookings", (err, result, fields) => );