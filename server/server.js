const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://aaryaman:xZ2azqV0J6cjAXMC@nasacluster.9w92cjg.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// app.use("/", express.static("../client/dist"));

app.use("/final", express.static("../client/dist/"));

///////////////////////// WILDFIRES/AEROSOLS/WINDPSEED //////////////////////////

app.get("/heatmaps/:type/:startYr/:endYr", async (req, res) => {
  //convert the req params to numbers
  let startYear = Number(req.params.startYr);
  let endYear = Number(req.params.endYr);
  let diff = endYear - startYear;
  if (isNaN(startYear) || isNaN(endYear)) {
    res
      .status(400)
      .send({ error: "At least of your inputs is not a valid year-number." });
  } else if (diff < 0) {
    res
      .status(400)
      .send({ error: "The start year cannot be greater than the end year." });
  } else if (
    req.params.type !== "Wildfires" &&
    req.params.type !== "Aerosols" &&
    req.params.type !== "WindSpeed"
  ) {
    res
      .status(400)
      .send({ error: "You are querying a collection that doesn't exist!" });
  } else if (
    req.params.type === "Wildfires" &&
    (startYear < 2012 || startYear > 2021 || endYear < 2012 || endYear > 2021)
  ) {
    res.status(400).send({
      error:
        "The years must be between 2012 and 2021 for Wildfires, inclusive.",
    });
  } else if (
    (req.params.type === "Aerosols" || req.params.type === "WindSpeed") &&
    (startYear < 2000 || startYear > 2023 || endYear < 2000 || endYear > 2023)
  ) {
    res.status(400).send({
      error:
        "The years must be between 2000 and 2023 for Aerosols/WindSpeed, inclusive.",
    });
  } else {
    await client.connect();
    const db = client.db("NasaData");
    const collection = db.collection(req.params.type);
    let regex = "";
    //if the difference is 0, then the user has selected only one year
    if (diff === 0) {
      regex = `${startYear}`;
    }
    //if the difference is 1, then the user has selected two years
    else if (diff === 1) {
      regex = `${startYear}|${endYear}`;
    }
    //if the difference is more than 1, then the user has selected more than two years
    else {
      regex = `${startYear}|${endYear}|`;
      for (let i = 1; i < diff; i++) {
        regex += `${startYear + i}|`;
      }
      regex = regex.slice(0, -1);
    }
    //create a regex object
    const regexObj = new RegExp(regex);
    //find all the documents that match the regex
    const objects = await collection
      .find({
        acq_date: { $regex: regexObj },
      })
      .toArray();
    //remove the _id field from each object in the array
    objects.map((obj) => {
      delete obj._id;
    });
    //send the objects to the client
    if (objects.length === 0) {
      res.status(400).send({
        error: "Something went wrong, please check your inputs and try again.",
      });
    } else {
      let monthLookup = {
        "1/": "Jan",
        "2/": "Feb",
        "3/": "Mar",
        "4/": "Apr",
        "5/": "May",
        "6/": "Jun",
        "7/": "Jul",
        "8/": "Aug",
        "9/": "Sep",
        10: "Oct",
        11: "Nov",
        12: "Dec",
      };
      let results = {};
      //loop through the objects array for each year, have an array of objects for each month
      for (let i = 0; i < objects.length; i++) {
        let obj = objects[i];
        let date = obj.acq_date;
        let month = monthLookup[date.slice(0, 2)];
        //year is last 4 of the date
        let year = date.slice(-4);
        //if the year is not in the results object, add it
        if (!results[year]) {
          results[year] = {};
        }
        //if the month is not in the results object, add it
        if (!results[year][month]) {
          results[year][month] = [];
        }
        //push the object into the results object
        results[year][month].push(obj);
      }

      res.send(results);
    }
  }
});
///////////////////////// END WILDFIRES/AEROSOLS/WINDPSEED //////////////////////

///////////////////////// SOLAR & WIND ENERGY //////////////////////////

