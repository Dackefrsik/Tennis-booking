//Connection to a mySql database

//Krav för anslutningen
const cors = require("cors")
const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

//Säger vilka URL som kan använda uppkopplingen 
app.use(cors({
    //origin: "http://127.0.0.1:5500"
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

//#region Pusha en bokning till databsen
app.post("/bookings", (req, res) => {

    const bookings = req.body;
    //console.log("hRequest recived ", req.body);

    //console.log("Bookings: ", bookings);

    //initsierar en vektor queryProemises
    let queryPromises = [];

    //Går igenom bokningarna
    bookings.forEach(booking => {
        console.log(booking.bkID);

        //Skapar en sql queryfråga
        const query = ("INSERT INTO bookings (bkNumber, Court, Date, Time, Name) VALUES (?,?,?,?,?)");
        
        //Lägger till värdena separat för att undvika sql injection
        const values = [booking.bkID, booking.court, booking.date, booking.time, booking.name];

        console.log("Bokning: ", booking);

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
//#endregion

//#region Endpoint för att hämta alla bokningar
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

            console.log("Raw results from database:", results.bkID);

            //Kör en clean på resultatet för att få ren JSON
            const cleanResults = JSON.parse(JSON.stringify(results));
            console.log("Bookings fetched from database:", cleanResults);

            //200 ifall det går igenom 
            res.status(200).json(cleanResults);
        }

    })
})
//#endregion

//#region Endpoint för att ta bort en bokning
app.post("/removeBooking", (req, res) => {
    console.log("Req i remove: ", req.body);

    let bkID = req.body.bkID;
    //Initsierar queryPromese
    let queryPromese = [];

    //Sql fråga för att ta bort en bokning
    const query = "DELETE FROM bookings WHERE ID = ?";
    const value = [bkID];

    //Puschar datan till queryPromese
    queryPromese.push(
        new Promise((resolve, reject) => {
            pool.query(query, value, (error, resaults) =>{

                if(error){
                    reject(error);
                }
                else{
                    resolve(resaults);
                }
            })
        })
    )

    //Utför promise
    Promise.all(queryPromese)
    .then(() => {
        console.log("Delete");

        //´200 om den lyckas ta bort en bokning
        res.status(200).json({message : "Booking removed successfully"});
    })
    .catch(error => {
        console.error("Error removing booking", error);

        //500 om den misslyckas
        res.status(500).json({error: "An errror occured while removing booking"});
    });

})
//#endregion

//#region Lyssnare som säger vilken port vackend körs på
app.listen(port, "0.0.0.0", () => {
    console.log("Server running on http://localhost:" + port);
})
//#endregion