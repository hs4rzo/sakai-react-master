const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3001;

const cors = require("cors");
app.use(cors());


const dataFilePath = path.join(__dirname, "public/data.json");


app.get("/api/items", (req, res) => {
    fs.readFile(dataFilePath, "utf8", (err, data) => {
        if (err) {
            console.error("Error reading data file:", err);
            return res.status(500).json({ message: "Error reading data file" });
        }
        res.json(JSON.parse(data));
    });
});


app.post("/api/items", (req, res) => {
    const newItem = req.body;

    fs.readFile(dataFilePath, "utf8", (err, data) => {
        if (err) return res.status(500).json({ message: "Error reading data file" });

        const items = JSON.parse(data);
        items.push(newItem);

        fs.writeFile(dataFilePath, JSON.stringify(items, null, 2), (err) => {
            if (err) return res.status(500).json({ message: "Error writing data file" });
            res.status(201).json(newItem);
        });
    });
});



app.get("/api/items/add", (req, res) => {
    const newItem = {
        cust_id: req.query.cust_id,
        cust_name: req.query.cust_name,
        cust_address: req.query.cust_address,
        contact_phone: req.query.contact_phone,
        contact_gps: req.query.contact_gps,
    };

    fs.readFile(dataFilePath, "utf8", (err, data) => {
        if (err) return res.status(500).json({ message: "Error reading data file" });

        const items = JSON.parse(data);
        items.push(newItem);

        fs.writeFile(dataFilePath, JSON.stringify(items, null, 2), (err) => {
            if (err) return res.status(500).json({ message: "Error writing data file" });
            res.status(201).json(newItem);
        });
    });
});

app.get("/api/items/delete", (req, res) => {
    fs.readFile(dataFilePath, "utf8", (err, data) => {
        if (err) {
            console.error("Error reading data file:", err);
            return res.status(500).json({ message: "Error reading data file" });
        }

        const items = JSON.parse(data);
        const idToDelete = req.query.cust_id; // รับ ID ที่จะลบจาก query parameter

        // ลบ item โดยเช็คว่า cust_id ตรงกับที่ส่งมาหรือไม่
        const updatedItems = items.filter(item => item.cust_id !== idToDelete);

        // เช็คว่าลบสำเร็จหรือไม่
        if (items.length === updatedItems.length) {
            return res.status(404).json({ message: "Item not found" }); // ถ้าไม่เจอ ID
        }

        // เขียนข้อมูลใหม่ลงไฟล์
        fs.writeFile(dataFilePath, JSON.stringify(updatedItems, null, 2), (err) => {
            if (err) return res.status(500).json({ message: "Error writing data file" });
            res.status(200).json({ message: "Item deleted successfully" });
        });
    });
});




///-----------------------

const atgFilePath = path.join(__dirname, "public/atg.json");

app.get("/api/atg/add", (req, res) => {
    const newItem = {

        atg_id: req.query.atg_id,
        model: req.query.model,
        manufacturer: req.query.manufacturer,
        installation_date: req.query.installation_date,
        last_calibration_date: req.query.last_calibration_date,
        next_calibration_due: req.query.next_calibration_due,
        tank_capacity: req.query.tank_capacity,
        current_level: req.query.current_level,
        status: req.query.status,
        description: req.query.description,
        description: req.query.description


    };

    fs.readFile(atgFilePath, "utf8", (err, data) => {
        if (err) return res.status(500).json({ message: "Error reading data file" });

        const items = JSON.parse(data);
        items.push(newItem);

        fs.writeFile(atgFilePath, JSON.stringify(items, null, 2), (err) => {
            if (err) return res.status(500).json({ message: "Error writing data file" });
            res.status(201).json(newItem);
        });
    });
});

app.get("/api/atg/delete", (req, res) => {
    fs.readFile(atgFilePath, "utf8", (err, data) => {
        if (err) {
            console.error("Error reading data file:", err);
            return res.status(500).json({ message: "Error reading data file" });
        }

        const items = JSON.parse(data);
        const idToDelete = req.query.atg_id; // รับ ID ที่จะลบจาก query parameter

        // ลบ item โดยเช็คว่า cust_id ตรงกับที่ส่งมาหรือไม่
        const updatedItems = items.filter(item => item.atg_id !== idToDelete);

        // เช็คว่าลบสำเร็จหรือไม่
        if (items.length === updatedItems.length) {
            return res.status(404).json({ message: "Item not found" }); // ถ้าไม่เจอ ID
        }

        // เขียนข้อมูลใหม่ลงไฟล์
        fs.writeFile(atgFilePath, JSON.stringify(updatedItems, null, 2), (err) => {
            if (err) return res.status(500).json({ message: "Error writing data file" });
            res.status(200).json({ message: "Item deleted successfully" });
        });
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});