app.get("/energy/:type/:startYr/:endYr", async (req, res) => {
  let rawType = req.params.type;
  let rawStartYr = Number(req.params.startYr);
  let rawEndYr = Number(req.params.endYr);
  let diff = rawEndYr - rawStartYr;
  if (rawType !== "SolarEnergy" && rawType !== "WindEnergy") {
    res
      .status(400)
      .send({ error: "You are querying a collection that doesn't exist!" });
  } else if (isNaN(rawStartYr) || isNaN(rawEndYr)) {
    res.status(400).send({
      error: "At least one of your inputs is not a valid year-number.",
    });
  } else if (diff < 0) {
    res
      .status(400)
      .send({ error: "The start year cannot be greater than the end year." });
  } else if (
    rawStartYr < 2001 ||
    rawStartYr > 2023 ||
    rawEndYr < 2001 ||
    rawEndYr > 2023
  ) {
    res
      .status(400)
      .send({ error: "The years must be between 2001 and 2023, inclusive." });
  } else {
    await client.connect();
    const db = client.db("NasaData");
    const collection = db.collection(req.params.type);
    //convert the req params to numbers
    let startYear = req.params.startYr;
    let lastTwoStart = startYear.slice(-2);
    if (lastTwoStart[0] === "0") {
      lastTwoStart = lastTwoStart[1] + "-";
    }
    let endYear = req.params.endYr;
    let lastTwoEnd = endYear.slice(-2);
    if (lastTwoEnd[0] === "0") {
      lastTwoEnd = lastTwoEnd[1] + "-";
    }
    let regex = "";
    //if the difference is 0, then the user has selected only one year
    if (diff === 0) {
      regex = `^${lastTwoStart}.*`;
    }
    //if the difference is 1, then the user has selected two years
    else if (diff === 1) {
      regex = `^(${lastTwoStart}|${lastTwoEnd}).*`;
    } else {
      regex = `^(${lastTwoStart}|${lastTwoEnd}`;
      for (let i = 1; i < diff; i++) {
        let year = Number(startYear) + i;
        let lastTwo = year.toString().slice(-2);
        if (lastTwo[0] === "0") {
          lastTwo = lastTwo[1] + "-";
        }
        regex += `|${lastTwo}`;
      }
      regex += ").*";
    }
    //create a regex object
    const regexObj = new RegExp(regex);
    //find all the documents that match the regex
    const objects = await collection
      .find({
        Month: { $regex: regexObj },
      })
      .toArray();

    if (objects.length === 0) {
      res.status(400).send({
        error: "Something went wrong, please check your inputs and try again.",
      });
    } else {
      //organize this data into an object where the keys are the years and the value is an array of all the objects in that year
      let organizedData = {};
      const monthFullString = {
        Jan: "January",
        Feb: "February",
        Mar: "March",
        Apr: "April",
        May: "May",
        Jun: "June",
        Jul: "July",
        Aug: "August",
        Sep: "September",
        Oct: "October",
        Nov: "November",
        Dec: "December",
      };
      for (let i = 0; i < objects.length; i++) {
        let year = objects[i].Month.slice(0, 2);
        if (year[1] === "-") {
          year = year[0];
        }
        let yearFullString = year.length === 1 ? "200" + year : "20" + year;
        let temp = objects[i];
        let month = temp.Month.slice(year.length + 1);
        delete temp._id;
        temp.Month = monthFullString[month];
        if (organizedData[yearFullString]) {
          organizedData[yearFullString].push(temp);
        } else {
          organizedData[yearFullString] = [temp];
        }
      }
      //keep in mind theres no "results" root key
      res.send(organizedData);
    }
  }
});

///////////////////////// END SOLAR & WIND ENERGY //////////////////////

app.get("*", (req, res) => {
  res.sendFile("index.html", { root: "../client/dist" });
});

app.listen(3000, function () {
  console.log("Server up on *:3000");
});
