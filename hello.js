function HelloRoutes(app)
{app.get('/', (req, res) => {
    res.send('web Dev!');  
});

app.get("/hello", (req, res) => {
    res.send("life is good!");
});
}

export default HelloRoutes;