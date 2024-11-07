This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.


## Server  backend
## ติดตั้ง Express
## npm install express fs
## สร้างไฟล์ server.js สำหรับ Backend:
เช่น 
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

const dataFilePath = path.join(__dirname, "public/data.json");

// อ่านข้อมูลจากไฟล์ JSON
app.get("/api/items", (req, res) => {
  fs.readFile(dataFilePath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ message: "Error reading data file" });
    res.json(JSON.parse(data));
  });
});

// เพิ่มข้อมูลใหม่ลงในไฟล์ JSON
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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


## หมายเหตุ: รัน Backend API โดยใช้คำสั่ง node server.js