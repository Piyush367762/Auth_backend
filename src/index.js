const express =require("express");


const app=express();
app.use(express.json());

app.use("/auth",authRoutes);
app.listen(3000,() => {
    console.log("listening at port 3000");
});